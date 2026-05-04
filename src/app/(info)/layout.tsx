import Link from "next/link";

const pages = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
  { href: "/cancellation", label: "Cancellation" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/accessibility", label: "Accessibility" },
];

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-8">
      <nav aria-label="Info pages" className="mb-8 border-b border-border pb-4">
        <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {pages.map((page) => (
            <li key={page.href}>
              <Link className="underline-offset-4 hover:underline" href={page.href}>
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}
