/**
 * FX preview toggle panel.
 * Reveals when ?fx=1 is in the URL or localStorage flag fx-preview is set.
 * Toggles body classes that gate Magic-UI-style effects ported to vanilla
 * CSS/JS in style.css. Persists selection across reloads.
 *
 * Effects:
 *   fx-border-beam   - traveling cyan border on case cards
 *   fx-animated-beam - SVG flow line in services pipeline (desktop)
 *   fx-aurora        - slow-drift gradient mesh behind hero
 *   fx-magic-card    - cursor-following radial glow on cards
 *
 * Strip this file + the #fxPanel HTML block before final ship.
 */
(function () {
  "use strict";

  var EFFECTS = ["border-beam", "animated-beam", "aurora", "magic-card"];
  var STORAGE_KEY = "ajolote-fx-state";

  function shouldShowPanel() {
    var params = new URLSearchParams(location.search);
    if (params.has("fx")) return params.get("fx") !== "0";
    try {
      return localStorage.getItem("fx-preview") === "1";
    } catch (e) {
      return false;
    }
  }

  function readState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* quota / private mode — silent */ }
  }

  function applyEffect(name, on) {
    document.body.classList.toggle("fx-" + name, !!on);
  }

  function init() {
    var panel = document.getElementById("fxPanel");
    if (!panel) return;
    if (!shouldShowPanel()) return;

    panel.hidden = false;
    panel.removeAttribute("inert");
    document.body.classList.add("fx-panel-visible");

    var state = readState();
    EFFECTS.forEach(function (effect) {
      var on = !!state[effect];
      applyEffect(effect, on);
      var cb = panel.querySelector('input[data-fx="' + effect + '"]');
      if (cb) cb.checked = on;
    });

    panel.addEventListener("change", function (e) {
      var t = e.target;
      if (!t || !t.dataset || !t.dataset.fx) return;
      var name = t.dataset.fx;
      var on = !!t.checked;
      applyEffect(name, on);
      state[name] = on;
      writeState(state);
    });

    var closeBtn = panel.querySelector(".fx-panel__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.hidden = true;
        try { localStorage.removeItem("fx-preview"); } catch (e) {}
      });
    }

    // Persist the panel-visibility flag so reloads on the same domain keep it
    // open without needing the query param every time.
    if (new URLSearchParams(location.search).get("fx") === "1") {
      try { localStorage.setItem("fx-preview", "1"); } catch (e) {}
    }

    // Drag-to-move header so the panel doesn't cover content the reviewer
    // wants to inspect. Position persists per session via inline style.
    var header = panel.querySelector(".fx-panel__header");
    if (header) {
      var dragging = false;
      var startX = 0, startY = 0, baseX = 0, baseY = 0;
      header.addEventListener("pointerdown", function (e) {
        if (e.target.closest(".fx-panel__close")) return;
        dragging = true;
        var rect = panel.getBoundingClientRect();
        startX = e.clientX; startY = e.clientY;
        baseX = rect.left; baseY = rect.top;
        header.setPointerCapture(e.pointerId);
      });
      header.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var nx = baseX + (e.clientX - startX);
        var ny = baseY + (e.clientY - startY);
        nx = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, nx));
        ny = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, ny));
        panel.style.left = nx + "px";
        panel.style.top = ny + "px";
        panel.style.right = "auto";
        panel.style.bottom = "auto";
      });
      header.addEventListener("pointerup", function (e) {
        dragging = false;
        try { header.releasePointerCapture(e.pointerId); } catch (err) {}
      });
    }
  }

  /* -----------------------------------------------------
     Magic Card cursor tracking — sets --mx / --my CSS vars
     on hovered card. Active only when fx-magic-card class
     is on the body. Listener is always wired so toggling
     on doesn't require a reload.
     ----------------------------------------------------- */
  var magicCardSelectors = ".case, .stage, .cta-card";
  document.addEventListener("pointermove", function (e) {
    if (!document.body.classList.contains("fx-magic-card")) return;
    var card = e.target.closest && e.target.closest(magicCardSelectors);
    if (!card) return;
    var rect = card.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * 100;
    var y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--fx-mx", x + "%");
    card.style.setProperty("--fx-my", y + "%");
    card.classList.add("is-fx-hot");
  }, { passive: true });

  document.addEventListener("pointerleave", function (e) {
    var card = e.target && e.target.closest && e.target.closest(magicCardSelectors);
    if (card) card.classList.remove("is-fx-hot");
  }, { capture: true, passive: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
