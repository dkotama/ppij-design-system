import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./timeline";

const meta: Meta<typeof Timeline> = { title: "Portal/Timeline", component: Timeline };
export default meta;
type Story = StoryObj<typeof Timeline>;

export const VerificationJourney: Story = {
  render: () => (
    <div style={{ maxWidth: 440 }}>
      <Timeline
        items={[
          { title: "Pendaftaran terkirim", description: "Formulir dan berkas diterima sistem.", time: "1 Okt 2026, 09.12", state: "complete" },
          { title: "Verifikasi komsat", description: "Komsat Okayama memeriksa domisili dan kampus.", time: "3 Okt 2026, 15.40", state: "complete" },
          { title: "Verifikasi pusat", description: "Pengurus pusat memeriksa berkas akhir.", time: "Sedang berjalan", state: "current" },
          { title: "Kartu anggota diterbitkan", description: "Kartu digital aktif di portal.", state: "upcoming" },
        ]}
      />
    </div>
  ),
};
