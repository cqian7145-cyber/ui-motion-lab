# UI Motion Lab

**个人 UI 动效实验室 / Interactive React component studio**

A standalone, local-first Next.js app for studying interaction patterns, building original reusable components, and previewing motion in a safe environment before integrating into a product.

![Status](https://img.shields.io/badge/status-local--first-blue) ![Stack](https://img.shields.io/badge/Next.js-16.3.5-black) ![Motion](https://img.shields.io/badge/Motion-React-6366f1)

## Included in V0.1

- A responsive white / black / blue component gallery with search and category filters.
- **10 functional examples**: Motion Button, Magnetic Button, Reveal Text, Morph Card, Stagger List, Animated Tabs, Scroll Reveal, Bottom Sheet, Animated Toast, Page Transition.
- Interactive detail panel: live preview, replay, speed adjustment, preview scaling, button color/spring adjustment, reduced-motion simulation, component source, copy button, usage examples, props.
- UI foundations (shadcn-style Button and `components.json`); no database or remote dependencies at runtime beyond the installed packages.
- Documentation on bringing new effects over from a reference clone and transferring reviewed components into a product.

## Requirements

Node.js **24+**, npm, Windows PowerShell (or a compatible shell). This starter contains source files; it does **not** bundle `node_modules` or assume networkless installation.

## Windows quick start

Extract the ZIP so `package.json` is at `D:\ui-motion-lab\ui-motion-lab\package.json`.

```powershell
Set-Location D:\ui-motion-lab\ui-motion-lab
node -v
$env:npm_config_cache = "D:\ui-motion-lab\ui-motion-lab\.npm-cache"
npm ci --no-audit --no-fund
npm run dev
```

Open http://localhost:3000 . If port 3000 is used by another project, Next.js will usually choose another port; read the terminal output. To force a port, use `npm run dev -- -p 3001`.

Alternatively, run `./START_WINDOWS.ps1` after opening PowerShell in this folder. The helper keeps the npm cache inside this project on D:.

Full check (requires dependencies to be installed):

```powershell
npm run check
```

To refresh bundled source listings after editing components:

```powershell
npm run generate:sources
```

The generator also runs automatically before `dev` and `build`.

## Directory map

```text
src/
  app/                    # gallery app, styling, metadata
  components/
    lab/                  # gallery UI, catalog, live demos
    motion/               # independent React component sources
    ui/                   # shadcn-style primitives
  generated/              # generated source strings for the Source tab
  lib/
scripts/                   # source file generator
references/cuberto/       # put *your own* clone inspection evidence here
docs/                     # workflow, QA, extraction and transfer guides
registry/                 # reserved for later shadcn registry packaging
```

## Code notes

- Copy `src/lib/use-reduced-motion.ts` with each component to preserve SSR-safe system preference handling. The 10 source files are real components, not screenshots or fake buttons. Several include example defaults; customize text and data props when deploying.
- Motion behavior is interactive. The Source tab copies the complete local TSX implementation; projects will also need `motion`, `lucide-react` where relevant, and the `@/lib/utils` helper for some components.
- The modal demonstrations use a shared native `<dialog>` helper: initial focus, Tab wrapping, focus restoration, Escape on the topmost dialog, and click-outside. Copy `src/components/ui/modal.tsx` and the `.lab-modal` CSS rules with MorphCard / BottomSheet. Chromium was tested; other browser engines and physical devices still need adoption-specific testing.
- Touch devices cannot meaningfully reproduce a desktop magnetic-cursor effect; the magnetic button works as a normal accessible button on touch.
- The reduce-motion toggle is a preview override, and components also use the user's operating-system preference.
- Do not redistribute third-party brand assets, production bundles, or unlicensed source code from reference websites.

## Reuse in another project

Read [`docs/COMPONENT_TRANSFER.md`](docs/COMPONENT_TRANSFER.md). First integrate one reviewed component in an isolated preview route and run regression checks. The `registry/` folder is deliberately left unconfigured until compatibility and license checks are complete.

## Reference-clone workflow

Read [`docs/CUBERTO_TO_COMPONENT.md`](docs/CUBERTO_TO_COMPONENT.md) and [`docs/DSH_PROMPT.md`](docs/DSH_PROMPT.md).

## Project status

V0.1 is a **starter implementation**, not a published package. Review compatibility, performance, browser behavior and accessibility before shipping any effect to Moonlight or another production application.

## UI-001 local validation

See [the task report](docs/tasks/UI-001-REPORT.md) for current commands, browser evidence, limitations and Git delivery. On this machine port 3000 belongs to another project; UI Motion Lab was validated at http://localhost:3001 using `npm run dev -- -p 3001`.

Optional browser regression: `node scripts/verify-ui001.mjs` uses an existing Playwright installation; set `UI001_PLAYWRIGHT_PATH` and `UI001_CHROME_PATH` when it is outside this project. It does not install dependencies. Artifacts go to ignored `output/playwright/final/`.
