import * as React from "react"
import { IconCheck } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { MemberCard, MemberCardBack, type MemberCardTheme } from "./member-card"
import { Button } from "./button"
import { AdminDrawer } from "./admin-drawer"
import { SavingIndicator, type SavingStatus } from "./saving-indicator"

export interface CardThemeOption {
  id: string
  label: string
  /** Group heading in the picker, for example "Korda" or "Nusantara". */
  group: string
  /** Base color shown as the tile thumbnail. */
  base: string
  /** Which face theme renders when this option is picked. */
  faceTheme: MemberCardTheme
}

export interface MemberCardBlockProps {
  name: string
  memberId: string
  komsat: string
  affiliation?: string
  validUntil: string
  statusLabel: string
  /** Line printed on the back face under the barcode. */
  backNote: string
  /** Theme options for the picker; an automatic option is added first. */
  themes?: CardThemeOption[]
  /** The actions row shows only while a barcode is available (active, expiring, change pending). */
  barcodeAvailable?: boolean
  barcodeLabel?: string
  downloadLabel?: string
  themeLabel?: string
  onDownload?: () => void
  onThemeChange?: (themeId: string | null) => void
  className?: string
}

/**
 * The member card with its actions, extracted from the portal
 * MemberCardBlock: tapping the card flips it to the barcode back, and
 * the action row carries the same flip as its primary button
 * (Tampilkan barcode), the card download, and Ubah tema, which opens
 * the theme picker drawer with grouped theme tiles and the shared
 * saving indicator. State that is pure presentation (flip, picker,
 * selected tile) lives here; issuing, the real barcode, the PNG
 * render, and preference persistence stay in the application.
 */
export function MemberCardBlock({
  name,
  memberId,
  komsat,
  affiliation,
  validUntil,
  statusLabel,
  backNote,
  themes = [],
  barcodeAvailable = true,
  barcodeLabel = "Tampilkan barcode",
  downloadLabel = "Unduh kartu",
  themeLabel = "Ubah tema",
  onDownload,
  onThemeChange,
  className,
}: MemberCardBlockProps) {
  const [flipped, setFlipped] = React.useState(false)
  const [themeOpen, setThemeOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string | null>(null)
  const [saveState, setSaveState] = React.useState<SavingStatus>("idle")
  const faceTheme: MemberCardTheme = themes.find((t) => t.id === selected)?.faceTheme ?? "red"
  const groups = Array.from(new Set(themes.map((t) => t.group)))

  const pick = (id: string | null) => {
    setSelected(id)
    setSaveState("saving")
    onThemeChange?.(id)
    window.setTimeout(() => setSaveState("saved"), 500)
  }

  const tile = (id: string | null, label: string, base: string | null) => (
    <button
      key={id ?? "auto"}
      type="button"
      role="radio"
      aria-checked={selected === id}
      onClick={() => pick(id)}
      className={cn(
        "grid gap-1.5 rounded-lg border bg-card p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected === id ? "border-brand-red ring-2 ring-brand-red/20" : "border-border hover:border-brand-red/50"
      )}
    >
      <span className="flex h-10 items-center justify-center rounded-md text-xs font-semibold" style={{ background: base ?? "var(--color-secondary)", color: base ? "#ffffff" : undefined }}>
        {base === null ? "Auto" : ""}
      </span>
      <span className="flex items-center justify-between gap-1 text-xs font-medium">
        {label}
        {selected === id && <IconCheck className="size-3.5 text-brand-red" />}
      </span>
    </button>
  )

  return (
    <div className={cn("grid w-full max-w-[420px] gap-3", className)}>
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={name + ". " + (flipped ? "Tampilkan sisi depan" : barcodeLabel)}
        onClick={() => setFlipped(!flipped)}
        className="block w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {flipped ? (
          <MemberCardBack memberId={memberId} note={backNote} className="max-w-none" />
        ) : (
          <MemberCard name={name} memberId={memberId} komsat={komsat} affiliation={affiliation} validUntil={validUntil} statusLabel={statusLabel} theme={faceTheme} className="max-w-none" />
        )}
      </button>
      {barcodeAvailable && (
        <div className="flex flex-wrap gap-2">
          <Button aria-pressed={flipped} onClick={() => setFlipped(!flipped)}>
            {barcodeLabel}
          </Button>
          <Button variant="outline" onClick={onDownload}>
            {downloadLabel}
          </Button>
          <Button variant="outline" aria-haspopup="dialog" aria-expanded={themeOpen} onClick={() => setThemeOpen(true)}>
            {themeLabel}
          </Button>
        </div>
      )}
      <AdminDrawer
        open={themeOpen}
        onOpenChange={setThemeOpen}
        locale="id"
        title="Ubah tema kartu"
        description="Tema tersimpan sebagai preferensi anggota dan berlaku di semua perangkat."
      >
        <div className="mb-3 flex justify-end">
          <SavingIndicator status={saveState} locale="id" />
        </div>
        <div role="radiogroup" aria-label="Tema kartu" className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">{tile(null, "Otomatis", null)}</div>
          {groups.map((group) => (
            <div key={group} className="grid gap-2">
              <h3 className="text-sm font-semibold text-brand-ink">{group}</h3>
              <div className="grid grid-cols-3 gap-2">
                {themes.filter((t) => t.group === group).map((t) => tile(t.id, t.label, t.base))}
              </div>
            </div>
          ))}
        </div>
      </AdminDrawer>
    </div>
  )
}
