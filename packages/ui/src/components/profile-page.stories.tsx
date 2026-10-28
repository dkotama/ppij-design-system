import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconHistory, IconHome, IconIdBadge2 } from "@tabler/icons-react";
import { PortalShell } from "./portal-shell";
import { PageHeader } from "./page-header";
import { FormPanel } from "./form-panel";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { TagInput } from "./tag-input";
import { SavingIndicator, type SavingStatus } from "./saving-indicator";
// @ts-expect-error Static brand asset; the portal supplies its own served copy.
import logoUrl from "../../../../brand/ppij-logo.png";

/**
 * The member Profil page with the design system applied: content and
 * editors from ppij-identity-sso Profil (membership facts, status
 * history, Minat editor, Kontak form), presented with DS patterns.
 * PageHeader opens the page; the Beranda two-column rhythm puts the
 * facts card and history in a 350px rail and the editors in the main
 * column as FormPanels, each with its own save row and the shared
 * SavingIndicator. Status is a Badge, never plain text.
 */
function SaveRow() {
  const [status, setStatus] = React.useState<SavingStatus>("idle");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="submit"
        disabled={status === "saving"}
        className="min-h-11 px-5"
        onClick={(event) => {
          event.preventDefault();
          setStatus("saving");
          window.setTimeout(() => setStatus("saved"), 900);
        }}
      >
        Simpan perubahan
      </Button>
      <SavingIndicator status={status} locale="id" />
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-0.5">
      <dt className="text-xs text-brand-muted">{label}</dt>
      <dd className="font-semibold text-brand-ink">{children}</dd>
    </div>
  );
}

function ProfileContent() {
  const [minat, setMinat] = React.useState(["Fotografi", "Riset kecerdasan buatan", "Bahasa Jepang"]);
  const history = [
    { status: "Aktif", reason: "Kartu anggota diterbitkan", date: "6 Okt 2026" },
    { status: "Belum lengkap", reason: "Pendaftaran diterima", date: "1 Okt 2026" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Profil" description="Data keanggotaan dan riwayat status Anda." />
      <div className="flex flex-col gap-5 md:grid md:grid-cols-[350px_minmax(0,1fr)] md:items-start md:gap-x-8 md:gap-y-6">
        <div className="flex flex-col gap-5">
          <Card className="gap-4 rounded-xl border border-brand-border bg-card p-5">
            <div className="flex items-center gap-3">
              <IconIdBadge2 className="size-6 shrink-0 text-brand-red" aria-hidden="true" />
              <div className="grid gap-0.5">
                <h2 className="flex flex-wrap items-center gap-2 font-bold text-brand-ink">
                  I Nyoman Darma Kotama
                  <Badge variant="success">Aktif</Badge>
                </h2>
                <p className="text-sm text-brand-muted">darma.kotama@gmail.com</p>
              </div>
            </div>
            <dl className="grid gap-3 border-t border-brand-border pt-4">
              <Fact label="Nomor anggota"><span className="font-mono">PPIJ-2026-000123</span></Fact>
              <Fact label="Komsat">Okayama</Fact>
              <Fact label="Korda">Kansai</Fact>
              <Fact label="Berlaku sampai">6 Oktober 2027</Fact>
            </dl>
          </Card>
          <section aria-labelledby="profile-history-heading">
            <h2 id="profile-history-heading" className="mb-3 flex items-center gap-2 text-lg font-bold text-brand-ink">
              <IconHistory className="size-5 text-brand-red" aria-hidden="true" />
              Riwayat keanggotaan
            </h2>
            <ol className="flex flex-col gap-3">
              {history.map((change) => (
                <li key={change.date + change.status}>
                  <Card className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-brand-border bg-card p-4">
                    <div>
                      <p className="font-semibold text-brand-ink">{change.status}</p>
                      <p className="text-sm text-brand-muted">{change.reason}</p>
                    </div>
                    <time className="text-sm text-brand-muted">{change.date}</time>
                  </Card>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <div className="flex flex-col gap-5">
          <FormPanel title="Minat" titleAs="h2" footer={<SaveRow />}>
            <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
              <Label>Tambah atau hapus minat</Label>
              <TagInput values={minat} onChange={setMinat} suggestions={["Musik", "Olahraga", "Kuliner", "Teknologi"]} placeholder="Cari atau ketik minat" />
            </form>
          </FormPanel>
          <FormPanel title="Kontak dan data tempat tinggal" titleAs="h2" footer={<SaveRow />}>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-1.5"><Label htmlFor="pf-nickname">Nama panggilan</Label><Input id="pf-nickname" defaultValue="Darma" autoComplete="nickname" /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label htmlFor="pf-phone">Telepon / WhatsApp</Label><Input id="pf-phone" type="tel" defaultValue="+81 90-1234-5678" autoComplete="tel" /></div>
                <div className="grid gap-1.5"><Label htmlFor="pf-line">LINE ID</Label><Input id="pf-line" defaultValue="darmakotama" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label htmlFor="pf-pref">Kode prefektur</Label><Input id="pf-pref" inputMode="numeric" defaultValue="33" /></div>
                <div className="grid gap-1.5"><Label htmlFor="pf-city">Kode kota</Label><Input id="pf-city" inputMode="numeric" defaultValue="33100" /></div>
              </div>
              <div className="grid gap-1.5"><Label htmlFor="pf-expiry">Masa berlaku status tinggal</Label><Input id="pf-expiry" type="date" defaultValue="2027-03-31" /></div>
              <fieldset className="grid gap-4 border-t border-brand-border pt-4">
                <legend className="px-1 text-sm font-bold text-brand-ink">Kontak darurat</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1.5"><Label htmlFor="pf-em-name">Nama</Label><Input id="pf-em-name" defaultValue="Ni Made Rai" /></div>
                  <div className="grid gap-1.5"><Label htmlFor="pf-em-rel">Hubungan</Label><Input id="pf-em-rel" defaultValue="Ibu" /></div>
                </div>
                <div className="grid gap-1.5"><Label htmlFor="pf-em-phone">Telepon</Label><Input id="pf-em-phone" type="tel" defaultValue="+62 812-3456-7890" /></div>
                <div className="grid gap-1.5"><Label htmlFor="pf-em-addr">Alamat</Label><Textarea id="pf-em-addr" rows={3} defaultValue="Denpasar, Bali" /></div>
              </fieldset>
            </form>
          </FormPanel>
        </div>
      </div>
    </div>
  );
}

function ProfilePageDemo() {
  return (
    <PortalShell
      logoSrc={logoUrl}
      navItems={[
        { label: "Beranda", href: "#", icon: <IconHome className="size-5" stroke={1.75} /> },
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

const meta: Meta = { title: "Portal/ProfilePage", parameters: { layout: "fullscreen" } };
export default meta;
type Story = StoryObj;
export const Profile: Story = { render: () => <ProfilePageDemo /> };
