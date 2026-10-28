import * as React from "react"
import { cn } from "../lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

type FormPanelProps = {
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /**
   * Element for the panel title. "div" (default) keeps step pages to their single h1; review
   * screens pass "h2" so each section is a navigable heading.
   */
  titleAs?: "div" | "h2"
}

export function FormPanel({ title, description, children, footer, className, titleAs = "div" }: FormPanelProps) {
  const titleNode = titleAs === "h2"
    ? <CardTitle><h2 className="text-base leading-snug font-semibold">{title}</h2></CardTitle>
    : <CardTitle>{title}</CardTitle>
  return (
    <Card className={cn("bg-card py-4 shadow-none sm:py-6", className)}>
      <CardHeader className="px-4 sm:px-6">
        {titleNode}
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="px-4 sm:px-6">{children}</CardContent>
      {footer ? <CardFooter className="px-4 sm:px-6">{footer}</CardFooter> : null}
    </Card>
  )
}
