import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

function CardBody({ course, isOwned }) {
  return (
    <>
      {course.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL
        <img
          src={course.cover_image_url}
          alt={course.title}
          className="aspect-video w-full rounded-t-xl object-cover"
        />
      ) : (
        <PlaceholderImage label={course.type} className="aspect-video w-full rounded-b-none" />
      )}
      <div className="p-4">
        <h3 className="font-display text-base leading-snug text-brand-navy group-hover:underline">
          {course.title}
        </h3>
        <p className="mt-2 text-xs font-medium text-slate-500">
          {isOwned ? "Owned" : "Learning course"}
        </p>
      </div>
    </>
  );
}

export default function LibraryCourseCard({ course, isOwned, disabled = false }) {
  if (disabled) {
    return (
      <div className="block w-64 flex-none snap-start rounded-xl bg-white shadow-card">
        <CardBody course={course} isOwned={isOwned} />
      </div>
    );
  }

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block w-64 flex-none snap-start rounded-xl bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <CardBody course={course} isOwned={isOwned} />
    </Link>
  );
}
