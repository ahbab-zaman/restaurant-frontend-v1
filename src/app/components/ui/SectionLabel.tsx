import { cn } from '@/app/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-body',
        className
      )}
      style={{ color: 'var(--color-brand-secondary)' }}
    >
      {children}
      <span
        className="block w-8 h-px"
        style={{ background: 'var(--color-border-default)' }}
        aria-hidden="true"
      />
    </p>
  )
}