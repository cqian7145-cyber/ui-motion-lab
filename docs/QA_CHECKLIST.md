# V0.1 QA checklist

Current status and command evidence: [UI-001-REPORT.md](tasks/UI-001-REPORT.md).
Chromium emulation does not imply physical-device or other-engine coverage.

With an existing Playwright package and Chromium, start the app and run:

```powershell
$env:UI001_PLAYWRIGHT_PATH = '<existing Playwright package directory>'
$env:UI001_CHROME_PATH = '<existing chrome.exe>'
$env:UI001_URL = 'http://localhost:3001'
node scripts/verify-ui001.mjs
```

The runner installs nothing. Results/screenshots: ignored output/playwright/final/.
A compact accepted result is retained beside the report.

- [x] Lockfile installation, generation, lint, typecheck and build
- [x] Gallery: ten cards, categories, search, empty state, clear filters
- [x] Motion Button: hover, press, disabled/enabled, color, spring, reduced motion
- [x] Magnetic Button: mouse displacement/return and touch fallback
- [x] Reveal Text: entrance, replay and speed response
- [x] Morph Card: expand/close, topmost Escape and focus entry/wrap/restore
- [x] Stagger List: early order and settled visibility
- [x] Animated Tabs: mouse/arrows/Home, indicator and linked panel
- [x] Scroll Reveal: wheel-triggered local viewport reveal
- [x] Bottom Sheet: open/close/drag, Escape and focus entry/wrap/restore
- [x] Animated Toast: show and dismiss
- [x] Page Transition: Discover/Create/Share cycle
- [x] Playground: scale/color/speed/stiffness/simulation affect real behavior
- [x] Ten source listings match disk; real clipboard source and usage copy
- [x] 1440/768/390/320px gallery, modal and Props layouts; mobile filtering
- [x] Tab/Shift+Tab/Enter/Space/Escape and nested parent modal preservation
- [x] System reduced motion on SSR hydration and live preference changes
- [x] No runtime/hydration console errors; screenshots visually reviewed

## Manual adoption checks

- Physical touch hardware, browser chrome, virtual keyboard and low-end profiling.
- Firefox/WebKit, screen reader, zoom/high contrast and formal contrast audit.
- Destination-specific long text, custom props and licensing decisions.
- Modals need src/components/ui/modal.tsx and .lab-modal CSS rules.
- All components need src/lib/use-reduced-motion.ts; adapt aliases when copying.

No registry publishing, Storybook or target-product integration is included.
