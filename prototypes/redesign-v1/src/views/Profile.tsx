import * as React from "react";
import { IconHistory, IconHome, IconIdBadge2 } from "@tabler/icons-react";
import { Button, Card, Input, Label, PortalShell, Spinner, TagInput, Textarea } from "ppij-design-system";
import logoUrl from "../../../../brand/ppij-logo.png";

function SaveButton({ saved, setSaved }: { saved: boolean; setSaved: (v: boolean) => void }) {
  const [saving, setSaving] = React.useState(false);
  return (
    <div className="grid gap-2">
      <Button
        type="submit"
        disabled={saving}
        aria-busy={saving}
        className="min-h-11 w-fit gap-2 px-5"
        onClick={(event) => {
          event.preventDefault();
          setSaving(true);
          setSaved(false);
          window.setTimeout(() => { setSaving(false); setSaved(true); }, 700);
        }}
      >
        {saving ? (<><Spinner size="sm" decorative /><span>Menyimpan…</span></>) : "Simpan perubahan"}
      </Button>
      {saved ? <p role="status" className="text-sm text-success">Perubahan tersimpan.</p> : null}
    </div>
  );
}

function ProfileContent() {
  const [minat, setMinat] = React.useState(["Fotografi", "Riset kecerdasan buatan", "Bahasa Jepang"]);
  const [minatSaved, setMinatSaved] = React.useState(false);
  const [kontakSaved, setKontakSaved] = React.useState(false);
  const history = [
    { status: "Aktif", reason: "Kartu anggota diterbitkan", date: "6 Okt 2026" },
    { status: "Belum lengkap", reason: "Pendaftaran diterima", date: "1 Okt 2026" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl font-bold text-brand-ink">Profil</h1>
        <p className="mt-1 text-sm text-brand-muted">Data keanggotaan dan riwayat status Anda.</p>
      </header>
      <Card className="gap-4 rounded-xl border border-brand-border bg-card p-5">
        <div className="flex items-center gap-3">
          <IconIdBadge2 className="size-6 text-brand-red" aria-hidden="true" />
          <div>
            <h2 className="font-bold text-brand-ink">I Nyoman Darma Kotama</h2>
            <p className="text-sm text-brand-muted">darma.kotama@gmail.com</p>
          </div>
        </div>
        <dl className="grid gap-3 border-t border-brand-border pt-4 sm:grid-cols-2">
          <div><dt className="text-xs text-brand-muted">Status keanggotaan</dt><dd className="font-semibold text-brand-ink">Aktif</dd></div>
          <div><dt className="text-xs text-brand-muted">Nomor anggota</dt><dd className="font-mono font-semibold text-brand-ink">PPIJ-2026-000123</dd></div>
          <div><dt className="text-xs text-brand-muted">Komsat</dt><dd className="font-semibold text-brand-ink">Okayama</dd></div>
          <div><dt className="text-xs text-brand-muted">Korda</dt><dd className="font-semibold text-brand-ink">Kansai</dd></div>
          <div><dt className="text-xs text-brand-muted">Berlaku sampai</dt><dd className="font-semibold text-brand-ink">6 Oktober 2027</dd></div>
        </dl>
      </Card>
      <section aria-labelledby="profile-history-heading">
        <h2 id="profile-history-heading" className="mb-3 flex items-center gap-2 text-lg font-bold text-brand-ink"><IconHistory className="size-5" aria-hidden="true" />Riwayat keanggotaan</h2>
        <ol className="flex flex-col gap-3">
          {history.map((change) => (
            <li key={change.date + change.status}>
              <Card className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-brand-border bg-card p-4">
                <div><p className="font-semibold text-brand-ink">{change.status}</p><p className="text-sm text-brand-muted">{change.reason}</p></div>
                <time className="text-sm text-brand-muted">{change.date}</time>
              </Card>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="profile-minat-heading" className="flex flex-col gap-3">
        <h2 id="profile-minat-heading" className="text-lg font-bold text-brand-ink">Minat</h2>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Label>Tambah atau hapus minat</Label>
          <TagInput values={minat} onChange={(v) => { setMinat(v); setMinatSaved(false); }} suggestions={["Musik", "Olahraga", "Kuliner", "Teknologi"]} placeholder="Cari atau ketik minat" />
          <SaveButton saved={minatSaved} setSaved={setMinatSaved} />
        </form>
      </section>
      <section aria-labelledby="profile-contact-heading">
        <h2 id="profile-contact-heading" className="mb-3 text-lg font-bold text-brand-ink">Kontak dan data tempat tinggal</h2>
        <Card className="rounded-xl border border-brand-border bg-card p-5">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-1.5"><Label htmlFor="pf-nickname">Nama panggilan</Label><Input id="pf-nickname" defaultValue="Darma" autoComplete="nickname" /></div>
            <div className="grid gap-1.5"><Label htmlFor="pf-phone">Telepon / WhatsApp</Label><Input id="pf-phone" type="tel" defaultValue="+81 90-1234-5678" autoComplete="tel" /></div>
            <div className="grid gap-1.5"><Label htmlFor="pf-line">LINE ID</Label><Input id="pf-line" defaultValue="darmakotama" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5"><Label htmlFor="pf-pref">Kode prefektur</Label><Input id="pf-pref" inputMode="numeric" defaultValue="33" /></div>
              <div className="grid gap-1.5"><Label htmlFor="pf-city">Kode kota</Label><Input id="pf-city" inputMode="numeric" defaultValue="33100" /></div>
            </div>
            <div className="grid gap-1.5"><Label htmlFor="pf-expiry">Masa berlaku status tinggal</Label><Input id="pf-expiry" type="date" defaultValue="2027-03-31" /></div>
            <fieldset className="grid gap-4 border-t border-brand-border pt-4">
              <legend className="px-1 text-sm font-bold text-brand-ink">Kontak darurat</legend>
              <div className="grid gap-1.5"><Label htmlFor="pf-em-name">Nama</Label><Input id="pf-em-name" defaultValue="Ni Made Rai" /></div>
              <div className="grid gap-1.5"><Label htmlFor="pf-em-rel">Hubungan</Label><Input id="pf-em-rel" defaultValue="Ibu" /></div>
              <div className="grid gap-1.5"><Label htmlFor="pf-em-phone">Telepon</Label><Input id="pf-em-phone" type="tel" defaultValue="+62 812-3456-7890" /></div>
              <div className="grid gap-1.5"><Label htmlFor="pf-em-addr">Alamat</Label><Textarea id="pf-em-addr" rows={3} defaultValue="Denpasar, Bali" /></div>
            </fieldset>
            <SaveButton saved={kontakSaved} setSaved={setKontakSaved} />
          </form>
        </Card>
      </section>
    </div>
  );
}

export function ProfileView({ onNavigate }: { onNavigate: (view: "portal" | "wizard" | "profile") => void }) {
  const go = (view: "portal" | "wizard" | "profile") => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(view);
  };
  return (
    <PortalShell
      logoSrc={logoUrl}
      navItems={[
        { label: "Beranda", href: "#", icon: <IconHome className="size-5" stroke={1.75} />, onClick: go("portal") },
        { label: "Profil", href: "#", icon: <IconIdBadge2 className="size-5" stroke={1.75} />, current: true },
      ]}
      languages={[{ label: "Bahasa Indonesia", current: true }, { label: "English" }]}
      accountItems={[{ label: "Akun", href: "#" }, { label: "Kebijakan Privasi", href: "#" }, { label: "Syarat Layanan", href: "#" }]}
      helpText="Butuh bantuan? Hubungi pengurus komsatmu atau sekretariat PPI Jepang."
      legalItems={[{ label: "Kebijakan Privasi", href: "#" }, { label: "Syarat Layanan", href: "#" }]}
    >
      <ProfileContent />
    </PortalShell>
  );
}
