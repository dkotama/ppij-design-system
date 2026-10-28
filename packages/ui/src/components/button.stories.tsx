import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Portal/Button",
  component: Button,
  args: { children: "Simpan" },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
export const Loading: Story = { args: { disabled: true, children: "Menyimpan..." } };
export const Disabled: Story = { args: { disabled: true } };
export const LongText: Story = {
  args: { children: "Kirim pendaftaran dan lanjutkan ke langkah berikutnya" },
};
