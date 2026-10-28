import type { Preview } from "@storybook/react";
import "../../../tokens/tokens.css";

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        phone: { name: "Phone", styles: { width: "390px", height: "844px" } },
        desktop: { name: "Desktop 1440", styles: { width: "1440px", height: "900px" } },
      },
    },
    docs: { toc: true },
  },
};
export default preview;
