import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  align = "left",
  tone = "light",
  size = "default",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "default" | "sm";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <h2
        className={cn(
          "text-balance font-serif leading-[1.15] tracking-tight",
          size === "sm" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]",
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
