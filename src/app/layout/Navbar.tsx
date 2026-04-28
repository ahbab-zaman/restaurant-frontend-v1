"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/app/lib/constants";
import { GoldButton } from "@/app/components/ui/GoldButton";

export function Navbar() {
  const scrollToBooking = () => {
    document
      .getElementById("booking-widget")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="flex items-center justify-between px-12 py-7"
      style={{ borderBottom: "0.5px solid var(--color-border-default)" }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-[22px] font-normal tracking-[0.14em] uppercase no-underline"
        style={{ color: "var(--color-brand-secondary)" }}
        aria-label="EliteLodge — home"
      >
        Elite
        <em
          className="not-italic"
          style={{
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--color-brand-accent)",
          }}
        >
          Lodge
        </em>
      </Link>

      {/* Links */}
      <ul className="flex gap-9 list-none" role="list">
        {NAV_LINKS.map((link: any) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[12px] tracking-[0.18em] uppercase no-underline transition-colors duration-200"
              style={{
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-brand-secondary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--color-text-secondary)")
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <GoldButton variant="outline" size="sm" onClick={scrollToBooking}>
        Reserve
      </GoldButton>
    </nav>
  );
}
