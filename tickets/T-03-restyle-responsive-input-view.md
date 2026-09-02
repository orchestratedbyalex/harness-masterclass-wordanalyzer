---
ticket: T-03
title: Restyle the responsive input view
status: open
size: S
depends_on: T-02
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

- [ ] The input view uses a calm light surface, clear hierarchy, generous spacing, and the shared component treatment.
- [ ] The textarea and Analyze action fit without horizontal page scrolling at approximately 320px, 768px, and desktop widths.
- [ ] Text entry, word counting, and navigation to results behave exactly as characterized in T-01.
- [ ] Empty or whitespace-only text leaves Analyze disabled and the user on the input view.
- [ ] The textarea has an accessible name and the word count is announced without interrupting typing.
- [ ] Keyboard focus is clearly visible on the input and Analyze action.
- [ ] Entry motion is subtle and respects `prefers-reduced-motion`.
- [ ] No Redux, analyzer, or action logic changes.
- [ ] Automated tests and the production build pass.

## Verification

```bash
rg -q 'useReducedMotion' src/components/Form/Views/Default/index.tsx
CI=true npm test -- --watchAll=false
npm run build
```

## Notes

Client-side constraints are usability behavior, not a security boundary. Do not introduce raw HTML rendering for user-entered text.
