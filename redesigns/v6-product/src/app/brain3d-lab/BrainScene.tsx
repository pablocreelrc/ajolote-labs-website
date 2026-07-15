"use client";
/**
 * BrainScene — the reusable 3D brain (React-Three-Fiber + drei + postprocessing).
 *
 * Three "looks" off ONE 200KB brain mesh: `wireframe` (cyan hologram), `particle`
 * (point cloud — the one used as the site background), `connectome` (nodes + links).
 * Each does a CONVERGE_SEC "comes online" assembly on mount, then idles. Bloom adds the glow.
 *
 * Consumed by: BrainExperience.tsx (look="particle", interactive=false → the site bg) and
 * brain3d-lab/page.tsx (the look-tuning dev route, interactive=true → OrbitControls on).
 *
 * Gotchas that cost real time (don't undo):
 *  - NEVER do side-effects (e.g. assign a ref) inside useMemo — StrictMode double-invokes
 *    the factory and you animate an orphan; mutate the rendered object in useFrame instead.
 *  - Bloom (EffectComposer) needs an OPAQUE scene background (`<color attach="background">`)
 *    — a transparent canvas renders nothing. Dim via container opacity in CSS, not here.
 *  - Stay on three@^0.184 (matches drei/fiber/postprocessing); downgrading silently breaks render.
 *  - Drive time from performance.now() inside useBoot, not the (deprecated) THREE.Clock.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

export type Look = "wireframe" | "particle" | "connectome";

// One model for every look — the lowpoly brain (200KB) is a genuine brain mesh
// and loads instantly, so a preloader built on it never needs its own loader.
// (brain-detailed.glb was a wrong/garbage asset — not a brain — and is dropped.)
const BRAIN = "/models/brain-lowpoly.glb";
const TARGET = 2.6; // normalized size in world units
// Duration of the converge/assembly. BrainExperience.tsx BOOT_MS must be ≥ this so the
// brain fully assembles before the boot phase hands off to the ambient background.
const CONVERGE_SEC = 1.7;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

// ── Reactivity: the ambient background brain responds to cursor (parallax), scroll velocity
// (energy) and a "brain:pulse" event dispatched by the platform diagram on each console beat.
// Module-level singleton + window listeners installed once (only for the non-interactive
// background instance — the lab route has OrbitControls instead).
const brainReact = { tpx: 0, tpy: 0, px: 0, py: 0, scrollEnergy: 0, pulse: 0, lastPulseAt: 0, lastY: 0 };
let brainListenersOn = false;
function installBrainReact() {
  if (brainListenersOn || typeof window === "undefined") return;
  brainListenersOn = true;
  brainReact.lastY = window.scrollY;
  window.addEventListener("pointermove", (e) => {
    brainReact.tpx = (e.clientX / window.innerWidth) * 2 - 1;
    brainReact.tpy = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
  window.addEventListener("scroll", () => {
    const d = Math.abs(window.scrollY - brainReact.lastY);
    brainReact.lastY = window.scrollY;
    brainReact.scrollEnergy = Math.min(1, brainReact.scrollEnergy + d / 900);
  }, { passive: true });
  window.addEventListener("brain:pulse", () => {
    brainReact.pulse = 1;
    brainReact.lastPulseAt = performance.now();
  });
}
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// Densest mesh in a loaded gltf scene (brain models are usually one mesh).
function mainMesh(root: THREE.Object3D): THREE.Mesh | null {
  let best: THREE.Mesh | null = null;
  let max = 0;
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && m.geometry?.attributes?.position) {
      const c = m.geometry.attributes.position.count;
      if (c > max) { max = c; best = m; }
    }
  });
  return best;
}

// Uniform scale + world-space center for fitting any object into a TARGET-unit cube.
function fitOf(object: THREE.Object3D): { scale: number; center: THREE.Vector3 } {
  object.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const scale = TARGET / Math.max(size.x, size.y, size.z);
  return { scale, center };
}

function Fitted({ object }: { object: THREE.Object3D }) {
  const fit = useMemo(() => fitOf(object), [object]);
  return (
    <group scale={fit.scale} position={fit.center.clone().multiplyScalar(-fit.scale)}>
      <primitive object={object} />
    </group>
  );
}

function Spin({ children, speed = 0.3, parallax = false }: { children: React.ReactNode; speed?: number; parallax?: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const last = useRef<number | null>(null);
  useFrame(() => {
    const now = performance.now() / 1000;
    const dt = last.current === null ? 0 : Math.min(0.05, now - last.current);
    last.current = now;
    if (!ref.current) return;
    ref.current.rotation.y += dt * speed;
    if (parallax) {
      // ease the eased pointer toward the raw target, then shift/tilt the brain toward the cursor
      brainReact.px += (brainReact.tpx - brainReact.px) * 0.045;
      brainReact.py += (brainReact.tpy - brainReact.py) * 0.045;
      ref.current.position.x = brainReact.px * 0.5;
      ref.current.position.y = -brainReact.py * 0.35;
      ref.current.rotation.x = brainReact.py * 0.18;
    }
  });
  return <group ref={ref}>{children}</group>;
}

// Time from performance.now() — R3F's clock/delta is unreliable on three 0.184
// (THREE.Clock is deprecated and its delta comes through as 0). Returns raw elapsed
// `t` (for oscillations) + eased boot progress `e`.
function useBoot() {
  const start = useRef<number | null>(null);
  return () => {
    const now = performance.now() / 1000;
    if (start.current === null) start.current = now;
    const t = now - start.current;
    return { t, e: easeOutCubic(clamp01(t / CONVERGE_SEC)) };
  };
}

// Pause the render loop while the tab is hidden — a backgrounded WebGL+bloom canvas
// would otherwise keep burning GPU/battery (matters most on phones). "never" stops
// the loop; "always" resumes it.
function useVisibleFrameloop() {
  const [loop, setLoop] = useState<"always" | "never">("always");
  useEffect(() => {
    const sync = () => setLoop(document.hidden ? "never" : "always");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);
  return loop;
}

// ── WIREFRAME: hologram brain — grows + fades in on boot, then breathes + flickers
function Wireframe() {
  const { scene } = useGLTF(BRAIN);
  const grpRef = useRef<THREE.Group>(null);
  const boot = useBoot();
  const cloned = useMemo(() => {
    const c = scene.clone(true); // pure — no side effects (StrictMode double-invokes this)
    c.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.material = new THREE.MeshBasicMaterial({ color: "#00e5ff", wireframe: true, transparent: true, opacity: 0 });
    });
    return c;
  }, [scene]);
  useFrame(() => {
    const { t, e } = boot();
    if (grpRef.current) grpRef.current.scale.setScalar(0.82 + 0.18 * e);
    const flicker = e > 0.99 && Math.sin(t * 41) > 0.93 ? -0.22 : 0;
    const op = e * (0.72 + Math.sin(t * 2.2) * 0.1 + flicker);
    cloned.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) (m.material as THREE.Material).opacity = op; });
  });
  return <group ref={grpRef}><Fitted object={cloned} /></group>;
}

// ── PARTICLE: points sampled off the brain — converge from a scattered cloud, then twinkle
function Particle({ count = 9000, reactive = false }: { count?: number; reactive?: boolean }) {
  const { scene } = useGLTF(BRAIN);
  const fit = useMemo(() => fitOf(scene), [scene]);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const posRef = useRef<THREE.BufferAttribute>(null);
  const boot = useBoot();
  useEffect(() => { if (reactive) installBrainReact(); }, [reactive]);
  const sets = useMemo(() => {
    const mesh = mainMesh(scene);
    if (!mesh) return null;
    const sampler = new MeshSurfaceSampler(mesh).build();
    const target = new Float32Array(count * 3);
    const scatter = new Float32Array(count * 3);
    const radius = (TARGET / fit.scale) * 0.85; // scatter in the same (pre-fit) world space
    const p = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      sampler.sample(p);
      p.applyMatrix4(mesh.matrixWorld);
      target[i * 3] = p.x; target[i * 3 + 1] = p.y; target[i * 3 + 2] = p.z;
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      const r = radius * (0.5 + Math.random() * 0.9);
      scatter[i * 3] = fit.center.x + dir.x * r;
      scatter[i * 3 + 1] = fit.center.y + dir.y * r;
      scatter[i * 3 + 2] = fit.center.z + dir.z * r;
    }
    return { target, scatter, pos: Float32Array.from(scatter), count };
  }, [scene, count, fit]);
  useFrame(() => {
    if (!sets) return;
    const { t, e } = boot();
    if (e < 1 && posRef.current) {
      const { target, scatter, pos } = sets;
      for (let i = 0; i < pos.length; i++) pos[i] = scatter[i] + (target[i] - scatter[i]) * e;
      posRef.current.needsUpdate = true;
    }
    if (matRef.current) {
      let extraSize = 0, extraOp = 0;
      if (reactive) {
        // decay the transient energies, then bump size/opacity — the brain "breathes" with
        // scroll velocity and flares on each diagram pulse.
        brainReact.scrollEnergy *= 0.94;
        brainReact.pulse *= 0.9;
        extraSize = brainReact.pulse * 0.02 + brainReact.scrollEnergy * 0.01;
        extraOp = brainReact.pulse * 0.3 + brainReact.scrollEnergy * 0.14;
        if (typeof window !== "undefined") {
          (window as unknown as { __brain?: object }).__brain = {
            pointerInfluence: Math.hypot(brainReact.px, brainReact.py),
            lastPulseAt: brainReact.lastPulseAt,
            scrollEnergy: brainReact.scrollEnergy,
          };
        }
      }
      matRef.current.size = 0.03 + Math.sin(t * 2.0) * 0.009 + extraSize;
      matRef.current.opacity = e * (0.55 + Math.sin(t * 1.4) * 0.18 + extraOp);
    }
  });
  if (!sets) return null;
  return (
    <group scale={fit.scale} position={fit.center.clone().multiplyScalar(-fit.scale)}>
      <points>
        <bufferGeometry>
          <bufferAttribute ref={posRef} attach="attributes-position" args={[sets.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={matRef} color="#00e5ff" size={0.03} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
      </points>
    </group>
  );
}

// ── CONNECTOME: sparse nodes wired to near neighbours. Nodes pop in, links wire up,
// then signal pulses travel node→node — the "one brain · nodes · agents" substrate read.
function Connectome({ nodes = 460, linkDist = 0.3, maxLinksPerNode = 3 }: { nodes?: number; linkDist?: number; maxLinksPerNode?: number }) {
  const { scene } = useGLTF(BRAIN);
  const nodeMat = useRef<THREE.PointsMaterial>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const bootRef = useRef(0);
  const boot = useBoot();
  const geo = useMemo(() => {
    const mesh = mainMesh(scene);
    if (!mesh) return null;
    const { scale, center } = fitOf(scene);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const pts: THREE.Vector3[] = [];
    const p = new THREE.Vector3();
    for (let i = 0; i < nodes; i++) {
      sampler.sample(p);
      p.applyMatrix4(mesh.matrixWorld).sub(center).multiplyScalar(scale); // baked fitted coords
      pts.push(p.clone());
    }
    const pos = new Float32Array(nodes * 3);
    pts.forEach((q, i) => { pos[i * 3] = q.x; pos[i * 3 + 1] = q.y; pos[i * 3 + 2] = q.z; });
    const seg: number[] = [];
    const links: Array<[THREE.Vector3, THREE.Vector3]> = [];
    for (let i = 0; i < pts.length; i++) {
      let c = 0;
      for (let j = i + 1; j < pts.length && c < maxLinksPerNode; j++) {
        if (pts[i].distanceTo(pts[j]) < linkDist) {
          seg.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          links.push([pts[i], pts[j]]);
          c++;
        }
      }
    }
    return { pos, seg: new Float32Array(seg), links };
  }, [scene, nodes, linkDist, maxLinksPerNode]);
  useFrame(() => {
    const { e } = boot();
    bootRef.current = e;
    if (nodeMat.current) nodeMat.current.opacity = clamp01(e * 1.6) * 0.95;     // nodes pop in first
    if (lineMat.current) lineMat.current.opacity = smoothstep(0.3, 1, e) * 0.28; // links wire up after
  });
  if (!geo) return null;
  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.seg, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMat} color="#00e5ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[geo.pos, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={nodeMat} color="#6ff1ff" size={0.055} sizeAttenuation transparent depthWrite={false} opacity={0} />
      </points>
      <Pulses links={geo.links} bootRef={bootRef} />
    </group>
  );
}

// Bright dots that travel node→node along the links — gated until the network has wired up.
function Pulses({ links, bootRef, count = 90 }: { links: Array<[THREE.Vector3, THREE.Vector3]>; bootRef: React.RefObject<number>; count?: number }) {
  const ref = useRef<THREE.BufferAttribute>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const last = useRef<number | null>(null);
  const st = useMemo(() => {
    const n = Math.min(count, Math.max(1, links.length));
    const seg = new Int32Array(n);
    const t = new Float32Array(n);
    const speed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      seg[i] = Math.floor(Math.random() * links.length);
      t[i] = Math.random();
      speed[i] = 0.45 + Math.random() * 0.9;
    }
    return { n, seg, t, speed, pos: new Float32Array(n * 3) };
  }, [links, count]);
  useFrame(() => {
    if (!links.length) return;
    const now = performance.now() / 1000;
    const dt = last.current === null ? 0 : Math.min(0.05, now - last.current);
    last.current = now;
    const ready = (bootRef.current ?? 0) > 0.5;
    if (matRef.current) matRef.current.opacity = smoothstep(0.5, 0.95, bootRef.current ?? 0) * 0.95;
    if (!ready) return;
    const { n, seg, t, speed, pos } = st;
    for (let i = 0; i < n; i++) {
      t[i] += dt * speed[i];
      if (t[i] > 1) { t[i] = 0; seg[i] = Math.floor(Math.random() * links.length); }
      const [a, b] = links[seg[i]];
      pos[i * 3] = a.x + (b.x - a.x) * t[i];
      pos[i * 3 + 1] = a.y + (b.y - a.y) * t[i];
      pos[i * 3 + 2] = a.z + (b.z - a.z) * t[i];
    }
    if (ref.current) ref.current.needsUpdate = true;
  });
  if (!links.length) return null;
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={ref} attach="attributes-position" args={[st.pos, 3]} />
      </bufferGeometry>
      <pointsMaterial ref={matRef} color="#ffffff" size={0.075} sizeAttenuation transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0} />
    </points>
  );
}

// `lite` = mobile-friendly render: NO Bloom (the multi-pass postprocessing that hangs phone
// GPUs), lower DPR, no MSAA. Same 9k particles — points are cheap; Bloom was the killer.
export default function BrainScene({ look, interactive = true, lite = false }: { look: Look; interactive?: boolean; lite?: boolean }) {
  const frameloop = useVisibleFrameloop(); // pause when the tab is backgrounded
  return (
    <Canvas
      frameloop={frameloop}
      /* lite (mobile) pulls the camera back so the brain is smaller and doesn't overflow a
         narrow portrait screen. Desktop keeps the closer, fuller framing. */
      camera={{ position: [0, 0, lite ? 5.8 : 4.6], fov: 42 }}
      dpr={lite ? [1, 1.5] : [1, 1.8]}
      gl={{ antialias: !lite }}
    >
      {/* opaque bg matching the page (--bg); also the EffectComposer's composite base when on */}
      <color attach="background" args={["#09090b"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} />
      <pointLight position={[-4, -2, -3]} intensity={2.4} color="#00e5ff" />
      <Spin parallax={!interactive}>
        {look === "wireframe" && <Wireframe />}
        {look === "particle" && <Particle reactive={!interactive} />}
        {look === "connectome" && <Connectome />}
      </Spin>
      {/* dropped when used as an ambient background (non-interactive) */}
      {interactive && <OrbitControls enablePan={false} enableZoom minDistance={3} maxDistance={9} />}
      {/* Bloom = the GPU killer on phones. lite mode skips it; additive cyan points still glow. */}
      {!lite && (
        <EffectComposer>
          <Bloom intensity={1.15} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur radius={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

useGLTF.preload(BRAIN);
