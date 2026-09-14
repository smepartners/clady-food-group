export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-cream-200 bg-cream-200/40">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink-soft sm:px-6">
        <p>&copy; {new Date().getFullYear()} Clady Group.</p>
        {/* TODO: registered company name, number and address - open question #06 in the build plan */}
        <p className="mt-1 text-xs italic">
          [PENDING] Registered company details go here once confirmed.
        </p>
      </div>
    </footer>
  );
}
