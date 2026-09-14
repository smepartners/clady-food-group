import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>;
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Flags a spot where copy is still an open question - see Build Plan §06. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-dashed border-gold-500 bg-gold-500/10 px-4 py-3 text-sm text-ink-soft">
      <span className="font-semibold text-gold-700">[PENDING] </span>
      {children}
    </div>
  );
}
