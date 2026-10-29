import type { Meta, StoryObj } from "@storybook/react";
import { IconIdBadge2, IconClockHour4, IconAlertTriangle } from "@tabler/icons-react";
import { StatusCard } from "./status-card";

const meta: Meta<typeof StatusCard> = { title: "Portal/StatusCard", component: StatusCard };
export default meta;
type Story = StoryObj<typeof StatusCard>;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 720 }}>
      <StatusCard compact icon={<IconIdBadge2 stroke={1.75} />} title="Kartu anggota aktif" actionLabel="Lihat profil" actionHref="#" />
      <StatusCard icon={<IconClockHour4 stroke={1.75} />} title="Pendaftaran terkirim ke Komsat Okayama" body="Terkirim 1 Oktober 2026. Verifikasi biasanya selesai dalam 7 hari kerja." actionLabel="Lihat status" actionHref="#" />
      <StatusCard tone="warning" icon={<IconAlertTriangle stroke={1.75} />} title="3 berkas perlu diperbaiki" body="Periksa catatan verifikator, perbaiki berkasnya, lalu kirim ulang." actionLabel="Perbaiki berkas" actionHref="#" />
    </div>
  ),
};
