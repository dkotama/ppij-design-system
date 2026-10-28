# Design

## Context

The repo is a public scaffold: `brand/`, `tokens/`, `packages/ui/`, Storybook,
and guidelines are all still empty placeholders, and the Makefile targets echo
TODO. The proven material lives in `ppij-identity-sso`:

- `web/src/components/ui/`: 21 shadcn/ui components (admin-drawer, alert,
  avatar, badge, button, card, drawer, dropdown-menu, input, label,
  saving-indicator, scroll-area, select, separator, sheet, sidebar, skeleton,
  spinner, table, tabs, tooltip)
- `web/src/styles/global.css`: Tailwind v4 `@theme`, 5 brand primitives
  (red `#C8102E`, ink, muted, border, bg), the full shadcn semantic layer plus
  the sidebar family, `--radius: 0.625rem`, Plus Jakarta Sans + Noto Sans JP
- `design/1.0.6/guideline.md` + `agent-map.md`: the current guideline book
  (surface rules, feedback/alert tables, loading vocabulary, wizard
  compositions, responsive contract)
- Proven patterns worth promoting: `design-system/FormPanel.tsx` (white form
  panel), `ui/admin-drawer.tsx` (wide drawer: right side ≥900px, bottom below;
  note it imports the app-local `@/i18n` and must shed it), and the recurring
  admin screen shapes (page header block, Table-based directory)
- `design/1.0.6/email/` and `web/public/ppij-logo.png`: brand and email assets

Owner decisions already locked (design brief, 2026-10-28): one npm package
named `ppij-design-system`; install anonymously from the public GitHub repo
until the first npm publish; GitHub Packages is not used; the guideline lives
as Storybook Docs pages published to GitHub Pages. This design only decides
how; see proposal.md for why and specs/design-system for the binding rules.

Impeccable discipline for the build batches (context launcher per session,
named command playbook, craft-floor before any UI edit, polish + audit as the
closing pass) is encoded in tasks.md as batch gates. The first batches run the
`document` playbook (scan mode: extract tokens from global.css) and the
`extract` playbook (only patterns proven by 3+ uses; primitive vs semantic
layers; migration + documentation steps), then `shape` for the promoted
patterns.

## Goals / Non-Goals

**Goals:**

- Token format and package layout that make the npm package the single
  delivery vehicle for components, tokens.css, and tokens.json
- An extraction plan from ppij-identity-sso that preserves proven visuals and
  drops application-only dependencies
- A Storybook structure (Public / Portal / Admin, phone + 1440px desktop)
  that doubles as the published guideline site
- A publish and version method that works before and after the first npm
  publish, without GitHub Packages
- Batches small enough that one sitting finishes one at a time (Momo in person, no workers), each with its
  own proof in the gate

**Non-Goals:**

- No application integration: ppij-identity-sso keeps its own copies until a
  later, separate migration change consumes the package
- No dark theme, no new visual world, no restyle of extracted components
- No email redesign: email keeps its inline styles; it later reads token
  values from tokens.json only
- No CI-held npm credentials; npm publishing stays an owner release step

## Decisions

### D1. Repository and package layout: npm workspaces, package at `packages/ui`

The repo root stays a private npm workspace root that hosts dev tooling
(Tailwind v4, Storybook, Vitest, TypeScript). The published package lives at
`packages/ui` with `name: "ppij-design-system"`. Its build compiles
`packages/ui/src` to `packages/ui/dist` and copies `tokens/tokens.css` and
`tokens/tokens.json` into `packages/ui/dist`, so the package is
self-contained:

- `ppij-design-system` → root export (components, from `dist/index.js`)
- `ppij-design-system/tokens.css` → `dist/tokens.css`
- `ppij-design-system/tokens.json` → `dist/tokens.json`

A `prepublishOnly` hook runs the build before an npm publish, and a `prepare`
hook runs the same build for git installs (npm runs `prepare`, not
`prepublishOnly`, for `github:` dependencies, so the anonymous GitHub route
in D2 would otherwise ship no `dist`). The consumer-install proof (D2)
packs and installs the tarball, which exercises the exact publish path.

Alternatives considered: publishing from the repo root (rejected: couples the
published dependency surface to dev tooling deps); a copy-into-app model
(prohibited by the no-copy rule). React 19 is a peer dependency; component
runtime deps (Radix, Tabler, `clsx`/`tailwind-merge`) are regular
dependencies. Components stay Astro friendly: no module-level browser access,
no required context providers, server-render safe.

### D2. Install routes: public GitHub before npm publish, npmjs after

- Before the first npm publish, consumers install anonymously from the public
  GitHub repo: `npm install github:ppij-dev/ppij-design-system#v<version>`,
  or the GitHub release tarball. This needs no token because the repo is
  public. GitHub Packages is not used: it requires a token even for public
  packages, which breaks anonymous agent installs.
- After the owner's first publish, consumers install `ppij-design-system`
  from npmjs. Publishing is a manual owner release step (D9); CI never holds
  an npm token.

Proof for both routes: Batch 10 installs the packed tarball into a scratch
consumer app, imports the root export, `tokens.css`, and `tokens.json`, and
renders a component.

### D3. Token format: tokens.json is the source, tokens.css is generated

- `tokens/tokens.json` is the canonical, framework-free token source: one JSON
  document with two layers, `primitive` (brand-red, brand-ink, brand-muted,
  brand-border, brand-bg, white, surface greys, radius base, font families)
  and `semantic` (background, foreground, card, popover, primary, secondary,
  muted, accent, destructive, border, input, ring, and the sidebar family),
  each a flat `name → value` map (hex colors, rem lengths, font stacks).
  Deliberately not W3C DTCG: no tooling in any consumer stack needs it yet,
  and a flat map is consumable from Python (Keycloak, email) with zero deps.
- `tokens/tokens.css` is generated from tokens.json. It keeps today's CSS
  variable names (`--brand-*`, the shadcn `--background` family, `--radius`
  with its derived `--radius-sm/md/lg/xl`) for continuity with extracted
  components, plus the Tailwind v4 `@theme inline` block mapping tokens to
  utility names. `@theme` is inert in plain CSS and active when the consumer
  compiles with Tailwind v4 — one file serves both worlds and keeps the export
  count at three.
- A generated-parity check (every CSS value equals its JSON counterpart) runs
  in the gate so the two files cannot drift.
- Font binaries are not shipped: tokens record the stacks (Plus Jakarta Sans,
  Noto Sans JP); the Typography guideline documents loading them (Google
  Fonts or self-host) as a consumer concern. Keeps the package lean and
  license-clean.

Alternatives considered: hand-maintained CSS with JSON as a mirror (rejected:
drift); DTCG format (rejected for now, revisit if a consumer needs it);
shipping fonts in the package (rejected: size and licensing).

### D4. Extraction plan from ppij-identity-sso (the `extract` playbook input)

Rules: extract only what is proven (all 21 atoms are in production use; the
promoted patterns recur across admin/portal screens); keep proven visual
behavior pixel-faithful; drop application-only dependencies — the promoted
wide Drawer sheds its `@/i18n` import and takes strings as props; no API
clients, routing, or app state enter the package.

Waves (one batch each, one sitting at a time):

1. Forms and atoms: button, input, label, select, badge, avatar, separator
2. Feedback and containers: card, alert, skeleton, spinner, saving-indicator,
   tooltip, scroll-area
3. Overlays, navigation, data: drawer, sheet, dropdown-menu, tabs, table,
   sidebar (plus the admin-drawer basis used by D5's promotion)

New and promoted (after the waves): the missing `Empty` component (icon slot,
title, description, optional action) and the pattern promotions in D5. Each
extracted component keeps its public shadcn API so consumer muscle memory and
the 1.0.6 guideline text stay valid.

### D5. Promoted patterns: PageHeader, DataTable shell, wide Drawer, FormPanel

- `PageHeader` (Admin): the recurring admin screen header block (title,
  description, primary action slot), extracted from the admin screens.
- `DataTable` presentation shell (Admin): Table atoms composed with the
  directory conventions (header row, row states, overflow behavior) as a
  presentation-only shell — sorting/pagination hooks stay app-side; the shell
  takes plain data props.
- Wide `Drawer` pattern (Admin): `ui/admin-drawer.tsx` generalized — right
  side ≥900px, bottom below, step + footer behavior, locale strings replaced
  by props, focus-return behavior preserved.
- `FormPanel` (Portal): the white form panel from
  `design-system/FormPanel.tsx` (CardHeader/Content/Footer inset rules),
  already app-free except the `cn` util.

Each promotion lands with stories in its surface group and an Impeccable
`shape` pass recorded in the batch. All four follow the same boundary rules as
D4.

### D6. Storybook: three surface groups, Docs pages, two viewports

- Groups: exactly `Public`, `Portal`, `Admin` as the component groups, plus
  top-level Docs pages: `Introduction`, `Brand`, `Colors`, `Typography`,
  `Guidelines`. Each component has exactly one canonical story home; shared
  atoms (extracted from the portal/admin web app) live under `Portal` and
  serve all surfaces — the Introduction page states this rule so nobody reads
  the group as an ownership fence. Surface-specific compositions (promoted
  patterns, Sidebar) live under `Admin`; brand and public-site presentation
  under `Public`.
  Alternatives considered: a fourth `Foundations` group (rejected: the owner
  mandated three groups); per-surface story duplicates (rejected: one story
  per component is a gate-checkable invariant).
- Viewports: `phone` (390×844) and `desktop` (1440×900) presets, applied
  globally; stories that matter at 320px width are noted in their story.
- Every story renders against the tokens (tokens.css imported by
  `.storybook/preview`), so the Storybook is itself the first consumer and the
  visual proof that tokens.css works.

### D7. Story state coverage

Every component's stories cover, where the state applies to that component:
default, loading, empty, error, disabled, long text. Applicability is decided
per component and recorded in the story file (e.g., Button: default, loading,
disabled, long text; Table: default, empty, loading, long text; a Button
empty story is meaningless and is not forced). The gate checks that each
component has at least a default story; the state matrix is reviewed in the
batch proof, not policed by a lint rule.

### D8. Icons and language rule

Tabler icons only (`@tabler/icons-react`); no text glyphs as icons (check
marks, crosses, arrows as characters are rejected in review); no second icon
family. The guideline carries the decided language-switch rule (quiet text
action or labelled menu, never isolated boxed EN/ID codes) and the
admin-equals-portal typography rule, both carried verbatim from the 1.0.6
guideline into the Guidelines Docs page.

### D9. Versioning and release

- `VERSION` at the repo root (today `0.1.0`) is the single version source;
  the build syncs it into `packages/ui/package.json`. SemVer: breaking =
  component API or token removal/rename, minor = new component/token, patch =
  fix.
- A release is: owner approves, VERSION bumped, `CHANGELOG.md` entry, git tag
  `v<version>`, GitHub Release (tag tarball is the anonymous install
  artifact), then the owner runs `npm publish` from the built package.
  Consumers pin exact versions (`ppij-design-system@0.x.y` or the GitHub
  `#v<version>` ref); upgrades are a version bump plus a visual check.

### D10. Guideline site: Storybook Docs on GitHub Pages

The guideline is not a markdown file to hunt for: Introduction, Brand,
Colors, Typography, and Guidelines Docs pages carry the 1.0.6 guideline book
(the parts that describe the system, not the app migration steps), adapted to
library context, beside the component stories. CI (GitHub Actions) builds the
static Storybook on tag/release and deploys it to GitHub Pages at
`https://ppij-dev.github.io/ppij-design-system/` with the correct base path;
no login. The workflow uses the standard static-pages deploy action with a
Pages-aware Storybook base; docs pages link the live Storybook as the
canonical reference.

### D11. Gate and batch discipline

Makefile TODO targets become real: `build` (tokens generate + tsc + Storybook
build), `lint` (eslint + prettier check + the token no-literal check), `test`
(Vitest: token parity, export surface, story smoke), `dev` (Storybook). The
gate stages point at these targets. Every batch in tasks.md names its proof;
a batch is done when its proof is green on a clean tree, with the Impeccable
closing pass (polish, then audit) before the batch verdict on built surfaces.

## Risks / Trade-offs

- [Stale copy risk: extracted components drift from ppij-identity-sso as that
  app evolves] → Integration is a planned later change; until then stories
  document provenance (source file + version) so drift is visible.
- [Tailwind v4 `@theme` in tokens.css surprises plain-CSS consumers] → The
  block is inert without Tailwind; the guideline documents the two consumption
  modes.
- [GitHub-install route depends on repo name/org `ppij-dev`] → D2 pins the
  exact ref format; Batch 10 proves the route, and the README states it.
- [Three waves of 7 components invite partial batches] → Each wave is one
  worker-sized batch with its own gate proof; unfinished waves do not block
  earlier proofs.
- [npm publish blocked on owner account availability] → Not a build blocker:
  the GitHub install route carries consumers until the owner publishes.

## Migration Plan

This change creates the system; consumers migrate later. Order: tooling
baseline → tokens → brand seed → Storybook shell → three extraction waves →
Empty → pattern promotions → package + consumer-install proof → guideline
Docs → Pages publish → release train. Rollback at any batch is `git revert` of
the batch commit; nothing outside this repo changes during this change.

## Open Questions

None. Distribution, naming, and guideline-site decisions are owner-locked in
the design brief; the extraction scope is fixed by the proposal.
