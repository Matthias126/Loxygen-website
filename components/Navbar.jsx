import Link from "next/link";

const ACADEMY_LINKS = [
  ["/the-academy", "The Academy hub"],
  ["/e-learning", "E-learning"],
  ["/micro-learnings", "Micro-learnings"],
  ["/breakbulk-training", "Breakbulk training"],
  ["/bess-logistics-training", "BESS logistics training"],
  ["/young-forwarders-benelux", "Young Forwarders Benelux"],
  ["/africa-roadtrip-2026", "Africa Roadtrip 2026"],
  ["/sustainable-forwarding", "Sustainable forwarding"],
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand-navy">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="font-display text-lg font-bold text-white">
          Loxygen Academy
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <Link href="/" className="text-sm font-medium text-white/80 hover:text-white">
            Start
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
            >
              The Academy
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-white/10 bg-brand-navy p-2 shadow-xl">
                {ACADEMY_LINKS.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about-us" className="text-sm font-medium text-white/80 hover:text-white">
            About us
          </Link>
          <Link href="/blog" className="text-sm font-medium text-white/80 hover:text-white">
            Blog
          </Link>
        </div>

        <Link
          href="/login"
          className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-white/90"
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}
