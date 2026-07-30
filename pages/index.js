import Head from "next/head";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { buildHomepageJsonLd } from "@/lib/structuredData";
import Hero from "@/components/home/Hero";
import PillarsSlider from "@/components/home/PillarsSlider";
import AcademySection from "@/components/home/AcademySection";
import VirtualManagerSection from "@/components/home/VirtualManagerSection";
import ConsultingSection from "@/components/home/ConsultingSection";
import TestimonialSection from "@/components/TestimonialSection";
import InsightsSection from "@/components/home/InsightsSection";
import CtaBanner from "@/components/home/CtaBanner";

const TITLE = "Logistics Training for Freight Forwarders | Loxygen Academy";
const DESCRIPTION =
  "Practical logistics training for freight forwarders and supply chain teams — webinars, micro-learnings, e-learning and immersive learning trips. Browse courses.";

export default function Home() {
  const jsonLd = buildHomepageJsonLd();

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={SITE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <Hero />
        <AcademySection />
        <VirtualManagerSection />
        <ConsultingSection />
        <InsightsSection />
        <TestimonialSection />
        <PillarsSlider />
        <CtaBanner />
      </main>
    </>
  );
}
