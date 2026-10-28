import * as React from "react"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Card } from "./card"

export interface StatCardProps {
  /** What the number counts, for example "Anggota aktif". */
  label: string
  /** The number itself, already formatted by the page. */
  value: string
  /** Tabler icon shown in a quiet chip at the top right. */
  icon?: React.ReactNode
  /** Change against the previous period, for example "+12 bulan ini". */
  delta?: string
  /** Whether the change is good, bad, or neutral. */
  deltaTone?: "success" | "destructive" | "muted"
  /** One quiet line of context under the value. */
  hint?: string
  className?: string
}

/**
 * One dashboard figure: a label, a large value, and the change against
 * the last period in the matching status color. Presentation only; the
 * page computes the numbers.
 */
export function StatCard({ label, value, icon, delta, deltaTone = "muted", hint, className }: StatCardProps) {
  return (
    <Card className={cn("grid gap-2 p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        {icon && (
          <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-muted-foreground [&_svg]:size-4">
            {icon}
          </span>
        )}
      </div>
      <span className="text-3xl font-bold tracking-tight text-brand-ink">{value}</span>
      {(delta || hint) && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {delta && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-medium",
                deltaTone === "success" && "text-success",
                deltaTone === "destructive" && "text-destructive",
                deltaTone === "muted" && "text-muted-foreground"
              )}
            >
              {deltaTone === "success" && <IconTrendingUp className="size-4" />}
              {deltaTone === "destructive" && <IconTrendingDown className="size-4" />}
              {delta}
            </span>
          )}
          {hint && <span className="text-muted-foreground">{hint}</span>}
        </div>
      )}
    </Card>
  )
}
