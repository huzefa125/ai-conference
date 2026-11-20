"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Sparkles, ChevronRight, MapPin } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu-1";
import { CONFERENCES } from "@/lib/conferences-data";
import { POSTS_BY_DATE } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  href: string;
}

export interface NavbarLogo {
  src?: string;
  alt?: string;
  href?: string;
  title?: string;
}

export interface NavbarCta {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface NavbarProps {
  logo?: NavbarLogo;
  navigationItems?: NavItem[];
  ctaButton?: NavbarCta;
  className?: string;
}

const FLAGSHIP = CONFERENCES[0];
const OTHER_EVENTS = CONFERENCES.slice(1);
const LATEST_POSTS = POSTS_BY_DATE.slice(0, 3);

/** Home is active only on "/"; other sections also stay active on their sub-pages (e.g. /blog/post). */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const topItem = "tracking-wider text-sm font-bold hover:text-primary";

export function Navbar({
  logo = {
    src: "/atlas-logo.png",
    alt: "Atlas Conferences & Events",
    href: "/",
  },
  ctaButton = {
    text: "GET TICKETS",
  },
  className = "",
}: NavbarProps) {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const ctaHref = ctaButton.href ?? (ctaButton.onClick ? undefined : "/#tickets");
  const color = (href: string) => (isActive(pathname, href) ? "text-primary" : "text-foreground");
  const close = () => setMobileOpen(false);

  return (
    <header className={`w-full ${className}`}>
      <div className="flex h-24 sm:h-28 items-center justify-between border-b border-border/80">
        {/* Brand logo */}
        <Link href={logo.href || "/"} className="flex items-center gap-3 group shrink-0">
          <div className="relative h-16 sm:h-20 w-56 sm:w-72 md:w-80 overflow-hidden flex items-center">
            <Image
              src={logo.src || "/atlas-logo.png"}
              alt={logo.alt || "Atlas Conferences & Events"}
              fill
              priority
              className="object-contain object-left group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 240px, 320px"
            />
          </div>
          {logo.title && <span className="text-xl sm:text-2xl font-bold">{logo.title}</span>}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/" aria-current={isActive(pathname, "/") ? "page" : undefined} className={cn(topItem, color("/"))} />}
                >
                  HOME
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/about" aria-current={isActive(pathname, "/about") ? "page" : undefined} className={cn(topItem, color("/about"))} />}
                >
                  ABOUT
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Conferences dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(topItem, color("/conferences"))}>CONFERENCES</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[480px] lg:w-[580px] lg:grid-cols-[.9fr_1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink
                        render={
                          <Link
                            href={FLAGSHIP.href}
                            className="flex h-full w-full flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-colors hover:border-primary/40"
                          />
                        }
                      >
                        <div>
                          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-primary">
                            <Sparkles className="h-3 w-3" />
                            <span>{FLAGSHIP.status}</span>
                          </div>
                          <h4 className="text-base font-bold leading-snug text-foreground">{FLAGSHIP.name}</h4>
                          <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">{FLAGSHIP.summary}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-border/60 pt-4 font-mono text-[11px] font-semibold text-primary">
                          <span>{FLAGSHIP.dates}</span>
                          <span className="flex items-center gap-1">
                            {FLAGSHIP.city.split(",")[0]} <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    {OTHER_EVENTS.map((c) => (
                      <ListItem key={c.slug} href={c.href} title={c.name}>
                        {c.city} · {c.dates}
                      </ListItem>
                    ))}
                    <li>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="/conferences"
                            className="flex flex-row items-center gap-1.5 rounded-lg p-3 font-mono text-xs font-bold text-primary hover:bg-accent"
                          />
                        }
                      >
                        All conferences <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Blog dropdown: latest posts */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(topItem, color("/blog"))}>BLOG</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[380px] gap-1 p-4">
                    {LATEST_POSTS.map((p) => (
                      <ListItem key={p.slug} href={`/blog/${p.slug}`} title={p.title}>
                        {p.category} · {p.readTime}
                      </ListItem>
                    ))}
                    <li className="mt-1 border-t border-border/60 pt-1">
                      <NavigationMenuLink
                        render={
                          <Link href="/blog" className="flex flex-row items-center gap-1.5 rounded-lg p-3 font-mono text-xs font-bold text-primary hover:bg-accent" />
                        }
                      >
                        All posts <ArrowRight className="h-3.5 w-3.5 text-primary" />
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/contact" aria-current={isActive(pathname, "/contact") ? "page" : undefined} className={cn(topItem, color("/contact"))} />}
                >
                  CONTACT
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>

            <NavigationMenuPositioner>
              <NavigationMenuPopup />
            </NavigationMenuPositioner>
          </NavigationMenu>
        </div>

        {/* Action button & mobile drawer */}
        <div className="flex items-center space-x-4">
          {ctaHref ? (
            <Link href={ctaHref}>
              <Button
                variant="default"
                className={`rounded-none hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground  shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all ${ctaButton.className ||""}`}
              >
                {ctaButton.text || "GET TICKETS"} <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="default"
              onClick={ctaButton.onClick}
              className={`rounded-none hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground  shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all ${ctaButton.className ||""}`}
            >
              {ctaButton.text || "GET TICKETS"} <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}

          {/* Mobile sheet menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden border border-border">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-5 mt-4">
                <div className="relative h-14 w-48 overflow-hidden px-2">
                  <Image src={logo.src || "/atlas-logo.png"} alt={logo.alt || "Atlas Conferences & Events"} fill className="object-contain object-left" sizes="200px" />
                </div>

                <nav aria-label="Mobile" className="space-y-1">
                  <MobileLink href="/" label="Home" active={isActive(pathname, "/")} onClick={close} />
                  <MobileLink href="/about" label="About" active={isActive(pathname, "/about")} onClick={close} />

                  <MobileGroup label="Conferences" href="/conferences" active={isActive(pathname, "/conferences")} onClick={close}>
                    {CONFERENCES.map((c) => (
                      <Link
                        key={c.slug}
                        href={c.href}
                        onClick={close}
                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
                      >
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>
                          {c.name}
                          <span className="block text-xs text-muted-foreground">
                            {c.city} · {c.dates}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </MobileGroup>

                  <MobileGroup label="Blog" href="/blog" active={isActive(pathname, "/blog")} onClick={close}>
                    {LATEST_POSTS.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        onClick={close}
                        className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </MobileGroup>

                  <MobileLink href="/contact" label="Contact" active={isActive(pathname, "/contact")} onClick={close} />
                </nav>

                <div className="pt-4 border-t border-border">
                  {ctaHref ? (
                    <Link
                      href={ctaHref}
                      onClick={close}
                      className="flex w-full items-center justify-center gap-2 bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {ctaButton.text || "GET TICKETS"} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Button
                      onClick={() => {
                        close();
                        ctaButton.onClick?.();
                      }}
                      className="w-full cursor-pointer rounded-none bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                    >
                      {ctaButton.text || "GET TICKETS"} <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link
            href={href}
            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          />
        }
      >
        <div className="text-xs font-mono font-bold leading-snug text-foreground">{title}</div>
        <p className="line-clamp-2 text-xs font-mono leading-snug text-muted-foreground mt-1.5">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

function MobileLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-sm font-bold uppercase tracking-wider transition-colors",
        active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4 opacity-50" />
    </Link>
  );
}

function MobileGroup({
  label,
  href,
  active,
  onClick,
  children,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <MobileLink href={href} label={label} active={active} onClick={onClick} />
      <div className="ml-3 border-l border-border pl-2">{children}</div>
    </div>
  );
}
