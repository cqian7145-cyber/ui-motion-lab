# Component transfer playbook

## Transfer gates

1. Select a **specific** component from `src/components/motion/` and check its source, deps and props.
2. Extract a standalone component API: replace demo data with passed props, remove Moonlight / Cuberto-specific assets, use local tokens.
3. Review licenses and provenance. The lab implementation is original; this does not grant rights to any source site assets.
4. Create an isolated preview page **inside the target project** before touching production routes.
5. Install deps in target only after inspecting its existing versions; adapt import aliases and CSS names.
6. Test keyboard, touch, focus, reduced motion, performance and bundle-size impact.
7. Run existing lint / typecheck / build / tests, review `git diff`, then ask for approval before merging or deploying.

## Example use in target React / Next.js project

Copy `src/components/motion/magnetic-button.tsx` and `src/lib/utils.ts` (if absent) into the target, adapting imports. The component needs `motion`, `clsx`, `tailwind-merge`, and your Tailwind setup. Then:

```tsx
import { MagneticButton } from "@/components/motion/magnetic-button";

export function CallToAction() {
  return <MagneticButton onClick={() => console.log("Open")}>Start exploring</MagneticButton>;
}
```

This is a **manual** copy workflow in V0.1. Do not assume the unfinished `registry/` directory provides a working `npx shadcn add` URL. After two projects successfully reuse a component, package and test it for a real registry.

## Cautions

- `MorphCard` and `BottomSheet` import `src/components/ui/modal.tsx`. Copy this helper and the `.lab-modal` / `.lab-modal::backdrop` rules from `src/app/globals.css`. The native dialog provides top-layer modality; the helper wraps Tab boundaries, restores focus on React unmount and scopes Escape to the topmost modal. Validate your destination browser, scroll containers and nested dialogs again.
- MotionButton and MagneticButton accept conventional HTML button props via React `ComponentProps` and support reduced motion.
- Keep the target app's authentication, business logic, APIs, routes and branding intact.

- All ten components also import `src/lib/use-reduced-motion.ts`. Copy it to keep SSR hydration and live OS-preference changes correct.
