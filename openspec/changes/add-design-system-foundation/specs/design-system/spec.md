# Spec Delta

## Purpose

Define the binding behavior of the ppij-design-system: one framework-free
token source, one npm package distribution, Storybook stories as the proof of
every component, Tabler-only icons, a presentation-only boundary, the
consume-never-copy rule for applications, and the Storybook Docs guideline
site on GitHub Pages.

## ADDED Requirements

### Requirement: Framework-free token source of truth
The system SHALL define every design token in `tokens/tokens.json` and
generate `tokens/tokens.css` from it. The JSON values and the CSS variable
values SHALL stay identical, and components SHALL consume tokens only through
CSS variables or Tailwind theme names, never hard-coded values.

#### Scenario: Generated CSS matches the JSON source
- **WHEN** the build regenerates `tokens/tokens.css` from `tokens/tokens.json`
- **THEN** every CSS custom property value equals its `tokens.json`
  counterpart and the parity check passes

#### Scenario: No raw values in components
- **WHEN** a component needs a brand or semantic value
- **THEN** it references the token name, and the lint stage finds no raw hex
  color or one-off pixel literal in component source

### Requirement: One package distribution
The system SHALL ship as one npm package named `ppij-design-system` that
exports the React components from the package root, the CSS variables from
`ppij-design-system/tokens.css`, and the framework-free token values from
`ppij-design-system/tokens.json`. Consumers SHALL pin a released version.

#### Scenario: A clean consumer resolves all three exports
- **WHEN** a scratch consumer project installs the packed package tarball and
  imports the package root, `ppij-design-system/tokens.css`, and
  `ppij-design-system/tokens.json`
- **THEN** all three imports resolve and a rendered component displays using
  the token values

#### Scenario: Upgrade is a version bump
- **WHEN** an application adopts a new release
- **THEN** the change is a pinned version bump plus a visual check, and no
  component or token file is copied into the application

### Requirement: Anonymous install before first npm publish
Until the first publish to the npm registry, the package SHALL install
anonymously from the public GitHub repository, by tag ref or GitHub release
tarball. The system SHALL NOT use GitHub Packages.

#### Scenario: Tokenless install from GitHub
- **WHEN** a consumer runs `npm install github:ppij-dev/ppij-design-system#v<version>`
  with no credentials configured
- **THEN** npm resolves and installs the package

#### Scenario: No GitHub Packages route
- **WHEN** the install documentation or CI configuration is reviewed
- **THEN** no GitHub Packages registry or npm token appears in the install
  route

### Requirement: Every component has a story
Every component in the package SHALL have a Storybook story that renders it.
A component without a story SHALL NOT be merged: no story, no component.

#### Scenario: Component without a story fails the gate
- **WHEN** a component file exists without a story that renders it
- **THEN** the gate fails on the story check

#### Scenario: Storybook shows every component
- **WHEN** the static Storybook builds
- **THEN** every component in the package has at least one rendering story

### Requirement: Story state coverage
Stories SHALL cover default, loading, empty, error, disabled, and long-text
states where the state applies to the component. A state that cannot apply to
a component SHALL NOT force a story.

#### Scenario: Applicable state has a story
- **WHEN** a component supports a state in the set, such as loading on Button
  or empty on Table
- **THEN** a story demonstrates that state

#### Scenario: Non-applicable state is not forced
- **WHEN** a state cannot apply to a component, such as empty on Button
- **THEN** the component ships without that story and passes the gate

### Requirement: Storybook group structure
Storybook SHALL group component stories under Public, Portal, and Admin, and
SHALL provide phone and 1440px desktop viewport presets.

#### Scenario: Stories sit in one of the three groups
- **WHEN** the Storybook sidebar renders
- **THEN** every component story appears under Public, Portal, or Admin

#### Scenario: Viewport presets are available
- **WHEN** a story is viewed
- **THEN** the phone (390x844) and desktop (1440x900) viewport presets are
  selectable

### Requirement: Tabler icons only
Components SHALL use Tabler icons (`@tabler/icons-react`) as the only icon
source and SHALL NOT use text glyphs as icons or introduce another icon
family.

#### Scenario: Icon comes from Tabler
- **WHEN** a component needs an icon
- **THEN** it imports it from `@tabler/icons-react`

#### Scenario: Glyph as icon is rejected
- **WHEN** a change uses a text glyph, such as a check mark, cross, or arrow
  character, where an icon is meant
- **THEN** review rejects it in favor of the Tabler equivalent

### Requirement: Presentation-only boundary
The package SHALL contain brand assets, tokens, and presentation components
only. It SHALL NOT contain application data logic, API clients, business
logic, or secrets.

#### Scenario: Data access is rejected
- **WHEN** a contribution fetches application data, imports an API client, or
  reads a secret
- **THEN** the gate or review rejects it before merge

#### Scenario: App-specific strings arrive as props
- **WHEN** a promoted component needs locale or product strings
- **THEN** the caller passes them as props and the component imports no
  application i18n module

### Requirement: Consume, never copy
Applications SHALL consume the design system as a pinned package version and
SHALL NOT copy components or token values into application source.

#### Scenario: Component comes from the package
- **WHEN** an application needs a system component
- **THEN** it imports it from the installed `ppij-design-system` package

#### Scenario: Copied component is a violation
- **WHEN** a review finds a duplicated component or a re-declared token
  literal in application source
- **THEN** the copy is a violation to remove, and the application imports the
  pinned package instead

### Requirement: Guideline lives in Storybook Docs on GitHub Pages
The design guideline SHALL live as Storybook Docs pages (Introduction, Brand,
Colors, Typography, and the component guidelines carried from
ppij-identity-sso `design/1.0.6/guideline.md`), and the static Storybook
build SHALL publish to GitHub Pages from CI, reachable without login.

#### Scenario: Docs pages render beside stories
- **WHEN** the guideline site is opened
- **THEN** the Introduction, Brand, Colors, Typography, and Guidelines pages
  render alongside the component stories

#### Scenario: CI publishes the static build
- **WHEN** CI publishes on tag or release
- **THEN** `https://ppij-dev.github.io/ppij-design-system/` serves the
  updated static Storybook without requiring a login

### Requirement: Extracted components keep proven behavior and drop app dependencies
Components extracted from ppij-identity-sso SHALL preserve their proven
visual behavior and public component API while dropping application-only
dependencies such as app i18n, data access, and routing.

#### Scenario: Promotion compiles without the source app
- **WHEN** a component is promoted from ppij-identity-sso into the package
- **THEN** it builds and its story renders with no import from the source
  application

#### Scenario: Visual behavior stays faithful
- **WHEN** an extraction would change a proven visual or interaction behavior
- **THEN** the change requires an explicit design decision recorded in the
  change, not silent drift
