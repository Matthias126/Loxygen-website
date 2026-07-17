import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-10 text-center lg:px-8 lg:pt-32">
        <h1 className="font-display mx-auto text-hero font-bold tracking-tight text-brand-navy">
          <span className="block">Logistics training,</span>
          <span className="block text-brand-accent">built to move global freight</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-slate-600">
          Live webinars, micro-learnings, e-learning modules and immersive training programmes
          for freight forwarders and supply chain teams.
        </p>

        <div className="mt-9 flex items-center justify-center gap-3">
          <Link
            href="/the-academy"
            className="inline-flex items-center justify-center rounded-full bg-brand-navy px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-navy/90"
          >
            Browse courses
          </Link>
          <Link
            href="#virtual-logistics-manager"
            aria-label="Meet AURA"
            className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-brand-navy text-lg text-white hover:bg-brand-navy/90"
          >
            →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="relative aspect-[21/9] overflow-hidden rounded-3xl bg-white">
          <Image
            src="/images/hero-port.jpg"
            alt="Freight forwarders working at a container port"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
