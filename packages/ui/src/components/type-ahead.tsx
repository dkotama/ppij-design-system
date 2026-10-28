import * as React from "react"
import { IconChevronDown } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Input } from "./input"

export interface TypeAheadProps {
  /** Current text in the field; the chosen option once picked. */
  value: string
  onChange: (value: string) => void
  /** Called when the person picks a suggestion. */
  onSelect?: (value: string) => void
  /** Suggestion source; filtered by the current text inside the component. */
  options: string[]
  placeholder?: string
  id?: string
  className?: string
}

/**
 * A text field with suggestions: the person types, matching options
 * appear under the field, and picking one fills the field. Free text
 * stays allowed; the page decides whether the value must come from the
 * list. Used for institutions, majors, and cities in the wizard.
 */
export function TypeAhead({ value, onChange, onSelect, options, placeholder, id, className }: TypeAheadProps) {
  const [open, setOpen] = React.useState(false)
  const matches = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()) && option !== value).slice(0, 8)
  const showList = open && value.trim() !== "" && matches.length > 0
  return (
    <div className={cn("relative", className)}>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(event) => { onChange(event.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="pr-9"
      />
      <IconChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      {showList && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md" role="listbox" aria-label="Saran">
          {matches.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected="false"
                className="w-full rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent"
                onMouseDown={(event) => {
                  event.preventDefault()
                  onChange(option)
                  onSelect?.(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
