import type { Meta, StoryObj } from "@storybook/react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "./empty";
import { Button } from "./button";
import { IconUsers, IconSearch, IconPlus } from "@tabler/icons-react";

const meta: Meta<typeof Empty> = { title: "Portal/Empty", component: Empty };
export default meta;
type Story = StoryObj<typeof Empty>;

export const NoResults: Story = {
  render: () => (
    <Empty style={{ maxWidth: 480 }}>
      <EmptyHeader>
        <EmptyMedia variant="icon"><IconSearch /></EmptyMedia>
        <EmptyTitle>Tidak ada hasil</EmptyTitle>
        <EmptyDescription>Tidak ada anggota yang cocok dengan filter ini. Coba kata kunci lain.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
export const WithAction: Story = {
  render: () => (
    <Empty style={{ maxWidth: 480 }}>
      <EmptyHeader>
        <EmptyMedia variant="icon"><IconUsers /></EmptyMedia>
        <EmptyTitle>Belum ada anggota</EmptyTitle>
        <EmptyDescription>Komsat ini belum memiliki anggota terdaftar.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button><IconPlus size={16} /> Tambah anggota</Button>
      </EmptyContent>
    </Empty>
  ),
};
