import * as React from "react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Card } from "./card"

export type StatusCardTone = "default" | "warning" | "danger" | "info" | "muted"

const TONES: Record<StatusCardTone, string> = {
  default: "border-brand-border bg-card text-brand-ink",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  muted: "border-brand-border bg-secondary text-brand-muted",
}

export interface StatusCardProps {
  /** State icon, shown at size 6 with stroke 1.75 by the caller or as given. */
  icon: React.ReactNode
  title: string
  body?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  tone?: StatusCardTone
  /** Compact: one row, title and action only (the active and expiring states on Beranda). */
  compact?: boolean
  className?: string
}

/**
 * The Beranda status element: one headline that states the member's
 * situation and the single primary action for it. Calm states (active,
 * expiring) use the compact one-row form; states whose body informs
 * (submitted, needs changes, rejected) use the full card. The tone
 * carries urgency: default white, warning amber, danger red, info sky,
 * muted for closed memberships.
 */
export function StatusCard({ icon, title, body, actionLabel, actionHref, onAction, tone = "default", compact = false, className }: StatusCardProps) {
  const action = actionLabel ? (
    <Button asChild={Boolean(actionHref)} onClick={onAction} className={cn("shrink-0 bg-brand-red text-white hover:bg-brand-red/90", compact ? "min-h-11 px-4" : "min-h-11 px-5")}>
      {actionHref ? <a href={actionHref}>{actionLabel}</a> : <span>{actionLabel}</span>}
    </Button>
  ) : null
  if (compact) {
    return (
      <div role="region" aria-label={title} className={cn("flex min-h-[60px] items-center gap-3 rounded-xl border py-2 pr-2 pl-4", TONES[tone], className)}>
        <span className="shrink-0 [&_svg]:size-6">{icon}</span>
        <h2 className="line-clamp-2 min-w-0 flex-1 text-base leading-snug font-bold">{title}</h2>
        {action}
      </div>
    )
  }
  return (
    <Card className={cn("gap-3 rounded-xl border py-5", TONES[tone], className)}>
      <div className="flex items-start gap-3 px-5">
        <span className="mt-0.5 shrink-0 [&_svg]:size-6">{icon}</span>
        <div className="min-w-0">
          <h2 className="text-lg leading-snug font-bold">{title}</h2>
          {body && <p className="mt-1 text-sm">{body}</p>}
        </div>
      </div>
      {action && <div className="px-5">{action}</div>}
    </Card>
  )
}
