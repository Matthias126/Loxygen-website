import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const ACADEMY_LINKS = [
  ["/the-academy", "The Academy hub"],
  ["/e-learning", "E-learning"],
  ["/micro-learnings", "Micro-learnings"],
  ["/breakbulk-training", "Breakbulk training"],
  ["/bess-logistics-training", "BESS logistics training"],
  ["/young-forwarders-benelux", "Young Forwarders Benelux"],
  ["/africa-roadtrip-2026", "Africa Roadtrip 2026"],
  ["/sustainable-forwarding", "Sustainability Award"],
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        const isScrolled = window.scrollY > 8;
        return prev === isScrolled ? prev : isScrolled;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="relative mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 shadow-lg shadow-black/10">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-full bg-brand-navy transition-opacity duration-300 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-full bg-brand-navy/35 backdrop-blur-2xl backdrop-saturate-200 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <Link
          href="/"
          className="relative z-10 flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="font-sans text-lg font-bold tracking-wide text-white">
            LOXYGEN
          </span>
        </Link>

        <div className="relative z-10 hidden items-center gap-8 md:flex">
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
          <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-white">
            Contact
          </Link>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                href="/account"
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                My account
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-white/90"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-white/90 sm:inline-block"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="absolute inset-x-4 top-full mx-auto mt-2 max-w-5xl rounded-3xl border border-white/15 bg-brand-navy/90 px-6 pb-6 pt-2 shadow-lg shadow-black/10 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 pt-4">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white">
                The Academy
                <svg
                  width="9"
                  height="6"
                  viewBox="0 0 9 6"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform group-open:rotate-180"
                >
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </summary>
              <div className="flex flex-col gap-1 pl-3">
                {ACADEMY_LINKS.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </details>

            <Link
              href="/about-us"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            >
              About us
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  My account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-2 rounded-full bg-white px-3 py-2.5 text-center text-sm font-semibold text-brand-navy hover:bg-white/90"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-white px-3 py-2.5 text-center text-sm font-semibold text-brand-navy hover:bg-white/90"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
