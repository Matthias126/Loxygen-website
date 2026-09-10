import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Set a New Password | Loxygen Academy";
const DESCRIPTION = "Set a new password for your Loxygen Academy account.";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function ResetPassword() {
  const router = useRouter();
  const token = typeof router.query.token === "string" ? router.query.token : "";
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const { error: message } = await response.json().catch(() => ({}));
        throw new Error(message || "Something went wrong. Please try again.");
      }

      setStatus("done");
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
        <link rel="canonical" href={`${SITE_URL}/reset-password`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/reset-password`} />
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
              Set a new{" "}
              <span className="italic text-brand-accent">password.</span>
            </h1>

            {status === "done" ? (
              <>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Your password has been reset. You can now sign in.
                </p>
                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
                >
                  Go to sign in
                </Link>
              </>
            ) : !token ? (
              <p className="mt-5 text-lg leading-8 text-slate-600">
                This link is missing its reset token. Please use the link from your email, or{" "}
                <Link href="/forgot-password" className="font-semibold text-brand-navy hover:underline">
                  request a new one
                </Link>
                .
              </p>
            ) : (
              <>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Choose a new password for your account.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-brand-navy">
                      New password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`mt-2 ${FIELD_CLASS}`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
                  >
                    {status === "submitting" ? "Saving…" : "Set new password"}
                  </button>

                  {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
