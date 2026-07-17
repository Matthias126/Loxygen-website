import Link from "next/link";
import AcademyRadialSlider from "@/components/home/AcademyRadialSlider";

const FORMATS = [
  "Live webinars",
  "Micro-learnings",
  "E-learning",
  "In-company training",
  "Immersive learning trips",
];

export default function AcademySection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading font-bold tracking-tight text-brand-navy">
            Everything you need to move global freight
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Drag, click or use the arrows to spin through what the Academy offers — courses,
            webinars and immersive programmes for freight forwarders and supply chain teams.
          </p>
        </div>

        <div className="mt-4">
          <AcademyRadialSlider />
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 lg:p-10">
          <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2">
            <div>
              <p className="font-display text-stat font-bold leading-none text-brand-navy">
                380+
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Companies already training with the Academy
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Every format above, however you like to learn
              </p>
              <p className="mt-3 text-sm font-medium text-brand-navy">
                {FORMATS.join(" · ")}
              </p>
            </div>
          </div>

          <Link
            href="/the-academy"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy/90"
          >
            Browse the full catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}
