import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TagInput } from "./tag-input";
import { Label } from "./label";

const meta: Meta<typeof TagInput> = { title: "Portal/TagInput", component: TagInput };
export default meta;
type Story = StoryObj<typeof TagInput>;

function Demo() {
  const [values, setValues] = React.useState<string[]>(["Robotika"]);
  return (
    <div style={{ display: "grid", gap: 6, maxWidth: 480 }}>
      <Label>Minat dan keahlian</Label>
      <TagInput
        values={values}
        onChange={setValues}
        placeholder="Ketik lalu tekan Enter"
        suggestions={["Robotika", "Bahasa Jepang", "Fotografi", "Kuliner", "Olahraga", "Riset AI", "Musik"]}
      />
    </div>
  );
}

export const Interests: Story = { render: () => <Demo /> };
