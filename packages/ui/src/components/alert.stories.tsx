import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { IconInfoCircle, IconCircleCheck, IconAlertTriangle } from "@tabler/icons-react";

const meta: Meta<typeof Alert> = { title: "Portal/Alert", component: Alert };
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  render: () => (
    <Alert style={{ maxWidth: 440 }}>
      <IconInfoCircle />
      <AlertTitle>Verifikasi wilayah</AlertTitle>
      <AlertDescription>Berkas kamu sedang diperiksa admin wilayah. Hasilnya muncul di halaman ini.</AlertDescription>
    </Alert>
  ),
};
export const Success: Story = {
  render: () => (
    <Alert style={{ maxWidth: 440 }}>
      <IconCircleCheck />
      <AlertTitle>Terverifikasi</AlertTitle>
      <AlertDescription>Status anggota kamu sudah aktif.</AlertDescription>
    </Alert>
  ),
};
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" style={{ maxWidth: 440 }}>
      <IconAlertTriangle />
      <AlertTitle>Unggahan gagal</AlertTitle>
      <AlertDescription>Ukuran berkas melebihi batas. Kecilkan berkas lalu coba lagi.</AlertDescription>
    </Alert>
  ),
};
