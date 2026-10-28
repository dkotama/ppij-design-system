import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SearchFilter, type ActiveFilter } from "./search-filter";
import { DataTable } from "./data-table";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "./table";
import { Badge } from "./badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const meta: Meta<typeof SearchFilter> = { title: "Admin/SearchFilter", component: SearchFilter };
export default meta;
type Story = StoryObj<typeof SearchFilter>;

const members = [
  ["I Nyoman Darma Kotama", "Okayama", "Aktif"],
  ["Marcus Aurelius Antoninus", "Roma", "Aktif"],
  ["Lucius Annaeus Seneca", "Corduba", "Menunggu"],
  ["Zeno of Citium", "Kition", "Aktif"],
  ["Diogenes of Sinope", "Sinope", "Aktif"],
  ["Epictetus", "Hierapolis", "Menunggu"],
  ["Cleanthes of Assos", "Assos", "Aktif"],
];

function MemberDirectoryDemo() {
  const [query, setQuery] = React.useState("");
  const [komsat, setKomsat] = React.useState("semua");
  const [status, setStatus] = React.useState("semua");
  const rows = members.filter(([name, city, state]) => {
    const matchesQuery = (name + " " + city).toLowerCase().includes(query.toLowerCase());
    const matchesKomsat = komsat === "semua" || city === komsat;
    const matchesStatus = status === "semua" || state === status;
    return matchesQuery && matchesKomsat && matchesStatus;
  });
  const active: ActiveFilter[] = [];
  if (query !== "") active.push({ label: "Kata kunci", value: query, onRemove: () => setQuery("") });
  if (komsat !== "semua") active.push({ label: "Komsat", value: komsat, onRemove: () => setKomsat("semua") });
  if (status !== "semua") active.push({ label: "Status", value: status, onRemove: () => setStatus("semua") });
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 760 }}>
      <SearchFilter
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder="Cari anggota..."
        activeFilters={active}
        onClearAll={() => { setQuery(""); setKomsat("semua"); setStatus("semua"); }}
        filters={
          <>
            <Select value={komsat} onValueChange={setKomsat}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Komsat" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua komsat</SelectItem>
                {Array.from(new Set(members.map((m) => m[1]))).map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Menunggu">Menunggu</SelectItem>
              </SelectContent>
            </Select>
          </>
        }
      />
      <DataTable footerText={"Menampilkan " + rows.length + " dari " + members.length + " anggota"} pageLabel="Halaman 1 dari 1" previousDisabled nextDisabled>
        <Table>
          <TableHeader><TableRow><TableHead>Nama</TableHead><TableHead>Komsat</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow><TableCell colSpan={3} style={{ textAlign: "center", color: "#5b6168" }}>Tidak ada anggota yang cocok dengan filter ini.</TableCell></TableRow>
            ) : rows.map(([n, k, s]) => (
              <TableRow key={n}><TableCell>{n}</TableCell><TableCell>{k}</TableCell><TableCell><Badge variant={s === "Aktif" ? "default" : "secondary"}>{s}</Badge></TableCell></TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTable>
    </div>
  );
}

export const MemberDirectory: Story = { render: () => <MemberDirectoryDemo /> };
