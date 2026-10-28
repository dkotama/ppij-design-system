import type { Meta, StoryObj } from "@storybook/react";
import { IconHome, IconIdBadge2, IconSchool, IconUsers, IconCalendar } from "@tabler/icons-react";
import { PortalShell } from "./portal-shell";
import { StatusCard } from "./status-card";
import { ServiceTiles } from "./service-tiles";
import { MemberCard } from "./member-card";
import logoUrl from "../../../../brand/ppij-logo.png";

const meta: Meta = { title: "Portal/PortalHome" };
export default meta;
type Story = StoryObj;

/** Beranda as the portal composes it: greeting, compact status, then the member card beside the services. */
export const Active: Story = {
  render: () => (
    <PortalShell
      logoSrc={logoUrl}
      navItems={[
        { label: "Beranda", href: "#", icon: <IconHome className="size-5" stroke={1.75} />, current: true },
        { label: "Profil", href: "#", icon: <IconIdBadge2 className="size-5" stroke={1.75} /> },
      ]}
      languages={[{ label: "Bahasa Indonesia", current: true }, { label: "English" }]}
      accountItems={[{ label: "Akun", href: "#" }, { label: "Kebijakan Privasi", href: "#" }, { label: "Syarat Layanan", href: "#" }]}
      helpText="Butuh bantuan? Hubungi pengurus komsatmu atau sekretariat PPI Jepang."
      legalItems={[{ label: "Kebijakan Privasi", href: "#" }, { label: "Syarat Layanan", href: "#" }]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-brand-ink)", margin: 0 }}>Halo, Darma</h1>
        <StatusCard compact icon={<IconIdBadge2 stroke={1.75} />} title="Kartu anggota aktif" actionLabel="Lihat profil" actionHref="#" />
        <div className="flex flex-col gap-5 md:grid md:grid-cols-[350px_minmax(0,1fr)] md:items-start md:gap-x-8 md:gap-y-6">
          <div className="md:sticky md:top-[72px]">
            <MemberCard name="I Nyoman Darma Kotama" memberId="PPIJ-2026-000123" komsat="Okayama" affiliation="Okayama University" validUntil="Okt 2027" statusLabel="Aktif" />
          </div>
          <ServiceTiles
            groups={[
              { heading: "Layanan nasional", icon: <IconSchool className="size-5" />, tiles: [{ title: "Pemira 2026", href: "#" }, { title: "Informasi beasiswa", href: "#" }, { title: "Layanan konsuler", href: "#" }] },
              { heading: "Korda Kansai", icon: <IconUsers className="size-5" />, tiles: [{ title: "Musyawarah wilayah", href: "#" }, { title: "Buku panduan anggota", href: "#" }] },
              { heading: "Komsat Okayama", icon: <IconCalendar className="size-5" />, tiles: [{ title: "Kalender kegiatan", href: "#" }, { title: "Mentoring mahasiswa baru", href: "#" }] },
            ]}
          />
        </div>
      </div>
    </PortalShell>
  ),
};
