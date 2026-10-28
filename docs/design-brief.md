# Design Brief: PPIJ Branding and Design System

Owner decision, 2026-10-28: create a separate public repository for PPIJ
branding and the design system, with a strict boundary.

## Problem

Design work assigned to workers failed because there was no ready to use
component library. Workers rebuilt whole pages one at a time. Components lived
as dev demos plus snapshot copies inside ppij-identity-sso, the admin samples
were never synced into that library, and no per component contract existed.

## Goal

A Storybook like library of ready to use components that:

1. A human can view in a browser, grouped Public, Portal, and Admin, on phone
   and desktop viewports.
2. A human can implement from, with clear usage and props.
3. An agent can implement from, with a typed contract and a story that proves
   the component renders. A component with no story does not exist.

## Boundary

In this repo: brand assets, design tokens, shadcn/ui and Tailwind CSS v4 React
presentation components, Storybook, guidelines.
Not in this repo: application data logic, API clients, registration or admin
business logic, secrets or credentials of any kind. Applications consume this
repo as a pinned package version and never copy from it.

## Source material in ppij-identity-sso

- `web/src/components/ui/`: 21 shadcn/ui components (button, card, table,
  sidebar, drawer, sheet, tabs, input, select, badge, and others)
- `web/src/styles/global.css`: Tailwind v4 theme, brand tokens, PPIJ red
  #C8102E, Plus Jakarta Sans plus Noto Sans JP
- `design/1.0.6/guideline.md` plus `agent-map.md`: the current guideline book
- `design/1.0.6/email/`: email brand application
- Rules already decided: Tabler icons only, no text glyphs as icons; admin
  typography equals portal typography; language switch is a quiet text action
  or a labelled menu, never isolated boxed EN or ID codes

## Impeccable

Every UI batch runs Impeccable with its full setup: the context launcher once
per session, the named command playbook, and craft-floor read before any UI
edit. First batch: `document` and `extract`, then `shape`. Closing pass on
every built surface: `polish`, then `audit` before the orchestrator verdict.
Product mode, not brand mode, for portal and admin surfaces.

## First foundation batch, no application pages

1. tokens.json plus CSS variables from the current global.css values
2. Brand folder seeded from current PPIJ assets in ppij-identity-sso
3. Storybook on @storybook/react-vite, groups Public, Portal, Admin,
   viewports phone and 1440px desktop
4. Stories for the 21 existing ui components, plus the missing Empty component
5. Admin patterns promoted to library components with stories: PageHeader,
   DataTable presentation shell, wide Drawer pattern
6. Each story covers default, loading, empty, error, disabled, long text
   where the state applies to that component
