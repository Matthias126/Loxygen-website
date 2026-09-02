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
  "sustainable-forwarding": "Sustainability Award",
};

export default function AdminPages() {
  const [settings, setSettings] = useState(null);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const loadSettings = async () => {
    const response = await fetch("/api/admin/static-pages");
    if (!response.ok) {
      setError("Failed to load pages.");
      return;
    }
    const { settings: data } = await response.json();
    setSettings(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadSettings();
  }, []);

  const handleToggle = async (slug, field) => {
    const current = settings[slug];
    const next = { ...current, [field]: !current[field] };

    setUpdating(slug);
    setError("");

    const response = await fetch(`/api/admin/static-pages/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });

    setUpdating(null);

    if (!response.ok) {
      setError("Failed to update page.");
      return;
    }

    setSettings((prev) => ({ ...prev, [slug]: next }));
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
              change. Untick &ldquo;Show in navbar&rdquo; to declutter the top menu without
              taking the page down.
            </p>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {settings === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {STATIC_PAGE_SLUGS.map((slug) => {
                  const isActive = settings[slug]?.is_active !== false;
                  const showInNavbar = settings[slug]?.show_in_navbar !== false;
                  return (
                    <div
                      key={slug}
                      className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
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
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                          <input
                            type="checkbox"
                            checked={showInNavbar}
                            disabled={updating === slug}
                            onChange={() => handleToggle(slug, "show_in_navbar")}
                          />
                          Show in navbar
                        </label>
                        <button
                          type="button"
                          onClick={() => handleToggle(slug, "is_active")}
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
