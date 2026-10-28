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
 * Segmented pill toggle, generalized from the portal ViewSwitch:
 * the current side is filled PPIJ red and marked aria-current, the
 * other side is quiet ink. Navigation arrives as props (labels and
 * hrefs); role and visibility rules stay in the application.
 */
export function ViewToggle({ options, ariaLabel, className }: ViewToggleProps) {
  return (
    <div className={className}>
      <div
        role="group"
        aria-label={ariaLabel}
        className="inline-flex items-center rounded-full border border-brand-border bg-card p-0.5"
      >
        {options.map((option) => (
          <a
            key={option.label + option.href}
            href={option.href}
            aria-current={option.current ? "page" : undefined}
            className={cn(
              "flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold no-underline focus-visible:outline-2 focus-visible:outline-brand-red",
              option.current ? "bg-brand-red text-white" : "text-brand-ink hover:text-brand-red"
            )}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  )
}
