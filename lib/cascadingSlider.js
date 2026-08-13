// Cascading GSAP slider engine — adapted from vendor snippet to operate on a
// single React-owned container instead of scanning the whole document.

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

const DURATION = 0.65;
const EASE = "power3.inOut";

const BREAKPOINTS = [
  { maxWidth: 479, activeWidth: 0.78, siblingWidth: 0.08 },
  { maxWidth: 767, activeWidth: 0.7, siblingWidth: 0.1 },
  { maxWidth: 991, activeWidth: 0.6, siblingWidth: 0.1 },
  { maxWidth: Infinity, activeWidth: 0.6, siblingWidth: 0.13 },
];

export function initCascadingSlider(container, gsap, onChange) {
  destroyCascadingSlider(container);

  const viewport = container.querySelector("[data-cascading-viewport]");
  const prevButton = container.querySelector("[data-cascading-slider-prev]");
  const nextButton = container.querySelector("[data-cascading-slider-next]");
  if (!viewport) return;

  const originalSlides = Array.from(
    viewport.querySelectorAll("[data-cascading-slide]:not([data-clone])")
  );
  if (!originalSlides.length) return;

  const slides = originalSlides.slice();
  while (slides.length < 9) {
    originalSlides.forEach((original) => {
      const clone = original.cloneNode(true);
      clone.setAttribute("data-clone", "");
      clone.setAttribute("aria-hidden", "true");
      viewport.appendChild(clone);
      slides.push(clone);
    });
  }

  const totalSlides = slides.length;
  let activeIndex = 0;
  let isAnimating = false;
  let slideWidth = 0;
  let slotCenters = {};
  let slotWidths = {};

  function readGap() {
    const raw = getComputedStyle(viewport).getPropertyValue("--gap").trim();
    if (!raw) return 0;
    const temp = document.createElement("div");
    temp.style.width = raw;
    temp.style.position = "absolute";
    temp.style.visibility = "hidden";
    viewport.appendChild(temp);
    const px = temp.offsetWidth;
    viewport.removeChild(temp);
    return px;
  }

  function getSettings() {
    const windowWidth = window.innerWidth;
    for (let i = 0; i < BREAKPOINTS.length; i++) {
      if (windowWidth <= BREAKPOINTS[i].maxWidth) return BREAKPOINTS[i];
    }
    return BREAKPOINTS[BREAKPOINTS.length - 1];
  }

  function getOffset(slideIndex, fromIndex = activeIndex) {
    let distance = slideIndex - fromIndex;
    const half = totalSlides / 2;
    if (distance > half) distance -= totalSlides;
    if (distance < -half) distance += totalSlides;
    return distance;
  }

  function measure() {
    const settings = getSettings();
    const viewportWidth = viewport.offsetWidth;
    const gap = readGap();

    const activeSlideWidth = viewportWidth * settings.activeWidth;
    const siblingSlideWidth = viewportWidth * settings.siblingWidth;
    const farSlideWidth = Math.max(
      0,
      (viewportWidth - activeSlideWidth - 2 * siblingSlideWidth - 4 * gap) / 2
    );

    slideWidth = activeSlideWidth;

    const visibleSlots = [
      { slot: -2, width: farSlideWidth },
      { slot: -1, width: siblingSlideWidth },
      { slot: 0, width: activeSlideWidth },
      { slot: 1, width: siblingSlideWidth },
      { slot: 2, width: farSlideWidth },
    ];

    let x = 0;
    visibleSlots.forEach((def, i) => {
      slotCenters[String(def.slot)] = x + def.width / 2;
      slotWidths[String(def.slot)] = def.width;
      if (i < visibleSlots.length - 1) x += def.width + gap;
    });

    slotCenters["-3"] = slotCenters["-2"] - farSlideWidth / 2 - gap - farSlideWidth / 2;
    slotWidths["-3"] = farSlideWidth;
    slotCenters["3"] = slotCenters["2"] + farSlideWidth / 2 + gap + farSlideWidth / 2;
    slotWidths["3"] = farSlideWidth;

    slides.forEach((slide) => {
      slide.style.width = slideWidth + "px";
    });
  }

  function getSlideProps(offset) {
    const clamped = Math.max(-3, Math.min(3, offset));
    const slotWidth = slotWidths[String(clamped)];
    const clipAmount = Math.max(0, (slideWidth - slotWidth) / 2);
    const translateX = slotCenters[String(clamped)] - slideWidth / 2;

    return {
      x: translateX,
      "--clip": clipAmount,
      zIndex: 10 - Math.abs(clamped),
    };
  }

  function layout(animate, previousIndex) {
    slides.forEach((slide, index) => {
      const offset = getOffset(index);

      if (offset < -3 || offset > 3) {
        if (animate && previousIndex !== undefined) {
          const previousOffset = getOffset(index, previousIndex);
          if (previousOffset >= -2 && previousOffset <= 2) {
            const exitSlot = previousOffset < 0 ? -3 : 3;
            gsap.to(
              slide,
              Object.assign({}, getSlideProps(exitSlot), {
                duration: DURATION,
                ease: EASE,
                overwrite: true,
              })
            );
            return;
          }
        }

        const parkSlot = offset < 0 ? -3 : 3;
        gsap.set(slide, getSlideProps(parkSlot));
        return;
      }

      const props = getSlideProps(offset);
      slide.setAttribute("data-status", offset === 0 ? "active" : "inactive");

      if (animate) {
        gsap.to(
          slide,
          Object.assign({}, props, {
            duration: DURATION,
            ease: EASE,
            overwrite: true,
          })
        );
      } else {
        gsap.set(slide, props);
      }
    });
  }

  function goTo(targetIndex) {
    const normalizedTarget = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
    if (isAnimating || normalizedTarget === activeIndex) return;
    isAnimating = true;

    const previousIndex = activeIndex;
    const travelDirection = getOffset(normalizedTarget, previousIndex) > 0 ? 1 : -1;

    slides.forEach((slide, index) => {
      const currentOffset = getOffset(index, previousIndex);
      const nextOffset = getOffset(index, normalizedTarget);
      const wasInRange = currentOffset >= -3 && currentOffset <= 3;
      const willBeVisible = nextOffset >= -2 && nextOffset <= 2;

      if (!wasInRange && willBeVisible) {
        const entrySlot = travelDirection > 0 ? 3 : -3;
        gsap.set(slide, getSlideProps(entrySlot));
      }

      const wasInvisible = Math.abs(currentOffset) >= 3;
      const willBeStaging = Math.abs(nextOffset) === 3;
      const crossesSides = currentOffset * nextOffset < 0;
      if (wasInvisible && willBeStaging && crossesSides) {
        gsap.set(slide, getSlideProps(nextOffset > 0 ? 3 : -3));
      }
    });

    activeIndex = normalizedTarget;
    layout(true, previousIndex);
    if (onChange) onChange(activeIndex % originalSlides.length);
    gsap.delayedCall(DURATION + 0.05, () => {
      isAnimating = false;
    });
  }

  const AUTOPLAY_MS = 3000;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoplayTimer;

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(activeIndex + 1), AUTOPLAY_MS);
  }

  const onPrevClick = () => {
    goTo(activeIndex - 1);
    startAutoplay();
  };
  const onNextClick = () => {
    goTo(activeIndex + 1);
    startAutoplay();
  };
  if (prevButton) prevButton.addEventListener("click", onPrevClick);
  if (nextButton) nextButton.addEventListener("click", onNextClick);

  const slideClickHandlers = slides.map((slide, index) => {
    const handler = () => {
      if (index !== activeIndex) goTo(index);
      startAutoplay();
    };
    slide.addEventListener("click", handler);
    return handler;
  });

  // Scoped to the container (not `document`) so arrow keys only drive this
  // slider when one of its own controls has focus, instead of hijacking
  // arrow-key behaviour anywhere else on the page.
  const onKeydown = (event) => {
    if (event.key === "ArrowLeft") {
      goTo(activeIndex - 1);
      startAutoplay();
    }
    if (event.key === "ArrowRight") {
      goTo(activeIndex + 1);
      startAutoplay();
    }
  };
  container.addEventListener("keydown", onKeydown);

  const onResize = debounce(() => {
    measure();
    layout(false);
  }, 100);
  window.addEventListener("resize", onResize);

  measure();
  layout(false);
  if (onChange) onChange(activeIndex % originalSlides.length);
  startAutoplay();

  container._cascadingCleanup = () => {
    if (prevButton) prevButton.removeEventListener("click", onPrevClick);
    if (nextButton) nextButton.removeEventListener("click", onNextClick);
    slides.forEach((slide, index) => slide.removeEventListener("click", slideClickHandlers[index]));
    container.removeEventListener("keydown", onKeydown);
    window.removeEventListener("resize", onResize);
    stopAutoplay();
    gsap.killTweensOf(slides);
    viewport.querySelectorAll("[data-clone]").forEach((el) => el.remove());
  };
}

export function destroyCascadingSlider(container) {
  if (container._cascadingCleanup) {
    container._cascadingCleanup();
    container._cascadingCleanup = null;
  }
}
