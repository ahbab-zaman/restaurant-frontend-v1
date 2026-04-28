import { TRUST_STATS } from "@/app/lib/constants";

export function TrustStatsSection() {
  return (
    <section
      className="mx-12 mt-12 reveal"
      aria-label="EliteLodge at a glance"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1px",
        background: "var(--color-border-default)",
      }}
    >
      {TRUST_STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center py-9 px-7 text-center"
          style={{ background: "var(--color-surface-raised)" }}
        >
          <span
            className="font-display font-light leading-none mb-2"
            style={{
              fontSize: "44px",
              color: "var(--color-brand-secondary)",
            }}
            aria-label={`${stat.value} — ${stat.label}`}
          >
            {stat.value}
          </span>
          <span
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  );
}
