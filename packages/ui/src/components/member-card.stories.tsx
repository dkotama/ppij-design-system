import type { Meta, StoryObj } from "@storybook/react";
import { MemberCard, MemberCardBack } from "./member-card";

const meta: Meta<typeof MemberCard> = { title: "Portal/MemberCard", component: MemberCard };
export default meta;
type Story = StoryObj<typeof MemberCard>;

export const Active: Story = {
  render: () => (
    <MemberCard name="I Nyoman Darma Kotama" memberId="PPIJ-2026-000123" komsat="Okayama" affiliation="Okayama University" validUntil="Okt 2027" statusLabel="Aktif" />
  ),
};
export const InkThemeExpiring: Story = {
  render: () => (
    <MemberCard name="Zeno of Citium" memberId="PPIJ-2026-000456" komsat="Tokyo" validUntil="Nov 2026" statusLabel="Segera berakhir" theme="ink" />
  ),
};
export const Back: Story = {
  render: () => (
    <MemberCardBack memberId="PPIJ-2026-000123" note="Kartu ini milik PPI Jepang. Jika menemukan kartu ini, hubungi sekretariat PPI Jepang." />
  ),
};
