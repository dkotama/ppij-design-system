import * as React from "react"

import { cn } from "../lib/utils"

export interface ViewToggleOption {
  label: string
  href: string
  current?: boolean
}

export interface ViewToggleProps {
  options: ViewToggleOption[]
  ariaLabel: string
  className?: string
}

/**
 * Segmented toggle, generalized from the portal ViewSwitch: a quiet
 * grey track holds the segments; the current side is a white segment
 * with ink text and a small shadow, the other side is muted text.
 * Red is reserved for primary actions and focus, never for navigation
 * state. Navigation arrives as props (labels and hrefs); role and
 * visibility rules stay in the application.
 */
export function ViewToggle({ options, ariaLabel, className }: ViewToggleProps) {
  return (
    <div className={className}>
      <div
        role="group"
        aria-label={ariaLabel}
        className="inline-flex items-center gap-1 rounded-full bg-secondary p-1"
      >
        {options.map((option) => (
          <a
            key={option.label + option.href}
            href={option.href}
            aria-current={option.current ? "page" : undefined}
            className={cn(
              "flex h-10 min-w-24 items-center justify-center rounded-full px-4 text-sm no-underline focus-visible:outline-2 focus-visible:outline-brand-red",
              option.current
                ? "bg-card font-semibold text-brand-ink shadow-sm"
                : "text-muted-foreground hover:text-brand-ink"
            )}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  )
}
