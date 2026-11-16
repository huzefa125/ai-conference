"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavSubItem = {
  label: string;
  description: string;
  icon: React.ElementType;
  href?: string;
};

export type NavItem = {
  id: number;
  label: string;
  /** Plain link when there are no sub menus. */
  link?: string;
  subMenus?: { title: string; items: NavSubItem[] }[];
};

/**
 * Desktop mega-menu navigation. Adapted from a hover dropdown pattern:
 * a shared sliding highlight (layoutId) plus animated panels, with added
 * keyboard support (click / Enter / Escape) and ARIA state.
 */
export function DropdownNavigation({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const triggerClasses =
    "relative flex items-center gap-1 whitespace-nowrap px-3.5 py-2 text-[14px] font-medium text-navy/80 transition-colors duration-200 hover:text-navy xl:px-4";

  return (
    <nav aria-label="Primary" className={className}>
      <ul ref={rootRef} className="flex items-center">
        {navItems.map((item, index) => {
          const hasMenu = !!item.subMenus;
          const isOpen = openMenu === item.label;
          const alignRight = hasMenu && index >= navItems.length - 3;
          const showPill = hovered === item.id || isOpen;

          return (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => {
                setHovered(item.id);
                if (hasMenu) setOpenMenu(item.label);
              }}
              onMouseLeave={() => {
                setHovered(null);
                setOpenMenu(null);
              }}
            >
              {hasMenu ? (
                <button
                  type="button"
                  className={cn(triggerClasses, "group cursor-pointer")}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                >
                  <span className="relative z-10">{item.label}</span>
                  <ChevronDown
                    aria-hidden
                    className={cn("relative z-10 size-3.5 transition-transform duration-300", isOpen && "rotate-180")}
                  />
                  {showPill && <Pill reduce={!!reduce} />}
                </button>
              ) : (
                <Link href={item.link ?? "#"} className={triggerClasses}>
                  <span className="relative z-10">{item.label}</span>
                  {showPill && <Pill reduce={!!reduce} />}
                </Link>
              )}

              <AnimatePresence>
                {isOpen && item.subMenus && (
                  <div className={cn("absolute top-full z-50 pt-2", alignRight ? "right-0" : "left-0")}>
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="w-max rounded-3xl border border-border bg-white/95 p-3 shadow-lift backdrop-blur-xl"
                    >
                      <div className="flex gap-2">
                        {item.subMenus.map((sub) => (
                          <div key={sub.title} className="min-w-[16rem] rounded-2xl p-3 [&:not(:first-child)]:bg-background">
                            <h3 className="mb-2 px-2 font-sans text-xs font-semibold tracking-normal text-muted-foreground">
                              {sub.title}
                            </h3>
                            <ul className="space-y-0.5">
                              {sub.items.map((sub_item) => {
                                const Icon = sub_item.icon;
                                return (
                                  <li key={sub_item.label}>
                                    <Link
                                      href={sub_item.href ?? "#"}
                                      onClick={() => setOpenMenu(null)}
                                      className="group/item flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                                    >
                                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors duration-300 group-hover/item:bg-blue group-hover/item:text-white">
                                        <Icon className="size-[18px]" aria-hidden />
                                      </span>
                                      <span className="leading-5">
                                        <span className="block text-sm font-semibold text-navy">{sub_item.label}</span>
                                        <span className="block text-xs text-muted-foreground transition-colors group-hover/item:text-navy">
                                          {sub_item.description}
                                        </span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Pill({ reduce }: { reduce: boolean }) {
  return (
    <motion.span
      layoutId={reduce ? undefined : "nav-hover-pill"}
      className="absolute inset-0 rounded-full bg-accent"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      aria-hidden
    />
  );
}
