import { SITE_URL } from "@/lib/seo";
import { stripMarkdown, truncateForMeta } from "@/lib/headings";

// Plain-text summary for AI tools, served at /llms.txt (pages/llms.txt.js).
// The written sections are Geert's copy — edit them here. The course and blog
// lists are filled from Supabase so new content appears on its own.

const INTRO = `# Loxygen Academy

> Loxygen Academy (loxygen.world) offers practical logistics training for freight forwarders and supply chain teams: live webinars, micro-learnings, e-learning, in-company training and immersive learning trips. It is run by Loxygen BV, a Belgian logistics education and consulting company founded in 2024.

Loxygen positions itself as "the virtual logistics manager": a practical, on-the-job knowledge partner for freight forwarding teams, not a generic course catalogue. The Academy covers five themes: Maritime, People, Platforms, Sustainability (ESG, CSRD, energy transition) and AI. Specialist programmes include breakbulk and project cargo, battery energy storage system (BESS) logistics, international trade and documentation, and AI for logistics.

Loxygen was co-founded by Geert De Wilde and Rik Spruyt, each with 35+ years in the maritime industry. Geert has held C-level positions in freight forwarding and digital supply chain platforms. Rik founded the CrossTrades and SeaBlue Project Logistics Network partner networks.

Loxygen Academy works with three partner networks: CrossTrades, SeaBlue Project Logistics Network and Flyte.

AURA is Loxygen's Gen-AI Virtual Logistics Manager, an AI assistant for freight questions. It is coming soon.`;

const ACADEMY = `## Academy

- [The Academy](${SITE_URL}/the-academy): Overview of all courses and formats: breakbulk, BESS logistics, international trade, sustainable forwarding, e-learning, micro-learnings and immersive learning trips.
- [Micro-learnings](${SITE_URL}/micro-learnings): A yearly subscription to short logistics and freight forwarding lessons, delivered year-round. Team licences are available for companies.
- [E-learning](${SITE_URL}/e-learning): On-demand courses on trade compliance, documentation and freight operations. Learners buy courses one at a time and can pick up where they left off.
- [Breakbulk training](${SITE_URL}/breakbulk-training): Breakbulk Academy offers live online training for freight forwarders handling breakbulk and project cargo, from short modules to advanced commercial negotiation.
- [BESS logistics training](${SITE_URL}/bess-logistics-training): Training on battery energy storage system logistics for freight forwarders, run by Loxygen and Portilog since March 2026. Topics include black mass, the battery import wave and the EU battery passport.
- [Young Forwarders Benelux](${SITE_URL}/young-forwarders-benelux): A six-day European Ports Immersion Week for freight forwarders aged 22–35, in Antwerp, Rotterdam and the logistics hubs behind them.
- [North Africa Learning Trip](${SITE_URL}/north-africa-learning-trip-2026): Hands-on logistics learning across Egypt, Tunisia and Morocco, with six days inside the operations of three hosts who run these corridors.
- [Sustainability Award](${SITE_URL}/sustainable-forwarding): The Loxygen Sustainability Award for members of CrossTrades and SeaBlue Project Logistics Network, with Environmental, Governance and Next Generation categories.`;

const COMPANY = `## Company

- [About Loxygen](${SITE_URL}/about-us): Who Loxygen is, the founders and the partner networks.
- [Investors](${SITE_URL}/investors): Loxygen is building the training and knowledge layer for the freight forwarding industry.
- [Share your expertise](${SITE_URL}/share-your-expertise): For instructors, speakers and industry specialists who want to contribute to courses, webinars and the blog.
- [Contact](${SITE_URL}/contact): Questions about courses, webinars, immersive programmes or partnerships. Email: geert@loxygen.world`;

const OPTIONAL = `## Optional

- [Help](${SITE_URL}/help): Creating an account, buying courses and accessing e-learning.
- [Terms and conditions](${SITE_URL}/terms-and-conditions)
- [Privacy policy](${SITE_URL}/privacy-policy)
- [Sitemap](${SITE_URL}/sitemap.xml)`;

// Geert's hand-picked list, in his order and with his wording. A course
// switched off in the CMS drops out so the file never links to a dead page.
const SELECTED_COURSES = [
  {
    slug: "breakbulk-essentials",
    title: "Breakbulk Essentials",
    description: "Live online course on quoting, booking and managing breakbulk shipments.",
  },
  {
    slug: "breakbulk-pro",
    title: "Breakbulk PRO",
    description: "Advanced breakbulk and project cargo training.",
  },
  {
    slug: "mastering-breakbulk-shipping-for-freight-forwarders",
    title: "Mastering Breakbulk Shipping for Freight Forwarders",
  },
  {
    slug: "voyage-charter-vs-time-charter-in-breakbulk-and-project-cargo",
    title: "Voyage Charter vs Time Charter in Breakbulk and Project Cargo",
  },
  {
    slug: "bess-basics",
    title: "BESS Logistics",
    description: "Live online course on moving battery energy storage systems.",
  },
  { slug: "international-trade-and-transport", title: "International Trade & Transport" },
  {
    slug: "mastering-incoterms-2020-for-cross-border-delivery-teams",
    title: "Mastering Incoterms 2020 for Cross-Border Delivery Teams",
  },
  {
    slug: "demurrage-and-detention-predictive-cost-control",
    title: "Demurrage and Detention: Predictive Cost Control",
  },
  {
    slug: "understanding-maritime-trade-routes-and-chokepoints",
    title: "Understanding Maritime Trade Routes and Chokepoints",
  },
  {
    slug: "optimising-port-operations-through-integrated-pcs-strategies",
    title: "Optimising Port Operations through Integrated PCS Strategies",
  },
  {
    slug: "data-sharing-platforms-in-modern-freight-forwarding",
    title: "Data Sharing Platforms in Modern Freight Forwarding",
  },
  { slug: "foundations-of-iso-tank-logistics", title: "Foundations of ISO Tank Logistics" },
  {
    slug: "introduction-to-the-cmr-and-its-importance",
    title: "Introduction to the CMR and its Importance",
  },
  {
    slug: "aura-from-ai-assistant-to-ai-colleague",
    title: "AURA: From AI Assistant to AI Colleague",
  },
  { slug: "ai-start-now", title: "No AI = No Business. Start Now!" },
  { slug: "benelux-immersion-week", title: "Benelux Immersion Week" },
];

// Any other course of these types is appended automatically. Micro-learnings
// are left out on purpose: the list above is a sample of that catalogue, and
// the Micro-learnings page in the Academy section covers the rest.
const AUTO_LISTED_TYPES = new Set(["webinar", "immersive", "e-learning"]);

function linkLine(path, title, description) {
  const link = `- [${title}](${SITE_URL}${path})`;
  return description ? `${link}: ${description}` : link;
}

function autoDescription(course) {
  const text = course.excerpt || truncateForMeta(stripMarkdown(course.description));
  return text?.replace(/\s+/g, " ").trim();
}

export function buildLlmsTxt(courses, posts) {
  const activeSlugs = new Set(courses.map((course) => course.slug));
  const selectedSlugs = new Set(SELECTED_COURSES.map((course) => course.slug));

  const selectedLines = SELECTED_COURSES.filter((course) => activeSlugs.has(course.slug)).map(
    (course) => linkLine(`/courses/${course.slug}`, course.title, course.description)
  );
  const newCourseLines = courses
    .filter((course) => AUTO_LISTED_TYPES.has(course.type) && !selectedSlugs.has(course.slug))
    .map((course) => linkLine(`/courses/${course.slug}`, course.title, autoDescription(course)));
  const blogLines = posts.map((post) => linkLine(`/blog/${post.slug}`, post.title));

  const sections = [
    INTRO,
    ACADEMY,
    `## Selected courses\n\n${[...selectedLines, ...newCourseLines].join("\n")}`,
    COMPANY,
    `## Blog\n\n${blogLines.join("\n")}`,
    OPTIONAL,
  ];

  return `${sections.join("\n\n")}\n`;
}
