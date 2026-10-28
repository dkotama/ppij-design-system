# Tasks

One batch = one sitting. Execution is by Momo in person (owner instruction
2026-10-28: do not assign workers for this design work). Batches land in
order; each closes on its own proof, green on a clean tree. Every UI batch runs Impeccable with its full
setup: context launcher once per session, the named command playbook, and
craft-floor read before any UI edit; polish, then audit before the batch
verdict. Batches 2 and 4 run the `document` and `extract` playbooks; batch 9
runs `shape` before promoting patterns.

## Batch 1 — Tooling baseline

- [x] Replace the Makefile TODO targets with real build, lint, and test commands (tokens generate, tsc, eslint + prettier, Vitest, Storybook build) and a real dev target
- [x] Run scripts/gate.sh green on a clean tree with the new stages

Proof: `scripts/gate.sh` prints ALL PASS on a clean tree.

## Batch 2 — Tokens

- [x] Extract tokens from ppij-identity-sso `web/src/styles/global.css` into `tokens/tokens.json` with primitive and semantic layers (Impeccable `document`, scan mode)
- [x] Generate `tokens/tokens.css` from tokens.json, keeping today's variable names, and add the parity check to the gate

Proof: parity check in gate; both files render the PPIJ palette in a scratch HTML page.

## Batch 3 — Brand seed

- [x] Seed brand/ with the logo (from ppij-identity-sso `web/public/ppij-logo.png`), palette, typography, and usage rules (Tabler icons only, language-switch rule, admin-equals-portal typography)

Proof: brand/ assets and rules committed; Colors and Typography facts match tokens.json values.

## Batch 4 — Storybook shell

- [x] Set up @storybook/react-vite with Public, Portal, Admin groups
- [x] Add phone (390x844) and 1440px desktop viewport presets
- [x] Stub the Docs pages: Introduction, Brand, Colors, Typography, Guidelines

Proof: Storybook builds in the gate; the three groups and two viewport presets exist; preview imports tokens.css.

## Batch 5 — Portal atoms, wave 1 (forms)

- [ ] Extract button, input, label, select, badge, avatar, and separator from ppij-identity-sso ui/ into packages/ui with stories and their applicable states

Proof: seven components, each with a default story, render in the Portal group; gate story check passes.

## Batch 6 — Portal atoms, wave 2 (feedback and containers)

- [ ] Extract card, alert, skeleton, spinner, saving-indicator, tooltip, and scroll-area with stories and their applicable states

Proof: seven more components with stories in the Portal group; gate story check passes.

## Batch 7 — Overlays, navigation, and data atoms, wave 3

- [ ] Extract drawer, sheet, dropdown-menu, tabs, table, sidebar, and the admin-drawer basis with stories and their applicable states

Proof: seven more components with stories (Sidebar and drawer family under Admin); gate story check passes.

## Batch 8 — Empty component

- [ ] Add the missing Empty component (icon slot, title, description, optional action) with a story

Proof: Empty renders in stories showing default and with-action states.

## Batch 9 — Promoted patterns

- [ ] Promote PageHeader (Admin) with stories (Impeccable `shape` first)
- [ ] Promote the DataTable presentation shell (Admin) with stories including empty and long text
- [ ] Promote the wide Drawer pattern (Admin): admin-drawer generalized, locale strings as props
- [ ] Promote FormPanel (Portal) with stories

Proof: four pattern components with stories in their surface groups; no import from the source app remains.

## Batch 10 — Package

- [ ] Configure the one npm package `ppij-design-system` at packages/ui with the root, tokens.css, and tokens.json exports and the assembled dist
- [ ] Prove a clean consumer install: pack the tarball, install into a scratch app with no credentials, import all three exports, render a component

Proof: scratch consumer renders; `npm pack` contents show dist components plus both token files; no GitHub Packages anywhere.

## Batch 11 — Guideline Docs content

- [ ] Write the Introduction, Brand, Colors, and Typography Docs pages from brand/ and tokens/
- [ ] Carry the component guidelines from ppij-identity-sso `design/1.0.6/guideline.md` into the Guidelines Docs page, adapted to library context

Proof: Docs pages render in the Storybook build; the carried rules (surface rule, feedback table, loading vocabulary, icon and language rules) are present.

## Batch 12 — GitHub Pages publish

- [ ] Publish the static Storybook to GitHub Pages from CI on tag or release, with the correct base path and no login

Proof: workflow file committed; the deployed site at `https://ppij-dev.github.io/ppij-design-system/` shows Docs pages and stories.

## Batch 13 — Release train

- [ ] Wire VERSION as the single version source, add CHANGELOG.md, tag `v<version>`, attach the GitHub release tarball, and write the owner npm publish runbook

Proof: a dry-run release produces the tag and tarball; the runbook documents the owner publish step.
