// Sitewide scroll-reveal — fade + rise animation for elements marked with
// data-reveal (single element) or data-reveal-group (staggers its direct
// data-reveal-item children). Initial hidden state is only ever set here,
// inside the animated path, so content stays visible by default if this
// never runs (JS disabled, reduced motion).

const REVEAL_SELECTOR = "[data-reveal]";
const GROUP_SELECTOR = "[data-reveal-group]";
const ITEM_ATTR = "data-reveal-item";

const FROM = { opacity: 0, y: 28 };
const TO = { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" };

export function initScrollReveal(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const triggers = [];

  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    gsap.set(el, FROM);
    const tween = gsap.to(
      el,
      Object.assign({}, TO, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  document.querySelectorAll(GROUP_SELECTOR).forEach((group) => {
    const items = group.querySelectorAll(`[${ITEM_ATTR}]`);
    if (!items.length) return;

    gsap.set(items, FROM);
    const tween = gsap.to(
      items,
      Object.assign({}, TO, {
        stagger: 0.1,
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return function cleanup() {
    triggers.forEach((trigger) => trigger.kill());
  };
}
