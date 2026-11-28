import { cn } from "@/lib/utils";
import type { StepTheme } from "@/lib/data/how-it-works";

type Colors = { bg: string; text: string; border: string };

const THEMES: Record<StepTheme, Colors> = {
  primary: { bg: "bg-primary/8", text: "text-primary", border: "border-primary/20" },
  navy: { bg: "bg-foreground/6", text: "text-foreground", border: "border-border" },
  cream: { bg: "bg-background", text: "text-foreground", border: "border-border" },
};

type StepCardProps = {
  number: string;
  title: string;
  body: string;
  theme?: StepTheme;
  colors?: Partial<Colors>;
  rotate?: number;
  className?: string;
};

export function StepCard({ number, title, body, theme = "cream", colors, rotate = 0, className }: StepCardProps) {
  const c = { ...THEMES[theme], ...colors };
  return (
    <div
      className={cn(
        "w-full transition-transform duration-300 md:w-[300px] md:hover:z-20 md:hover:scale-105",
        className,
      )}
    >
      <div
        className="rounded-[25px] border border-border bg-card p-2 shadow-[0_12px_28px_-14px_rgba(10,15,28,0.35)] [transform:rotate(var(--rot-m))] md:[transform:rotate(var(--rot))]"
        style={{ ["--rot" as string]: `${rotate}deg`, ["--rot-m" as string]: `${rotate / 2}deg` }}
      >
        <span
          aria-hidden
          className={cn("mx-auto mb-5 mt-1 block h-8 w-8 bg-current", c.text)}
          style={{
            maskImage: "url(/pin.svg)",
            WebkitMaskImage: "url(/pin.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        <div className={cn("flex flex-col items-center overflow-hidden rounded-[15px] border p-[18px] text-center", c.bg, c.border)}>
          <span className={cn("mb-4 text-3xl font-semibold tracking-tight", c.text)}>{number}</span>
          <h3 className="mb-[10px] text-xl font-semibold leading-tight tracking-tight text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed tracking-tight text-muted-foreground sm:text-base">{body}</p>
        </div>
      </div>
    </div>
  );
}
