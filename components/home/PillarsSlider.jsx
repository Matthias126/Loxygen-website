import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./PillarsSlider.module.css";
import { initCascadingSlider, destroyCascadingSlider } from "@/lib/cascadingSlider";

const PILLARS = [
  {
    title: "Maritime",
    description: "Deep expertise in ocean freight, ports and vessel operations.",
    image: "/images/maritime_pillar.jpg",
    icon: (
      <path d="M3 18c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0M6 18l1-9h10l1 9M9 9V4h6v5" />
    ),
  },
  {
    title: "People",
    description: "Training built around the people who move freight, not just the cargo.",
    image: "/images/people-pillar.jpeg",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M21 20c0-2.6-1.8-4.8-4.2-5.6" />
      </>
    ),
  },
  {
    title: "Platforms",
    description: "Practical fluency with the digital tools freight forwarders run on.",
    image: "/images/platform_pillar.jpeg",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    title: "Sustainability",
    description: "ESG, CSRD and energy-transition logistics built into every track.",
    image: "/images/sustainable-pillar.jpg",
    icon: <path d="M12 3c4 2 6 5.5 6 9a6 6 0 0 1-12 0c0-3.5 2-7 6-9ZM12 21v-9" />,
  },
  {
    title: "AI",
    description: "AI-assisted logistics operations, from AURA to everyday workflows.",
    image: "/images/ai_pillar.png",
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2.5" />
        <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <path d="M9 15c1 .8 3 .8 4 0" />
        <path d="M9 2v3M15 2v3M9 22v-3M15 22v-3M2 9h3M2 15h3M22 9h-3M22 15h-3" />
      </>
    ),
  },
];

export default function PillarsSlider() {
  const containerRef = useRef(null);
  const [, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let gsapInstance;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;

      gsapInstance = gsap;
      initCascadingSlider(container, gsap, setActiveIndex);
    })();

    return () => {
      cancelled = true;
      if (gsapInstance) destroyCascadingSlider(container);
    };
  }, []);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <h2
          className="font-display max-w-2xl text-heading tracking-tight text-brand-navy"
          data-reveal
        >
          Five pillars, one platform
        </h2>

        <div
          data-cascading-slider-wrap=""
          aria-label="The five pillars of Loxygen Academy"
          aria-roledescription="carousel"
          ref={containerRef}
          className={`${styles.slider} mt-12`}
        >
          <div className={styles.collection}>
            <div data-cascading-viewport="" className={styles.list}>
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  aria-roledescription="slide"
                  aria-label={`${pillar.title} pillar`}
                  data-cascading-slide=""
                  role="group"
                  className={styles.item}
                >
                  <div className={styles.itemInner}>
                    <div className={styles.itemBg}>
                      {pillar.image && (
                        <>
                          <Image
                            src={pillar.image}
                            alt=""
                            fill
                            sizes="(max-width: 767px) 100vw, 33vw"
                            className={styles.itemBgImage}
                          />
                          <div className={styles.itemBgOverlay} />
                        </>
                      )}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={styles.itemIcon}
                      >
                        {pillar.icon}
                      </svg>
                    </div>
                    <div className={styles.itemContent}>
                      <h3 className={styles.itemTitle}>{pillar.title}</h3>
                      <p className={styles.itemDescription}>{pillar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav aria-label="Pillar slider navigation" className={styles.nav}>
            <button
              type="button"
              data-cascading-slider-prev=""
              aria-label="Previous pillar"
              className={styles.button}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`${styles.buttonArrow} ${styles.isPrev}`}
              >
                <path d="M14 19L21 12L14 5" strokeMiterlimit="10" />
                <path d="M21 12H2" strokeMiterlimit="10" />
              </svg>
            </button>
            <button
              type="button"
              data-cascading-slider-next=""
              aria-label="Next pillar"
              className={styles.button}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={styles.buttonArrow}
              >
                <path d="M14 19L21 12L14 5" strokeMiterlimit="10" />
                <path d="M21 12H2" strokeMiterlimit="10" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
