# Tasks

## 1. Tokens and brand
- [ ] Extract tokens from ppij-identity-sso global.css into tokens/
- [ ] Seed brand/ with logo, palette, typography, and usage rules

## 2. Storybook
- [ ] Set up @storybook/react-vite with Public, Portal, Admin groups
- [ ] Add phone and 1440px desktop viewport presets

## 3. Components
- [ ] Extract the 21 ui components into packages/ui with stories
- [ ] Add the Empty component with a story
- [ ] Promote PageHeader, DataTable shell, and wide Drawer patterns

## 4. Package and guideline site
- [ ] Configure one npm package `ppij-design-system` with root, tokens.css,
  and tokens.json exports, and prove a clean consumer install
- [ ] Add Storybook Docs guideline pages (Introduction, Brand, Colors,
  Typography, component guidelines)
- [ ] Publish the static Storybook to GitHub Pages from CI

## 5. Gate
- [ ] Replace the Makefile TODO targets with real build, lint, and test commands
- [ ] Run scripts/gate.sh green on a clean tree
