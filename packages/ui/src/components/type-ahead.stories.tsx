import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TypeAhead } from "./type-ahead";
import { Label } from "./label";

const meta: Meta<typeof TypeAhead> = { title: "Portal/TypeAhead", component: TypeAhead };
export default meta;
type Story = StoryObj<typeof TypeAhead>;

const universities = [
  "Okayama University",
  "Okayama University of Science",
  "Tokyo University",
  "Kyoto University",
  "Osaka University",
  "Nagoya University",
  "Hokkaido University",
  "Tohoku University",
];

function Demo() {
  const [value, setValue] = React.useState("");
  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 420 }}>
      <Label htmlFor="univ">Universitas</Label>
      <TypeAhead id="univ" value={value} onChange={setValue} options={universities} placeholder="Ketik nama universitas" />
      <span style={{ fontSize: 13, color: "var(--color-muted-foreground)" }}>Nilai saat ini: {value || "(kosong)"}</span>
    </div>
  );
}

export const University: Story = { render: () => <Demo /> };
