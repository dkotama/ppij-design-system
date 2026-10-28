# Add the design system foundation

## Why

PPIJ design work has no ready to use component library, so workers rebuild
pages one at a time and the design drifts.

## What changes

- Seed brand assets and guidelines from ppij-identity-sso
- Publish framework free tokens as tokens.json plus CSS variables
- Set up Storybook grouped Public, Portal, Admin
- Extract the 21 existing shadcn/ui components with stories, add Empty
- Promote the proven admin patterns to library components with stories
- Ship one npm package, `ppij-design-system`, with component, tokens.css, and
  tokens.json exports, installable from npm or from the public GitHub repo
- Publish the guideline as Storybook Docs pages to GitHub Pages

## Impact

New public repository. No application changes in this change. Integration
into ppij-identity-sso as a pinned package is a later, separate change.
