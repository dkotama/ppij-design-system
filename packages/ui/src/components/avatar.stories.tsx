import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge } from "./avatar";

const meta: Meta<typeof Avatar> = { title: "Portal/Avatar", component: Avatar };
export default meta;
type Story = StoryObj<typeof Avatar>;

export const InitialsFallback: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 10 }}>
      <Avatar><AvatarImage src="https://invalid.example/photo.png" alt="" /><AvatarFallback>DK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>WP</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AS</AvatarFallback></Avatar>
    </div>
  ),
};
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar><AvatarFallback>DK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>WP</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AS</AvatarFallback></Avatar>
      <AvatarGroupCount>+9</AvatarGroupCount>
    </AvatarGroup>
  ),
};
export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>DK</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
};
