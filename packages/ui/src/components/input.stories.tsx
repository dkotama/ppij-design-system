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
export const LongValue: Story = { args: { defaultValue: "I Nyoman Darma Kotama, Politeknik Negeri Bali, Okayama University" } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Input data-size="sm" placeholder="Kecil (32px)" />
      <Input placeholder="Bawaan (36px)" />
      <Input data-size="lg" placeholder="Besar (44px)" />
    </div>
  ),
};

export const OnAnySurface: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, padding: 16, display: "grid", gap: 6 }}>
        <Label>Di atas kartu putih</Label>
        <Input placeholder="Bidang selalu putih" />
      </div>
      <div style={{ background: "var(--color-brand-cream)", borderRadius: 12, padding: 16, display: "grid", gap: 6 }}>
        <Label>Di atas latar merek</Label>
        <Input placeholder="Bidang selalu putih" />
      </div>
    </div>
  ),
};
