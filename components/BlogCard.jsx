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
      className="group block rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
    >
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL, no next/image domain config for this demo pass
        <img
          src={post.coverImageUrl}
          alt=""
          className="mb-6 aspect-video w-full rounded-xl object-cover"
        />
      ) : (
        <PlaceholderImage label={post.category} className="mb-6 aspect-video w-full" />
      )}
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {post.category} · {formatDate(post.publishedAt)}
      </span>
      <h3 className="font-display mt-4 text-xl text-brand-navy group-hover:underline">
        {post.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
      <span className="mt-6 inline-block text-sm font-semibold text-brand-navy">
        Read{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
