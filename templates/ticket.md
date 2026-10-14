<!-- Template for a work ticket. Copy into a new GitHub issue and replace every <prompt>.
     Example of a finished ticket: #11. -->

Request: <one sentence: what should change, for whom. Point to the file(s) involved.>

## Who reads this

- **The agent that builds it:** a Claude session that wasn't in the conversation where this was decided. Using this ticket, its comments (the decision log), the repo and `CLAUDE.md`, build and test the work and come back with the pre-merge summary <and a local preview link, if the change is visible>. Ask the user only if something truly blocks. Anything not listed under "Decisions so far" is not decided: flag it in the summary instead of choosing it.
- **Then the user:** <how the user judges the result>.

## Decisions so far

- **<Topic>:** <what the user decided>.

<!-- Cover what the change touches next to it: how it appears and transitions,
     what happens to neighbouring elements, which devices, accessibility settings. -->

## Requirements

- <Testable statement that must hold, e.g. what must keep working.>

## Open questions

- <Undecided point and whose decision it is> — or "None."

## Known constraints (from the code)

- <Fact the builder would otherwise have to discover, with a file pointer. Link to the file instead of copying it.>

## How the user checks

- Before merging: <e.g. local preview at http://localhost:3000/harness-masterclass-wordanalyzer/ (`pnpm start`; the Pages subpath applies locally too)>.
- After merging: <e.g. the live site>.

## Done when

- <What the user checks to accept the work.>

"Done when" agreed by the user: <yes, date — or "not yet">
