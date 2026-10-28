import * as React from "react"
import { IconChevronDown, IconLogout } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Avatar, AvatarFallback } from "./avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "./dropdown-menu"

export interface AccountMenuItem {
  label: string
  href: string
  icon?: React.ReactNode
}

export interface AccountMenuProps {
  /** The signed-in person's name. */
  name: string
  /** One quiet line under the name, for example the komsat. */
  detail?: string
  /** Initials for the avatar fallback. */
  initials: string
  items: AccountMenuItem[]
  signOutLabel?: string
  onSignOut?: () => void
  className?: string
}

/**
 * The profile navbar piece: avatar and name in the top bar, opening the
 * one account menu (profile, account, sign out). Logout lives here and
 * nowhere else, matching the portal shell rule.
 */
export function AccountMenu({ name, detail, initials, items, signOutLabel = "Keluar", onSignOut, className }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-full py-1 pr-2 pl-1 outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
            className
          )}
          aria-label={"Menu akun " + name}
        >
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-left leading-tight md:grid">
            <span className="max-w-44 truncate text-sm font-semibold text-brand-ink">{name}</span>
            {detail && <span className="max-w-44 truncate text-xs text-muted-foreground">{detail}</span>}
          </span>
          <IconChevronDown className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <span className="grid">
            <span className="truncate">{name}</span>
            {detail && <span className="truncate text-xs font-normal text-muted-foreground">{detail}</span>}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <a href={item.href}>
              {item.icon}
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => onSignOut?.()} variant="destructive">
          <IconLogout />
          {signOutLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
