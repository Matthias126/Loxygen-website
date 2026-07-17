import Link from "next/link";

export default function ProgrammeCard({ href, format, title, description }) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md hover:border-l-4 hover:border-l-brand-navy"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {format}
      </span>
      <h3 className="font-display mt-4 text-xl font-semibold text-brand-navy group-hover:underline">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-6 inline-block text-sm font-semibold text-brand-navy">
        Explore →
      </span>
    </Link>
  );
}
