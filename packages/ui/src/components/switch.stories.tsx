import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "./label";

const meta: Meta<typeof Switch> = { title: "Portal/Switch", component: Switch };
export default meta;
type Story = StoryObj<typeof Switch>;

export const Settings: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 14, maxWidth: 460 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <Label htmlFor="sw-notif">Notifikasi email</Label>
        <Switch id="sw-notif" defaultChecked />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <Label htmlFor="sw-directory">Tampil di direktori</Label>
        <Switch id="sw-directory" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <Label htmlFor="sw-small">Pengingat ringkas (kecil)</Label>
        <Switch id="sw-small" size="sm" defaultChecked />
      </div>
    </div>
  ),
};
