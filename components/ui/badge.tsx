import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center whitespace-nowrap font-medium", {
  variants: {
    variant: {
      default: "bg-navy text-white",
      outline: "border border-border text-navy",
      soft: "bg-accent text-accent-foreground",
    },
    size: {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-sm",
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
