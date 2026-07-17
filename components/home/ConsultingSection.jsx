const REGIONS = ["Africa", "Europe", "Asia"];

export default function ConsultingSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="font-display text-heading font-bold tracking-tight text-brand-navy">
              Bring in the specialists when it matters most
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Strengthen your team with consulting specialists in breakbulk, container
              logistics and airfreight across Africa, Europe and Asia — plus expert support on
              sustainability strategy, CSRD reporting, emission reduction and energy-transition
              logistics.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 p-10">
              <p className="font-display text-6xl font-bold tracking-tight text-brand-navy">
                {REGIONS.length}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                Regions with active specialists
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
