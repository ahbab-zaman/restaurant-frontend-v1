const links = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "support", label: "Support" },
];

type InfoPageProps = {
  title: string;
  overview: string;
  details: string;
  support: string;
};

export default function InfoPage({ title, overview, details, support }: InfoPageProps) {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {links.map((link) => (
            <li key={link.id}>
              <a className="underline-offset-4 hover:underline" href={`#${link.id}`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <section id="overview" className="space-y-2">
        <h2 className="text-xl font-medium text-foreground">Overview</h2>
        <p className="text-muted-foreground">{overview}</p>
      </section>

      <section id="details" className="space-y-2">
        <h2 className="text-xl font-medium text-foreground">Details</h2>
        <p className="text-muted-foreground">{details}</p>
      </section>

      <section id="support" className="space-y-2">
        <h2 className="text-xl font-medium text-foreground">Support</h2>
        <p className="text-muted-foreground">{support}</p>
      </section>
    </article>
  );
}
