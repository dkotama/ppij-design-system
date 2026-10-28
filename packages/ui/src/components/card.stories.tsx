import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

const meta: Meta<typeof Card> = { title: "Portal/Card", component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Keanggotaan PPIJ</CardTitle>
        <CardDescription>Status pendaftaran anggota</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>Terverifikasi</Badge>
        <p>Data anggota tampil di sini. Kartu memakai token warna dan radius dari sistem desain.</p>
      </CardContent>
      <CardFooter>
        <Button>Lihat profil</Button>
      </CardFooter>
    </Card>
  ),
};
export const Empty: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Dokumen</CardTitle>
        <CardDescription>Belum ada dokumen yang diunggah.</CardDescription>
      </CardHeader>
    </Card>
  ),
};
export const LongText: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Pengumuman dengan judul yang sangat panjang untuk menguji bungkus teks pada kartu</CardTitle>
        <CardDescription>Deskripsi panjang yang menjelaskan isi pengumuman secara rinci agar tata letak tetap rapi pada lebar telepon dan desktop.</CardDescription>
      </CardHeader>
    </Card>
  ),
};
