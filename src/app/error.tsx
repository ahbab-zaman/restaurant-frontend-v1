"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-gold">Error</p>
      <h1 className="mt-3 text-3xl font-semibold text-cream">Something went wrong</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        {error.message || "An unexpected error happened."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md border border-gold px-4 py-2 text-sm text-gold transition hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-text-inverse)]"
      >
        Try again
      </button>
    </section>
  );
}
