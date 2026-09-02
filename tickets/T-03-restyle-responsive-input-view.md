---
ticket: T-03
title: Restyle the responsive input view
status: done
size: S
depends_on: T-02
started: 2026-09-02T13:52:50Z
verified: 2026-09-02T13:54:07Z edd832d93275
finished: 2026-09-02T13:54:36Z
---

# T-03: Restyle the responsive input view

## Goal

Turn the default text-entry state into a focused, accessible, responsive surface that follows the approved calm visual direction without altering its text or navigation behavior.

## Scope

- Restyle `DefaultView`, `TextInput`, and their CSS using the shared theme and tokens.
- Use clear supporting text, a comfortable textarea, a quiet word counter, and a visually consistent primary Analyze action.
- Replace the current large scale-in effect with restrained entry motion.
- Use Framer Motion's reduced-motion signal so the entry effect collapses appropriately for users who request less motion.
- Preserve the connected/uncontrolled input behavior, word counting, Redux dispatch, and Analyze enablement logic.
- Add or refine accessible names, descriptions, live-region behavior, and focus treatment without changing valid input behavior.

## Acceptance Criteria

- [x] The input view uses a calm light surface, clear hierarchy, generous spacing, and the shared component treatment.
- [x] The textarea and Analyze action fit without horizontal page scrolling at approximately 320px, 768px, and desktop widths.
- [x] Text entry, word counting, and navigation to results behave exactly as characterized in T-01.
- [x] Empty or whitespace-only text leaves Analyze disabled and the user on the input view.
- [x] The textarea has an accessible name and the word count is announced without interrupting typing.
- [x] Keyboard focus is clearly visible on the input and Analyze action.
- [x] Entry motion is subtle and respects `prefers-reduced-motion`.
- [x] No Redux, analyzer, or action logic changes.
- [x] Automated tests and the production build pass.

## Verification

```bash
rg -q 'useReducedMotion' src/components/Form/Views/Default/index.tsx
CI=true npm test -- --watchAll=false
npm run build
```

## Notes

Client-side constraints are usability behavior, not a security boundary. Do not introduce raw HTML rendering for user-entered text.
