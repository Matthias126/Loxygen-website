import Image from "next/image";

const PARTNERS = [
  { name: "CrossTrades", logo: "/images/partner-crosstrades.png", width: 400, height: 173 },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/partner-seablue.png",
    width: 400,
    height: 283,
  },
  {
    name: "Flyte",
    logo: "/images/flyte-weblogo.svg",
    width: 264,
    height: 135,
    lightBg: true,
  },
];

export default function PartnerLogos() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center lg:px-8">
        <p className="text-sm font-medium text-slate-400">Working with</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
          {PARTNERS.map((partner) =>
            partner.lightBg ? (
              <div
                key={partner.name}
                className="flex h-24 w-44 items-center justify-center rounded-lg bg-[#FFBA00] px-6"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-14 w-auto max-w-full object-contain"
                />
              </div>
            ) : (
              <div key={partner.name} className="flex h-24 w-44 items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-full w-full object-contain"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
