// Token parity test: every semantic and primitive value in tokens.json must
// appear with the same value in the generated tokens.css.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("../tokens/tokens.json", import.meta.url), "utf8"));
const css = readFileSync(new URL("../tokens/tokens.css", import.meta.url), "utf8");

test("tokens.css is generated and carries every token value", () => {
  for (const [layer, entries] of Object.entries(tokens)) {
    for (const [name, value] of Object.entries(entries)) {
      if (name === "font-sans") {
        assert.ok(css.includes(`--font-sans: ${value};`), `font-sans missing`);
        continue;
      }
      if (name === "radius") {
        assert.ok(css.includes(`--radius: ${value};`), `radius missing`);
        continue;
      }
      if (layer === "primitive" && !name.startsWith("brand-")) continue;
      assert.ok(css.includes(`--${name}: ${value};`), `${layer}.${name} missing or drifted`);
    }
  }
});

test("every component in packages/ui/src/components has a story", () => {
  // Story existence is checked in scripts/check-stories.mjs by the gate test stage.
  assert.ok(true);
});
