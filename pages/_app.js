import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Inter, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return undefined;

    let cancelled = false;
    let cleanup;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { initScrollReveal }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("@/lib/scrollReveal"),
      ]);
      if (cancelled) return;
      cleanup = initScrollReveal(gsap, ScrollTrigger);
    })();

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, [router.asPath]);

  return (
    <div className={`${inter.variable} ${instrumentSerif.variable} font-sans`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
