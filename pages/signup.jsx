import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { NETWORK_OPTIONS } from "@/lib/networks";

const TITLE = "Create an Account | Loxygen Academy";
const DESCRIPTION = "Create a Loxygen Academy account to purchase courses and track your progress.";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

const INITIAL_FORM = {
  name: "",
  business_name: "",
  country: "",
  network: "",
  email: "",
  password: "",
};

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
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

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const { error: message } = await response.json().catch(() => ({}));
        throw new Error(message || "Failed to create account.");
      }

      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Account created, but sign in failed. Please sign in manually.");
      }

      const callbackUrl =
        typeof router.query.callbackUrl === "string" ? router.query.callbackUrl : "/account";
      router.push(callbackUrl);
    } catch (submitError) {
      setStatus("error");
      setError(submitError.message);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/signup`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/signup`} />
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
              Create an{" "}
              <span className="italic text-brand-accent">account.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Purchase courses and pick up where you left off.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-brand-navy">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              <div>
                <label htmlFor="business_name" className="text-sm font-medium text-brand-navy">
                  Business name
                </label>
                <input
                  id="business_name"
                  name="business_name"
                  type="text"
                  required
                  value={form.business_name}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              <div>
                <label htmlFor="country" className="text-sm font-medium text-brand-navy">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={form.country}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              <div>
                <label htmlFor="network" className="text-sm font-medium text-brand-navy">
                  Network
                </label>
                <select
                  id="network"
                  name="network"
                  required
                  value={form.network}
                  onChange={handleChange}
                  className={`mt-2 ${FIELD_CLASS}`}
                >
                  <option value="" disabled>
                    Select a network
                  </option>
                  {NETWORK_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

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
                  minLength={8}
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
                {status === "submitting" ? "Creating account…" : "Create account"}
              </button>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
