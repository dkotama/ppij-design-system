import * as React from "react"

import { cn } from "../lib/utils"

export interface BottomBarItem {
  label: string
  href: string
  icon: React.ReactNode
  current?: boolean
  /** Live count shown as a small badge; zero or undefined shows nothing. */
  badge?: number
}

export interface BottomBarProps {
  items: BottomBarItem[]
  ariaLabel?: string
  className?: string
}

/**
 * Phone bottom navigation for the portal and admin on small screens.
 * The sidebar pattern covers desktop and tablet; below that, the four
 * or five destinations a member reaches daily live here, thumb close.
 * The bar itself is a plain nav element: the application shell pins it
 * to the bottom of the viewport and pads page content clear of it.
 */
export function BottomBar({ items, ariaLabel = "Navigasi utama", className }: BottomBarProps) {
  return (
    <nav
      data-slot="bottom-bar"
      aria-label={ariaLabel}
      className={cn(
        "w-full border-t border-brand-border bg-white pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      <div className="grid" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((item) => (
          <a
            key={item.label + item.href}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={cn(
              "relative flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[11px] no-underline",
              item.current ? "font-semibold text-brand-red" : "text-brand-muted hover:text-brand-ink"
            )}
          >
            <span className="relative">
              {item.icon}
              {item.badge ? (
                <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              ) : null}
            </span>
            <span className="max-w-full truncate">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
