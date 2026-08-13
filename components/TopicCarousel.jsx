import { useRef } from "react";
import LibraryCourseCard from "@/components/LibraryCourseCard";

export default function TopicCarousel({ topic, ownedCourseIds = [], disabled = false }) {
  const scrollerRef = useRef(null);

  const scrollBy = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-brand-navy">{topic.name}</h2>

      <div className="relative mt-6">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {topic.courses.map((course) => (
            <LibraryCourseCard
              key={course.id}
              course={course}
              isOwned={ownedCourseIds.includes(course.id)}
              disabled={disabled}
            />
          ))}
        </div>

        {topic.courses.length > 3 ? (
          <>
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label={`Scroll ${topic.name} left`}
              className="absolute top-1/2 -left-4 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-card hover:shadow-card-hover lg:flex"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label={`Scroll ${topic.name} right`}
              className="absolute top-1/2 -right-4 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-navy shadow-card hover:shadow-card-hover lg:flex"
            >
              →
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
