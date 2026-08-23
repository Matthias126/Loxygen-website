import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getOwnedLicensesWithSeats } from "@/lib/licenses";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Manage your team | Loxygen Academy";

const INPUT_CLASS =
  "w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm text-brand-navy focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

function SeatRow({ seat, onAssign, onRevoke, busy }) {
  const [email, setEmail] = useState("");

  if (seat.status === "claimed") {
    return (
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm text-brand-navy">{seat.claimed_email}</p>
        <button
          type="button"
          disabled={busy}
          onClick={() => onRevoke(seat.id)}
          className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
        >
          Revoke
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
      <p className="text-sm text-slate-600">
        {seat.invited_email ? `Invited: ${seat.invited_email}` : "Not yet assigned"} · code{" "}
        <span className="font-mono">{seat.redemption_code}</span>
      </p>
      {!seat.invited_email ? (
        <div className="flex items-center gap-3">
          <input
            type="email"
            placeholder="teammate@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={INPUT_CLASS}
          />
          <button
            type="button"
            disabled={busy || !email}
            onClick={() => onAssign(seat.id, email)}
            className="text-sm font-semibold text-brand-navy hover:underline disabled:opacity-50"
          >
            Send invite
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => onRevoke(seat.id)}
          className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
        >
          Cancel invite
        </button>
      )}
    </div>
  );
}

export default function Team({ initialLicenses }) {
  const [licenses, setLicenses] = useState(initialLicenses);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    const response = await fetch("/api/seats");
    if (!response.ok) return;
    const { licenses: data } = await response.json();
    setLicenses(data);
  };

  const handleAssign = async (seatId, email) => {
    setBusy(true);
    setError("");
    const response = await fetch("/api/seats/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatId, email }),
    });
    setBusy(false);
    if (!response.ok) {
      const { error: message } = await response.json().catch(() => ({}));
      setError(message || "Failed to assign seat.");
      return;
    }
    refresh();
  };

  const handleRevoke = async (seatId) => {
    setBusy(true);
    setError("");
    const response = await fetch("/api/seats/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seatId }),
    });
    setBusy(false);
    if (!response.ok) {
      const { error: message } = await response.json().catch(() => ({}));
      setError(message || "Failed to revoke seat.");
      return;
    }
    refresh();
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE_URL}/account/team`} />
        <meta property="og:site_name" content={SITE_NAME} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
            <Link href="/account" className="text-sm font-semibold text-brand-navy hover:underline">
              ← Back to account
            </Link>

            <h1 className="font-display mt-6 text-heading tracking-tight text-brand-navy">
              Manage your <span className="italic text-brand-accent">team.</span>
            </h1>

            {error ? <p className="mt-6 text-sm font-medium text-red-600">{error}</p> : null}

            {licenses.length === 0 ? (
              <p className="mt-8 text-base leading-7 text-slate-600">
                You don&apos;t own any micro-learnings licenses yet.
              </p>
            ) : (
              <div className="mt-10 space-y-10">
                {licenses.map((license) => (
                  <div key={license.id}>
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-display text-xl text-brand-navy">
                        {license.seat_count} seat{license.seat_count === 1 ? "" : "s"}
                      </h2>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          license.status === "active" ? "text-slate-400" : "text-red-600"
                        }`}
                      >
                        {license.status}
                      </span>
                    </div>
                    {license.status !== "active" ? (
                      <p className="mt-2 text-sm text-red-600">
                        This subscription is not active — seats can&apos;t be assigned or revoked.
                      </p>
                    ) : null}
                    <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200">
                      {license.seats.map((seat) => (
                        <SeatRow
                          key={seat.id}
                          seat={seat}
                          busy={busy || license.status !== "active"}
                          onAssign={handleAssign}
                          onRevoke={handleRevoke}
                        />
                      ))}
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

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return { redirect: { destination: "/login?callbackUrl=/account/team", permanent: false } };
  }

  const initialLicenses = await getOwnedLicensesWithSeats(session.user.id);

  return { props: { initialLicenses } };
}
