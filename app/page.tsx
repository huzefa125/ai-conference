export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Welcome to your new project
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Ready to build from scratch. Edit <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">app/page.tsx</code> to get started.
        </p>
      </div>
    </main>
  );
}
