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

export default function AdminJollyDeckQueue() {
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const loadEntries = async () => {
    const response = await fetch("/api/admin/jollydeck-queue");
    if (!response.ok) {
      setError("Failed to load queue.");
      return;
    }
    const { entries: data } = await response.json();
    setEntries(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount for an admin list
    loadEntries();
  }, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    setAdding(true);
    setError("");

    const response = await fetch("/api/admin/jollydeck-queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setAdding(false);

    if (!response.ok) {
      setError("Failed to add entry.");
      return;
    }

    setEmail("");
    loadEntries();
  };

  const handleMarkDone = async (id) => {
    const response = await fetch(`/api/admin/jollydeck-queue/${id}`, { method: "PATCH" });
    if (!response.ok) {
      setError("Failed to update entry.");
      return;
    }
    loadEntries();
  };

  return (
    <>
      <Head>
        <title>JollyDeck queue | Admin | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">Admin</h1>

            <div className="mt-10">
              <AdminNav />
            </div>

            <h2 className="font-display mt-10 text-2xl text-brand-navy">JollyDeck queue</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Micro-learning subscribers land here so JollyDeck accounts can be created
              manually and checked off. Once Stripe Checkout is wired up, entries will be
              added automatically on payment. For now, add them here.
            </p>

            <form onSubmit={handleAdd} className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-brand-navy">
                  Subscriber email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-72 rounded-lg border border-slate-200 px-4 py-2.5 text-base text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                />
              </div>
              <button
                type="submit"
                disabled={adding}
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
              >
                {adding ? "Adding…" : "Add entry"}
              </button>
            </form>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {entries === null ? (
              <p className="mt-8 text-sm text-slate-500">Loading…</p>
            ) : entries.length === 0 ? (
              <p className="mt-8 text-sm text-slate-500">Queue is empty.</p>
            ) : (
              <div className="mt-8 divide-y divide-slate-200 rounded-xl border border-slate-200">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between gap-6 px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-brand-navy">{entry.email}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        Added {formatDate(entry.created_at)} ·{" "}
                        {entry.status === "done" ? "Done" : "Pending"}
                      </p>
                    </div>
                    {entry.status !== "done" ? (
                      <button
                        type="button"
                        onClick={() => handleMarkDone(entry.id)}
                        className="text-sm font-semibold text-brand-navy hover:underline"
                      >
                        Mark done
                      </button>
                    ) : null}
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
