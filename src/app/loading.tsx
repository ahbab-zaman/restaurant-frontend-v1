export default function Loading() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Loading...</p>
    </section>
  );
}
