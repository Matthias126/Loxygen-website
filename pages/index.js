import Head from "next/head";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { buildHomepageJsonLd } from "@/lib/structuredData";
import { getBlogPosts } from "@/lib/blog";
import Hero from "@/components/home/Hero";
import PartnerLogos from "@/components/home/PartnerLogos";
import PillarsSlider from "@/components/home/PillarsSlider";
import AcademySection from "@/components/home/AcademySection";
import VirtualManagerSection from "@/components/home/VirtualManagerSection";
import TestimonialSection from "@/components/TestimonialSection";
import InsightsSection from "@/components/home/InsightsSection";
import CtaBanner from "@/components/home/CtaBanner";

const TITLE = "Logistics Training for Freight Forwarders | Loxygen Academy";
const DESCRIPTION =
  "Practical logistics training for freight forwarders and supply chain teams: webinars, micro-learnings, e-learning and immersive learning trips. Browse courses.";

export default function Home({ latestPosts }) {
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
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main>
        <Hero />
        <PartnerLogos />
        <AcademySection />
        <VirtualManagerSection />
        <InsightsSection posts={latestPosts} />
        <TestimonialSection
          variant="light"
          quote="Our organisation has greatly benefited from the exceptional training provided by Loxygen Logistics Academy. The courses were comprehensive, industry-relevant and delivered with a high standard of professionalism."
          name="Glyn Vince"
          role="CEO, Slade Shipping FE PTE Ltd (Singapore)"
        />
        <PillarsSlider />
        <CtaBanner />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getBlogPosts();
  return {
    props: { latestPosts: posts.slice(0, 2) },
    revalidate: 60,
  };
}
