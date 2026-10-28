import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { DataTable } from "./data-table";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "./table";
import { Badge } from "./badge";
import { Button } from "./button";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "./empty";

const meta: Meta<typeof DataTable> = { title: "Admin/DataTable", component: DataTable };
export default meta;
type Story = StoryObj<typeof DataTable>;

const all = [
  ["Darma Kotama", "Okayama", "Aktif"],
  ["Putu Sugiartawan", "Tokyo", "Menunggu"],
  ["Kadek Gemilang", "Osaka", "Aktif"],
  ["Wayan Kintara", "Nagoya", "Aktif"],
];
function Demo() {
  const [q, setQ] = React.useState("");
  const rows = all.filter((r) => r.join(" ").toLowerCase().includes(q.toLowerCase()));
  return (
    <DataTable
      searchValue={q}
      onSearchChange={setQ}
      searchPlaceholder="Cari anggota..."
      actions={<Button variant="outline"><IconFilter size={16} /> Filter</Button>}
      footerText={"Menampilkan " + rows.length + " dari " + all.length + " anggota"}
      pageLabel="Halaman 1 dari 1"
      previousDisabled
      nextDisabled
    >
      <Table>
        <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Komsat</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>
          {rows.map(([n, k, s]) => (
            <TableRow key={n}><TableCell>{n}</TableCell><TableCell>{k}</TableCell><TableCell><Badge variant={s === "Aktif" ? "default" : "secondary"}>{s}</Badge></TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTable>
  );
}
export const Directory: Story = { render: () => <Demo /> };

export const NoResults: Story = {
  render: () => (
    <DataTable searchValue="zzz" onSearchChange={() => {}} searchPlaceholder="Cari anggota..." footerText="Menampilkan 0 dari 4 anggota" pageLabel="Halaman 1 dari 1" previousDisabled nextDisabled >
      <div style={{ padding: 16 }}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon"><IconSearch /></EmptyMedia>
            <EmptyTitle>Tidak ada hasil</EmptyTitle>
            <EmptyDescription>Tidak ada anggota yang cocok dengan kata kunci ini.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </DataTable>
  ),
};
