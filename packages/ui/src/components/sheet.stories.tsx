import type { Meta, StoryObj } from "@storybook/react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "./sheet";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Sheet> = { title: "Admin/Sheet", component: Sheet };
export default meta;
type Story = StoryObj<typeof Sheet>;

export const EditPanel: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Edit profil</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profil</SheetTitle>
          <SheetDescription>Perubahan tersimpan ke profil anggota.</SheetDescription>
        </SheetHeader>
        <div style={{ display: "grid", gap: 10, padding: "0 16px" }}>
          <div style={{ display: "grid", gap: 6 }}><Label>Nama</Label><Input defaultValue="I Nyoman Darma Kotama" /></div>
          <div style={{ display: "grid", gap: 6 }}><Label>Komsat</Label><Input defaultValue="Okayama" /></div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button>Simpan</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
