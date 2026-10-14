# wordAnalyzer

## Systems: where work happens vs. where its record lives

The only repository is `orchestratedbyalex/harness-masterclass-wordanalyzer` (git remote `origin`); its main branch is `main`. Ignore any other copies of this project.

| Activity | Where work happens | Where the record lives |
|---|---|---|
| Defining a task | A Claude Code conversation in this project folder | GitHub ticket |
| Writing code | Locally, in this project folder | Local git commits, plus a pull request that links back to the ticket |
| Running tests and checks | Locally | Pull request body: say what was run and the result |
| Reviewing and merging | GitHub | The pull request; merging closes the linked ticket (use `Closes #N`) |
| Building and deploying | GitHub Actions (`.github/workflows/deploy-pages.yml`), on every push to `main` | GitHub Pages at https://orchestratedbyalex.github.io/harness-masterclass-wordanalyzer/; deploy history in the Actions tab |

A conversation is where a task gets worked out, not its record — write the outcome into the ticket.

## Handoffs

- **Starting a session:** before asking for context, read the open tickets and their comments, then say in two or three lines where things stand. No open ticket means no work in progress.
- **Opening a ticket:** as soon as a request becomes a task, open a short ticket with the request and a first "Done when"; fill in the scope as it firms up.
- **Logging decisions:** when a decision in the conversation changes scope or direction (e.g. making the repo public, adding work, leaving a follow-up open), add a one-line comment to the ticket: decision, why, and any open follow-up. Small choices stay in the conversation. Never put a secret in a comment; the repo is public.
- **Before merging:** the summary given in the conversation is also the pull request body, word for word: what changed, tests run and their result, anything to decide or know, and `Closes #N`. Point to the ticket instead of restating its scope. Commit messages don't repeat test results.

## Pipeline and its artifacts

Only the user and Claude use these artifacts.

| Stage | Handoff artifact | Used by | Lives in |
|---|---|---|---|
| Start a session | Open tickets and their comments | Claude | GitHub issues |
| Request | The user's message | Claude | The conversation |
| Define | Short ticket with a first "Done when" | Both | GitHub issue |
| Decide | One-line comment for a scope or direction change | Both | GitHub issue |
| Build and test | Commits (no test results) | Claude | Git history |
| Hand over | Summary in the conversation, also the PR body (tests, warnings, `Closes #N`) | The user | The conversation and the pull request |
| Approve | "merge PR #N" | Claude | The conversation |
| Deploy | Merge commit, then the workflow run | GitHub Actions | Actions tab |
| Verify | The live site, opened by the user | The user | The Pages URL |
| Secrets | Pixabay key | The app, locally | The user's Pixabay account, copied into `.env.local` |

## Secrets

- The Pixabay API key lives only in `.env.local` (gitignored) as `REACT_APP_PIXABAY_API_KEY`. `.env.example` names it; never commit a value.
- Create React App embeds `REACT_APP_*` values into the bundle, so the Pages build runs without the key and the app shows no word images there.

## Commands

- `pnpm install`, `pnpm start`, `pnpm build` (output in `build/`, gitignored)
- `CI=true pnpm test` runs the tests once; plain `pnpm test` starts watch mode.
