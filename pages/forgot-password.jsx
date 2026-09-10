import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Reset Your Password | Loxygen Academy";
const DESCRIPTION = "Request a password reset link for your Loxygen Academy account.";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const { error: message } = await response.json().catch(() => ({}));
        throw new Error(message || "Something went wrong. Please try again.");
      }

      setStatus("sent");
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message);
    }
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/forgot-password`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/forgot-password`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-md px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Reset your{" "}
              <span className="italic text-brand-accent">password.</span>
            </h1>

            {status === "sent" ? (
              <p className="mt-5 text-lg leading-8 text-slate-600">
                If an account exists for that email, we&apos;ve sent a link to reset your
                password. Check your inbox.
              </p>
            ) : (
              <>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Enter your email and we&apos;ll send you a link to set a new password.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-brand-navy">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={`mt-2 ${FIELD_CLASS}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Send reset link"}
                  </button>

                  {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                </form>
              </>
            )}

            <p className="mt-6 text-sm text-slate-500">
              <Link href="/login" className="font-semibold text-brand-navy hover:underline">
                Back to sign in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
