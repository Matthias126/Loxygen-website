const REGIONS = ["Africa", "Europe", "Asia"];

export default function ConsultingSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7" data-reveal>
            <h2 className="font-display text-heading tracking-tight text-brand-navy">
              Bring in the specialists when it matters most
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Strengthen your team with consulting specialists in breakbulk, container
              logistics and airfreight across Africa, Europe and Asia — plus expert support on
              sustainability strategy, CSRD reporting, emission reduction and energy-transition
              logistics.
            </p>
          </div>

          <div className="relative z-10 lg:col-span-5 lg:-my-24" data-reveal>
            <div className="rounded-2xl border-l-4 border-brand-navy bg-white p-10 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Specialists active across {REGIONS.length} regions
              </p>
              <ul className="mt-6 space-y-4">
                {REGIONS.map((region) => (
                  <li
                    key={region}
                    className="flex items-center justify-between border-b border-slate-100 pb-4 text-lg font-medium text-brand-navy last:border-0 last:pb-0"
                  >
                    {region}
                    <span aria-hidden="true">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
