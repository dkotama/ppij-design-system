import * as React from "react"
import { IconCheck, IconLanguage, IconUserCircle } from "@tabler/icons-react"

import { cn } from "../lib/utils"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "./dropdown-menu"

export interface PortalNavItem {
  label: string
  href: string
  /** Tabler icon element, shown in the phone bottom nav. */
  icon: React.ReactNode
  current?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export interface PortalLanguage {
  label: string
  current?: boolean
  onSelect?: () => void
}

export interface PortalShellProps {
  /** Logo image source; the consuming app serves it (in the portal app: /ppij-logo.png). */
  logoSrc: string
  logoAlt?: string
  /** The word beside the logo, separated by a thin divider. */
  brandWord?: string
  homeHref?: string
  /** Primary navigation. Beranda is always present; Profil appears for active members, Verifikasi while a decision is pending. The shell renders what it is given. */
  navItems: PortalNavItem[]
  languages: PortalLanguage[]
  languageLabel?: string
  accountItems: { label: string; href: string }[]
  accountLabel?: string
  /** Slot for the Portal|Admin switch, rendered before the language control. */
  viewSwitch?: React.ReactNode
  /** Slot under the header, for example the offline banner. */
  banner?: React.ReactNode
  skipLabel?: string
  helpText?: string
  legalItems?: { label: string; href: string }[]
  children: React.ReactNode
  className?: string
}

/**
 * The portal chrome, extracted from the portal AppShell: sticky white
 * top bar with the brand lockup (logo, divider, the word Portal),
 * desktop navigation inside the bar, an icon-only language menu with
 * the current language checked, an icon-only account menu, and a fixed
 * bottom nav on phones whose columns follow the item count. Content
 * sits in a max-w-5xl column with room for the bottom nav. All state
 * (who is signed in, which nav applies) stays in the application.
 */
export function PortalShell({
  logoSrc,
  logoAlt = "PPI Jepang",
  brandWord = "Portal",
  homeHref = "#",
  navItems,
  languages,
  languageLabel = "Bahasa",
  accountItems,
  accountLabel = "Menu akun",
  viewSwitch,
  banner,
  skipLabel = "Lewati ke konten",
  helpText,
  legalItems = [],
  children,
  className,
}: PortalShellProps) {
  const navList = (mobile: boolean) => (
    <nav aria-label="Portal" className={mobile ? "fixed inset-x-0 bottom-0 z-40 border-t border-brand-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden" : "hidden md:block"}>
      <ul
        className={mobile ? "grid" : "flex items-center gap-1"}
        style={mobile ? { gridTemplateColumns: "repeat(" + navItems.length + ", minmax(0, 1fr))" } : undefined}
      >
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={item.onClick}
              aria-current={item.current ? "page" : undefined}
              className={
                mobile
                  ? cn("flex min-h-14 w-full flex-col items-center justify-center gap-0.5 px-1 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-brand-red", item.current ? "text-brand-red" : "text-brand-muted")
                  : cn("flex min-h-11 items-center rounded-md px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-brand-red", item.current ? "text-brand-red" : "text-brand-muted hover:text-brand-ink")
              }
            >
              {mobile ? item.icon : null}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className={cn("min-h-dvh bg-brand-bg text-brand-ink", className)}>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:font-semibold focus:outline-2 focus:outline-brand-red"
      >
        {skipLabel}
      </a>
      <header className="sticky top-0 z-40 border-b border-brand-border bg-card">
        <div className="mx-auto flex min-h-14 max-w-5xl flex-wrap items-center justify-between gap-x-2 gap-y-1 px-4">
          <a href={homeHref} className="flex min-h-11 min-w-0 items-center gap-2 rounded-md text-brand-ink no-underline focus-visible:outline-2 focus-visible:outline-brand-red">
            <img className="block h-10 w-auto shrink-0" src={logoSrc} alt={logoAlt} width={58} height={40} />
            <span className="border-l border-brand-border pl-3 text-xl leading-7 font-bold whitespace-nowrap">{brandWord}</span>
          </a>
          {navList(false)}
          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-1">
            {viewSwitch}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                aria-label={languageLabel}
                className="flex size-11 shrink-0 items-center justify-center rounded-md text-brand-muted hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-red data-[state=open]:text-brand-ink"
              >
                <IconLanguage className="size-5" stroke={1.75} aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {languages.map((language) => (
                  <DropdownMenuItem key={language.label} className="min-h-11 justify-between" onSelect={language.onSelect}>
                    {language.label}
                    {language.current ? <IconCheck className="size-4" aria-hidden="true" /> : null}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                aria-label={accountLabel}
                className="flex size-11 shrink-0 items-center justify-center rounded-md text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-red data-[state=open]:bg-secondary"
              >
                <IconUserCircle className="size-6" stroke={1.75} aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {accountItems.map((item) => (
                  <DropdownMenuItem key={item.label} className="min-h-11" asChild>
                    <a href={item.href}>{item.label}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {banner}
      <main id="konten" className="mx-auto max-w-5xl px-4 pt-6 pb-28 md:pb-10">
        {children}
        {(helpText || legalItems.length > 0) && (
          <footer className="mx-auto mt-8 max-w-3xl border-t border-brand-border pt-4 text-sm">
            {helpText && <p className="text-brand-muted">{helpText}</p>}
            {legalItems.length > 0 && (
              <nav aria-label="Legal" className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1">
                {legalItems.map((item) => (
                  <a key={item.label} href={item.href} className="flex min-h-11 items-center font-normal text-brand-muted underline-offset-4 hover:text-brand-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand-red">
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </footer>
        )}
      </main>
      {navList(true)}
    </div>
  )
}
