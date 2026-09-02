---
ticket: T-04
title: Restyle results and frequency tools
status: open
size: M
depends_on: T-03
---

# T-04: Restyle results and frequency tools

## Goal

Modernize the complete results state as a readable source-text surface and responsive card grid while preserving highlighting, ranking, frequency calculation, optional imagery, and reset behavior.

## Scope

- Restyle the results shell, highlighted text surface, Top Words, Highest Frequency Words, Frequency Calculator, result display, and Start Again action.
- Replace fixed widths/heights and shared overflow constraints with a responsive grid that stacks cleanly on narrow screens.
- Apply consistent surface, header, divider, list, badge, input, and button treatment from the shared theme.
- Calm the frequency color palette while keeping text/badge contrast accessible.
- Replace or reframe decorative in-app illustrations using iconography already installed in the project; do not change public/PWA branding.
- Correct missing accessible labels, mismatched `aria-labelledby` relationships, heading structure, and misleading decorative image alternatives.
- Replace the current results pulse with restrained motion that respects reduced-motion preferences.
- Preserve all existing event handlers, Redux actions, analyzer calls, highlighting rules, case sensitivity, image/no-image display, and Start Again behavior.
- Do not modify the image-fetching module, credential handling, third-party API contract, or saga response assumptions in this visual ticket.

## Acceptance Criteria

- [ ] Highlighted source text and all three result tools have a coherent, calm card treatment.
- [ ] Result cards form a balanced grid on desktop and a readable single column around 320px without horizontal page scrolling or clipped controls.
- [ ] Top Words count, Highest Frequency Words, list selection, highlighting, button submission, Enter submission, optional image display, and Start Again behave as characterized.
- [ ] A Top Words count outside the supported 1–100 range is rejected or clamped before analysis and cannot trigger unbounded output or a rendering error.
- [ ] A frequency query containing only unsupported characters resolves to an empty value, makes no third-party request, and leaves the view stable.
- [ ] Every input and interactive list has a correct accessible name/relationship, and keyboard focus remains visible.
- [ ] Badge and control colors meet WCAG 2.1 AA contrast expectations where applicable.
- [ ] Decorative images are hidden from assistive technology; content-bearing images have accurate alternatives.
- [ ] Results entry motion is subtle and respects `prefers-reduced-motion`.
- [ ] No backend, Redux, saga, analyzer, dependency, or public-branding changes are introduced.
- [ ] Automated tests and the production build pass without a live third-party request.

## Verification

```bash
rg -q '@media' src/components/Form/Views/Results/Results.css
rg -q 'useReducedMotion' src/components/Form/Views/Results/index.tsx
CI=true npm test -- --watchAll=false
npm run build
```

## Notes

The hard-coded browser credential and unvalidated third-party response remain an explicit release risk from the PRD. Do not expand this ticket into backend work.
