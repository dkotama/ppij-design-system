import type { Meta, StoryObj } from "@storybook/react";
import {
  SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel,
  SidebarInset, SidebarTrigger, SidebarSeparator,
} from "./sidebar";
import { IconHome, IconUsers, IconSettings, IconLogout } from "@tabler/icons-react";

const meta: Meta<typeof Sidebar> = { title: "Admin/Sidebar", component: Sidebar };
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const AdminShell: Story = {
  render: () => (
    <SidebarProvider>
      <div style={{ display: "flex", width: "100%", minHeight: 420, border: "1px solid #e3e5e8", borderRadius: 12, overflow: "hidden" }}>
        <Sidebar>
          <SidebarHeader><strong style={{ padding: "4px 8px" }}>PPIJ Admin</strong></SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton isActive><IconHome size={16} /> Beranda</SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton><IconUsers size={16} /> Anggota</SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton><IconSettings size={16} /> Pengaturan</SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton><IconLogout size={16} /> Keluar</SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div style={{ padding: 16 }}>
            <SidebarTrigger />
            <h3 style={{ margin: "12px 0 4px" }}>Beranda admin</h3>
            <p style={{ color: "#5b6168", margin: 0 }}>Konten halaman tampil di area ini. Sidebar dapat dilipat ke ikon di layar kecil.</p>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};
