---
ticket: T-02
title: Build the theme and application shell
status: done
size: M
depends_on: T-01
started: 2026-09-02T13:49:04Z
verified: 2026-09-02T13:51:05Z 3d7c2ba08651
finished: 2026-09-02T13:51:45Z
---

# T-02: Build the theme and application shell

## Goal

Introduce the shared light visual foundation and apply it to the root shell, headings, and loader while leaving view selection and application behavior unchanged.

## Scope

- Add `src/theme.ts` using Material UI v4's existing theme API; add no dependency.
- Define the calm neutral palette, blue accent, system typography, radii, borders, shadows, control treatment, and focus treatment.
- Apply `ThemeProvider` and the global baseline at the application root.
- Add shared CSS custom properties in `src/index.css`, including `--color-page`, and refactor global/root layout styles around them.
- Restyle the shared `Form` shell and loader with semantic `main`, heading hierarchy, content-driven height, safe viewport padding, and a centered maximum width.
- Remove active use of decorative script/typewriter fonts and inline title styling, but do not perform a package migration or dependency cleanup.
- Preserve the loader branch, Redux provider/store creation, and `FormViewFactory` behavior.

## Acceptance Criteria

- [x] A single Material UI theme defines the shared light presentation and is applied at the application root.
- [x] Global CSS tokens include page, surface, text, muted text, border, shadow, spacing, and motion values.
- [x] The page background is light and calm; no dark-mode path is introduced.
- [x] The app shell uses content-driven height and remains usable on short or narrow viewports.
- [x] The document exposes one meaningful `main` region, an `h1` title, and a subordinate byline rather than multiple `h3` elements.
- [x] The loader remains centered, visible, and consistent with the new palette.
- [x] Empty input still cannot navigate to results, as protected by T-01.
- [x] No Redux, saga, analyzer, view factory, or image-fetching behavior changes.
- [x] No dependency or lockfile changes are introduced.
- [x] Automated tests and the production build pass.

## Verification

```bash
test -f src/theme.ts
rg -q 'ThemeProvider' src/WordAnalyzerApp.tsx
rg -q '^:root' src/index.css
rg -q -- '--color-page' src/index.css
CI=true npm test -- --watchAll=false
npm run build
```

## Notes

Keep the foundation small and explicit. Existing React 17.0.2, Material UI 4.12.4, and Framer Motion 4.1.17 are sufficient for this work.
