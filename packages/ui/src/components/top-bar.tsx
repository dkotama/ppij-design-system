import * as React from "react"

import { cn } from "../lib/utils"

export interface TopBarLink {
  label: string
  href: string
  current?: boolean
}

export interface TopBarProps {
  /** Brand lockup node, usually the logo plus wordmark or the wordmark alone. */
  brand: React.ReactNode
  brandHref?: string
  links?: TopBarLink[]
  /** Right side nodes: language text action, sign-in button, bell, avatar. */
  actions?: React.ReactNode
  className?: string
}

/**
 * Top navigation bar pattern for the public site and the portal.
 * Brand left, section links in the middle, quiet actions right.
 * The language switch stays a quiet text action, never boxed codes.
 * On narrow screens the links hide and the caller provides a menu
 * through the actions slot.
 */
export function TopBar({ brand, brandHref = "/", links = [], actions, className }: TopBarProps) {
  return (
    <header
      data-slot="top-bar"
      className={cn("w-full border-b border-brand-border bg-white", className)}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href={brandHref} className="flex shrink-0 items-center gap-2 text-brand-ink no-underline">
          {brand}
        </a>
        {links.length > 0 ? (
          <nav aria-label="Utama" className="ml-2 hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.label + link.href}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm no-underline",
                  link.current
                    ? "font-semibold text-brand-red"
                    : "text-brand-ink hover:bg-brand-bg hover:text-brand-red"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
        {actions ? <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}
