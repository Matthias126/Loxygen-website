import Image from "next/image";

const PARTNERS = [
  {
    name: "CrossTrades",
    logo: "/images/crosstrades-logo-white.png",
    width: 1107,
    height: 483,
    boxBg: "bg-[#2764DD]",
  },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/seablue-logo-white.png",
    width: 1000,
    height: 510,
    boxBg: "bg-[#394F78]",
  },
  {
    name: "Flyte",
    logo: "/images/flyte-weblogo.svg",
    width: 264,
    height: 135,
    boxBg: "bg-[#FFBA00]",
  },
];

export default function PartnerLogos() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center lg:px-8">
        <p className="text-sm font-medium text-slate-400">Working with</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className={`flex h-24 w-44 items-center justify-center rounded-lg px-6 ${partner.boxBg}`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-14 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
