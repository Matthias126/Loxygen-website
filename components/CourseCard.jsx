import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function CourseCard({ course, isOwned }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col justify-between rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
    >
      <div>
        {course.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URL, no next/image domain config for this demo pass
          <img
            src={course.cover_image_url}
            alt=""
            className="mb-6 aspect-video w-full rounded-xl object-cover"
          />
        ) : (
          <PlaceholderImage label={course.type} className="mb-6 aspect-video w-full" />
        )}

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {course.type}
          {course.available_at ? ` · ${formatDate(course.available_at)}` : ""}
        </span>
        <h3 className="font-display mt-4 text-xl text-brand-navy group-hover:underline">
          {course.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        {course.price ? (
          <span className="text-sm font-semibold text-brand-navy">€{course.price}</span>
        ) : (
          <span />
        )}

        {isOwned ? (
          <span className="text-sm font-semibold text-brand-navy">Owned</span>
        ) : (
          <span className="text-sm font-semibold text-brand-navy">
            Learn more{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        )}
      </div>
    </Link>
  );
}
