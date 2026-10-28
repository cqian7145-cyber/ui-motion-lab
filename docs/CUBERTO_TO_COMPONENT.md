# Cuberto clone → reusable components

The Cuberto project is reference material, not an installation source. Keep `D:\cuberto复刻` separate from this lab and from Moonlight.

## 1. Audit the already-completed clone

Use DSH in the clone workspace. Inspect actual local source and source website with browser access. Record:
- target and local URLs, version / date
- desktop 1440px, mobile 390px, plus a wide desktop
- motion driver: pointer, hover, click, scroll or time
- initial, active, settled and reverse interaction states
- measured or *estimated* timings, distances, easing, asset provenance
- CSS/JS technique, source file paths, keyboard/touch variations

Save approved, license-safe documentation, screenshots and short video evidence to `references/cuberto/`. Avoid mass copying raw website HTML, CSS or proprietary files.

## 2. Extract only general mechanics

Recommended first sample: magnetic button or reveal text. Rebuild it in `src/components/motion/` using original implementation and configurable props. Reuse permitted libraries such as Motion; avoid copying Cuberto's trademarks or content.

## 3. Test in the gallery

Create a new catalog entry, import its live demo, update `scripts/generate-component-sources.mjs`, then run `npm run generate:sources`, `npm run check`, and verify visual/interaction behavior in the browser.

## 4. Transfer into products later

Follow `docs/COMPONENT_TRANSFER.md`. Never point the production project directly at the clone's global CSS and avoid destructive code replacement.

## Five questions for every effect

1. What exactly triggers it?
2. What changes between initial, active, settled and reverse states?
3. How does it behave with touch and keyboard?
4. What is the cheapest reliable implementation?
5. Is the behavior generalizable without copying protected assets or code?
