import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = { title: "Portal/Checkbox", component: Checkbox };
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Consent: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 460 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Checkbox id="consent-data" defaultChecked />
        <Label htmlFor="consent-data">Saya menyetujui pemrosesan data pribadi untuk keanggotaan PPI Jepang.</Label>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Checkbox id="consent-publish" />
        <Label htmlFor="consent-publish">Nama dan komsat saya boleh tampil di direktori anggota.</Label>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <Checkbox id="consent-off" disabled />
        <Label htmlFor="consent-off">Opsi ini belum tersedia.</Label>
      </div>
    </div>
  ),
};
