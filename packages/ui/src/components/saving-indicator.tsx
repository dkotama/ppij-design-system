import * as React from "react";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import { Spinner } from "./spinner";
import { cn } from "../lib/utils";

export type SavingStatus = "idle" | "saving" | "saved" | "error";

export interface SavingIndicatorProps {
  status: SavingStatus;
  locale?: "id" | "en";
  className?: string;
  savingText?: string;
  savedText?: string;
  errorText?: string;
}

/**
 * Shared accessible saving indicator component.
 * Tailwind only, respects motion-reduce, role="status", screen-reader text, aria-busy.
 */
export function SavingIndicator({
  status,
  locale = "id",
  className,
  savingText,
  savedText,
  errorText,
}: SavingIndicatorProps) {
  if (status === "idle") return null;

  const defaultSaving = locale === "en" ? "Saving…" : "Menyimpan…";
  const defaultSaved = locale === "en" ? "Saved" : "Tersimpan";
  const defaultError = locale === "en" ? "Failed to save" : "Gagal menyimpan";

  const isSaving = status === "saving";
  const isSaved = status === "saved";
  const isError = status === "error";

  return (
    <div
      role="status"
      aria-busy={isSaving}
      data-saving-indicator={status}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium transition-opacity motion-reduce:transition-none",
        isSaving && "text-brand-muted",
        isSaved && "text-emerald-700 dark:text-emerald-400",
        isError && "text-brand-red",
        className
      )}
    >
      {isSaving && <Spinner size="xs" decorative />}
      {isSaved && <IconCheck className="size-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />}
      {isError && <IconAlertCircle className="size-3.5 text-brand-red" aria-hidden="true" />}
      <span>
        {isSaving && (savingText ?? defaultSaving)}
        {isSaved && (savedText ?? defaultSaved)}
        {isError && (errorText ?? defaultError)}
      </span>
    </div>
  );
}
