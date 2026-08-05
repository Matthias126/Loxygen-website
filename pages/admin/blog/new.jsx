import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPost() {
  const router = useRouter();

  const handleSubmit = async (form) => {
    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const { error } = await response.json().catch(() => ({}));
      throw new Error(error || "Failed to create post.");
    }
    router.push("/admin/blog");
  };

  return (
    <>
      <Head>
        <title>New post | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">New blog post</h2>
            <BlogPostForm onSubmit={handleSubmit} submitLabel="Create post" />
          </div>
        </section>
      </main>
    </>
  );
}
