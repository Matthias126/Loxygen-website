import Image from "next/image";

const PARTNERS = [
  {
    name: "CrossTrades",
    logo: "/images/crosstrades-logo-white.png",
    width: 1107,
    height: 483,
    boxBg: "bg-[#2764DD]",
    url: "https://crosstradesnetwork.com",
  },
  {
    name: "SeaBlue Project Logistics Network",
    logo: "/images/seablue-logo-white.png",
    width: 1000,
    height: 510,
    boxBg: "bg-[#394F78]",
    url: "https://seabluenetwork.com",
  },
  {
    name: "Flyte",
    logo: "/images/flyte-weblogo.svg",
    width: 264,
    height: 135,
    boxBg: "bg-[#FFBA00]",
    url: "https://flyte.network",
  },
];

export default function PartnerLogos() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center lg:px-8">
        <p className="text-sm font-medium text-slate-400">Exclusive partner of</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
          {PARTNERS.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
              className={`flex h-24 w-44 items-center justify-center rounded-lg px-6 transition-opacity hover:opacity-90 ${partner.boxBg}`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-14 w-auto max-w-full object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
