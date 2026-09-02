---
version: 1
status: ticketed
date: 2026-09-02
---

# WordAnalyzer Calm Modern Restyle

## Problem

WordAnalyzer works, but its presentation no longer feels current. The saturated pink-purple background, decorative script/typewriter fonts, bright illustration assets, fixed-size panels, and fragmented styling make the app visually noisy and inconsistent with the requested calm direction. The layout has no responsive breakpoints, so fixed padding, heights, and card widths can clip or force awkward scrolling on narrow screens. Accessibility is also uneven: heading hierarchy, form labels, focus treatment, image alternatives, color contrast, and reduced-motion support need attention.

## Solution

Restyle every existing application state as a light, calm, Apple-inspired experience while preserving all current behavior. Introduce a small presentation foundation using the existing Material UI theme system and shared CSS tokens, then apply it to the application shell, input view, loader, results view, and result widgets. Use responsive layouts, system typography, neutral surfaces, a restrained blue accent, and subtle motion that respects the user's reduced-motion preference. Add characterization coverage around the existing user flow before modifying load-bearing presentation components.

## Scope

| In scope | Out of scope |
| --- | --- |
| Light visual system covering color, typography, spacing, radii, borders, shadows, icons, and motion | Dark mode or a theme switcher |
| All current states: loader, text entry, analyzed text, result cards, frequency result with and without an image, and reset flow | New screens, new analysis capabilities, or changed copy/content strategy |
| Responsive behavior for mobile, tablet, and desktop, including narrow widths around 320px | Redesigning the Redux, saga, analyzer, or factory architecture |
| Presentation-layer component cleanup and centralized Material UI overrides | React, Material UI, build-tool, test-runner, or state-management migrations |
| Semantic structure, accessible labels, focus visibility, keyboard preservation, contrast, reflow, and reduced-motion support | A pixel-for-pixel Apple clone or use of Apple's proprietary assets and branding |
| Behavior-preservation tests plus manual responsive and motion checks | Visual-regression infrastructure or a new test dependency |
| Restyling or replacing decorative in-app illustrations with existing iconography where appropriate | Browser/PWA icon and manifest rebranding |
| Recording the existing image-integration security risk | Building a backend or server-side proxy for the image API |

## Visual Direction

The app should feel quiet, spacious, polished, and approachable, drawing from Apple's website conventions without imitating a specific page. Use a light neutral page background, white or softly tinted surfaces, near-black text, muted secondary text, and one calm blue accent. Prefer the existing system font stack, generous whitespace, clear type hierarchy, thin borders, low-contrast shadows, and rounded but not pill-shaped containers.

Motion is welcome when it helps orientation. Replace the current large scale effects with short opacity and vertical-translation transitions or very small scale changes. Motion must remain subtle, avoid blocking interaction, and be disabled or minimized when `prefers-reduced-motion` is active. The design must not introduce a dark presentation or rely on decorative gloss and visual noise.

## Architecture

### Current application map

`src/index.tsx` renders `WordAnalyzerApp`, which creates the Redux store and mounts the connected `Form`. `FormViewFactory` selects either the default text-entry view or the results view; the loader is a transient third state. The results view composes the highlighted source text, Top Words, Highest Frequency Words, Frequency Calculator, and Start Again controls. User input flows through existing Redux actions and reducers; frequency calculation uses existing helpers and a saga, which may also request a third-party image.

The most load-bearing presentation paths are `src/components/Form/index.tsx`, `src/components/Form/Views/Results/index.tsx`, and `src/components/Form/Views/Results/Results.css`. They define the shared shell, the complete result composition, and styles reused across all result widgets.

### Presentation foundation

- Add one app-level Material UI v4 theme module and apply it at the application root. It owns the light palette, typography, shape, and common overrides for buttons, fields, papers, lists, and focus states.
- Define shared CSS custom properties in `src/index.css` for background, text, border, shadow, spacing, and motion values. Feature CSS remains responsible for layout rather than redefining the visual system.
- Keep React 17.0.2, Material UI 4.12.4, and Framer Motion 4.1.17. These versions were verified against their registries, and no new dependency is required.
- Retain the existing system font stack and remove active use of the decorative script/typewriter fonts. Dependency removal is optional cleanup only if it can be done without expanding the work.

### Layout and components

- Make the application shell use content-driven height with safe viewport padding and a centered maximum width, rather than relying on a fixed `100vh` presentation.
- Present the default view as a focused, responsive input surface with a clear heading, supporting text, textarea, word count, and primary action.
- Present results as a readable source-text surface followed by a responsive card grid. Cards use equal visual treatment on desktop and stack without horizontal overflow on mobile.
- Preserve existing Material UI controls and every current event handler. Presentation markup may change to improve semantics or styling, but component state, Redux actions, calculations, highlighting, and navigation remain unchanged.
- Replace misleading decorative image alternatives and provide accurate alternatives only where an image conveys content. Decorative imagery may be hidden from assistive technology or replaced with already-installed Material UI icons.

### Motion

Continue using Framer Motion for view entry. Centralize restrained timing/easing choices and use its reduced-motion support so animations collapse to an immediate or opacity-only state when requested by the operating system.

### Verification and brownfield safeguards

The current baseline is green: `CI=true npm test -- --watchAll=false` passes 4 suites and 11 tests, and `npm run build` succeeds. Only one shallow app-mount test protects the UI, so behavior-focused characterization tests must precede changes to the load-bearing form and results composition. Tests should cover text entry and Analyze enablement, transition to results, result interactions, frequency submission by button and keyboard, and Start Again. Manual visual verification covers loader, default, results, image/no-image, mobile, tablet, desktop, zoom/reflow, keyboard focus, and reduced-motion states.

### Blast radius and rollback

The visual blast radius is high because the shell and shared results CSS affect every visible state. The data-layer blast radius stays low by leaving Redux, sagas, analyzers, and the image-fetching integration untouched. Implementation should be divided into independently reversible ticket commits for characterization/foundation, default view, results view, and final verification. If a presentation change regresses behavior, its ticket commit can be reverted without rolling back the data layer.

### Security and trust boundaries

Text, word-count values, and frequency queries are untrusted user input. This restyle does not add a server boundary or change how the current client-side application parses them; UI constraints remain usability aids rather than security validation. Any presentation that renders user text must continue to rely on React escaping and must not introduce raw HTML execution.

The image response is untrusted third-party data. The current `ImageFetcher` also contains an API credential in browser-delivered code and the saga assumes an unvalidated response shape. That pre-existing design conflicts with the project's server-side-secret and response-validation defaults. This PRD does not silently expand into backend work: the integration will remain untouched, the risk is release-relevant, and a separately approved change must move the credential and API call behind a server-side boundary, encode/query user input safely, and validate the response before the project can claim compliance.

## Success Criteria

- [ ] Loader, default, results, frequency image/no-image, and reset states share one coherent light visual system.
- [ ] Every current user interaction produces the same result as before the restyle.
- [ ] The interface reflows without horizontal page scrolling or clipped controls at approximately 320px, 768px, and desktop widths.
- [ ] Typography, spacing, surfaces, controls, and motion feel calm and Apple-inspired without copying Apple branding or assets.
- [ ] The document has a meaningful `main` region and heading hierarchy; interactive fields have accessible names; keyboard focus remains visible.
- [ ] Text and interactive-control color combinations meet WCAG 2.1 AA contrast expectations, including disabled and frequency-indicator states where applicable.
- [ ] View motion is restrained and respects `prefers-reduced-motion`.
- [ ] Behavior-characterization tests cover the input-to-results-to-reset path and frequency-calculator interaction without making a live third-party request.
- [ ] All existing and newly added automated tests pass with `CI=true npm test -- --watchAll=false`.
- [ ] The production bundle compiles successfully with `npm run build`.
- [ ] No new runtime or development dependency is added.
- [ ] Manual review confirms the approved visual direction across mobile, tablet, and desktop states.

## Out of Scope

- Changing word-frequency algorithms, Redux state shape, saga behavior, or view-selection behavior.
- Adding new analysis functions, routes, screens, persistence, authentication, analytics, or localization.
- Upgrading React, Material UI, Framer Motion, Create React App, Jest, or TypeScript.
- Introducing dark mode, user-selectable themes, a new component library, or a visual-regression service.
- Replacing browser/PWA branding assets or repairing unrelated manifest metadata.
- Building the server-side image proxy required to remediate the existing exposed credential and third-party response-validation risk; this remains a separate release-relevant follow-up.
