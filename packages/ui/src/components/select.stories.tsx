import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";

const meta: Meta<typeof Select> = { title: "Portal/Select", component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

const items = (
  <>
    <SelectItem value="okayama">Okayama</SelectItem>
    <SelectItem value="tokyo">Tokyo</SelectItem>
    <SelectItem value="osaka">Osaka</SelectItem>
    <SelectItem value="fukuoka">Fukuoka</SelectItem>
  </>
);
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ width: 240 }}><SelectValue placeholder="Pilih komsat" /></SelectTrigger>
      <SelectContent>{items}</SelectContent>
    </Select>
  ),
};
export const WithLabelAndValue: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 6 }}>
      <Label>Komsat</Label>
      <Select defaultValue="okayama">
        <SelectTrigger style={{ width: 240 }}><SelectValue /></SelectTrigger>
        <SelectContent>{items}</SelectContent>
      </Select>
    </div>
  ),
};
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger style={{ width: 240 }}><SelectValue placeholder="Tidak tersedia" /></SelectTrigger>
      <SelectContent>{items}</SelectContent>
    </Select>
  ),
};
