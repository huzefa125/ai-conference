import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 min-[400px]:px-5 sm:px-8 lg:px-10 2xl:max-w-[1440px]", className)} {...props} />;
}
