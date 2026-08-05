import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import { STATIC_PAGE_SLUGS } from "@/lib/staticPageSlugs";
import AdminNav from "@/components/admin/AdminNav";

const PAGE_LABELS = {
  "young-forwarders-benelux": "Young Forwarders Benelux",
  "africa-roadtrip-2026": "Africa Roadtrip 2026",
  "breakbulk-training": "Breakbulk Training",
  "bess-logistics-training": "BESS Logistics Training",
  "e-learning": "E-learning",
  "micro-learnings": "Micro-learnings",
  "sustainable-forwarding": "Sustainable Forwarding",
};

export default function AdminPages() {
  const [visibility, setVisibility] = useState(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const loadVisibility = async () => {
    const response = await fetch("/api/admin/static-pages");
    if (!response.ok) {
      setError("Failed to load pages.");
      return;
    }
    const { visibility: data } = await response.json();
    setVisibility(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadVisibility();
  }, []);

  const handleToggle = async (slug, currentlyActive) => {
    setUpdating(slug);
    setError("");

    const response = await fetch(`/api/admin/static-pages/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !currentlyActive }),
    });

    setUpdating(null);

    if (!response.ok) {
      setError("Failed to update page.");
      return;
    }

    setVisibility((prev) => ({ ...prev, [slug]: !currentlyActive }));
  };

  return (
    <>
      <Head>
        <title>Pages | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">Flagship pages</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Turn a page off once its event has passed, and it 404s and disappears from The
              Academy hub. Content itself (dates, copy, photos) still needs a developer to
              change.
            </p>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {visibility === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {STATIC_PAGE_SLUGS.map((slug) => {
                  const isActive = visibility[slug] !== false;
                  return (
                    <div
                      key={slug}
                      className="flex items-center justify-between gap-6 px-6 py-4"
                    >
                      <div>
                        <p className="font-medium text-brand-navy">{PAGE_LABELS[slug]}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {isActive ? "Active" : "Inactive"} ·{" "}
                          <Link href={`/${slug}`} className="hover:underline">
                            View page
                          </Link>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle(slug, isActive)}
                        disabled={updating === slug}
                        className={`text-sm font-semibold hover:underline disabled:opacity-60 ${
                          isActive ? "text-red-600" : "text-brand-navy"
                        }`}
                      >
                        {updating === slug
                          ? "Updating…"
                          : isActive
                            ? "Deactivate"
                            : "Activate"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
