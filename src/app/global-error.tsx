"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-surface-base)] text-[var(--color-text-primary)]">
        <section className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-gold">Fatal error</p>
          <h1 className="mt-3 text-3xl font-semibold text-cream">Application error</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {error.message || "Something went wrong at the application level."}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-md border border-gold px-4 py-2 text-sm text-gold transition hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-text-inverse)]"
          >
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
