import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  name: string;
  /** Subtitle under the name (role or focus area). */
  subtitle: string;
  /** Original photo path, e.g. /images/speaker-1.jpg. The cut-out is read from /images/cutouts/speaker-1.png. */
  image?: string;
  className?: string;
};

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Prof\.)\s+/, "")
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export function cutoutPath(image?: string) {
  if (!image) return undefined;
  return image.replace("/images/", "/images/cutouts/").replace(/\.jpg$/, ".png");
}

/**
 * Dark speaker card with a faint line pattern, name and role at the top, and a
 * background-removed portrait at the bottom. Grows and turns blue on hover.
 */
export function SpeakerCutoutCard({ slug, name, subtitle, image, className }: Props) {
  const cut = cutoutPath(image);
  return (
    <Link
      href={`/speakers/${slug}`}
      className={cn(
        "group relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-[#0d1b3a] text-center text-white shadow-[0_30px_50px_-30px_rgba(7,13,24,0.8)] transition-all duration-300 ease-out",
        "hover:z-10 hover:scale-[1.08] hover:bg-blue hover:shadow-[0_40px_70px_-20px_rgba(47,91,234,0.75)]",
        "focus-visible:z-10 focus-visible:scale-[1.08] focus-visible:bg-blue",
        className,
      )}
    >
      {/* Concentric line pattern */}
      <svg aria-hidden className="absolute inset-0 size-full opacity-[0.12]" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
        {[60, 100, 140, 180, 220, 260].map((r) => (
          <circle key={r} cx="150" cy="260" r={r} fill="none" stroke="white" strokeWidth="1" />
        ))}
      </svg>
      {/* Blue glow behind the person */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-3/4 bg-[radial-gradient(ellipse_at_50%_85%,rgba(47,91,234,0.9),transparent_70%)] transition-opacity duration-300",
          "opacity-30 group-hover:opacity-100 group-focus-visible:opacity-100",
        )}
      />

      <div className="relative px-3 pt-5">
        <p className="font-display text-sm font-bold sm:text-base">{name}</p>
        <p className="mt-1 text-xs text-white/60 sm:text-sm">{subtitle}</p>
      </div>

      {/* Reserved space under the portrait holds the Profile button, so it never covers the person */}
      <div className="relative mt-4 flex-1 pb-16">
        <div className="relative size-full">
        {cut ? (
          <Image
            src={cut}
            alt=""
            fill
            sizes="(min-width: 1024px) 22vw, 45vw"
            className={cn(
              "object-contain object-bottom transition duration-500 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]",
              "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0",
            )}
          />
        ) : (
          <div className="flex size-full items-end justify-center">
            <span className="flex size-24 items-center justify-center rounded-full bg-white/10 font-display text-3xl font-bold ring-1 ring-white/15">
              {initials(name)}
            </span>
          </div>
        )}
        </div>
        <span
          className={cn(
            "absolute inset-x-4 bottom-4 rounded-full bg-white py-2.5 text-sm font-semibold text-blue shadow-lg transition-all duration-300",
            "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
          )}
        >
          Profile
        </span>
      </div>
    </Link>
  );
}
