import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";

// Shared by /admin/courses (everything except micro-learning lessons) and
// /admin/micro-learnings (just those lessons) — same list, same actions,
// just a different slice of the same courses table.
export default function CourseListPage({
  pageTitle,
  heading,
  newHref,
  newLabel,
  emptyMessage,
  filterCourses,
}) {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  const [updatingNavbar, setUpdatingNavbar] = useState(null);

  const loadCourses = async () => {
    const response = await fetch("/api/admin/courses");
    if (!response.ok) {
      setError("Failed to load courses.");
      return;
    }
    const { courses: data } = await response.json();
    setCourses(filterCourses ? data.filter(filterCourses) : data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this course?")) return;
    const response = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const { error: message } = await response.json().catch(() => ({}));
      setError(message ? `Failed to delete course: ${message}` : "Failed to delete course.");
      return;
    }
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const handleToggleNavbar = async (id, currentlyShown) => {
    setUpdatingNavbar(id);
    setError("");

    const response = await fetch(`/api/admin/courses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ show_in_navbar: !currentlyShown }),
    });

    setUpdatingNavbar(null);

    if (!response.ok) {
      const { error: message } = await response.json().catch(() => ({}));
      setError(message || "Failed to update course.");
      return;
    }

    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, show_in_navbar: !currentlyShown } : course
      )
    );
  };

  return (
    <>
      <Head>
        <title>{pageTitle} | Admin | {SITE_NAME}</title>
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
              <h2 className="font-display text-2xl text-brand-navy">{heading}</h2>
              <Link
                href={newHref}
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90"
              >
                {newLabel}
              </Link>
            </div>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {courses === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : courses.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">{emptyMessage}</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-brand-navy">{course.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {course.type} ·{" "}
                        {course.tiers?.length > 0
                          ? `${course.tiers.length} price options`
                          : course.price
                            ? `€${course.price}`
                            : "no price"}{" "}
                        ·{" "}
                        {course.is_active ? "Active" : "Inactive"}
                        {course.show_in_upcoming ? " · Featured as upcoming" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <label
                        className={`flex items-center gap-2 text-sm text-slate-600 ${
                          course.is_active ? "" : "opacity-50"
                        }`}
                        title={
                          course.is_active
                            ? undefined
                            : "Only active courses can be shown in the navbar."
                        }
                      >
                        <input
                          type="checkbox"
                          checked={course.show_in_navbar ?? false}
                          disabled={!course.is_active || updatingNavbar === course.id}
                          onChange={() => handleToggleNavbar(course.id, course.show_in_navbar)}
                        />
                        Show in navbar
                      </label>
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
