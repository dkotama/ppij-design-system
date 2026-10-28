import type { Preview } from "@storybook/react";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "../../../tokens/tokens.css";
import { ppijTheme } from "./theme";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        phone: { name: "Phone", styles: { width: "390px", height: "844px" } },
        desktop: { name: "Desktop 1440", styles: { width: "1440px", height: "900px" } },
      },
    },
    docs: { toc: true, theme: ppijTheme },
  },
};
export default preview;
