import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";
import CourseForm from "@/components/admin/CourseForm";

const TYPE_CHOICES = [
  {
    type: "webinar",
    title: "Webinar",
    description: "A live or scheduled online session with a specific date. Shows a countdown.",
  },
  {
    type: "immersive",
    title: "Immersive programme",
    description: "A multi-day or in-person experience, built around applying rather than an instant buy.",
  },
  {
    type: "e-learning",
    title: "Self-paced course",
    description: "On-demand e-learning or a micro-learning subscription, no fixed date.",
  },
];

export default function NewCourse() {
  const router = useRouter();
  const selectedType = typeof router.query.type === "string" ? router.query.type : null;

  const handleSubmit = async (form) => {
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      const { error } = await response.json().catch(() => ({}));
      throw new Error(error || "Failed to create course.");
    }
    router.push("/admin/courses");
  };

  return (
    <>
      <Head>
        <title>New course | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            {selectedType ? (
              <>
                <h2 className="font-display mt-10 text-2xl text-brand-navy">New course</h2>
                <CourseForm
                  defaultType={selectedType}
                  onSubmit={handleSubmit}
                  submitLabel="Create course"
                />
              </>
            ) : (
              <>
                <h2 className="font-display mt-10 text-2xl text-brand-navy">
                  What are you adding?
                </h2>
                <p className="mt-3 max-w-xl text-slate-600">
                  This sets the page layout. You can still fine-tune the exact type in the form.
                </p>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {TYPE_CHOICES.map((choice) => (
                    <Link
                      key={choice.type}
                      href={`/admin/courses/new?type=${choice.type}`}
                      className="rounded-xl bg-white p-6 shadow-card hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
                    >
                      <h3 className="font-display text-lg text-brand-navy">{choice.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {choice.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
