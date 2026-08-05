import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/seo";
import { supabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/admin/AdminNav";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default function EditBlogPost({ post }) {
  const router = useRouter();

  const handleSubmit = async (form) => {
    const response = await fetch(`/api/admin/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const { error } = await response.json().catch(() => ({}));
      throw new Error(error || "Failed to update post.");
    }
    router.push("/admin/blog");
  };

  return (
    <>
      <Head>
        <title>Edit post | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">Edit blog post</h2>
            <BlogPostForm initialPost={post} onSubmit={handleSubmit} submitLabel="Save changes" />
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!post) return { notFound: true };

  return { props: { post } };
}
