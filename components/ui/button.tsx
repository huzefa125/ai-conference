import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-blue",
        accent: "bg-blue text-white hover:bg-navy",
        outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
        "outline-light": "border border-white/40 text-white hover:bg-white hover:text-navy",
        light: "bg-white text-navy hover:bg-accent",
        link: "px-0 text-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ href, variant, size, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), "rounded-md", className);
  if (href) {
    return (
      <Link href={href} className={classes} onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
