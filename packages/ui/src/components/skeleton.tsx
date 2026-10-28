import * as React from "react";
import { cn } from "../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  busy?: boolean;
}

/**
 * Shared accessible Skeleton component.
 * Tailwind only, respects motion-reduce with motion-reduce:animate-none,
 * role="status", screen-reader text, aria-busy.
 */
export function Skeleton({
  className,
  label,
  busy = true,
  "aria-hidden": ariaHidden,
  children,
  ...props
}: SkeletonProps) {
  const isHidden = ariaHidden === true || ariaHidden === "true";
  return (
    <div
      role={isHidden ? undefined : "status"}
      aria-busy={isHidden ? undefined : busy}
      aria-hidden={ariaHidden}
      data-skeleton
      className={cn(
        "animate-pulse rounded-md bg-muted motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      {!isHidden && label && <span className="sr-only">{label}</span>}
      {children}
    </div>
  );
}
