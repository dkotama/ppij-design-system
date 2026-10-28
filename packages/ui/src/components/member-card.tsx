import * as React from "react"

import { cn } from "../lib/utils"
import { Badge } from "./badge"

export type MemberCardTheme = "red" | "ink"

export interface MemberCardProps {
  name: string
  memberId: string
  komsat: string
  affiliation?: string
  validUntil: string
  statusLabel: string
  statusVariant?: "default" | "secondary" | "destructive" | "outline"
  validLabel?: string
  theme?: MemberCardTheme
  className?: string
}

/**
 * Presentation pattern for the PPIJ member card face.
 * Display data arrives as props; issuing, verification, and card state
 * logic stay in the application. The interactive card in the portal
 * (flip, tilt, live barcode) builds on this face.
 */
export function MemberCard({
  name,
  memberId,
  komsat,
  affiliation,
  validUntil,
  statusLabel,
  statusVariant = "secondary",
  validLabel = "Berlaku hingga",
  theme = "red",
  className,
}: MemberCardProps) {
  return (
    <div
      data-slot="member-card"
      className={cn(
        "relative flex aspect-[1.586] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-md",
        theme === "red"
          ? "bg-gradient-to-br from-[#e11436] via-brand-red to-[#8f0c22]"
          : "bg-gradient-to-br from-[#2a2e33] via-brand-ink to-black",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em]">PPI JEPANG</p>
          <p className="text-[10px] text-white/75">Kartu Anggota</p>
        </div>
        <Badge variant={statusVariant}>{statusLabel}</Badge>
      </div>
      <div className="grid gap-1">
        <p className="truncate text-lg leading-tight font-bold">{name}</p>
        <p className="font-mono text-sm tracking-widest text-white/90">{memberId}</p>
        <div className="mt-1 flex items-end justify-between gap-3 text-[11px] text-white/80">
          <span className="min-w-0">
            <span className="block truncate">{komsat}{affiliation ? ` · ${affiliation}` : ""}</span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-[9px] tracking-wider uppercase">{validLabel}</span>
            <span className="text-xs font-semibold text-white">{validUntil}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export interface MemberCardBackProps {
  memberId: string
  note: string
  barcodeLabel?: string
  className?: string
}

/** Back face: deterministic presentation bars derived from the member id. */
export function MemberCardBack({ memberId, note, barcodeLabel = "Nomor anggota", className }: MemberCardBackProps) {
  const bars = Array.from(memberId.replace(/\D/g, "") || "0").map((ch, i) => {
    const w = (Number(ch) % 3) + 1
    return <span key={i} style={{ width: w }} className="inline-block h-full bg-brand-ink" />
  })
  return (
    <div
      data-slot="member-card-back"
      className={cn(
        "flex aspect-[1.586] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-2xl bg-[#f1f1ec] p-5 text-brand-ink shadow-md",
        className
      )}
    >
      <div className="h-8 rounded bg-brand-ink" />
      <div>
        <p className="mb-1 text-[10px] tracking-wider text-brand-muted uppercase">{barcodeLabel}</p>
        <div className="flex h-12 items-stretch gap-[2px] bg-white p-1.5">{bars}</div>
        <p className="mt-1 text-center font-mono text-xs tracking-[0.3em]">{memberId}</p>
      </div>
      <p className="text-[10px] leading-snug text-brand-muted">{note}</p>
    </div>
  )
}
