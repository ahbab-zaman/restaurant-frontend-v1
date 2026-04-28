import Link from "next/link";
import { FOOTER_NAVIGATE, FOOTER_CONTACT } from "@/app/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  const linkClass =
    "text-[13px] no-underline transition-colors duration-200 hover:text-[var(--color-brand-secondary)]";

  const smallLinkClass =
    "text-[11px] no-underline transition-colors duration-200 hover:text-[var(--color-brand-secondary)]";

  return (
    <footer aria-label="Site footer">
      {/* Main footer grid */}
      <div
        className="grid grid-cols-3 gap-10 px-12 py-12"
        style={{ borderTop: "0.5px solid var(--color-border-default)" }}
      >
        {/* Brand */}
        <div>
          <p
            className="font-display text-[18px] font-normal tracking-[0.1em] uppercase mb-3"
            style={{ color: "var(--color-brand-secondary)" }}
          >
            Elite
            <em
              className="not-italic"
              style={{
                fontStyle: "italic",
                color: "var(--color-brand-accent)",
              }}
            >
              Lodge
            </em>
          </p>

          <p
            className="text-[12px] leading-relaxed"
            style={{
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Fine Dining &amp; Private Events
            <br />
            London, Est. 1987
          </p>
        </div>

        {/* Navigate */}
        <div>
          <p
            className="text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{
              color: "var(--color-brand-secondary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Navigate
          </p>

          <ul className="flex flex-col gap-2 list-none">
            {FOOTER_NAVIGATE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            className="text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{
              color: "var(--color-brand-secondary)",
              fontFamily: "var(--font-body)",
            }}
          >
            Contact
          </p>

          <ul className="flex flex-col gap-2 list-none">
            {FOOTER_CONTACT.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex justify-between items-center px-12 py-5"
        style={{ borderTop: "0.5px solid var(--color-border-subtle)" }}
      >
        <p
          className="text-[11px] tracking-[0.06em]"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          © {year} EliteLodge. All rights reserved.
        </p>

        <div className="flex gap-5">
          {["Privacy Policy", "Accessibility", "Terms"].map((item) => (
            <Link key={item} href="#" className={smallLinkClass}>
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
