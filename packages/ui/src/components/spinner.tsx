import * as React from "react";
import { cn } from "../lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  decorative?: boolean;
}

const sizeClasses = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

/**
 * Shared accessible Spinner component.
 * Tailwind only, respects motion-reduce with motion-reduce:animate-none.
 * When decorative={false} (default), renders role="status" with aria-busy and sr-only label.
 * When decorative={true} (used inside buttons or status containers with visible text),
 * renders aria-hidden svg without nested role="status" announcements.
 */
export function Spinner({
  className,
  label = "Memuat…",
  size = "md",
  decorative = false,
  ...props
}: SpinnerProps) {
  const svg = (
    <svg
      className={cn(
        "animate-spin motion-reduce:animate-none text-current",
        sizeClasses[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      data-spinner
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (decorative) {
    return svg;
  }

  return (
    <span role="status" aria-busy="true" className="inline-flex items-center justify-center">
      {svg}
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}
