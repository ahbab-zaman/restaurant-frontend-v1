import { cn } from "@/app/lib/utils";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div
      className={cn("flex items-center gap-5 px-12", className)}
      aria-hidden="true"
    >
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-border-default)" }}
      />
      <div
        className="w-2 h-2 rotate-45 flex-shrink-0"
        style={{ border: "0.5px solid var(--color-brand-secondary)" }}
      />
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-border-default)" }}
      />
    </div>
  );
}
