import Head from "next/head";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Data Processing Agreement | Loxygen Academy";
const DESCRIPTION =
  "Annex 1 – Data Processing Agreement between Loxygen and its clients, setting out the Article 28(3) GDPR processor obligations that apply to the Agreement.";
const LAST_UPDATED = "14 August 2026";

const INTRO =
  "This Data Processing Agreement is an annex to the Terms and forms an integral part of the Agreement between the Parties. This Annex 1 outlines the additional terms, requirements, and conditions under which Loxygen (acting as Processor or Sub-processor) will process Personal Data on behalf of the Client (acting as Controller or Processor) in executing the Agreement, ensuring data protection and GDPR compliance. This Annex includes the mandatory clauses required by Article 28(3) of the General Data Protection Regulation 2016/679 (hereinafter referred to as “GDPR”) for agreements between Controllers and Processors.";

const CLAUSES = [
  {
    text: "Insofar no definition is provided in the Agreement, the capitalized terms in this Annex shall have the definitions given under the GDPR.",
  },
  {
    text: "Loxygen agrees:",
    subitems: [
      "to Process the Personal Data only on documented instruction from the Client in accordance with Appendix A, including transfers of Personal Data to a third country or an international organization, unless required by applicable law to which Loxygen is subject; in such a case, Loxygen shall inform the Client of those legal requirements before Processing, unless that law prohibits this;",
      "to immediately inform the Client if, in Loxygen's opinion, an instruction infringes the GDPR or other applicable data protection provisions;",
      "not to make available Personal Data to third parties without the Client’s prior written approval;",
      "that persons authorized to Process the Personal Data are committed to confidentiality by an agreement or are under an appropriate statutory obligation of confidentiality;",
      "to take appropriate technical and organizational measures to ensure a level of security appropriate to the risk (e.g. against unauthorized or unlawful Processing of Personal Data and against accidental loss, destruction of, or damage to such data) as set out in Appendix A;",
      "taking into account the general written authorization given by the Client to engage other Sub-processors, to inform the Client if Loxygen intends to appoint another Sub-processor than those set out in Appendix A, allowing the Client to object to this appointment within fourteen (14) days in writing on reasonable grounds supported by documentary evidence. If the Client does not submit a written, well-reasoned objection regarding the engagement of additional Sub-Processors within the aforementioned time, the appointment of the additional Sub-Processors shall be deemed authorized;",
      "to impose the same data protection obligations as stated in this Annex to authorized Sub-processors by way of a contract, ensuring that the Processing meets the requirements of the GDPR;",
      "that where appointed Sub-processors fail to fulfil their data protection obligations, Loxygen shall remain fully liable to the Client for the performance of that Sub-Processor’s obligations;",
      "to reasonably assist the Client by appropriate technical and organizational measures (i) for fulfilling the Client’s obligation to respond to requests for exercising data subject rights or (ii) the Client’s compliance with any other obligation under the GDPR;",
      "to consider the principles of data protection by design and default when Processing Personal Data;",
      "to notify the Client of any Personal Data Breach without undue delay after becoming aware of such a breach and to reasonably assist the Client in mitigating and resolving such a Personal Data Breach;",
      "not to Process Personal Data outside the EEA without the Client’s written consent and only subject to the safeguards required under the GDPR;",
      "not to retain Personal Data longer than necessary for the performance of the Agreement, unless another storage period is instructed by the Client or mandated by applicable law;",
      "to delete or return (at the Client's choice) all the Personal Data to the Client after termination of the Agreement and to delete existing copies unless applicable law requires storage of the Personal Data;",
      "to make available to the Client all information reasonably necessary to demonstrate compliance with the obligations outlined in this Annex and to reasonably allow for and contribute to audits, including inspections, conducted by the Client or another auditor mandated by the Client.",
    ],
  },
  {
    text: "The Parties acknowledge and agree that, if necessary, regardless of the reason (such as, but not limited to, any (prospective) changes to applicable data protection legislation or amendments to the scope of the Services, cooperation, or the Agreement), they shall enter into a more extensive data processing agreement as may be necessary.",
  },
  {
    text: "To the extent permitted under applicable law, any limitations and/or exclusions of liability in the Agreement shall apply to this Annex. Additionally, Loxygen shall only be liable under this Annex if it has: (i) failed to comply with its specific obligations under the GDPR; or (ii) acted outside or in breach of the Client's lawful instructions.",
  },
  {
    text: "This Annex is governed by all miscellaneous clauses of the Terms, including provisions regarding the competent court and applicable law, unless the context requires otherwise.",
  },
];

export default function DPA() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/dpa`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/dpa`} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>

      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
            <h1 className="font-display text-heading tracking-tight text-brand-navy">
              Data Processing{" "}
              <span className="italic text-brand-accent">Agreement.</span>
            </h1>
            <p className="mt-4 text-base font-medium text-slate-600">
              Annex 1 &ndash; Data Processing Agreement
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Last updated {LAST_UPDATED}
            </p>

            <p className="mt-10 text-base leading-7 text-slate-600">{INTRO}</p>

            <ol className="mt-10 space-y-8">
              {CLAUSES.map((clause, index) => (
                <li key={index} className="text-base leading-7 text-slate-600">
                  <span className="font-semibold text-brand-navy">{index + 1}) </span>
                  {clause.text}
                  {clause.subitems ? (
                    <ol className="mt-4 space-y-4 pl-6">
                      {clause.subitems.map((item, i) => (
                        <li key={i}>
                          <span className="font-semibold text-brand-navy">
                            {String.fromCharCode(97 + i)})
                          </span>{" "}
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
