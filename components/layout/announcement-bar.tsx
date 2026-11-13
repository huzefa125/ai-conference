import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-navy-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center text-xs sm:px-8 sm:text-[13px]">
        <p className="text-white/85">
          Explore our upcoming international scientific conferences <span aria-hidden>–</span> 2027.
        </p>
        <Link
          href="#conferences"
          className="group inline-flex shrink-0 items-center gap-1 font-semibold text-blue-light transition-colors hover:text-white"
        >
          View events
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
