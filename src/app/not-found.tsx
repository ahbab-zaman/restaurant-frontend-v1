import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-cream">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md border border-gold px-4 py-2 text-sm text-gold transition hover:bg-[var(--color-brand-secondary)] hover:text-[var(--color-text-inverse)]"
      >
        Back to home
      </Link>
    </section>
  );
}
