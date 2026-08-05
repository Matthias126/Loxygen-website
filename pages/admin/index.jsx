import Head from "next/head";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";

const SECTIONS = [
  {
    href: "/admin/blog",
    title: "Blog",
    description: "Create, edit and publish blog posts.",
  },
  {
    href: "/admin/courses",
    title: "Courses",
    description: "Add, edit and deactivate e-learning courses, webinars and programmes.",
  },
  {
    href: "/admin/pages",
    title: "Pages",
    description: "Turn the 7 flagship pages on or off once their event has passed.",
  },
  {
    href: "/admin/jollydeck-queue",
    title: "JollyDeck queue",
    description: "Track and mark off pending micro-learning account provisioning.",
  },
];

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SECTIONS.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="rounded-xl bg-white p-8 shadow-card hover:shadow-card-hover"
                >
                  <h2 className="font-display text-xl text-brand-navy">{section.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
