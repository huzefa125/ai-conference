import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform hover:[&_svg:last-child]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white shadow-[0_8px_20px_-10px_rgba(14,23,38,0.6)] hover:bg-blue",
        accent: "bg-blue text-white shadow-[0_10px_24px_-10px_rgba(47,91,234,0.7)] hover:bg-blue/90",
        outline: "border border-navy/15 bg-white text-navy hover:border-navy/40 hover:bg-accent",
        "outline-light": "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/15",
        light: "bg-white text-navy hover:bg-accent",
        link: "rounded-none px-0 text-blue underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
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
  const classes = cn(buttonVariants({ variant, size }), className);
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
