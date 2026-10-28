# AGENTS.md: ppij-design-system

The public PPIJ branding and design system. Owned by PPIJ, orchestrated by
Momo. This repo is the source of truth for brand, tokens, and presentation
components for the public site, member portal, admin, Pemira, Keycloak, and
email surfaces.

## Source of truth

- Specs live in `openspec/specs/` and are the source of truth for behavior.
- Work starts from an OpenSpec change in `openspec/changes/`, never from a
  chat message alone. Propose first, implement second, archive when done.
- The design brief lives in `docs/design-brief.md`.

## Verification

- Run `scripts/gate.sh` before calling anything done. It must be fully
  green before a merge, a release, or a deploy, on a clean tree.
- A component is done only when its Storybook story renders. No story means
  the component does not exist.

## Commands

- Build: `make build`
- Lint: `make lint`
- Test: `make test`
- Run locally: `make dev`

## Hard constraints

- Public repository: never commit a secret, credential, token value, or
  private personal data. Design tokens are public values, not credentials.
- Boundary: brand, tokens, and presentation components only. No application
  data logic, no API clients, no business logic.
- Stack: React 19, Tailwind CSS v4, shadcn/ui on Radix, Tabler icons only.
  No text glyphs as icons.
- Tokens are framework free: tokens.json plus CSS variables are canonical.
  React components are one consumer of the tokens, not the source.
- Consumers pin a released version. Never copy a component into an app.
- UI work runs Impeccable with full setup: context launcher, the named
  command playbook, and craft-floor before any UI edit.
