import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function RelatedPosts({ posts }) {
  if (!posts.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Related articles
      </p>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group flex gap-3">
              <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
                {post.coverImageUrl ? (
                  <Image
                    src={post.coverImageUrl}
                    alt={post.coverImageAlt || post.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <PlaceholderImage className="h-full w-full" />
                )}
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm leading-tight text-brand-navy group-hover:underline">
                  {post.title}
                </p>
                {post.excerpt ? (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">{post.excerpt}</p>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
