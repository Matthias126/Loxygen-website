import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

const TILTS = ["-rotate-1", "rotate-1"];

export default function InsightsSection({ posts = [] }) {
  if (posts.length === 0) return null;

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
          {posts.map((post, index) => (
            <div key={post.slug} className="h-full" data-reveal-item>
              <Link
                href={`/blog/${post.slug}`}
                className={`group flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-card transition-[transform,box-shadow] hover:-translate-y-1 hover:rotate-0 hover:shadow-card-hover ${TILTS[index % TILTS.length]}`}
              >
                <div>
                  {post.coverImageUrl ? (
                    <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.coverImageAlt || post.title}
                        fill
                        sizes="(min-width: 1024px) 550px, 90vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <PlaceholderImage label={post.category} className="mb-6 aspect-video w-full" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {post.category}
                  </span>
                  <h3 className="font-display mt-4 line-clamp-2 text-xl text-brand-navy group-hover:underline">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
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
