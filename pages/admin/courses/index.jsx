import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminCoursesList() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    const response = await fetch("/api/admin/courses");
    if (!response.ok) {
      setError("Failed to load courses.");
      return;
    }
    const { courses: data } = await response.json();
    setCourses(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    const response = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Failed to delete course.");
      return;
    }
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  return (
    <>
      <Head>
        <title>Courses | Admin | {SITE_NAME}</title>
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
              <h2 className="font-display text-2xl text-brand-navy">Courses</h2>
              <Link
                href="/admin/courses/new"
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90"
              >
                New course
              </Link>
            </div>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {courses === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : courses.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">No courses yet.</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between gap-6 px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-brand-navy">{course.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {course.type} · {course.price ? `€${course.price}` : "no price"} ·{" "}
                        {course.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/admin/courses/${course.id}/edit`}
                        className="text-sm font-semibold text-brand-navy hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(course.id)}
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
