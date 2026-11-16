import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="mt-3 text-muted-foreground">The page you requested could not be found.</p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </main>
  );
}
