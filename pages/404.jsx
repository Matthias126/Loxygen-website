import Head from "next/head";
import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page not found | {SITE_NAME}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main>
        <section className="-mt-16 flex min-h-screen items-center justify-center bg-white px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-stat leading-none text-brand-navy">404</p>

            <h1 className="font-display mt-6 text-heading tracking-tight text-brand-navy">
              Not on{" "}
              <span className="italic text-brand-accent">the syllabus.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
              This page isn&apos;t part of the curriculum. Let&apos;s get you back to something
              that is.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
              >
                Back to homepage
              </Link>
              <Link
                href="/the-academy"
                className="inline-flex items-center justify-center rounded-lg border border-brand-navy px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-brand-navy/5"
              >
                Browse the Academy
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
