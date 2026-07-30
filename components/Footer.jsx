import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FOOTER_COLUMNS = [
  {
    heading: "( Academy )",
    links: [
      ["/the-academy", "The Academy hub"],
      ["/e-learning", "E-learning"],
      ["/micro-learnings", "Micro-learnings"],
      ["/breakbulk-training", "Breakbulk training"],
      ["/bess-logistics-training", "BESS logistics training"],
    ],
  },
  {
    heading: "( Company )",
    links: [
      ["/about-us", "About us"],
      ["/blog", "Blog"],
      ["/investors", "Investors"],
      ["/share-your-expertise", "Share your expertise"],
      ["/contact", "Contact"],
    ],
  },
  {
    heading: "( Support )",
    links: [
      ["/help", "Help"],
      ["/terms-and-conditions", "Terms & conditions"],
      ["/dpa", "Data Processing Agreement"],
      ["/login", "Sign in"],
      ["/account", "My account"],
    ],
  },
];

export default function Footer() {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const darkRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "clamp(top bottom)",
          end: "clamp(top top)",
          scrub: true,
        },
      });

      tl.from(innerRef.current, { yPercent: -25, ease: "linear" });
      tl.from(darkRef.current, { opacity: 0.5, ease: "linear" }, "<");
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => ScrollTrigger.refresh();
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <div ref={wrapRef} className="footer-parallax-wrap">
      <footer
        ref={innerRef}
        className="bg-grain relative flex min-h-svh flex-col justify-between gap-16 rounded-t-3xl bg-brand-navy px-6 pb-16 pt-28 text-white lg:px-8 lg:pb-20 lg:pt-40"
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-6">
              <p className="footer-eyebrow">{column.heading}</p>
              <div className="flex flex-col items-start gap-1">
                {column.links.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    data-underline-link
                    className="text-footer-link leading-(--text-footer-link--line-height) text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="footer-eyebrow">
            Not your typical logistics academy
          </p>
          <p className="font-display italic text-[clamp(3rem,7vw+1.25rem,8.5rem)] leading-none tracking-tight text-white">
            Loxygen Academy
          </p>
        </div>
      </footer>

      <div ref={darkRef} className="footer-parallax-dark" />
    </div>
  );
}
