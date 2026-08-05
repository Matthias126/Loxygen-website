import { Fragment, useEffect, useRef } from "react";

// Splits text into words and, on scroll, "fills them in" from dim to full
// opacity as the paragraph crosses the viewport. Words render at full
// opacity by default (via the caller's own text classes) — the dim starting
// state is only ever set here, inside the animated path, so the paragraph
// stays fully readable if this never runs (JS disabled, reduced motion).
export default function ScrollFillText({ text, className = "" }) {
  const containerRef = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return undefined;

    let cancelled = false;
    let ctx;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const wordEls = containerRef.current.querySelectorAll("[data-word]");
        gsap.set(wordEls, { opacity: 0.25 });
        gsap.to(wordEls, {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        });
      }, containerRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span data-word>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </p>
  );
}
