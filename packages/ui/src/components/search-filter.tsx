import * as React from "react"
import { IconSearch, IconX, IconAdjustmentsHorizontal } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Input } from "./input"
import { Badge } from "./badge"
import { Button } from "./button"
import { AdminDrawer } from "./admin-drawer"

export interface ActiveFilter {
  /** Group name shown before the value, for example "Komsat". */
  label: string
  /** The chosen value, for example "Okayama". */
  value: string
  /** Removes this filter. */
  onRemove: () => void
}

export interface SearchFilterProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  /** The one or two quick filters that stay visible beside the search field. */
  filters?: React.ReactNode
  /**
   * Advanced filter fields, hidden behind the filter icon button and
   * shown in a drawer (right on desktop, bottom sheet on phone).
   * Use this when a page has more filters than the bar can hold.
   */
  advancedFilters?: React.ReactNode
  /** How many advanced filters are active; shown as a count on the icon button. */
  advancedActiveCount?: number
  advancedTitle?: string
  /** Currently active filters, rendered as removable chips. */
  activeFilters?: ActiveFilter[]
  /** Clears every active filter at once. Shown when two or more are active. */
  onClearAll?: () => void
  clearAllLabel?: string
  className?: string
}

/**
 * The filter bar above admin lists: one search field, one or two quick
 * filters, and every further filter behind the filter icon, which opens
 * them in a drawer. One removable chip per active filter keeps the
 * current selection visible even while the advanced filters are hidden.
 * Presentation only: the page owns the values and the filtering itself.
 */
export function SearchFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  filters,
  advancedFilters,
  advancedActiveCount = 0,
  advancedTitle = "Filter lanjutan",
  activeFilters = [],
  onClearAll,
  clearAllLabel = "Hapus semua filter",
  className,
}: SearchFilterProps) {
  const [advancedOpen, setAdvancedOpen] = React.useState(false)
  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <IconSearch className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            className="pr-9 pl-9"
            aria-label={searchPlaceholder}
          />
          {searchValue !== "" && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Hapus kata kunci"
              className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              <IconX className="size-3.5" />
            </button>
          )}
        </div>
        {filters}
        {advancedFilters && (
          <span className="relative inline-flex">
            <Button type="button" variant="outline" onClick={() => setAdvancedOpen(true)} aria-label={advancedTitle}>
              <IconAdjustmentsHorizontal />
              <span className="max-sm:hidden">Filter</span>
            </Button>
            {advancedActiveCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-semibold text-white">
                {advancedActiveCount}
              </span>
            )}
          </span>
        )}
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map((filter) => (
            <Badge key={filter.label + filter.value} variant="secondary" className="gap-1 pr-1">
              <span>
                {filter.label}: {filter.value}
              </span>
              <button
                type="button"
                onClick={filter.onRemove}
                aria-label={"Hapus filter " + filter.label + " " + filter.value}
                className="flex size-4 items-center justify-center rounded-full outline-none hover:bg-background/60 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <IconX className="size-3" />
              </button>
            </Badge>
          ))}
          {activeFilters.length > 1 && onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="ml-1 text-sm font-medium text-brand-red outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              {clearAllLabel}
            </button>
          )}
        </div>
      )}
      {advancedFilters && (
        <AdminDrawer
          open={advancedOpen}
          onOpenChange={setAdvancedOpen}
          title={advancedTitle}
          description="Filter tambahan untuk mempersempit daftar. Hasil berubah saat filter dipilih."
          locale="id"
          footer={<Button onClick={() => setAdvancedOpen(false)}>Terapkan filter</Button>}
        >
          <div className="grid gap-4">{advancedFilters}</div>
        </AdminDrawer>
      )}
    </div>
  )
}
