import { IconHome, IconId, IconBell, IconUser, IconCircleCheck, IconCheck, IconChevronDown } from "@tabler/icons-react";
import {
  AccountMenu, Alert, AlertDescription, AlertTitle, Badge, BottomBar, Button,
  Card, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  MemberCard, Progress,
} from "ppij-design-system";

export function PortalView({ onNavigate }: { onNavigate: (view: "wizard" | "profile") => void }) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-28 sm:pb-10">
      <header className="flex items-center justify-between gap-3 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-red text-sm font-extrabold text-white">P</span>
          <span className="grid leading-tight">
            <span className="font-bold text-brand-ink">PPI Jepang</span>
            <span className="text-xs text-muted-foreground">Portal Anggota</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-brand-ink outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring sm:flex" aria-label="Pilih bahasa">
                Bahasa Indonesia <IconChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><IconCheck size={16} /> Bahasa Indonesia</DropdownMenuItem>
              <DropdownMenuItem><span style={{ width: 16 }} /> English</DropdownMenuItem>
              <DropdownMenuItem><span style={{ width: 16 }} /> 日本語</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AccountMenu
            name="I Nyoman Darma Kotama"
            detail="Komsat Okayama"
            initials="DK"
            items={[
              { label: "Profil saya", href: "#", icon: <IconUser size={16} /> },
              { label: "Kartu anggota", href: "#", icon: <IconId size={16} /> },
            ]}
            onSignOut={() => {}}
          />
        </div>
      </header>

      <nav className="hidden gap-1 border-b pb-px sm:flex" aria-label="Navigasi utama">
        {["Beranda", "Profil", "Verifikasi"].map((label, i) => (
          <a key={label} href="#" onClick={(e) => { e.preventDefault(); if (label === "Profil") onNavigate("profile"); }}
            className={i === 0 ? "border-b-2 border-brand-red px-3 pb-2 text-sm font-semibold text-brand-ink" : "px-3 pb-2 text-sm text-muted-foreground hover:text-brand-ink"}>
            {label}
          </a>
        ))}
      </nav>

      <section className="grid gap-1">
        <h1 className="text-2xl font-bold text-brand-ink">Selamat pagi, Darma</h1>
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          Keanggotaanmu aktif sampai Oktober 2027. <Badge variant="success">Anggota aktif</Badge>
        </p>
      </section>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,380px)_1fr]">
        <div className="grid gap-6">
          <MemberCard name="I Nyoman Darma Kotama" memberId="PPIJ-2026-000123" komsat="Okayama" affiliation="Okayama University" validUntil="Okt 2027" statusLabel="Aktif" />
          <Card className="grid gap-3 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-brand-ink">Profil terisi 72%</span>
              <span className="text-muted-foreground">3 bagian lagi</span>
            </div>
            <Progress value={72} />
            <p className="text-sm text-muted-foreground">Lengkapi dokumen dan minat agar kartu anggota tercetak penuh.</p>
            <Button className="justify-self-start" onClick={() => onNavigate("wizard")}>Lengkapi profil</Button>
          </Card>
        </div>
        <div className="grid gap-6">
          <Alert variant="success">
            <IconCircleCheck />
            <AlertTitle>Verifikasi selesai</AlertTitle>
            <AlertDescription>Berkasmu sudah diverifikasi komsat dan pusat. Tidak ada tindakan yang perlu dilakukan.</AlertDescription>
          </Alert>
          <Card className="grid gap-4 p-5">
            <h2 className="font-semibold text-brand-ink">Aksi cepat</h2>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => onNavigate("profile")}>Lihat profil</Button>
              <Button variant="outline" onClick={() => onNavigate("wizard")}>Perbarui data</Button>
              <Button variant="outline">Unduh kartu (PDF)</Button>
              <Button variant="outline">Hubungi komsat</Button>
            </div>
          </Card>
          <Card className="grid gap-3 p-5">
            <h2 className="font-semibold text-brand-ink">Pengumuman</h2>
            <p className="text-sm text-muted-foreground">Musyawarah wilayah Kansai: Sabtu, 14 November 2026 di Osaka. Pendaftaran dibuka minggu depan.</p>
            <p className="text-sm text-muted-foreground">Pemira PPIJ 2026: daftar pemilih tetap diumumkan 1 Desember 2026.</p>
          </Card>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-card sm:hidden">
        <BottomBar
          items={[
            { label: "Beranda", href: "#", icon: <IconHome size={22} />, current: true },
            { label: "Kartu", href: "#", icon: <IconId size={22} />, current: false },
            { label: "Notifikasi", href: "#", icon: <IconBell size={22} />, badge: 2, current: false },
            { label: "Profil", href: "#", icon: <IconUser size={22} />, current: false },
          ]}
        />
      </div>
    </div>
  );
}
