# UI Motion Lab — instructions for Codex / DSH

## Mission
Build a maintainable, accessible library of **original** React motion patterns with functional browser demos. The reference websites are study material, never code to paste wholesale.

## Working directory and scope
- Current project is the only writable workspace; target path on the user's PC: `D:\ui-motion-lab`.
- Do not edit `D:\moonlight`, `D:\cuberto复刻`, or any other repository without explicit user approval.
- Prefer D: for caches and artifacts on Windows. Do not create new working directories on C: unless approved.
- Preserve existing components and Git history; inspect diffs before modifying shared files.
- Never bypass sandbox restrictions, reset ACLs or disable security software to make an edit succeed.

## Before implementation
- Inspect `package.json`, current component code, dependencies and `docs/`.
- First research existing open-source options. Check maintenance, license, source and Next/React compatibility.
- Separate **observed reference behavior**, **estimated parameters**, and **original design decisions**.
- Inspect desktop, mobile, initial/active/settled states with browser tools when available.

## Engineering
- TypeScript strict, semantic React, composable props, no unneeded backend.
- Use Tailwind CSS and Motion; prefer CSS for simple transitions, add GSAP/Lenis only if justified.
- Keep design tokens/variants local; avoid copying third-party global CSS into the lab.
- Focus/keyboard/touch, responsive layout and `prefers-reduced-motion` are required.
- Guard background loops, clean up effects, avoid excessive layout thrash, optimize performance.
- Use Lucide for icons; white/black/blue visual system with restrained motion.
- Do not commit fonts, brand assets, proprietary images, full HTML/CSS dumps or non-permissive snippets from external sites.

## Component acceptance
- Each component must have a real live demo, editable TypeScript source and usage notes.
- Controls in the playground must affect real behavior, not be decorative.
- Handle initial, hover/press, disabled, mobile and reduced-motion states when applicable.
- Include examples and props documentation. Record origin/technique/attribution and licensing.
- Test at representative desktop and mobile widths, keyboard, interactive states and Escape paths.
- `npm run check` must pass before completion. Report unrun tests explicitly.

## Delivery
- State files changed, commands run, browser views tested and known gaps.
- Never claim production readiness or browser-tested parity without corresponding evidence.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
