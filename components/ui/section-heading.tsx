import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]",
            dark ? "text-blue-light" : "text-blue",
            align === "center" && "justify-center",
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-blue-light" : "bg-blue")} aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
