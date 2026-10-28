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
        tablet: { name: "Tablet portrait (iPad / Galaxy Tab)", styles: { width: "834px", height: "1112px" }, type: "tablet" },
        tabletLandscape: { name: "Tablet landscape", styles: { width: "1112px", height: "834px" }, type: "tablet" },
        desktop: { name: "Desktop 1440", styles: { width: "1440px", height: "900px" } },
      },
    },
    docs: { toc: true, theme: ppijTheme },
  },
};
export default preview;
