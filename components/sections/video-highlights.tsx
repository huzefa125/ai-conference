"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Paste a YouTube/Vimeo embed URL here (e.g. "https://www.youtube.com/embed/VIDEO_ID")
 * to play a real highlights reel. Left empty, the modal shows a "coming soon" message.
 */
const VIDEO_EMBED_URL = "";

const facts = [
  { value: "3 days", label: "of keynotes and workshops" },
  { value: "95", label: "countries represented" },
  { value: "1,200+", label: "research presentations" },
];

/** Highlights video: a rounded light card (not a full-bleed dark band) so it never merges with neighbouring dark sections. */
export function VideoHighlights() {
  const [open, setOpen] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      trigger?.focus();
    };
  }, [open]);

  return (
    <section id="highlights" aria-labelledby="video-heading" className="bg-white py-16 sm:py-20 lg:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Event highlights"
            title="Experience the atmosphere before you arrive"
            description="Keynotes in packed halls, lively poster sessions and conversations that turn into collaborations. Watch the highlights from our most recent conferences."
          />
          <span id="video-heading" className="sr-only">
            Event highlights video
          </span>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {facts.map((f) => (
              <div key={f.label}>
                <dd className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">{f.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-navy-deep text-left shadow-[0_30px_70px_-30px_rgba(7,13,24,0.6)]"
          >
            <Image
              src="/images/keynote.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-20 items-center justify-center rounded-full bg-white text-blue shadow-xl transition-transform duration-300 group-hover:scale-110 sm:size-24">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/40 motion-reduce:hidden" />
                <Play className="relative ml-1 size-8 fill-current" aria-hidden />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              Watch the highlights · 2:30
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Event highlights video"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white/80 hover:text-white"
              >
                <X className="size-5" aria-hidden />
                Close
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-navy-deep">
                {VIDEO_EMBED_URL ? (
                  <iframe
                    src={`${VIDEO_EMBED_URL}?autoplay=1`}
                    title="Event highlights video"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-white/75">
                    <Play className="size-10 text-blue-light" aria-hidden />
                    <p className="font-display text-xl font-bold text-white">Highlights reel coming soon</p>
                    <p className="max-w-md text-sm">The 2026 highlights video will be published here after editing.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
