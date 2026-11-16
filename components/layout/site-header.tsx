"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { DropdownNavigation } from "@/components/ui/dropdown-navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-border/70 bg-white/80 shadow-[0_8px_30px_-20px_rgba(14,23,38,0.35)] backdrop-blur-xl" : "border-transparent bg-white",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 min-[400px]:px-5 sm:gap-6 sm:px-8 lg:px-10 2xl:max-w-[1440px]">
        <Logo className="shrink-0" />

        <DropdownNavigation navItems={NAV_ITEMS} className="hidden xl:block" />

        <div className="flex items-center gap-3">
          <Button href="/conferences" size="md" className="hidden sm:inline-flex">
            Upcoming Conferences
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border text-navy xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 72px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-y-auto border-t border-border bg-white xl:hidden"
          >
            <ul className="px-4 py-4 min-[400px]:px-5 sm:px-8">
              {NAV_ITEMS.map((item) => {
                const open = expanded === item.label;
                return (
                  <li key={item.id} className="border-b border-border">
                    {item.subMenus ? (
                      <>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-navy"
                          aria-expanded={open}
                          onClick={() => setExpanded(open ? null : item.label)}
                        >
                          {item.label}
                          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
                        </button>
                        {open && (
                          <div className="space-y-5 pb-5">
                            {item.subMenus.map((sub) => (
                              <div key={sub.title}>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue">
                                  {sub.title}
                                </p>
                                <ul className="space-y-1">
                                  {sub.items.map((s) => (
                                    <li key={s.label}>
                                      <Link
                                        href={s.href ?? "#"}
                                        onClick={close}
                                        className="block py-2 text-[15px] text-muted-foreground hover:text-navy"
                                      >
                                        {s.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={item.link ?? "#"} onClick={close} className="block py-4 text-base font-medium text-navy">
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="px-4 pb-10 pt-4 min-[400px]:px-5 sm:px-8">
              <Button href="/registration" size="lg" className="w-full" onClick={close}>
                Register Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
