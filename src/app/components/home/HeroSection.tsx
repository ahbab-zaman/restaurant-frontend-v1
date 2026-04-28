export function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-10 py-20 overflow-hidden"
      aria-label="Hero"
    >
      {/* Atmospheric background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,169,110,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 20% 20%, rgba(201,169,110,0.04) 0%, transparent 60%)
          `,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Eyebrow */}
        <p
          className="flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase mb-7 animate-fade-up"
          style={{
            color: "var(--color-brand-secondary)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="block w-10 h-px"
            aria-hidden="true"
            style={{ background: "var(--color-border-default)" }}
          />
          Est. 1987 &nbsp;·&nbsp; London
          <span
            className="block w-10 h-px"
            aria-hidden="true"
            style={{ background: "var(--color-border-default)" }}
          />
        </p>

        {/* Headline */}
        <h1
          className="font-display font-light leading-[1.05] animate-fade-up delay-200"
          style={{
            fontSize: "clamp(52px, 8vw, 96px)",
            color: "var(--color-text-primary)",
            maxWidth: "820px",
          }}
        >
          Where every meal becomes
          <em
            className="block"
            style={{
              fontStyle: "italic",
              color: "var(--color-brand-secondary)",
            }}
          >
            a memory
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[15px] tracking-[0.04em] mt-7 animate-fade-up delay-400"
          style={{
            color: "var(--color-text-secondary)",
            maxWidth: "480px",
            fontFamily: "var(--font-body)",
            fontWeight: 300,
          }}
        >
          Private dining rooms, curated by candlelight. Reserve your exclusive
          experience at EliteLodge.
        </p>

        {/* Scroll indicator */}
        <div
          className="mt-12 animate-fade-up delay-600"
          aria-hidden="true"
          style={{
            width: "1px",
            height: "60px",
            background: `linear-gradient(var(--color-brand-secondary), transparent)`,
          }}
        />
      </div>
    </section>
  );
}
