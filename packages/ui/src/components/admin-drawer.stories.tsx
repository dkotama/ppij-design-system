import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AdminDrawer } from "./admin-drawer";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof AdminDrawer> = { title: "Admin/AdminDrawer", component: AdminDrawer };
export default meta;
type Story = StoryObj<typeof AdminDrawer>;

function Demo() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  return (
    <div>
      <Button onClick={() => { setStep(1); setOpen(true); }}>Tinjau anggota</Button>
      <AdminDrawer
        open={open}
        onOpenChange={setOpen}
        title="Tinjau anggota"
        description="Periksa berkas, lalu lanjutkan ke konfirmasi."
        locale="id"
        step={step}
        onBack={() => setStep(1)}
        footer={
          step === 1
            ? <Button onClick={() => setStep(2)}>Lanjutkan</Button>
            : <Button onClick={() => setOpen(false)}>Konfirmasi setujui</Button>
        }
      >
        {step === 1 ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "grid", gap: 6 }}><Label>Nama</Label><Input defaultValue="Darma Kotama" readOnly /></div>
            <div style={{ display: "grid", gap: 6 }}><Label>Komsat</Label><Input defaultValue="Okayama" readOnly /></div>
          </div>
        ) : (
          <p>Setujui pendaftaran anggota ini? Status berubah menjadi aktif dan kartu anggota diterbitkan.</p>
        )}
      </AdminDrawer>
    </div>
  );
}
export const TwoStepReview: Story = { render: () => <Demo /> };
