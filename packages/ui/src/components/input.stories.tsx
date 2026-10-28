import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = { title: "Portal/Input", component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "Nama lengkap" } };
export const WithLabel: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 6, maxWidth: 320 }}>
      <Label htmlFor="nama">Nama lengkap</Label>
      <Input id="nama" placeholder="Nama sesuai KTP" />
    </div>
  ),
};
export const Disabled: Story = { args: { placeholder: "Tidak dapat diubah", disabled: true } };
export const ErrorState: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 6, maxWidth: 320 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" aria-invalid defaultValue="bukan-email" />
      <p style={{ fontSize: 12, color: "#c8102e", margin: 0 }}>Format email tidak valid.</p>
    </div>
  ),
};
export const LongValue: Story = { args: { defaultValue: "Darma Kotama, Politeknik Negeri Bali, Okayama University" } };
