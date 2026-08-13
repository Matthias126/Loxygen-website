import Image from "next/image";
import Link from "next/link";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function ProgrammeCard({
  href,
  format,
  title,
  description,
  image,
  imageAlt,
  imageLabel,
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl bg-white p-8 shadow-card transition-[box-shadow,border-color] hover:shadow-card-hover hover:border-l-4 hover:border-l-brand-navy"
    >
      {image ? (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : imageLabel ? (
        <PlaceholderImage label={imageLabel} className="mb-6 aspect-video w-full" />
      ) : null}
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {format}
      </span>
      <h3 className="font-display mt-4 text-xl text-brand-navy group-hover:underline">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-6 inline-block text-sm font-semibold text-brand-navy">
        Explore{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}
