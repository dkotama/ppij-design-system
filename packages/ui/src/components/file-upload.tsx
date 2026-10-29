import * as React from "react"
import { IconUpload, IconX, IconFileCheck, IconLoader2, IconAlertTriangle } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import { Button } from "./button"

export type FileUploadStatus = "empty" | "uploading" | "done" | "error"

export interface FileUploadProps {
  /** Field label, for example "Foto kartu anggota". */
  label: string
  /** One quiet line of guidance: accepted formats and maximum size. */
  hint?: string
  accept?: string
  status: FileUploadStatus
  /** Name of the chosen file, shown in the done and error states. */
  fileName?: string
  /** Upload progress from 0 to 100, shown in the uploading state. */
  progress?: number
  /** Error message shown in the error state. */
  errorText?: string
  /** Called with the file the person picked. */
  onPick: (file: File) => void
  /** Called when the person removes the chosen file. */
  onRemove?: () => void
  className?: string
}

/**
 * One file field with its states designed: empty dropzone, uploading
 * with progress, done with the file name and a remove action, error
 * with the reason. The page owns the actual upload; this component
 * renders whichever state the page reports.
 */
export function FileUpload({ label, hint, accept, status, fileName, progress = 0, errorText, onPick, onRemove, className }: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const openPicker = () => inputRef.current?.click()
  return (
    <div className={cn("grid gap-2", className)}>
      <span className="text-sm font-medium">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) onPick(file)
          event.target.value = ""
        }}
      />
      {status === "empty" && (
        <button
          type="button"
          onClick={openPicker}
          className="grid justify-items-center gap-2 rounded-lg border border-dashed border-input bg-card px-4 py-6 text-center outline-none transition-colors hover:border-brand-red/50 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <IconUpload className="size-5" />
          </span>
          <span className="text-sm font-medium text-brand-ink">Pilih berkas atau jatuhkan di sini</span>
          {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        </button>
      )}
      {status === "uploading" && (
        <div className="grid gap-2 rounded-lg border bg-card px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <IconLoader2 className="size-4 animate-spin text-muted-foreground" />
            <span className="font-medium">{fileName}</span>
            <span className="ml-auto text-muted-foreground">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-brand-red transition-all" style={{ width: progress + "%" }} />
          </div>
        </div>
      )}
      {status === "done" && (
        <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-success/10 text-success">
            <IconFileCheck className="size-5" />
          </span>
          <div className="grid min-w-0">
            <span className="truncate text-sm font-medium">{fileName}</span>
            <span className="text-xs text-muted-foreground">Terunggah</span>
          </div>
          {onRemove && (
            <Button type="button" variant="ghost" size="icon-sm" className="ml-auto" onClick={onRemove} aria-label="Hapus berkas">
              <IconX />
            </Button>
          )}
        </div>
      )}
      {status === "error" && (
        <div className="grid gap-2">
          <div className="flex items-center gap-3 rounded-lg border border-destructive/40 bg-card px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              <IconAlertTriangle className="size-5" />
            </span>
            <div className="grid min-w-0">
              <span className="truncate text-sm font-medium">{fileName}</span>
              <span className="text-xs text-destructive">{errorText ?? "Unggahan gagal. Coba lagi."}</span>
            </div>
            <Button type="button" variant="outline" size="sm" className="ml-auto" onClick={openPicker}>
              Coba lagi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
