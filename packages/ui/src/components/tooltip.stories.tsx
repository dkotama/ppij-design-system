import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";
import { Button } from "./button";
import { IconSend } from "@tabler/icons-react";

const meta: Meta<typeof Tooltip> = { title: "Portal/Tooltip", component: Tooltip };
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" aria-label="Kirim undangan"><IconSend size={18} /></Button>
        </TooltipTrigger>
        <TooltipContent>Kirim undangan</TooltipContent>
      </Tooltip>
      <p style={{ fontSize: 12, color: "#5b6168" }}>Hover the button to see the tooltip.</p>
    </TooltipProvider>
  ),
};
