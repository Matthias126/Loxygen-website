import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminBlogList() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    const response = await fetch("/api/admin/blog");
    if (!response.ok) {
      setError("Failed to load posts.");
      return;
    }
    const { posts: data } = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Failed to delete post.");
      return;
    }
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <>
      <Head>
        <title>Blog | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <h2 className="font-display text-2xl text-brand-navy">Blog posts</h2>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90"
              >
                New post
              </Link>
            </div>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {posts === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : posts.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">No posts yet.</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between gap-6 px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-brand-navy">{post.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {post.category} ·{" "}
                        {post.is_published ? "Published" : "Draft"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-sm font-semibold text-brand-navy hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        className="text-sm font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
