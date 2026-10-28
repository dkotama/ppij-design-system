import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = { title: "Portal/Skeleton", component: Skeleton };
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const ProfileCard: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", maxWidth: 320 }}>
      <Skeleton style={{ width: 44, height: 44, borderRadius: "50%" }} />
      <div style={{ display: "grid", gap: 6, flex: 1 }}>
        <Skeleton style={{ height: 14, width: "70%" }} />
        <Skeleton style={{ height: 12, width: "45%" }} />
      </div>
    </div>
  ),
};
export const ListRows: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8, maxWidth: 380 }}>
      <Skeleton style={{ height: 18 }} /><Skeleton style={{ height: 18 }} />
      <Skeleton style={{ height: 18, width: "82%" }} /><Skeleton style={{ height: 18, width: "64%" }} />
    </div>
  ),
};
