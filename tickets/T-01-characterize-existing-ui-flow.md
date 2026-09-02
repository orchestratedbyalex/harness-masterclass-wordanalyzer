---
ticket: T-01
title: Characterize the existing UI flow
status: done
size: M
depends_on: none
started: 2026-09-02T13:44:42Z
verified: 2026-09-02T13:46:53Z e47390009486
finished: 2026-09-02T13:47:40Z
---

# T-01: Characterize the existing UI flow

## Goal

Create the brownfield walking skeleton by pinning the current end-to-end user journey before any load-bearing presentation component is changed. Establish the repository's environment-file safety scaffold without introducing or relocating any secret.

## Scope

- Add `src/WordAnalyzerApp.integration.test.tsx` using the testing packages already installed in the project.
- Exercise the application through its real Redux store from text entry to results and back to the default view.
- Characterize result interactions, including selecting a listed word and submitting a frequency query with both the button and keyboard.
- Mock the third-party image request so the suite is deterministic and never sends a live request.
- Add `.env.example` documenting that the restyle introduces no required environment variables.
- Confirm `.gitignore` continues to ignore `.env` and `.env.*` while allowing `.env.example`.
- Do not change production source code in this ticket.

## Acceptance Criteria

- [x] A valid text entry enables Analyze, opens the results view, and Start Again returns to an empty default view.
- [x] Clicking a result word and submitting a frequency query preserve the current highlighting/calculation behavior.
- [x] Pressing Enter in the frequency field follows the same path as its submit button.
- [x] Empty or whitespace-only source text keeps Analyze disabled and cannot navigate to results.
- [x] An empty/non-letter frequency query does not make a live third-party request and does not crash the view.
- [x] All third-party requests are mocked in the integration test.
- [x] `.env.example` exists, states that this restyle requires no environment variables, and contains no credential value.
- [x] `.gitignore` ignores `.env` and `.env.*` but explicitly permits `.env.example`.
- [x] Existing production files remain unchanged in this ticket.
- [x] The complete automated test suite passes.

## Verification

```bash
test -f src/WordAnalyzerApp.integration.test.tsx
test -f .env.example
rg -Fxq '.env' .gitignore
rg -Fxq '.env.*' .gitignore
rg -Fxq '!.env.example' .gitignore
CI=true npm test -- --watchAll=false
```

## Notes

This is the walking skeleton for a brownfield application: the product already runs, so the first safe end-to-end slice is executable characterization coverage. Do not expose or migrate the existing browser-delivered image API credential as part of this ticket.
