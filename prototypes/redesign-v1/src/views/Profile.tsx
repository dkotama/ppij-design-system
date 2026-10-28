import * as React from "react";
import {
  AdminDrawer, Avatar, AvatarFallback, Badge, Button, Card, FileUpload, Input, Label,
  Tabs, TabsContent, TabsList, TabsTrigger, Timeline,
} from "ppij-design-system";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b py-3 last:border-0 sm:grid-cols-[180px_1fr] sm:gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-brand-ink">{value}</span>
    </div>
  );
}

function Island({ title, onEdit, children }: { title: string; onEdit?: () => void; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold text-brand-ink">{title}</h2>
        {onEdit && <Button variant="ghost" size="sm" onClick={onEdit}>Ubah</Button>}
      </div>
      {children}
    </Card>
  );
}

export function ProfileView() {
  const [drawer, setDrawer] = React.useState<null | "identitas" | "kontak">(null);
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-8">
      <Card className="flex flex-wrap items-center gap-4 p-5">
        <Avatar className="size-16">
          <AvatarFallback className="text-lg">DK</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-brand-ink">I Nyoman Darma Kotama</h1>
            <Badge variant="success">Aktif</Badge>
          </div>
          <p className="text-sm text-muted-foreground">PPIJ-2026-000123 · Komsat Okayama · Okayama University</p>
        </div>
        <Button variant="outline" className="ml-auto">Lihat kartu anggota</Button>
      </Card>

      <Tabs defaultValue="identitas">
        <TabsList>
          <TabsTrigger value="identitas">Identitas</TabsTrigger>
          <TabsTrigger value="kontak">Kontak</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
        </TabsList>
        <TabsContent value="identitas" className="grid gap-6 pt-4">
          <Island title="Data diri" onEdit={() => setDrawer("identitas")}>
            <Row label="Nama lengkap" value="I Nyoman Darma Kotama" />
            <Row label="Tanggal lahir" value="2 September 1992" />
            <Row label="Domisili" value="Okayama City, Kita-ku, Okayama 700-0001" />
            <Row label="Komsat" value="Okayama" />
          </Island>
          <Island title="Pendidikan" onEdit={() => setDrawer("identitas")}>
            <Row label="Universitas" value="Okayama University" />
            <Row label="Program studi" value="Computer Science" />
            <Row label="Jenjang" value="S2, sedang menempuh" />
            <Row label="Pendanaan" value="Beasiswa: JASSO" />
          </Island>
        </TabsContent>
        <TabsContent value="kontak" className="grid gap-6 pt-4">
          <Island title="Kontak" onEdit={() => setDrawer("kontak")}>
            <Row label="Email" value="darma.kotama@gmail.com" />
            <Row label="WhatsApp" value="+81 90-0000-0000" />
            <Row label="Kontak darurat" value="Keluarga di Indonesia, +62 812-0000-0000" />
          </Island>
        </TabsContent>
        <TabsContent value="dokumen" className="grid gap-6 pt-4">
          <Island title="Dokumen">
            <div className="grid gap-4 pt-2">
              <FileUpload label="Paspor" status="done" fileName="paspor-kotama.pdf" onPick={() => {}} onRemove={() => {}} />
              <FileUpload label="Kartu residensi (zairyu)" status="done" fileName="zairyu-depan.jpg" onPick={() => {}} onRemove={() => {}} />
              <FileUpload label="Transkrip terakhir" hint="PDF, maks 5 MB." status="empty" onPick={() => {}} />
            </div>
          </Island>
        </TabsContent>
        <TabsContent value="riwayat" className="grid gap-6 pt-4">
          <Island title="Riwayat keanggotaan">
            <div className="pt-2">
              <Timeline items={[
                { title: "Pendaftaran terkirim", time: "1 Okt 2026", state: "complete" },
                { title: "Verifikasi komsat selesai", time: "3 Okt 2026", state: "complete" },
                { title: "Verifikasi pusat selesai", time: "6 Okt 2026", state: "complete" },
                { title: "Kartu anggota diterbitkan", description: "Berlaku sampai Oktober 2027.", time: "6 Okt 2026", state: "complete" },
              ]} />
            </div>
          </Island>
        </TabsContent>
      </Tabs>

      <AdminDrawer
        open={drawer !== null}
        onOpenChange={(open) => { if (!open) setDrawer(null); }}
        title={drawer === "kontak" ? "Ubah kontak" : "Ubah data"}
        description="Perubahan tersimpan setelah tombol Simpan ditekan."
        locale="id"
        footer={<Button onClick={() => setDrawer(null)}>Simpan perubahan</Button>}
      >
        <div className="grid gap-4">
          {drawer === "kontak" ? (
            <>
              <div className="grid gap-1.5"><Label>Email</Label><Input defaultValue="darma.kotama@gmail.com" /></div>
              <div className="grid gap-1.5"><Label>WhatsApp</Label><Input defaultValue="+81 90-0000-0000" /></div>
            </>
          ) : (
            <>
              <div className="grid gap-1.5"><Label>Nama lengkap</Label><Input defaultValue="I Nyoman Darma Kotama" /></div>
              <div className="grid gap-1.5"><Label>Kota domisili</Label><Input defaultValue="Okayama City, Kita-ku" /></div>
              <div className="grid gap-1.5"><Label>Universitas</Label><Input defaultValue="Okayama University" /></div>
            </>
          )}
        </div>
      </AdminDrawer>
    </div>
  );
}
