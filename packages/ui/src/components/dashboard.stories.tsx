import type { Meta, StoryObj } from "@storybook/react";
import { IconUsers, IconClockHour4, IconBuildingCommunity, IconId, IconAlertTriangle } from "@tabler/icons-react";
import { PageHeader } from "./page-header";
import { StatCard } from "./stat-card";
import { UnitCard } from "./unit-card";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { DataTable } from "./data-table";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "./table";
import { Badge } from "./badge";
import { Button } from "./button";

const meta: Meta = { title: "Admin/Dashboard" };
export default meta;
type Story = StoryObj;

const recent = [
  ["I Nyoman Darma Kotama", "Okayama", "Aktif"],
  ["Marcus Aurelius Antoninus", "Roma", "Aktif"],
  ["Lucius Annaeus Seneca", "Corduba", "Menunggu"],
  ["Zeno of Citium", "Kition", "Aktif"],
];

export const Overview: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 1080 }}>
      <PageHeader
        title="Dashboard"
        description="Ringkasan keanggotaan PPI Jepang hari ini."
        actions={<Button>Tambah anggota</Button>}
      />
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
        <StatCard label="Anggota aktif" value="1.284" icon={<IconUsers />} delta="+12" deltaTone="success" hint="bulan ini" />
        <StatCard label="Menunggu verifikasi" value="7" icon={<IconClockHour4 />} delta="+3" deltaTone="destructive" hint="dari kemarin" />
        <StatCard label="Komsat aktif" value="26" icon={<IconBuildingCommunity />} hint="di 9 wilayah" />
        <StatCard label="Kartu diterbitkan" value="1.102" icon={<IconId />} delta="+48" deltaTone="success" hint="bulan ini" />
      </div>
      <Alert variant="warning">
        <IconAlertTriangle />
        <AlertTitle>7 berkas menunggu verifikasi</AlertTitle>
        <AlertDescription>
          Berkas tertua menunggu sejak 3 hari yang lalu. Selesaikan dari antrean verifikasi anggota.
        </AlertDescription>
      </Alert>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        <UnitCard name="Okayama" kind="Komsat" memberCount={128} leadName="I Nyoman Darma Kotama" statusLabel="Aktif" href="#" />
        <UnitCard name="Tokyo" kind="Komsat" memberCount={342} leadName="Marcus Aurelius Antoninus" statusLabel="Aktif" href="#" />
        <UnitCard name="Nagoya" kind="Komsat" memberCount={12} statusLabel="Perlu perhatian" statusVariant="warning" href="#" />
      </div>
      <DataTable footerText="Menampilkan 4 anggota terbaru" pageLabel="Halaman 1 dari 1" previousDisabled nextDisabled>
        <Table>
          <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Komsat</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {recent.map(([n, k, s]) => (
              <TableRow key={n}><TableCell>{n}</TableCell><TableCell>{k}</TableCell><TableCell><Badge variant={s === "Aktif" ? "default" : "secondary"}>{s}</Badge></TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  ),
};
