import Link from "next/link";

export default function SustainabilityAwardCrossLink() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="bg-grain rounded-3xl bg-brand-navy px-6 py-16 text-center">
          <p className="font-display text-2xl text-white">
            Loxygen Sustainability Award: start now for your 2027 award.
          </p>
          <p className="mt-3 text-sm font-medium text-white/60">
            Ceremonies at the SeaBlue Project Logistics Network and CrossTrades AGMs, September
            2027, Bangkok.
          </p>
          <Link
            href="/sustainable-forwarding"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-base font-semibold text-brand-navy hover:bg-white/90"
          >
            See the 2026 winners
          </Link>
        </div>
      </div>
    </section>
  );
}
