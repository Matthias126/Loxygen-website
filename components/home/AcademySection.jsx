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
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <h2 className="font-display text-heading tracking-tight text-brand-navy">
            Sharpen the skills that move global freight
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Drag, click or use the arrows to spin through what the Academy offers: courses,
            webinars and immersive programmes for freight forwarders and supply chain teams.
          </p>
        </div>

        <div className="mt-4">
          <AcademyRadialSlider />
        </div>

        <div
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-5"
          data-reveal-group
        >
          <div
            className="bg-grain flex flex-col justify-between gap-10 rounded-2xl bg-brand-navy p-8 shadow-card sm:col-span-3 lg:p-10"
            data-reveal-item
          >
            <div>
              <p className="font-display text-2xl leading-snug text-white">
                Training programmes across e-learning, webinars & immersive trips.
              </p>
            </div>

            <Link
              href="/the-academy"
              className="inline-flex w-fit items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-white/90"
            >
              Browse the full catalogue
            </Link>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-card sm:col-span-2 lg:p-10" data-reveal-item>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Every format, however you like to learn
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {FORMATS.map((format) => (
                <li key={format} className="text-base font-medium text-brand-navy">
                  {format}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
