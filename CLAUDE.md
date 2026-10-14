# wordAnalyzer

## Harness agreement — orchestratedbyalex + Claude · wordAnalyzer

Read this before starting work; the sections below give the detail.

### 1 Systems
- **Repo:** `orchestratedbyalex/harness-masterclass-wordanalyzer`, branch `main`. Ignore every other copy.
- **Define:** in a Claude Code conversation, recorded as a GitHub ticket.
- **Build and test:** locally, recorded in commits, the PR and the CI check.
- **Approve:** in the conversation, recorded in the PR.
- **Deploy:** GitHub Actions to Pages on every push to `main`.
- **Secrets:** the Pixabay key exists only in `.env.local`, so Pages shows no images.

### 2 Current pipeline
Read the open tickets → request → ticket with "Done when" (agreed before work starts) → branch → build and test locally → summary and OK to push → PR with CI → "merge PR #N" → deploy → check the live site → acceptance recorded on the ticket.

### 3 Handoff artifacts
- **Ticket:** written from [`templates/ticket.md`](templates/ticket.md); finished example: #11. Reuse of the template is not yet tested on a second ticket.
- **Decision comments:** only for changes to scope or direction.
- **Commits:** no test lines.
- **Summary:** shown in the conversation and used as the PR body (changes, tests, warnings, `Closes #N`).
- **CI check**, **"merge PR #N"**, **deploy run**, **live site**.

### 4 Simplify
- Open the ticket early and log only the decisions that matter.
- Write the summary once and use it in both the conversation and the PR.
- Test results go in the PR, not in commits.
- Each session starts from the open tickets.
- Merging and the live-site check stay as they are.

### 5 Responsibility
- **The user decides:** what to ask for, agreeing the "Done when", scope and direction, pushing, merging, accepting the live site, what to do after a failed deploy, the key, the rules.
- **Claude does:** opens tickets from the user's request and keeps them current, makes and logs technical decisions, commits locally, writes the summary, merges on the user's word if the PR is unchanged, watches deploys, checks the site when the UI changed.

### 6 Repo
- **People:** one person, one Claude session at a time.
- **Branches:** one per ticket, `type/N-short-name`, branched from `main`.
- **Checks:** local tests plus CI on every PR.
- **`main`:** a ruleset requires a PR and a green check. Only the user may bypass it.
- **Merging:** merge commits only; branches auto-delete on merge.
- **Identity:** `orchestratedbyalex`.

## Systems: where work happens vs. where its record lives

The only repository is `orchestratedbyalex/harness-masterclass-wordanalyzer` (git remote `origin`); its main branch is `main`. Ignore any other copies of this project.

| Activity | Where work happens | Where the record lives |
|---|---|---|
| Defining a task | A Claude Code conversation in this project folder | GitHub ticket, opened by Claude from the user's request |
| Writing code | Locally, in this project folder | Local git commits, plus a pull request that links back to the ticket |
| Running tests and checks | Locally, then GitHub Actions (`.github/workflows/ci.yml`) on every pull request | Pull request body for the local run; the CI check on the pull request |
| Reviewing and merging | The conversation: the user approves from the summary, then Claude merges | The pull request; merging closes the linked ticket (use `Closes #N`) |
| Building and deploying | GitHub Actions (`.github/workflows/deploy-pages.yml`), on every push to `main` | GitHub Pages at https://orchestratedbyalex.github.io/harness-masterclass-wordanalyzer/; deploy history in the Actions tab |

A conversation is where a task gets worked out, not its record — write the outcome into the ticket.

## Handoffs

- **Starting a session:** before asking for context, read the open tickets and their comments, then say in two or three lines where things stand. No open ticket means no work in progress.
- **Opening a ticket:** Claude opens the ticket from the user's request, using [`templates/ticket.md`](templates/ticket.md), with a first "Done when". Work starts once the user has explicitly agreed the "Done when"; Claude then records it on the ticket's "Done when agreed" line and fills in the scope as it firms up.
- **Logging decisions:** decisions that change scope or direction are the user's; Claude lays out the options and waits. Claude may decide technical direction itself (e.g. fixing a bug found on the way). Either way, Claude posts a one-line comment on the ticket without asking: decision, why, and any open follow-up. Small choices stay in the conversation. Never put a secret in a comment; the repo is public.
- **Committing and pushing:** Claude may commit on a feature branch without asking, never directly on `main`. Ask before pushing.
- **Before merging:** the summary given in the conversation is also the pull request body, word for word: what changed, tests run and their result, anything to decide or know, and `Closes #N`. Point to the ticket instead of restating its scope. Commit messages don't repeat test results. One OK from the user covers pushing and opening the PR. If the work changes afterwards, Claude updates the PR body and posts the new summary in the conversation; each further push still needs an OK.
- **Merging:** on "merge PR #N", Claude merges only if the PR is still at the commit that was summarised (`--match-head-commit`).
- **After merging:** Claude watches the deploy run and reports the result. If it fails, Claude reads the logs and explains the cause; the user decides what happens, and a fix starts with a new ticket. If the change affects the site, Claude checks it in a browser before the user looks. When the user says the live site is fine, Claude comments "Accepted on the live site" on the closed ticket.
- **Changing these rules:** when practice and a rule here differ, Claude points it out; the user decides, and the edit goes through a ticket and PR. Rules live only in this file, not in Claude's memory.

## Git practices

One person (the user) works in this repo, with one Claude session at a time.

- **Separating work:** one branch per ticket, named `type/N-short-name` (e.g. `docs/7-fill-artifact-roles`), branched from `main`. One ticket in progress at a time.
- **Identity:** commits use `orchestratedbyalex <88491491+orchestratedbyalex@users.noreply.github.com>`, set in this repo's git config.
- **Checking changes:** Claude runs `CI=true pnpm test` locally before pushing. The CI workflow runs the tests and the build on every pull request.
- **Protecting `main`:** a GitHub ruleset blocks direct pushes to `main` and requires the CI check to pass before merging. Only the user may use the admin bypass; Claude never does, even though `gh` runs as the user.
- **Integrating:** pull requests are merged with a merge commit; squash and rebase merging are turned off.
- **Cleanup:** GitHub deletes the branch on merge; Claude then deletes the local branch and prunes without asking.

## Who creates, keeps current and accepts each artifact

| Artifact | Creates | Keeps current | Accepts |
|---|---|---|---|
| Ticket and "Done when" | Claude, from the user's request, using `templates/ticket.md` | Claude | The user, explicitly agreeing the "Done when" before work starts |
| Decision comment | Claude, without asking | Claude | The user decides scope and direction; Claude may decide technical direction |
| Commits | Claude, on a feature branch | Claude, until pushed | Local tests pass, then the user approves the merge |
| Summary / PR body | Claude; one user OK to push and open the PR | Claude, re-posting the summary in the conversation | The user, by approving the merge |
| Approval ("merge PR #N") | The user | Not applicable: if the PR changes, the user gives a new approval | Claude, by checking the PR is unchanged since the summary |
| Deploy run | GitHub Actions | Claude watches and reports | Claude, on success; the user, on failure |
| Live site | The deploy | Claude keeps it working and raises problems; fixes start with a new ticket | The user, by opening it; Claude records the acceptance on the ticket |
| Pixabay key | The user, in their Pixabay account | The user or Claude may write a value the user gives into `.env.local` | The user |
| `CLAUDE.md` | Claude drafts, after the user decides | Claude flags drift | The user, by approving the merge |

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

- The Pixabay API key lives only in `.env.local` (gitignored) as `REACT_APP_PIXABAY_API_KEY`. `.env.example` names it; never commit a value, and never repeat it outside `.env.local`.
- Create React App embeds `REACT_APP_*` values into the bundle, so the Pages build runs without the key and the app shows no word images there.
- An old key is still in the public git history. The user accepted the risk and won't rotate it (#5).

## Commands

- `pnpm install`, `pnpm start`, `pnpm build` (output in `build/`, gitignored)
- `CI=true pnpm test` runs the tests once; plain `pnpm test` starts watch mode.
