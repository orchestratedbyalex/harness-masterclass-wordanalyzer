---
ticket: T-05
title: Verify responsive and accessible polish
status: open
size: S
depends_on: T-03, T-04
---

# T-05: Verify responsive and accessible polish

## Goal

Perform the final full-application quality pass, repair presentation defects within the approved scope, and prove that the restyle is responsive, accessible, buildable, and behavior-preserving.

## Scope

- Open the running application and inspect loader, default, results, frequency result with and without an image, and reset states.
- Check approximately 320px, 768px, and desktop viewport widths, plus short-height and zoom/reflow behavior.
- Complete keyboard-only and reduced-motion passes.
- Correct in-scope spacing, overflow, contrast, focus, typography, motion, and semantic defects found during the review.
- Strengthen existing UI tests with semantic/accessibility assertions where needed.
- Do not add a visual-regression service, dependency, new feature, dark mode, public-branding work, or image-API remediation.

## Acceptance Criteria

- [ ] Every current application state was opened and visually reviewed rather than assessed from source alone.
- [ ] The approved light, calm, Apple-inspired direction is consistent across the full application.
- [ ] No horizontal page scrolling, clipped control, overlapping content, or inaccessible internal scroll region appears at the target widths.
- [ ] The complete flow works with keyboard input and has visible focus indicators.
- [ ] Reduced-motion mode removes or minimizes nonessential movement without hiding content.
- [ ] Heading hierarchy, landmarks, accessible names, image alternatives, and interactive relationships are coherent.
- [ ] Text, controls, badges, focus indicators, and disabled states meet applicable WCAG 2.1 AA contrast expectations.
- [ ] Empty source text, unsupported frequency text, and out-of-range Top Words values remain stable and follow the reject behavior defined in earlier tickets.
- [ ] No live third-party request is made by automated tests.
- [ ] No new dependency or lockfile change is introduced.
- [ ] All automated tests pass and the production build succeeds.
- [ ] Known image-integration security debt remains documented and is not presented as resolved.

## Verification

```bash
git diff --check
git diff --exit-code HEAD -- package.json package-lock.json yarn.lock
CI=true npm test -- --watchAll=false
npm run build
```

## Notes

Manual visual checks are acceptance work; the non-interactive verification block remains the reproducible completion receipt. Record any scope cut in the PRD's Out of Scope section before marking this ticket done.
