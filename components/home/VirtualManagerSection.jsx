import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const QUERIES = [
  "How long to ship 2 pallets from Antwerp to Lagos?",
  "Which partner covers breakbulk in West Africa?",
  "What will customs clearance cost in Rotterdam?",
  "Who can handle an oversized cargo move to Mombasa?",
];

export default function VirtualManagerSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const ctaRef = useRef(null);
  const wordmarkRef = useRef(null);
  const stageRef = useRef(null);
  const [queryIndex, setQueryIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return undefined;

    let cancelled = false;
    let ctx;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // The section is navy/white-text by default (its Tailwind classes) so
        // that stays correct with JS disabled. Here we set the "arriving from
        // a white section" starting colors, then scrub them back to that
        // true navy end-state as the section scrolls into view — clearProps
        // hands control back to the CSS classes once the scrub completes.
        gsap.set(sectionRef.current, { backgroundColor: "#ffffff" });
        gsap.set(headingRef.current, { color: "#023560" });
        gsap.set(paragraphRef.current, { color: "#475569" });
        gsap.set(ctaRef.current, { backgroundColor: "#023560", color: "#ffffff" });

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 15%",
            scrub: 0.6,
          },
        })
          .to(sectionRef.current, { backgroundColor: "#023560", clearProps: "backgroundColor" }, 0)
          .to(headingRef.current, { color: "#ffffff", clearProps: "color" }, 0)
          .to(paragraphRef.current, { color: "rgba(255,255,255,0.7)", clearProps: "color" }, 0)
          .to(
            ctaRef.current,
            { backgroundColor: "#ffffff", color: "#023560", clearProps: "backgroundColor,color" },
            0
          );

        gsap.fromTo(
          wordmarkRef.current,
          { letterSpacing: "-0.04em", scale: 0.85 },
          {
            letterSpacing: "0.02em",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top bottom",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // Freeze scrolling for a moment once the navy section fully fills the
  // screen (its top edge at or above the viewport top, its bottom edge at
  // or below the viewport bottom) — not a moment before, or the previous or
  // next section is still visibly bleeding in at the top or bottom. Checked
  // directly against real geometry on scroll rather than approximated with
  // fixed viewport-percentage margins, so it holds up at any viewport
  // height. Triggers once.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !sectionRef.current || !wordmarkRef.current) return undefined;

    let hasPaused = false;
    let unlockTimeoutId;
    let ticking = false;

    const lockScroll = () => {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      // Lock on <html>, not <body> — html already carries overflow-x:hidden
      // permanently, and setting overflow on body too (even briefly) is the
      // exact "both html and body have non-visible overflow" trap that broke
      // position:sticky site-wide before. Keeping it to one element avoids it.
      document.documentElement.style.overflowY = "hidden";
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    };

    const unlockScroll = () => {
      document.documentElement.style.overflowY = "";
      document.body.style.paddingRight = "";
    };

    const checkCoverage = () => {
      ticking = false;
      if (hasPaused || !sectionRef.current || !wordmarkRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const fullyCovers = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!fullyCovers) return;

      // Full navy coverage alone can be true before AURA itself has fully
      // scrolled into view (there's a lot of navy above it from the heading
      // block) — also wait for the word to be entirely on screen so the
      // freeze doesn't land on it half cut off at the bottom.
      const wordRect = wordmarkRef.current.getBoundingClientRect();
      const wordFullyVisible = wordRect.top >= 0 && wordRect.bottom <= window.innerHeight;
      if (!wordFullyVisible) return;

      hasPaused = true;
      lockScroll();
      unlockTimeoutId = setTimeout(unlockScroll, 900);
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      if (hasPaused || ticking) return;
      ticking = true;
      requestAnimationFrame(checkCoverage);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Covers the (unlikely) case of loading the page already scrolled here.
    checkCoverage();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(unlockTimeoutId);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const current = QUERIES[queryIndex % QUERIES.length];

    if (prefersReducedMotion) {
      const timeoutId = setTimeout(() => setDisplayText(current), 0);
      return () => clearTimeout(timeoutId);
    }

    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      if (!deleting) {
        charIndex += 1;
        setDisplayText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          timeoutId = setTimeout(() => {
            deleting = true;
            tick();
          }, 1600);
          return;
        }
        timeoutId = setTimeout(tick, 28);
      } else {
        charIndex -= 1;
        setDisplayText(current.slice(0, charIndex));
        if (charIndex === 0) {
          timeoutId = setTimeout(
            () => setQueryIndex((i) => (i + 1) % QUERIES.length),
            400
          );
          return;
        }
        timeoutId = setTimeout(tick, 14);
      }
    };

    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
  }, [queryIndex]);

  return (
    <section
      id="virtual-logistics-manager"
      ref={sectionRef}
      className="bg-grain scroll-mt-20 bg-brand-navy"
    >
      <div className="mx-auto max-w-4xl px-6 pt-32 text-center lg:px-8 lg:pt-40" data-reveal>
        <h2 ref={headingRef} className="font-display text-heading tracking-tight text-white">
          <span className="block">Meet AURA.</span>
          <span className="block italic text-brand-accent">Ask it anything about the network.</span>
        </h2>

        <p ref={paragraphRef} className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
          AURA is the logistics specialist you always needed and could never afford to hire,
          trained on every trade lane, partner, rate and compliance requirement across a
          network of 380+ companies. Available now, never retiring, getting smarter every day.
        </p>

        <div className="mt-10">
          <Link
            ref={ctaRef}
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-semibold text-brand-navy hover:bg-white/90"
          >
            Discover the Virtual Logistics Manager
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-40 lg:px-8 lg:pt-28 lg:pb-56">
        <div
          ref={stageRef}
          className="relative flex min-h-[480px] flex-col items-center justify-center gap-10 lg:min-h-[600px]"
        >
          <span
            ref={wordmarkRef}
            className="font-display inline-block select-none text-[clamp(4.5rem,14vw+1rem,13rem)] leading-none tracking-tight text-white"
          >
            AURA
          </span>

          <p
            aria-hidden="true"
            className="flex min-h-[1.75em] max-w-2xl items-baseline justify-center gap-1 px-4 text-center text-lg font-medium text-white/70 lg:text-xl"
          >
            <span>{displayText}</span>
            <span className="inline-block h-[1em] w-[2px] translate-y-0.5 animate-pulse bg-white/70" />
          </p>
          <p className="sr-only">
            Example questions you can ask AURA: {QUERIES.join("; ")}
          </p>
        </div>
      </div>
    </section>
  );
}
