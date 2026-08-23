import Head from "next/head";
import { useEffect, useState } from "react";
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

export default function AdminLicenses() {
  const [licenses, setLicenses] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [tierId, setTierId] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const loadLicenses = async () => {
    const response = await fetch("/api/admin/licenses");
    if (!response.ok) {
      setError("Failed to load licenses.");
      return;
    }
    const { licenses: data } = await response.json();
    setLicenses(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadLicenses();
    fetch("/api/admin/courses")
      .then((res) => res.json())
      .then(({ courses }) => {
        const teamCourse = (courses ?? []).find((course) => course.type === "micro-learning-team");
        setTiers(teamCourse?.tiers ?? []);
      })
      .catch(() => {});
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError("");

    const response = await fetch("/api/admin/licenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerEmail, tierId }),
    });

    setCreating(false);

    if (!response.ok) {
      const { error: message } = await response.json().catch(() => ({}));
      setError(message || "Failed to create license.");
      return;
    }

    setOwnerEmail("");
    setTierId("");
    loadLicenses();
  };

  return (
    <>
      <Head>
        <title>Licenses | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">
              Micro-learnings licenses
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Grant seats for a purchase made outside Stripe (invoice, bank transfer). The buyer
              must already have a Loxygen account — they&apos;ll get an email with every seat&apos;s
              code and can manage their team from <code>/account/team</code>.
            </p>

            <form onSubmit={handleCreate} className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="ownerEmail" className="text-sm font-medium text-brand-navy">
                  Buyer&apos;s email
                </label>
                <input
                  id="ownerEmail"
                  type="email"
                  required
                  value={ownerEmail}
                  onChange={(event) => setOwnerEmail(event.target.value)}
                  className="mt-2 w-72 rounded-lg border border-slate-200 px-4 py-2.5 text-base text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
              <div>
                <label htmlFor="tierId" className="text-sm font-medium text-brand-navy">
                  Plan
                </label>
                <select
                  id="tierId"
                  required
                  value={tierId}
                  onChange={(event) => setTierId(event.target.value)}
                  className="mt-2 w-56 rounded-lg border border-slate-200 px-4 py-2.5 text-base text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                >
                  <option value="">Select a plan</option>
                  {tiers.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.label} ({tier.seat_count} seat{tier.seat_count === 1 ? "" : "s"})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
              >
                {creating ? "Creating…" : "Grant license"}
              </button>
            </form>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {licenses === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : licenses.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">No licenses yet.</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {licenses.map((license) => (
                  <div key={license.id} className="px-6 py-4">
                    <div className="flex items-center justify-between gap-6">
                      <p className="font-medium text-brand-navy">
                        {license.owner_email} · {license.seat_count} seat
                        {license.seat_count === 1 ? "" : "s"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {license.source} · {license.status} · {formatDate(license.created_at)}
                      </p>
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-slate-500">
                      {license.seats.map((seat) => (
                        <li key={seat.id}>
                          {seat.status === "claimed"
                            ? `Claimed by ${seat.claimed_email}`
                            : `Unclaimed${seat.invited_email ? ` · invited: ${seat.invited_email}` : ""} · code: ${seat.redemption_code}`}
                        </li>
                      ))}
                    </ul>
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
