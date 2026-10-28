// Generate tokens/tokens.css from tokens/tokens.json. Run from the repo root.
// tokens.json is the canonical source; never edit tokens.css by hand.
import { readFileSync, writeFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../tokens/tokens.json", import.meta.url), "utf8"));
const p = tokens.primitive;
const s = tokens.semantic;

const brandVars = ["brand-red", "brand-ink", "brand-muted", "brand-border", "brand-bg"]
  .map((k) => `  --${k}: ${p[k]};`).join("\n");
const semanticVars = Object.entries(s).map(([k, v]) => `  --${k}: ${v};`).join("\n");
const themeColors = [
  ...["brand-red", "brand-ink", "brand-muted", "brand-border", "brand-bg"].map((k) => `  --color-${k}: var(--${k});`),
  ...Object.keys(s).map((k) => `  --color-${k}: var(--${k});`),
].join("\n");

const css = `@import "tailwindcss";

/*
 * GENERATED from tokens/tokens.json by scripts/generate-tokens.mjs.
 * Do not edit by hand. PPIJ design tokens: brand primitives in :root,
 * the shadcn semantic layer mapped to them, Tailwind v4 theme names.
 */
:root {
${brandVars}

${semanticVars}
  --radius: ${p.radius};
}

@theme inline {
  --font-sans: ${p["font-sans"]};

${themeColors}

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  * {
    border-color: var(--border);
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: var(--brand-bg);
    color: var(--brand-ink);
    font-family: var(--font-sans);
    line-height: 1.6;
  }
}
`;
writeFileSync(new URL("../tokens/tokens.css", import.meta.url), css);
console.log("generate-tokens: wrote tokens/tokens.css");
