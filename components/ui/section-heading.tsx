import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  eyebrow,
  highlight,
  align = "left",
  tone = "light",
  size = "default",
  className,
}: {
  title: string;
  description?: string;
  /** Small uppercase label above the title, e.g. "SCHEDULE". */
  eyebrow?: string;
  /** Phrase inside `title` shown in the brand gradient. */
  highlight?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "default" | "sm";
  className?: string;
}) {
  const dark = tone === "dark";
  let content: React.ReactNode = title;
  if (highlight && title.includes(highlight)) {
    const [before, after] = title.split(highlight);
    content = (
      <>
        {before}
        <span className="text-gradient">{highlight}</span>
        {after}
      </>
    );
  }
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-4 text-xs font-bold uppercase tracking-[0.18em]", dark ? "text-blue-light" : "text-blue")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-balance font-display font-bold leading-[1.1] tracking-[-0.025em]",
          size === "sm" ? "text-xl min-[400px]:text-2xl sm:text-3xl lg:text-4xl" : "text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy",
        )}
      >
        {content}
      </h2>
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}
