import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { Label } from "./label";

const meta: Meta<typeof Textarea> = { title: "Portal/Textarea", component: Textarea };
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Notes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <Label htmlFor="ta-motivation">Motivasi bergabung</Label>
        <Textarea id="ta-motivation" placeholder="Tulis singkat, dua atau tiga kalimat." />
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <Label htmlFor="ta-address">Alamat di Jepang</Label>
        <Textarea id="ta-address" defaultValue={"Okayama City, Kita-ku\nOkayama 700-0001, Japan"} />
      </div>
    </div>
  ),
};
