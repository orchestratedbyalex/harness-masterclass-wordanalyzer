# wordAnalyzer

## Systems: where work happens vs. where its record lives

The only repository is `orchestratedbyalex/harness-masterclass-wordanalyzer` (git remote `origin`); its main branch is `main`. Ignore any other copies of this project.

| Activity | Where work happens | Where the record lives |
|---|---|---|
| Defining a task | A Claude Code conversation in this project folder | GitHub ticket |
| Writing code | Locally, in this project folder | Local git commits, plus a pull request that links back to the ticket |
| Running tests and checks | Locally | Commit message: say what was run and the result |
| Reviewing and merging | GitHub | The pull request; merging closes the linked ticket (use `Closes #N`) |
| Building and deploying | GitHub Actions (`.github/workflows/deploy-pages.yml`), on every push to `main` | GitHub Pages at https://orchestratedbyalex.github.io/harness-masterclass-wordanalyzer/; deploy history in the Actions tab |

A conversation is where a task gets worked out, not its record — write the outcome into the ticket.

## Secrets

- The Pixabay API key lives only in `.env.local` (gitignored) as `REACT_APP_PIXABAY_API_KEY`. `.env.example` names it; never commit a value.
- Create React App embeds `REACT_APP_*` values into the bundle, so the Pages build runs without the key and the app shows no word images there.

## Commands

- `pnpm install`, `pnpm start`, `pnpm build` (output in `build/`, gitignored)
- `CI=true pnpm test` runs the tests once; plain `pnpm test` starts watch mode.
