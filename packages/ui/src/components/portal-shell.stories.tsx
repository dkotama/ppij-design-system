import type { Meta, StoryObj } from "@storybook/react";
import { IconHome, IconIdBadge2, IconShieldCheck } from "@tabler/icons-react";
import { PortalShell } from "./portal-shell";
import logoUrl from "../../../../brand/ppij-logo.png";

const meta: Meta<typeof PortalShell> = { title: "Portal/PortalShell", component: PortalShell };
export default meta;
type Story = StoryObj<typeof PortalShell>;

const account = [
  { label: "Akun", href: "#" },
  { label: "Kebijakan Privasi", href: "#" },
  { label: "Syarat Layanan", href: "#" },
];
const languages = [{ label: "Bahasa Indonesia", current: true }, { label: "English" }];

export const ActiveMember: Story = {
  render: () => (
    <PortalShell
      logoSrc={logoUrl}
      navItems={[
        { label: "Beranda", href: "#", icon: <IconHome className="size-5" stroke={1.75} />, current: true },
        { label: "Profil", href: "#", icon: <IconIdBadge2 className="size-5" stroke={1.75} /> },
      ]}
      languages={languages}
      accountItems={account}
      helpText="Butuh bantuan? Hubungi pengurus komsatmu atau sekretariat PPI Jepang."
      legalItems={[{ label: "Kebijakan Privasi", href: "#" }, { label: "Syarat Layanan", href: "#" }]}
    >
      <p style={{ color: "var(--color-muted-foreground)" }}>Konten halaman tampil di sini, dalam kolom max-w-5xl. Di ponsel, navigasi pindah ke bilah bawah.</p>
    </PortalShell>
  ),
};

export const PendingVerification: Story = {
  render: () => (
    <PortalShell
      logoSrc={logoUrl}
      navItems={[
        { label: "Beranda", href: "#", icon: <IconHome className="size-5" stroke={1.75} />, current: true },
        { label: "Verifikasi", href: "#", icon: <IconShieldCheck className="size-5" stroke={1.75} /> },
      ]}
      languages={languages}
      accountItems={account}
    >
      <p style={{ color: "var(--color-muted-foreground)" }}>Selama keputusan pendaftaran tertunda, item kedua adalah Verifikasi, bukan Profil.</p>
    </PortalShell>
  ),
};
