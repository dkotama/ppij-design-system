import * as React from "react"
import { IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Input } from "./input"

export interface DataTableProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  actions?: React.ReactNode
  children: React.ReactNode
  footerText?: string
  pageLabel?: string
  onPrevious?: () => void
  onNext?: () => void
  previousDisabled?: boolean
  nextDisabled?: boolean
  previousLabel?: string
  nextLabel?: string
  className?: string
}

/**
 * Presentation shell for admin data tables: a search and actions
 * toolbar, the table itself as children, and a pagination footer.
 * Fetching, sorting state, and row logic stay in the application.
 */
export function DataTable({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  actions,
  children,
  footerText,
  pageLabel,
  onPrevious,
  onNext,
  previousDisabled,
  nextDisabled,
  previousLabel = "Sebelumnya",
  nextLabel = "Berikutnya",
  className,
}: DataTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-brand-border bg-card", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-brand-border p-3">
        {onSearchChange ? (
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <IconSearch size={16} className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-brand-muted" />
            <Input
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-8"
              aria-label={searchPlaceholder}
            />
          </div>
        ) : null}
        {actions ? <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
      <div className="overflow-x-auto">{children}</div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-border px-3 py-2.5">
        <p className="text-xs text-brand-muted">{footerText ?? ""}</p>
        <div className="flex items-center gap-2">
          {pageLabel ? <span className="text-xs text-brand-muted">{pageLabel}</span> : null}
          <Button size="sm" variant="outline" onClick={onPrevious} disabled={previousDisabled}>
            <IconChevronLeft size={14} /> {previousLabel}
          </Button>
          <Button size="sm" variant="outline" onClick={onNext} disabled={nextDisabled}>
            {nextLabel} <IconChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  )
}
