import * as React from "react"
import { IconX, IconPlus } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Badge } from "./badge"

export interface TagInputProps {
  values: string[]
  onChange: (values: string[]) => void
  /** Curated suggestions shown as pills under the field; clicking adds the tag. */
  suggestions?: string[]
  placeholder?: string
  className?: string
}

/**
 * Multi-value field for interests and skills: chosen values sit as
 * removable chips inside the field, typing plus Enter adds a new one,
 * and curated suggestions under the field add with one tap.
 */
export function TagInput({ values, onChange, suggestions = [], placeholder, className }: TagInputProps) {
  const [draft, setDraft] = React.useState("")
  const add = (raw: string) => {
    const value = raw.trim()
    if (value === "" || values.some((v) => v.toLowerCase() === value.toLowerCase())) return
    onChange([...values, value])
    setDraft("")
  }
  const remove = (value: string) => onChange(values.filter((v) => v !== value))
  const available = suggestions.filter((s) => !values.some((v) => v.toLowerCase() === s.toLowerCase()))
  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-card px-2 py-1.5 shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
        {values.map((value) => (
          <Badge key={value} variant="secondary" className="gap-1 pr-1">
            <span>{value}</span>
            <button
              type="button"
              onClick={() => remove(value)}
              aria-label={"Hapus " + value}
              className="flex size-4 items-center justify-center rounded-full outline-none hover:bg-background/60 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <IconX className="size-3" />
            </button>
          </Badge>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault()
              add(draft)
            }
            if (event.key === "Backspace" && draft === "" && values.length > 0) {
              remove(values[values.length - 1])
            }
          }}
          onBlur={() => add(draft)}
          placeholder={values.length === 0 ? placeholder : undefined}
          className="min-w-28 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label={placeholder ?? "Tambah nilai"}
        />
      </div>
      {available.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {available.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => add(suggestion)}
              className="inline-flex items-center gap-1 rounded-full border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground outline-none transition-colors hover:border-brand-red/50 hover:text-brand-ink focus-visible:ring-2 focus-visible:ring-ring"
            >
              <IconPlus className="size-3" />
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
