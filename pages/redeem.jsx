import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const TITLE = "Redeem your code | Loxygen Academy";

const FIELD_CLASS =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-base text-brand-navy placeholder:text-slate-400 focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";

export default function Redeem({ isLoggedIn, initialCode }) {
  const router = useRouter();
  const [code, setCode] = useState(initialCode);
  const [email, setEmail] = useState("");
  const [emailLocked, setEmailLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn || !code) return;
    fetch(`/api/seats/redeem?code=${encodeURIComponent(code)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.invitedEmail) {
          setEmail(data.invitedEmail);
          setEmailLocked(true);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only ever peek the code the page loaded with
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const response = await fetch("/api/seats/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isLoggedIn ? { code } : { code, email, password }),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setError(body.error || "Something went wrong.");
      return;
    }

    if (isLoggedIn) {
      router.push("/account/team");
      return;
    }

    const result = await signIn("credentials", {
      email: body.email || email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setStatus("error");
      setError("Account created, but automatic sign-in failed — please log in.");
      return;
    }

    router.push("/micro-learnings/library");
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${SITE_URL}/redeem`} />
        <meta property="og:site_name" content={SITE_NAME} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-md px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Redeem your{" "}
              <span className="italic text-brand-accent">code.</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {isLoggedIn
                ? "Enter your code to add micro-learnings access to your account."
                : "Enter your code to get access. If you don't have a Loxygen account yet, we'll create one."}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="code" className="text-sm font-medium text-brand-navy">
                  Code
                </label>
                <input
                  id="code"
                  type="text"
                  required
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className={`mt-2 ${FIELD_CLASS}`}
                />
              </div>

              {!isLoggedIn ? (
                <>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-brand-navy">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={emailLocked}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={`mt-2 ${FIELD_CLASS} disabled:bg-slate-50`}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-brand-navy">
                      Choose a password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={`mt-2 ${FIELD_CLASS}`}
                    />
                  </div>
                </>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
              >
                {status === "submitting" ? "Redeeming…" : "Redeem"}
              </button>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);
  const initialCode = typeof query.code === "string" ? query.code : "";

  return {
    props: {
      isLoggedIn: Boolean(session),
      initialCode,
    },
  };
}
