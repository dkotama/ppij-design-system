import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "./table";
import { Badge } from "./badge";

const meta: Meta<typeof Table> = { title: "Portal/Table", component: Table };
export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  ["Darma Kotama", "Okayama", "Aktif"],
  ["Putu Sugiartawan", "Tokyo", "Menunggu"],
  ["Kadek Gemilang", "Osaka", "Aktif"],
];
export const MemberList: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Table>
        <TableCaption>Daftar anggota komsat</TableCaption>
        <TableHeader>
          <TableRow><TableHead>Nama</TableHead><TableHead>Komsat</TableHead><TableHead>Status</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([n, k, s]) => (
            <TableRow key={n}><TableCell>{n}</TableCell><TableCell>{k}</TableCell><TableCell><Badge variant={s === "Aktif" ? "default" : "secondary"}>{s}</Badge></TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Table>
        <TableHeader>
          <TableRow><TableHead>Nama</TableHead><TableHead>Komsat</TableHead><TableHead>Status</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell colSpan={3} style={{ textAlign: "center", color: "#5b6168" }}>Belum ada anggota pada filter ini.</TableCell></TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
