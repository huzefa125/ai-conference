import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium", {
  variants: {
    variant: {
      default: "bg-navy text-white",
      blue: "bg-blue/10 text-blue ring-1 ring-inset ring-blue/20",
      outline: "border border-border bg-white text-navy",
      soft: "bg-accent text-accent-foreground",
    },
    size: {
      sm: "px-2.5 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3.5 py-1.5 text-sm",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export function Badge({
  className,
  variant,
  size,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
