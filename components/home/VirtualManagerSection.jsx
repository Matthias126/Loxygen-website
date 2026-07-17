import Link from "next/link";

export default function VirtualManagerSection() {
  return (
    <section id="virtual-logistics-manager" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-32 text-center lg:px-8 lg:py-40">
        <h2 className="font-display text-heading font-bold tracking-tight text-brand-navy">
          Meet <span className="text-brand-accent">AURA</span>
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          AURA is the logistics specialist you always needed and could never afford to hire.
          It knows every trade lane, partner, template, rate and compliance requirement,
          backed by a network of 380+ companies. Available now, never retiring, getting
          smarter every day. The Academy trains your people to work alongside it.
        </p>

        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-8 py-4 text-base font-semibold text-white hover:bg-brand-navy/90"
          >
            Discover the Virtual Logistics Manager
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-32 lg:px-8 lg:pb-40">
        <div className="flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl bg-brand-navy">
          <span className="font-display text-6xl font-black tracking-tight text-white lg:text-7xl">
            AURA
          </span>
        </div>
      </div>
    </section>
  );
}
