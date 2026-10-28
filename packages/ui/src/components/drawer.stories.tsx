import type { Meta, StoryObj } from "@storybook/react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./drawer";
import { Button } from "./button";

const meta: Meta<typeof Drawer> = { title: "Admin/Drawer", component: Drawer };
export default meta;
type Story = StoryObj<typeof Drawer>;

export const BottomSheet: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Pilih komsat</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pilih komsat</DrawerTitle>
          <DrawerDescription>Komsat menentukan admin wilayah yang memverifikasi berkas kamu.</DrawerDescription>
        </DrawerHeader>
        <div style={{ padding: "0 16px", display: "grid", gap: 8 }}>
          <Button variant="outline">Okayama</Button>
          <Button variant="outline">Tokyo</Button>
          <Button variant="outline">Osaka</Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild><Button>Batal</Button></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
