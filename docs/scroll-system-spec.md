# Scroll System — Full-viewport snap with horizontal carousel

Reusable scroll pattern for single-page sites with full-viewport sections and card carousels.

## Layout: CSS Scroll Snap

```css
html { scroll-snap-type: y mandatory; }

.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

- Each major section gets class `snap-section`
- Snap disabled on mobile (<=768px) via JS: `document.documentElement.style.scrollSnapType = 'none'`
- Last section (CTA) contains the footer inside it — they snap as one unit
- If content needs to be centered above the footer, use `justify-content: space-between` on the section and `flex: 1; display: flex; align-items: center` on the content container

## Carousel: Horizontal card slider

For any section with too many cards to fit in one viewport.

### CSS

```css
.carousel-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* hide scrollbar */
}
.carousel-container::-webkit-scrollbar { display: none; }

.carousel-card {
  min-width: calc(50% - 10px); /* exactly 2 visible */
  max-width: calc(50% - 10px);
  flex-shrink: 0;
  scroll-snap-align: start;
}
```

### Navigation dots

- Dots represent **sliding pairs**, not individual cards
- Formula: `totalDots = cards - cardsPerView + 1`
- Example: 4 cards, 2 per view = 3 dots (pairs: 1-2, 2-3, 3-4)
- Active dot gets wider (pill shape): `width: 24px; border-radius: 4px`
- Inactive dots are circles: `width: 8px; border-radius: 50%`

### Auto-advance

```javascript
var autoTimer = setInterval(function() {
  currentPair = (currentPair + 1) % totalPairs;
  scrollToPair(currentPair);
}, settings.autoAdvanceSeconds * 1000);
```

### CRITICAL: scrollTo, not scrollIntoView

```javascript
// CORRECT — only scrolls the carousel horizontally
function scrollToPair(pair) {
  var cardWidth = cards[0].offsetWidth + gap;
  container.scrollTo({ left: pair * cardWidth, behavior: 'smooth' });
}

// WRONG — hijacks the page's vertical scroll, jumps user back to this section
// cards[pair].scrollIntoView({ behavior: 'smooth', inline: 'start' });
```

### Hover behavior

- `mouseenter` on carousel container: pause auto-advance (`clearInterval`)
- `mouseleave`: restart auto-advance
- Manual dot click: jump to pair + restart timer

### Scroll tracking (sync dots with manual swipe)

```javascript
container.addEventListener('scroll', function() {
  var pair = Math.round(container.scrollLeft / cardWidth);
  pair = Math.max(0, Math.min(pair, totalPairs - 1));
  // Update active dot
}, { passive: true });
```

## Data-driven cards

Cards rendered from a JSON config file instead of hardcoded HTML.

### JSON structure (`data/cases.json`)

```json
{
  "settings": {
    "autoAdvanceSeconds": 3,
    "cardsPerView": 2
  },
  "cases": [
    {
      "industry": "HEALTHCARE",
      "dotColor": "#00e5ff",
      "title": "Private Medical Clinic",
      "description": "...",
      "metrics": [
        { "value": "35%", "label": "No-show reduction" }
      ],
      "pills": ["WhatsApp Booking", "Stripe Payments"],
      "quote": "Patients book at 2am...",
      "cta": { "text": "Get similar results", "href": "#calendly" }
    }
  ]
}
```

- Adding a case = adding an entry to the JSON
- Dots and timer adapt automatically based on `cases.length` and `settings.cardsPerView`
- JS fetches the JSON, renders cards + dots dynamically

## Reveal animations (progressive enhancement)

Content visible by default — animations are an enhancement, not a requirement.

```css
/* Visible by default */
.reveal { opacity: 1; transform: translateY(0); }

/* JS adds this class — only then do reveals activate */
.js-ready .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.js-ready .reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// First thing JS does — enables reveal animations
document.documentElement.classList.add('js-ready');

// IntersectionObserver triggers .visible on scroll
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
```

This ensures content is always visible if JS fails, is slow, or is disabled.

## Mobile behavior (<=768px)

- Scroll snap: **disabled** (natural scrolling)
- Carousel: becomes **vertical stack** (flex-direction: column)
- Cards: full width (min-width: auto, max-width: none)
- Dots: **hidden**
- Sections: min-height auto (content-sized)

## Performance notes

- Fonts loaded async (`media="print" onload="this.media='all'"`) to avoid render-blocking
- Logo compressed to WebP (2.4KB vs 1.5MB PNG)
- JSON preloaded via `<link rel="preload" href="data/cases.json" as="fetch">`
- FCP target: <300ms
