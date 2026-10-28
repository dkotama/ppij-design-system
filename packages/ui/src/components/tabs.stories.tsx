import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./card";

const meta: Meta<typeof Tabs> = { title: "Portal/Tabs", component: Tabs };
export default meta;
type Story = StoryObj<typeof Tabs>;

export const ProfileTabs: Story = {
  render: () => (
    <Tabs defaultValue="profil" style={{ maxWidth: 440 }}>
      <TabsList>
        <TabsTrigger value="profil">Profil</TabsTrigger>
        <TabsTrigger value="berkas">Berkas</TabsTrigger>
        <TabsTrigger value="akun">Akun</TabsTrigger>
      </TabsList>
      <TabsContent value="profil">
        <Card><CardHeader><CardTitle>Profil</CardTitle></CardHeader><CardContent>Nama, afiliasi, dan komsat.</CardContent></Card>
      </TabsContent>
      <TabsContent value="berkas">
        <Card><CardHeader><CardTitle>Berkas</CardTitle></CardHeader><CardContent>Dokumen verifikasi yang sudah diunggah.</CardContent></Card>
      </TabsContent>
      <TabsContent value="akun">
        <Card><CardHeader><CardTitle>Akun</CardTitle></CardHeader><CardContent>Email masuk dan keamanan akun.</CardContent></Card>
      </TabsContent>
    </Tabs>
  ),
};
