import { SITE_URL, SITE_NAME } from "@/lib/seo";

const COURSE_TOPICS = [
  {
    name: "BESS Logistics",
    description:
      "Transport, safety and compliance training for battery energy storage system logistics.",
  },
  {
    name: "Breakbulk Operations",
    description:
      "Planning and executing breakbulk and project cargo movements across international trade lanes.",
  },
  {
    name: "International Trade & Transport",
    description:
      "International trade rules, documentation and multimodal transport for freight forwarders.",
  },
  {
    name: "ESG & Sustainable Forwarding",
    description:
      "Sustainability strategy, CSRD reporting and emission-reduction practices for freight forwarding.",
  },
  {
    name: "Supply Chain Fundamentals",
    description:
      "The fundamentals of supply chain management and freight forwarding.",
  },
];

function courseSchema(topic) {
  return {
    "@type": "Course",
    name: topic.name,
    description: topic.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  };
}

const PROGRAMMES = [
  {
    name: "E-learning",
    description:
      "On-demand courses covering trade compliance, documentation and freight operations.",
  },
  {
    name: "Micro-learnings",
    description:
      "Bite-sized lessons delivered year-round through JollyDeck, for teams learning in the flow of work.",
  },
  {
    name: "Breakbulk Training",
    description:
      "Webinars on planning and executing breakbulk and project cargo movements.",
  },
  {
    name: "BESS Logistics Training",
    description:
      "Transport, safety and compliance training for battery energy storage system logistics.",
  },
  {
    name: "Young Forwarders Benelux",
    description:
      "A European Ports Immersion Week for the next generation of Benelux freight forwarders.",
  },
  {
    name: "Africa Roadtrip 2026",
    description: "An immersive road trip through Africa's key logistics corridors.",
  },
  {
    name: "Sustainable Forwarding",
    description: "ESG strategy, CSRD reporting and the Sustainability Award 2026.",
  },
];

export function buildAcademyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PROGRAMMES.map((programme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: courseSchema(programme),
    })),
  };
}

function courseInstanceItemListJsonLd(courses) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        ...courseSchema(course),
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: course.courseMode,
          inLanguage: course.inLanguage,
          ...(course.startDate ? { startDate: course.startDate } : {}),
          ...(course.endDate ? { endDate: course.endDate } : {}),
        },
      },
    })),
  };
}

export function buildUpcomingCoursesJsonLd(upcomingCourses) {
  return courseInstanceItemListJsonLd(
    upcomingCourses.map((course) => ({
      name: course.title,
      description: course.description,
      courseMode: course.type === "immersive" ? "onsite" : "online",
      inLanguage: "en",
      ...(course.available_at ? { startDate: course.available_at.slice(0, 10) } : {}),
    }))
  );
}

const BREAKBULK_TIERS = [
  {
    name: "Breakbulk Micro Learnings",
    description:
      "Bite-sized breakbulk knowledge delivered through short webinars on the JollyDeck platform.",
    courseMode: "online",
    inLanguage: "en",
    startDate: "2026-06",
  },
  {
    name: "Breakbulk Essentials",
    description:
      "A comprehensive foundation course for freight forwarders handling breakbulk cargo.",
    courseMode: "online",
    inLanguage: "en",
  },
  {
    name: "Breakbulk PRO",
    description: "Advanced breakbulk training for experienced freight professionals.",
    courseMode: "online",
    inLanguage: "en",
  },
];

export function buildBreakbulkJsonLd() {
  return courseInstanceItemListJsonLd(BREAKBULK_TIERS);
}

export function buildYoungForwardersJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Young Forwarders Benelux: European Ports Immersion Week",
    description:
      "A 6-day immersion week through European ports and logistics hubs for freight forwarders aged 22–35, open to SeaBlue Project Logistics Network and CrossTrades members.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      inLanguage: "en",
      startDate: "2027-05",
      location: {
        "@type": "Place",
        name: "Benelux ports (Antwerp-Bruges, Rotterdam)",
      },
    },
    audience: {
      "@type": "Audience",
      audienceType: "Freight forwarders aged 22-35",
    },
  };
}

export function buildAfricaRoadtripJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Africa Roadtrip 2026",
    description:
      "A 7-day boots-on-the-ground logistics journey across Ethiopia, Ghana and Namibia for logistics professionals, capped at 15 participants.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      inLanguage: "en",
      startDate: "2027-02",
      location: {
        "@type": "Place",
        name: "Ethiopia, Ghana and Namibia",
      },
      maximumAttendeeCapacity: 15,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Logistics professionals",
    },
  };
}

export function buildSustainabilityAwardJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Loxygen Sustainability Award 2026",
    description:
      "An award recognising freight forwarders' environmental, social and governance initiatives, with winners announced at the Vietnam AGM.",
    startDate: "2026-09",
    location: {
      "@type": "Place",
      name: "Vietnam AGM",
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  };
}

const FOUNDERS = [
  {
    name: "Geert De Wilde",
    jobTitle: "Co-founder",
    description:
      "35+ years in the maritime industry, with C-level positions in freight forwarding and digital supply chain platforms.",
  },
  {
    name: "Rik Spruyt",
    jobTitle: "Co-founder",
    description:
      "35+ years in the maritime industry; founder of the CrossTrades and SeaBlue Project Logistics Network partner networks.",
  },
  {
    name: "Guido Van Nuffelen",
    jobTitle: "Strategic ESG & Business Management Consultant",
    description: "Owner of Orchestri; strategic ESG and business management consultant.",
  },
];

export function buildAboutUsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Loxygen BV",
    url: SITE_URL,
    foundingDate: "2024",
    foundingLocation: "Belgium",
    sameAs: SITE_URL,
    employee: FOUNDERS.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
      description: founder.description,
    })),
  };
}

export function buildBessCourseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "BESS Logistics Training",
    description:
      "BESS logistics training for freight forwarders: UN 3536 classification, shipping line restrictions, ADR permits and market opportunities across European markets and beyond.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "en",
      startDate: "2026-09-03T09:00:00+02:00",
      endDate: "2026-09-03T12:00:00+02:00",
      instructor: {
        "@type": "Person",
        name: "Hilde Lenaerts",
        affiliation: "LAGOMax",
      },
    },
    offers: {
      "@type": "Offer",
      price: "350",
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      url: `${SITE_URL}/bess-logistics-training`,
    },
  };
}

export const BESS_FAQ = [
  {
    question: "What is UN 3536 and why does it matter for freight forwarders?",
    answer:
      "UN 3536 is the IMDG Code classification covering lithium batteries installed in cargo transport units, such as BESS containers. It differs from UN 3480 and UN 3481, and misclassification is a common source of shipment delays.",
  },
  {
    question: "Can all shipping lines carry BESS containers?",
    answer:
      "No. Some major carriers refuse BESS cargo entirely, and acceptance varies by route and vessel type. The training covers how to navigate this fragmented landscape.",
  },
  {
    question: "What are the new IMDG UN numbers coming for BESS?",
    answer:
      "IMDG Amendment 43-26 introduces new UN numbers, including UN 3558 for damaged or defective lithium batteries and UN 3564 for sodium-ion batteries.",
  },
];

export function buildBessFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BESS_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildMicroLearningsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Micro-learnings",
    description:
      "Bite-sized logistics and freight forwarding lessons delivered year-round through JollyDeck, for teams learning in the flow of work.",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "190",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/micro-learnings`,
    },
  };
}

export const HELP_FAQ = [
  {
    question: "How do I create an account?",
    answer:
      "Click \"Sign in\" in the top navigation, then follow the link to create an account. You'll need it to purchase e-learning courses and to access content after checkout.",
  },
  {
    question: "How do I purchase a course, webinar or subscription?",
    answer:
      "Open the course, webinar or programme page and follow the checkout link. Payment is handled securely by Stripe, and you'll receive a confirmation email once it's complete.",
  },
  {
    question: "Where do I find my e-learning courses after I've bought them?",
    answer:
      "Sign in and go to \"My account\": every course tied to your account is listed there, along with a link to start it.",
  },
  {
    question: "After subscribing to micro-learnings, how do I get access to JollyDeck?",
    answer:
      "After your subscription payment is confirmed, we set up your JollyDeck account and send the login details to the email address you used at checkout. This is a manual step on our side, so allow up to one business day.",
  },
  {
    question: "How do I register for a webinar or immersive programme?",
    answer:
      "Each webinar and immersive programme page has its own registration or checkout link, along with dates, seat limits and eligibility where relevant.",
  },
  {
    question: "Who do I contact if I still need help?",
    answer:
      "Reach us any time through the contact page, or email geert@loxygen.world directly.",
  },
];

export function buildHelpFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HELP_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogPostJsonLd(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
  };
}

export function buildHomepageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      description:
        "Loxygen Academy is a logistics training platform helping freight forwarders and supply chain teams build practical, job-ready expertise.",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: COURSE_TOPICS.map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: courseSchema(topic),
      })),
    },
  ];
}
