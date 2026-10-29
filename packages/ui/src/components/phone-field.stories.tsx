import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PhoneField } from "./phone-field";
import { Label } from "./label";

const meta: Meta<typeof PhoneField> = { title: "Portal/PhoneField", component: PhoneField };
export default meta;
type Story = StoryObj<typeof PhoneField>;

export const MemberPhone: Story = {
  render: () => {
    const [value, setValue] = React.useState("+81 90-1234-5678");
    return (
      <div className="grid max-w-md gap-1.5">
        <Label>Nomor telepon atau WhatsApp</Label>
        <PhoneField value={value} onChange={setValue} defaultCode="+81" />
        <p className="text-sm text-brand-muted">Tersimpan sebagai: {value || "(kosong)"}</p>
      </div>
    );
  },
};

export const EmergencyPhone: Story = {
  render: () => {
    const [value, setValue] = React.useState("+62 812-3456-7890");
    return (
      <div className="grid max-w-md gap-1.5">
        <Label>Nomor telepon kontak</Label>
        <PhoneField value={value} onChange={setValue} defaultCode="+62" />
        <p className="text-sm text-brand-muted">Kontak darurat memakai awalan +62 bila nomor tersimpan tanpa kode negara.</p>
      </div>
    );
  },
};
