import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col justify-between rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
    >
      <div>
        {post.coverImageUrl ? (
          <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={post.coverImageUrl}
              alt={post.coverImageAlt || post.title}
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <PlaceholderImage label={post.category} className="mb-6 aspect-video w-full" />
        )}
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {post.category} · {formatDate(post.publishedAt)}
        </span>
        <h3 className="font-display mt-4 line-clamp-2 text-xl text-brand-navy group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
      </div>
      <span className="mt-6 inline-block text-sm font-semibold text-brand-navy">
        Read{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
