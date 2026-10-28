import * as React from "react"
import { IconSearch, IconX } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Input } from "./input"
import { Badge } from "./badge"

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
  /** Filter controls, usually Select dropdowns, rendered beside the search field. */
  filters?: React.ReactNode
  /** Currently active filters, rendered as removable chips. */
  activeFilters?: ActiveFilter[]
  /** Clears every active filter at once. Shown when two or more are active. */
  onClearAll?: () => void
  clearAllLabel?: string
  className?: string
}

/**
 * The filter bar above admin lists: one search field, the filter
 * dropdowns beside it, and one removable chip per active filter so the
 * current selection is always visible. Presentation only: the page
 * owns the values, the options, and the filtering itself.
 */
export function SearchFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  filters,
  activeFilters = [],
  onClearAll,
  clearAllLabel = "Hapus semua filter",
  className,
}: SearchFilterProps) {
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
    </div>
  )
}
