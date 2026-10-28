import * as React from "react"

import { cn } from "../lib/utils"

export interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  actions?: React.ReactNode
  className?: string
}

/**
 * Admin page header pattern, following the portal admin convention:
 * a 2xl bold ink title, a muted description, and actions on the right
 * that wrap under the title on narrow screens.
 */
export function PageHeader({ title, description, eyebrow, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-bold tracking-[0.14em] text-brand-red uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="text-2xl leading-tight font-bold text-brand-ink">{title}</h1>
        {description ? <p className="mt-1 max-w-prose text-sm text-brand-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}
