// Fail if a component source file has no matching .stories.tsx beside it.
import { readdirSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../packages/ui/src/components", import.meta.url).pathname;
const files = readdirSync(dir);
const missing = files
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".stories.tsx"))
  .filter((f) => !files.includes(f.replace(/\.tsx$/, ".stories.tsx")));
if (missing.length) {
  console.error("check-stories: components without stories:", missing.join(", "));
  process.exit(1);
}
console.log("check-stories: every component has a story");
