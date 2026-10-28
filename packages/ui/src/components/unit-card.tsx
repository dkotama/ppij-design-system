import * as React from "react"
import { IconUsers, IconChevronRight } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Card } from "./card"
import { Badge } from "./badge"

export interface UnitCardProps {
  /** Unit name, for example "Okayama". */
  name: string
  /** Unit kind shown as a quiet badge, for example "Komsat" or "Wilayah". */
  kind: string
  /** Number of members in the unit. */
  memberCount: number
  /** Name of the person who leads the unit. */
  leadName?: string
  /** Status label, for example "Aktif". */
  statusLabel: string
  /** Status badge tone. */
  statusVariant?: "default" | "success" | "warning" | "secondary"
  /** Where the card leads. When set, the whole card is a link. */
  href?: string
  /** Extra actions rendered at the card foot, for example an Edit button. */
  actions?: React.ReactNode
  className?: string
}

/**
 * One organisational unit (komsat, wilayah) as a card: identity first,
 * member count and lead as quiet facts, status as a badge beside the
 * name. Presentation only; membership and permissions stay in the app.
 */
export function UnitCard({
  name,
  kind,
  memberCount,
  leadName,
  statusLabel,
  statusVariant = "success",
  href,
  actions,
  className,
}: UnitCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold text-brand-ink">{name}</span>
            <Badge variant="secondary">{kind}</Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            {leadName ? "Ketua: " + leadName : "Belum ada ketua"}
          </span>
        </div>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <IconUsers className="size-4" />
          {memberCount} anggota
        </span>
        {href ? (
          <IconChevronRight className="size-4 text-muted-foreground" />
        ) : (
          actions
        )}
      </div>
    </>
  )
  const classes = cn("grid gap-4 p-5", className)
  if (href) {
    return (
      <Card className={cn(classes, "transition-colors hover:border-brand-red/40")}>
        <a href={href} className="grid gap-4 no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {body}
        </a>
      </Card>
    )
  }
  return <Card className={classes}>{body}</Card>
}
