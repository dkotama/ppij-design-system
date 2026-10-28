import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = { title: "Portal/Spinner", component: Spinner };
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Spinner size="xs" /><Spinner size="sm" /><Spinner /><Spinner size="lg" />
    </div>
  ),
};
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#5b6168" }}>
      <Spinner size="sm" /> Memuat data anggota...
    </div>
  ),
};
