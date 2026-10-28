import type { Meta, StoryObj } from "@storybook/react";
import { FormPanel } from "./form-panel";
import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { SavingIndicator } from "./saving-indicator";

const meta: Meta<typeof FormPanel> = { title: "Portal/FormPanel", component: FormPanel };
export default meta;
type Story = StoryObj<typeof FormPanel>;

export const RegistrationStep: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <FormPanel
        title="Data diri"
        description="Isi sesuai dokumen resmi. Data ini tampil di kartu anggota."
        footer={<div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}><SavingIndicator status="saved" /><Button>Lanjutkan</Button></div>}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 6 }}><Label>Nama lengkap</Label><Input placeholder="Nama sesuai KTP" /></div>
          <div style={{ display: "grid", gap: 6 }}><Label>Afiliasi</Label><Input placeholder="Universitas atau institusi" /></div>
        </div>
      </FormPanel>
    </div>
  ),
};
export const AsHeading: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <FormPanel title="Ringkasan pendaftaran" titleAs="h2" description="Periksa sebelum mengirim.">
        <p style={{ margin: 0, fontSize: 14 }}>Nama, komsat, dan berkas sudah lengkap.</p>
      </FormPanel>
    </div>
  ),
};
