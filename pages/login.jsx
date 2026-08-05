import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Sign In | Loxygen Academy";
const DESCRIPTION = "Sign in to access your Loxygen Academy e-learning courses and account.";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const result = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (result?.error) {
      setStatus("error");
      setError("Incorrect email or password.");
      return;
    }

    const callbackUrl =
      typeof router.query.callbackUrl === "string" ? router.query.callbackUrl : "/account";
    router.push(callbackUrl);
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/login`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-md px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Sign{" "}
              <span className="italic text-brand-accent">in.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Access your e-learning courses and account.
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
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-brand-navy">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
              >
                {status === "submitting" ? "Signing in…" : "Sign in"}
              </button>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
