import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AcademyRadialSlider.module.css";
import { initRadialSlider, attachRadialSliderResize, destroyRadialSlider } from "@/lib/radialSlider";

const CARDS = [
  { title: "The Academy", href: "/the-academy", initials: "TA", image: "/images/hero-port.jpg" },
  { title: "BESS Logistics Training", href: "/bess-logistics-training", initials: "BL", image: "/images/BESS.jpg" },
  { title: "e-Learning", href: "/e-learning", initials: "EL" },
  { title: "Young Forwarders Benelux", href: "/young-forwarders-benelux", initials: "YF", image: "/images/benelux-port-visit.jpg" },
  { title: "Africa Roadtrip 2026", href: "/africa-roadtrip-2026", initials: "AR", image: "/images/africa-corridor.jpg" },
  { title: "Micro Learnings", href: "/micro-learnings", initials: "ML" },
  { title: "Breakbulk Training", href: "/breakbulk-training", initials: "BT", image: "/images/breakbulk-cargo.jpg" },
  { title: "Sustainable Forwarding", href: "/sustainable-forwarding", initials: "SF", image: "/images/sustainable-forwarding.jpeg" },
  { title: "Coming Soon", href: null, initials: "Soon" },
];

export default function AcademyRadialSlider() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let removeResizeListener;
    let gsapInstance;

    (async () => {
      const [{ gsap }, { Draggable }, { InertiaPlugin }, { CustomEase }] = await Promise.all([
        import("gsap"),
        import("gsap/Draggable"),
        import("gsap/InertiaPlugin"),
        import("gsap/CustomEase"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase);
      if (!CustomEase.get("radial")) {
        CustomEase.create("radial", "0.25, 0.1, 0, 1");
      }

      gsapInstance = gsap;
      initRadialSlider(container, gsap, Draggable);
      removeResizeListener = attachRadialSliderResize(container, gsap, Draggable);
    })();

    return () => {
      cancelled = true;
      if (removeResizeListener) removeResizeListener();
      if (gsapInstance) destroyRadialSlider(container, gsapInstance);
    };
  }, []);

  return (
    <div
      data-radial-slider-init=""
      data-radial-slider-drag-status="grab"
      ref={containerRef}
      className={styles.slider}
    >
      <div data-radial-slider-collection="" className={styles.collection}>
        <div data-radial-slider-list="" className={styles.list}>
          {CARDS.map((card) => (
            <div key={card.title} data-radial-slider-item="" className={styles.item}>
              <CardInner card={card} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button type="button" data-radial-slider-control="prev" className={styles.controlBtn}>
          Prev
        </button>
        <div data-radial-slider-generate-dots="" className={styles.dots}>
          <button
            type="button"
            data-radial-slider-control="1"
            data-radial-slider-control-status="active"
            className={styles.controlDot}
          />
        </div>
        <button
          type="button"
          data-radial-slider-control="next"
          className={`${styles.controlBtn} ${styles.controlBtnNext}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function CardInner({ card }) {
  const isComingSoon = !card.href;

  const content = (
    <div className={styles.card}>
      <div className={`${styles.cardMedia} ${isComingSoon ? styles.cardMediaSoon : ""}`}>
        {card.image ? (
          <Image
            src={card.image}
            alt={card.title}
            fill
            sizes="(max-width: 767px) 15em, 20em"
            className={styles.coverImage}
          />
        ) : (
          <span className={styles.cardMonogram}>{card.initials}</span>
        )}
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
      </div>
    </div>
  );

  if (isComingSoon) {
    return (
      <div aria-disabled="true" className="cursor-default">
        {content}
      </div>
    );
  }

  return (
    <Link href={card.href} className="block">
      {content}
    </Link>
  );
}
