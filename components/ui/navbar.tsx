"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, Sparkles, Mic, Calendar, Users, Award, Shield, Cpu, ChevronRight, Mail } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const ctaHref = ctaButton.href ?? (ctaButton.onClick ? undefined : "/#tickets");

  return (
    <header className={`w-full ${className}`}>
      <div className="flex h-24 sm:h-28 items-center justify-between border-b border-border/80">
        {/* Brand Logo (Enlarged and Clear) */}
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
          {logo.title && (
            <span className="font-mono text-xl sm:text-2xl font-bold">{logo.title}</span>
          )}
        </Link>

        {/* Desktop Advanced AI Conference Navigation Menu */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Summit Overview Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-mono tracking-wider text-sm font-bold text-foreground hover:text-primary">
                  SUMMIT
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[480px] lg:w-[560px] lg:grid-cols-[.85fr_1fr]">
                    <li className="row-span-3">
                      <div className="flex h-full w-full flex-col justify-between rounded-xl bg-card p-5 border border-border shadow-xs">
                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold uppercase mb-3">
                            <Sparkles className="w-3 h-3" />
                            <span>Atlas Global 2026</span>
                          </div>
                          <h4 className="font-mono text-base font-bold text-foreground leading-snug">
                            Where Industry Leaders Architect Tomorrow
                          </h4>
                          <p className="text-muted-foreground text-xs font-mono mt-2 leading-relaxed">
                            1,000+ technical founders, researchers, and capital allocators gathering in Hyderabad, India & streaming live worldwide.
                          </p>
                        </div>
                        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-primary font-semibold">
                          <span>Nov 18–20, 2026</span>
                          <span className="flex items-center gap-1">Moscone Center <ChevronRight className="w-3 h-3" /></span>
                        </div>
                      </div>
                    </li>
                    <ListItem href="/about" title="Summit Mission">
                      High-signal, zero-fluff exploration of scalable enterprise AI and venture resilience.
                    </ListItem>
                    <ListItem href="/#solutions" title="Core Tracks">
                      Autonomous agent pipelines, foundation model economics, and sovereign compute.
                    </ListItem>
                    <ListItem href="/#highlights" title="Milestones & Bento">
                      Key stats: 1,000+ attendees, 60-min deep dives, and exclusive research dossiers.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Program & Agenda Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-mono tracking-wider text-sm font-bold text-foreground hover:text-primary">
                  PROGRAM
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-2 p-4 md:w-[520px] md:grid-cols-2">
                    <ListItem href="/#agenda" title="Day 1: Macro Shifts">
                      Opening keynotes on global compute, sovereign AI, and foundational frontiers.
                    </ListItem>
                    <ListItem href="/#agenda" title="Day 2: Enterprise Autonomy">
                      Deep dives into real-world autonomous agents and distributed consensus.
                    </ListItem>
                    <ListItem href="/#agenda" title="Day 3: Capital & Liquidity">
                      Venture allocation, risk parity models, and early-stage secondary markets.
                    </ListItem>
                    <ListItem href="/#agenda" title="Workshops & Hackrooms">
                      Hands-on code masterclasses, architectural teardowns, and live deployments.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Speakers Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-mono tracking-wider text-sm font-bold text-foreground hover:text-primary">
                  SPEAKERS
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[360px] gap-2 p-4">
                    <ListItem href="/#speakers" title="Dr. Michael Stein">
                      Founder & CEO, Atlas Foresight • Autonomous Systems Pioneer.
                    </ListItem>
                    <ListItem href="/#speakers" title="Dr. Sarah Cohen">
                      Head of Market Research, Synapse Labs • Cognitive Architectures.
                    </ListItem>
                    <ListItem href="/#speakers" title="Daniel Brooks">
                      Investment Strategist, Atlas Capital Partners • $1.2B Tech Allocator.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Direct Links */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<a href="/about" className="font-mono tracking-wider text-sm font-bold text-foreground hover:text-primary" />}
                >
                  ABOUT
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<a href="/contact" className="font-mono tracking-wider text-sm font-bold text-foreground hover:text-primary" />}
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

        {/* Action Button & Mobile Drawer */}
        <div className="flex items-center space-x-4">
          {ctaHref ? (
            <Link href={ctaHref}>
              <Button
                variant="default"
                className={`rounded-none hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all ${ctaButton.className || ""}`}
              >
                {ctaButton.text || "GET TICKETS"}{" "}
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Button
              variant="default"
              onClick={ctaButton.onClick}
              className={`rounded-none hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all ${ctaButton.className || ""}`}
            >
              {ctaButton.text || "GET TICKETS"}{" "}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          )}

          {/* Mobile Sheet Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden border border-border">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-4">
                {/* Mobile Drawer Header with Logo */}
                <div className="relative h-14 w-48 overflow-hidden px-2">
                  <Image
                    src={logo.src || "/atlas-logo.png"}
                    alt={logo.alt || "Atlas Conferences & Events"}
                    fill
                    className="object-contain object-left"
                    sizes="200px"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground px-3 py-1">
                    Conference Tracks
                  </div>
                  <a
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-foreground hover:bg-secondary transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Summit Overview</span>
                  </a>
                  <a
                    href="/#agenda"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-foreground hover:bg-secondary transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Full 3-Day Program</span>
                  </a>
                  <a
                    href="/#speakers"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-foreground hover:bg-secondary transition-colors"
                  >
                    <Mic className="w-4 h-4 text-primary" />
                    <span>Featured Keynotes</span>
                  </a>
                  <a
                    href="/#highlights"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-foreground hover:bg-secondary transition-colors"
                  >
                    <Award className="w-4 h-4 text-primary" />
                    <span>Summit Highlights</span>
                  </a>
                  <a
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-mono text-foreground hover:bg-secondary transition-colors"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Contact Us</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      if (ctaButton.onClick) ctaButton.onClick();
                    }}
                    className="w-full cursor-pointer rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-mono flex items-center justify-center gap-2"
                  >
                    {ctaButton.text || "GET TICKETS"}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
          <a
            href={href}
            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          />
        }
      >
        <div className="text-xs font-mono font-bold leading-none text-foreground">{title}</div>
        <p className="line-clamp-2 text-xs font-mono leading-snug text-muted-foreground mt-1.5">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}
