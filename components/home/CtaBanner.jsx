import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-3xl bg-brand-navy px-6 py-20 text-center">
          <p className="font-display text-banner font-bold tracking-tight text-white">
            We turn insight into action, action into culture, and culture into advantage.
          </p>
          <Link
            href="/the-academy"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
