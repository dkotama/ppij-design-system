import * as React from "react"
import { IconCheck } from "@tabler/icons-react"

import { cn } from "../lib/utils"

export interface TimelineItem {
  title: string
  description?: string
  /** When it happened or will happen, already formatted by the page. */
  time?: string
  state: "complete" | "current" | "upcoming"
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

/**
 * A vertical history: what happened, in order, with the current point
 * marked. Used for profile history and verification status, where the
 * person asks one question: where is my process now.
 */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("grid", className)}>
      {items.map((item, index) => (
        <li key={item.title + index} className="relative flex gap-3 pb-6 last:pb-0">
          {index < items.length - 1 && (
            <span aria-hidden className={cn("absolute top-6 left-[11px] h-[calc(100%-24px)] w-px", item.state === "complete" ? "bg-brand-red" : "bg-border")} />
          )}
          <span
            className={cn(
              "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border",
              item.state === "complete" && "border-brand-red bg-brand-red text-white",
              item.state === "current" && "border-brand-red bg-card ring-4 ring-brand-red/15",
              item.state === "upcoming" && "border-border bg-card"
            )}
          >
            {item.state === "complete" && <IconCheck className="size-3.5" />}
            {item.state === "current" && <span className="size-2 rounded-full bg-brand-red" />}
            {item.state === "upcoming" && <span className="size-2 rounded-full bg-border" />}
          </span>
          <div className="grid gap-0.5 pt-0.5">
            <span className={cn("text-sm", item.state === "upcoming" ? "text-muted-foreground" : "font-medium text-brand-ink")}>{item.title}</span>
            {item.description && <span className="text-sm text-muted-foreground">{item.description}</span>}
            {item.time && <span className="text-xs text-muted-foreground">{item.time}</span>}
          </div>
        </li>
      ))}
    </ol>
  )
}
