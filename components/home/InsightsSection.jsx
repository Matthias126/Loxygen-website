import Link from "next/link";

const INSIGHTS = [
  {
    slug: "when-machines-take-over-networks-win",
    title: "When machines take over, networks win",
    category: "AI",
    tilt: "-rotate-1",
  },
  {
    slug: "high-growth-market-freight-forwarders-create-value",
    title: "A high-growth market where freight forwarders can create value",
    category: "Strategy",
    tilt: "rotate-1",
  },
];

export default function InsightsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div>
            <h2 className="font-display text-heading tracking-tight text-brand-navy">
              From the network
            </h2>
          </div>
          <Link
            href="/blog"
            className="group text-sm font-semibold text-brand-navy hover:underline"
          >
            View all insights{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2" data-reveal-group>
          {INSIGHTS.map((post) => (
            <div key={post.slug} data-reveal-item>
              <Link
                href={`/blog/${post.slug}`}
                className={`group block rounded-2xl bg-white p-8 shadow-card transition-[transform,box-shadow] hover:-translate-y-1 hover:rotate-0 hover:shadow-card-hover ${post.tilt}`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {post.category}
                </span>
                <h3 className="font-display mt-4 text-xl text-brand-navy group-hover:underline">
                  {post.title}
                </h3>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-navy">
                  Read more{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
