import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/seo";
import { supabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/admin/AdminNav";
import CourseForm from "@/components/admin/CourseForm";

export default function EditCourse({ course }) {
  const router = useRouter();

  const handleSubmit = async (form) => {
    const response = await fetch(`/api/admin/courses/${course.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const { error } = await response.json().catch(() => ({}));
      throw new Error(error || "Failed to update course.");
    }
    router.push(form.type === "micro-learning" ? "/admin/micro-learnings" : "/admin/courses");
  };

  return (
    <>
      <Head>
        <title>Edit course | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">Edit course</h2>
            <CourseForm initialCourse={course} onSubmit={handleSubmit} submitLabel="Save changes" />
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data: course } = await supabaseAdmin
    .from("courses")
    .select("*, tiers:course_price_tiers(*)")
    .eq("id", params.id)
    .maybeSingle();

  if (!course) return { notFound: true };

  const sortedTiers = [...(course.tiers ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  return { props: { course: { ...course, tiers: sortedTiers } } };
}
