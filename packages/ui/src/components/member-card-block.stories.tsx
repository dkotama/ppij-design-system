import type { Meta, StoryObj } from "@storybook/react";
import { MemberCardBlock } from "./member-card-block";

const meta: Meta<typeof MemberCardBlock> = { title: "Portal/MemberCardBlock", component: MemberCardBlock };
export default meta;
type Story = StoryObj<typeof MemberCardBlock>;

export const WithActions: Story = {
  render: () => (
    <MemberCardBlock
      name="I Nyoman Darma Kotama"
      memberId="PPIJ-2026-000123"
      komsat="Okayama"
      affiliation="Okayama University"
      validUntil="Okt 2027"
      statusLabel="Aktif"
      backNote="Tunjukkan kartu ini saat verifikasi kehadiran."
      themes={[
        { id: "kansai", label: "Kansai", group: "Korda", base: "#c8102e", faceTheme: "red" },
        { id: "ppij-ink", label: "PPIJ Tinta", group: "PPIJ", base: "#1c1f23", faceTheme: "ink" },
        { id: "sakura", label: "Sakura", group: "Musim", base: "#d77a94", faceTheme: "red" },
        { id: "mega-mendung", label: "Mega Mendung", group: "Nusantara", base: "#31517f", faceTheme: "ink" },
      ]}
    />
  ),
};
