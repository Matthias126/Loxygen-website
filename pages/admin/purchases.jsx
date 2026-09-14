import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { SITE_NAME } from "@/lib/seo";
import AdminNav from "@/components/admin/AdminNav";

function formatDate(dateString) {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPurchases() {
  const [purchases, setPurchases] = useState(null);
  const [error, setError] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/purchases")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load purchases.");
        return res.json();
      })
      .then(({ purchases: data }) => setPurchases(data))
      .catch(() => setError("Failed to load purchases."));
  }, []);

  const courseOptions = useMemo(() => {
    const seen = new Map();
    (purchases ?? []).forEach((purchase) => {
      if (purchase.course) seen.set(purchase.course.id, purchase.course.title);
    });
    return [...seen.entries()];
  }, [purchases]);

  const filteredPurchases = useMemo(() => {
    if (!purchases) return null;
    if (courseFilter === "all") return purchases;
    return purchases.filter((purchase) => purchase.course?.id === courseFilter);
  }, [purchases, courseFilter]);

  return (
    <>
      <Head>
        <title>Purchases | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">Purchases</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Everyone who has booked a course or webinar via Stripe checkout. Filter by course to
              build an invite list before a webinar or immersive programme.
            </p>

            {courseOptions.length > 0 ? (
              <div className="mt-8">
                <label htmlFor="courseFilter" className="text-sm font-medium text-brand-navy">
                  Filter by course
                </label>
                <select
                  id="courseFilter"
                  value={courseFilter}
                  onChange={(event) => setCourseFilter(event.target.value)}
                  className="mt-2 w-72 rounded-lg border border-slate-200 px-4 py-2.5 text-base text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                >
                  <option value="all">All courses</option>
                  {courseOptions.map(([id, title]) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {filteredPurchases === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : filteredPurchases.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">No purchases yet.</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {filteredPurchases.map((purchase) => (
                  <div key={purchase.id} className="px-6 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="font-medium text-brand-navy">
                        {purchase.buyer?.name || "—"} · {purchase.buyer?.email ?? "unknown"}
                      </p>
                      <p className="text-xs text-slate-500">{formatDate(purchase.purchased_at)}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      {purchase.course?.title ?? "Deleted course"}
                      {purchase.tier?.label ? ` — ${purchase.tier.label}` : ""}
                    </p>
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
