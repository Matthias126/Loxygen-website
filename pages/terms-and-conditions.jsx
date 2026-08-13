import Head from "next/head";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const TITLE = "Terms & Conditions | Loxygen Academy";
const DESCRIPTION =
  "Loxygen's Terms & Conditions governing Order Forms, Services and Trainings between Loxygen BV and its Clients.";
const LAST_UPDATED = "14 August 2026";

const SECTIONS = [
  {
    number: "1",
    title: "General",
    clauses: [
      {
        number: "1.1",
        text: "These terms and conditions (the “Terms”) govern all Order Forms concluded between the Client and Loxygen and the provision of all Services and Trainings to the Client (all as defined below).",
      },
      {
        number: "1.2",
        text: "By concluding this Agreement, the Client waives the applicability of its own general and special terms and conditions, and these Terms shall prevail over such Client terms, even where it is stated therein that only those conditions apply and even if such terms were not protested by Loxygen.",
      },
      {
        number: "1.3",
        text: "By executing an Order Form or other document containing a reference to these Terms, or by ordering Services, the Client acknowledges that it has read, understands and accepts these Terms and agrees to be bound by them. If you are an employee, contractor or representative of the Client accepting these Terms on behalf of the Client, you represent and warrant that you have full legal authority to bind the Client to the Agreement and have read and understand the Terms.",
      },
    ],
  },
  {
    number: "2",
    title: "Definitions",
    clauses: [
      {
        number: "2.1",
        text: "Capitalized terms shall have the meaning given to them below:",
        definitions: [
          {
            term: "Agreement",
            text: "means the entire contractual relationship between the Parties, including these Terms, the Order Form(s) and any other document referring to these Terms executed between the Parties.",
          },
          {
            term: "Confidential Information",
            text: "of a Party means the information of such Party, whether in written, oral, electronic or other form, and which (i) is explicitly marked as confidential or proprietary, or (ii) should reasonably be considered confidential given its nature or the circumstances under which it was disclosed, regardless of whether it is expressly marked as confidential, including information and facts concerning business plans, customers, prospects, personnel, suppliers, partners, investors, affiliates or others, training methods and materials, financial information, marketing plans, sales prospects, customer lists, inventions, program devices, discoveries, ideas, concepts, know-how, techniques, formulas, blueprints, software (in object and source code form), documentation, designs, prototypes, methods, processes, procedures, codes, and any technical or trade secrets, including all copies of any of the foregoing or any analyses, studies or reports that contain, are based on, or reflect any of the foregoing.",
          },
          {
            term: "Client",
            text: "means the legal entity, acting for professional purposes, identified as client in the relevant Order Form.",
          },
          {
            term: "Deliverables",
            text: "means the client-specific tangible output of the Services (excluding any Training Materials, unless expressly otherwise agreed in writing), such as reports or presentations, as specified in the Order Form.",
          },
          {
            term: "Intellectual Property Rights",
            text: "means (non-exhaustive list) patents, trademarks, copyrights, rights in software programs (both in object code and source code), design rights, database rights, proprietary rights in know-how, business and trade names and all rights or forms of protection of a similar nature or having equivalent or similar effect to any of the afore listed which may subsist anywhere in the world, and any existing or future applications for or registrations of such rights.",
          },
          {
            term: "Loxygen",
            text: "means Loxygen BV having its office at Jules Bordetstraat 25/402, 2018 Antwerp, Belgium, and with company number 1013.124.814 (RLE Antwerp (division Antwerp).",
          },
          {
            term: "Loxygen IP",
            text: "means any tools, software, works, methodologies, templates, models, algorithms, scripts, know-how, Training Materials or other materials and Intellectual Property Rights (including any modifications, enhancements, or improvements thereto, whether or not developed during the performance of the Services) that are owned, controlled and used by Loxygen (or the experts or third party service providers providing the Services or Trainings) in connection with the provision of the Services or Trainings.",
          },
          {
            term: "Order Form",
            text: "means the written or electronic document signed by both Parties, regardless its entitlement, detailing the scope and other specifics of the Services, Trainings and Deliverables ordered by the Client (such as the pricing, location, duration, dates, scope, etc.), including the specific conditions under which such order is made.",
          },
          {
            term: "Party or Parties",
            text: "means either Loxygen and the Client individually or together.",
          },
          {
            term: "Platform",
            text: "means the training and e-learning platform, developed and owned by Loxygen, including the underlying software, algorithms, (source or object) code and methodology pertaining thereto as may be further described in the Order Form.",
          },
          {
            term: "Services",
            text: "means the (preparation and coordination of) Trainings, consultancy, advisory and/or strategic planning services and any other professional services as agreed in an Order Form.",
          },
          {
            term: "Training Materials",
            text: "means the content of Training courses and any training materials made available or used during Trainings, such as presentations, slide decks, photos, diagrams, images, (self-)tests, or other information, documents, or materials made available in the context of a Training or the Services.",
          },
          {
            term: "Training",
            text: "means the training sessions, webinars, e-learnings, workshops, courses, and other training programs ordered by the Client as further described in the Order Form.",
          },
        ],
      },
    ],
  },
  {
    number: "3",
    title: "Ordering of Trainings and Services",
    clauses: [
      {
        number: "3.1",
        text: "The Services, Trainings and Deliverables (if any) ordered (online via Loxygen’s or one of its partners’ websites or via any other sales channels as made available from time to time) and to be delivered by Loxygen shall be agreed between the Parties in separate Order Forms, detailing the scope, applicable fees and other specifics.",
      },
      {
        number: "3.2",
        text: "The Client may request Loxygen to personalize certain Trainings, Training Materials and/or other Services. Loxygen may, at its sole discretion, agree to provide such personalized Trainings, Training Materials and/or Services. In such cases, the scope and terms of such personalized Training Courses, Training Materials, and Services will be set out in a separate Order Form.",
      },
      {
        number: "3.3",
        text: "Each Order Form is governed by these Terms, which shall be incorporated into such Order Form by reference. If for any reason such reference is missing, the Order Form shall in any case be deemed to be executed pursuant to the provisions of these Terms.",
      },
      {
        number: "3.4",
        text: "The descriptions, images, illustrations, and other indications on Loxygen’s websites and marketing materials are provided for informational purposes only. The Client acknowledges and accepts that the Trainings, Training Materials and Services may differ (slightly). Loxygen strives to ensure that all descriptions of Services and Trainings (as available on the website or information brochures and marketing materials) are as up-to-date, complete and accurate as possible. However, Loxygen is not responsible for material errors in this description or for changes to its offering and reserves the right to change its offering at any time without prior notice. The Client may contact Loxygen at any time for the most up-to-date information about an offer. In the event that Trainings or Services are not (or are no longer) available (regardless of any purchase confirmation received), both Parties may cancel the Agreement without being liable for compensation. The final description of the Trainings and Services to be provided is included in the Order Form (as applicable).",
      },
    ],
  },
  {
    number: "4",
    title: "Performance of the Services",
    clauses: [
      {
        number: "4.1",
        text: "The Client acknowledges that Trainings and Services are, unless expressly agreed otherwise in writing, not provided by Loxygen but by independent third-party teachers and experts, at the discretion and availability of such third party experts. These experts are fully responsible for the content, methodology, and provision of the Services, Trainings and Training Materials (if any). The experts retain full discretionary authority to independently determine the content of the Services, Trainings and the provision of Training Materials (if any). The Client acknowledges that Loxygen has no control over the content of the Services, Trainings and Training Materials and accepts no responsibility for any damage or loss resulting from the use of the information, knowledge, documents, or other Training Materials provided by the expert, including their accuracy, legality, quality, timeliness or completeness.",
      },
      {
        number: "4.2",
        text: "Loxygen may engage subcontractors in the performance of the Agreement, provided that these subcontractors comply with the provisions of the Agreement. In any case, the Trainings and Services will be performed with the required care and in a correct, loyal, and efficient manner, to the best of Loxygen’s and such third party experts’ ability, in accordance with generally accepted industry practices and the competence, care, and diligence expected of a professional service provider. The obligation to perform the Trainings and Services shall be regarded as an obligation of means and shall not bind Loxygen to achieve a predefined result.",
      },
      {
        number: "4.3",
        text: "Loxygen and the relevant experts perform the Services in a completely independent manner and at their own discretion, without any relationship of subordination to the Client. This independence is an essential part of the Agreement, without which the Parties would not have entered into it. The relationship between the Parties is that of independent contractors. Nothing in this Agreement creates an employment relationship, partnership, or joint venture between the Parties.",
      },
    ],
  },
  {
    number: "5",
    title: "Training and Services Modalities",
    clauses: [
      {
        number: "5.1",
        text: "Subject to the payment of the applicable fees, the Services and Trainings shall be provided on the dates and location (e.g. remotely (e.g. via Teams), at the Client’s location or at any other location) as agreed between the Parties in the Order Form. Where predefined, the relevant modalities (such as date, hour, location, content, scope, etc.) of the Trainings will always be displayed on the order page and/or relevant Order (such as duration, subject, etc.).",
      },
      {
        number: "5.2",
        text: "Unless expressly agreed otherwise in writing or indicated on the order page or in the Order Form, Trainings and Services are provided in English.",
      },
      {
        number: "5.3",
        text: "Unless expressly agreed otherwise in writing, making audio or video recordings of the Services-sessions, Trainings and/or Training Materials (live or online) is strictly prohibited. Video recordings of Trainings and Services sessions made available by Loxygen (if any), may only be accessible for a limited period. The Client agrees that Loxygen may record Trainings and Services sessions for the purpose of quality control, internal trainings, and/or making such recordings available to the Client and its Users. The Client represents that all Users enrolled by the Client or participating in such session on its behalf have been informed in advance of such recordings and have provided their consent where required under applicable data protection laws.",
      },
      {
        number: "5.4",
        text: "The Client undertakes to at all times use the Training Materials in accordance with: (i) their intended purpose: i.e. for the Client's internal training purposes; (ii) all applicable legal and regulatory provisions and the provisions of the Agreement; and (iii) all instructions for use, manuals, and guidelines provided from time to time. The Client procures that all persons who use the Training Materials or participate in Trainings also comply with this.",
      },
      {
        number: "5.5",
        text: "Except as expressly permitted in the Agreement or required by law, the Client (procures that its authorized users and participants) shall not: (i) sublicense, assign, distribute, transfer, sell, lease, rent, or otherwise trade or encumber their right to access and use the Training content or Training Materials, or use them on behalf of a third party or make them available to a third party, nor enable or allow a third party to do so; (ii) grant an unauthorized person access to or use of the Trainings or Training Materials; (iii) edit, reproduce, copy, modify, or adapt the Training Materials or create derivative works based on it, or enable or allow a third party to perform such actions; (iv) remove or modify any copyright or other proprietary notices on the Training Materials; and/or (v) using the Trainings or Training Materials for commercial purposes or any activity that is contrary to the law, public order, or morality, or that is considered defamatory, offensive, reprehensible, or unethical, that infringes on the rights of others, or that may be detrimental to the reputation of Loxygen and/or third parties.",
      },
      {
        number: "5.6",
        text: "Any certificates of completion will only be issued after full payment and on the condition that the participant meets the attendance requirements.",
      },
      {
        number: "5.7",
        text: "Loxygen reserves the right to suspend access to Services, Trainings and Training Materials for each individual that acts in violation of the Agreement.",
      },
    ],
  },
  {
    number: "6",
    title: "Cancellation of Trainings and Services",
    clauses: [
      {
        number: "6.1",
        text: "Considering the Client acts in the context of its professional activities, the Client does not have a right of withdrawal to cancel ordered Services or Trainings, without giving any justified reasons.",
      },
      {
        number: "6.2",
        text: "If a Training or Services session, specifically planned at the Client's request, cannot take place, or if the Client or one of its registered participants for a general Training planned by Loxygen is unable to participate in a Training due to illness or a Force Majeure Event, the Client must immediately notify Loxygen in writing. All such Trainings and Services Sessions must be canceled or rescheduled at least seventy-two (72) hours before the start of the session, otherwise the costs of the Training and Services will be charged in full. In any case, Services already provided (such as preparation of Training or Services sessions) may be charged in such a case. In the event of timely cancellation (i.e. within the period set out in this paragraph), the Client will receive credits equal to the value of the Training or Services-session that can be used for other Trainings and/or Services. The Client may always replace a participant to a Training or Services session with another participant within their organization, provided that Loxygen is timely notified hereof in writing. On-Site Learning Trips (defined below), cannot be cancelled and will be charged in full once scheduled and booked, unless expressly agreed otherwise in writing.",
      },
      {
        number: "6.3",
        text: "In the event of illness, incapacity, technical problems or a Force Majeure Event affecting the relevant expert or Loxygen to provide the Services or Trainings, Loxygen will notify the Client as soon as possible and, in consultation with the Client, offer an alternative Training or Services date or propose an alternative expert. Training courses can be canceled by Loxygen free of charge up to twenty-four (24) hours in advance, in which case the Client will receive credits equal to the value of the Training or Services for scheduling a new Training session and/or for the provision of Services. If a Training Course is canceled less than twenty-four (24) hours in advance, all fees already paid will be refunded to the Client and any amounts still to be paid will be credited, unless otherwise agreed in writing. Without prejudice to the foregoing, Loxygen is not liable for any cancellation or postponement.",
      },
    ],
  },
  {
    number: "7",
    title: "On-site Learning Trips",
    clauses: [
      {
        number: "7.1",
        text: "As part of certain Training programs or consultancy projects, Loxygen may organize learning trips, on-site visits, or on-location training sessions (“On-Site Learning Trips”). Such On-Site Learning Trips are ancillary to the educational purpose of the Training program and/or Services and do not constitute travel or leisure services.",
      },
      {
        number: "7.2",
        text: "Loxygen may, for logistical convenience, arrange or facilitate certain elements such as accommodation, local transport, or access to training facilities. These elements are provided incidental to and solely to enable the delivery of the educational program and are not sold or promoted as travel or tourism products. Loxygen is not a travel agent, travel organizer, or tour operator within the meaning of the Belgian Law of 21 November 2017 on the Sale of Package Travel, Linked Travel Arrangements, and Travel Services (the “Travel Law”), nor under any similar legislation. Accordingly:",
        subitems: [
          "Loxygen does not sell or offer any package travel as defined by the Travel Law;",
          "Any logistical arrangements made by Loxygen are incidental to the Trainings and other Services;",
          "Loxygen accepts no responsibility for any (delays or amendments) in travel services (such as accommodation, transport, food services, etc.), which are provided by third party service providers (as indicated in the relevant Order Form), in accordance with the relevant third party’s terms and conditions.",
        ],
      },
      {
        number: "7.3",
        text: "Loxygen reserves the right to cancel On-Site Learning Trips requiring a minimum number of participants if the minimum enrollment threshold is not met or if circumstances arise that make delivery of the program commercially or operationally impracticable (including, without limitation in case of a Force Majeure Event). In such case, Loxygen will notify the Client as soon as reasonably possible. Any advance payments made by the Client for the canceled On-Site Learning Trips will be reimbursed in full, and such reimbursement shall constitute the Client’s sole remedy with respect to the cancellation, without prejudice to any Services already rendered.",
      },
      {
        number: "7.4",
        text: "The Client and each participant is solely responsible for (i) arranging and paying for transport and travelling to the departure destination, having a valid travel visa and identification documents, adhering to vaccinations and other entry requirements of the travel destination and having any other required travel documents; (ii) complying with all applicable entry, health, and safety requirements of the host country; and (iii) ensuring they have adequate insurance coverage for travel, health, accidents and cancellation.",
      },
      {
        number: "7.5",
        text: "If and to the extent Loxygen assists with hotel or transport bookings, such costs are either invoiced separately and at cost (without profit margin) or paid directly by the participant to the relevant third party service provider. Under no circumstances shall the total fee be considered a “package price” combining multiple travel services.",
      },
    ],
  },
  {
    number: "8",
    title: "Platform license",
    clauses: [
      {
        number: "8.1",
        text: "If provided in the Order Form and subject to the timely payment of applicable license fees, Loxygen grants the Client a personal, restricted, non-exclusive, non-transferrable and non-assignable license to access and use the Platform during the subscription term (as set out in the Order Form), for its internal business purposes and in accordance with the documentation (as made available by Loxygen from time to time). This license is limited to the scope (including the functionalities and volume limitations, if any) as specified in the Order Form and only includes access to such features and functionalities as set out in and as available on the date of the Order Form. Loxygen may make future features, functionalities or subscription packages subject to payment of additional license fee and/or additional conditions, in which event a new Order Form shall be concluded.",
      },
      {
        number: "8.2",
        text: "The Client shall not directly or indirectly: (i) sub-license, assign, distribute, transfer, sell, lease, or otherwise commercialize, deal in or encumber its rights to the Platform; (ii) permit any unauthorized person to access the Platform; (iii) use the Platform to provide services to third parties; (iv) (attempt to) copy, modify, reverse engineer or compile, disassemble or otherwise reproduce or create derivative works based on the Platform the underlying ideas, user interface techniques, algorithms, models, or methodologies; (v) use the Platform other than in accordance with the Agreement, its intended purpose and/or applicable laws; and/or (vi) work around any technical limitation in the Platform.",
      },
      {
        number: "8.3",
        text: "The Client acknowledges, that one unique user account must be set-up for each individual user accessing the Platform. The Client shall remain responsible for their users’ compliance with these Terms.",
      },
    ],
  },
  {
    number: "9",
    title: "Client Cooperation",
    clauses: [
      {
        number: "9.1",
        text: "In order for Loxygen to perform the Agreement in a timely manner, the Client shall (i) provide Loxygen with all information and documents necessary for the proper performance of the Agreement, and guarantee to Loxygen that all information and documents provided to Loxygen are accurate and complete; (ii) ensure that the location (hosted or reserved by the Client) meets all technical and legal requirements for the provision of the Trainings and Services; and (iii) make the necessary arrangements to enable Loxygen to properly provide the Trainings and Services, including providing the necessary infrastructure and hardware for on-site Trainings and Services sessions at locations provided by the Client that meet the system requirements as provided or set out in writing from time to time in the Order Form (such as providing an internet connection, presentation equipment, etc.). The Client shall ensure that such equipment is in good working order and compliant with applicable laws and industry standards.",
      },
      {
        number: "9.2",
        text: "Loxygen shall not be responsible for or held liable for any delay or failure in the provision of the Services resulting from the Client’s failure to comply with its obligations under this clause.",
      },
    ],
  },
  {
    number: "10",
    title: "Payment Terms",
    clauses: [
      {
        number: "10.1",
        text: "The Client shall pay the Trainings and Services in accordance with the price and rates applicable at the time the order is placed and as stated on the order page or the relevant Order Form.",
      },
      {
        number: "10.2",
        text: "Loxygen reserves the right to adjust the applicable prices and rates at any time to the rates applicable on the effective date of the Order Form. Loxygen cannot give any guarantees about applicable prices and rates, and the Client acknowledges that the relevant experts or third party service providers may adjust their rates from time to time. Additional Trainings and Services will always be sold at the prices and rates applicable at that time.",
        extra:
          "All invoices are payable within thirty (30) calendar days after the invoice date. If the Client disputes an invoice (or any portion thereof), the Client must notify Loxygen in writing of the nature of such dispute within ten (10) business days after the invoice date, failing which the invoice shall be deemed accepted by the Client. The undisputed portion of the invoice shall be paid as set forth herein. If the Client fails to pay any outstanding amounts, Loxygen shall be entitled to suspend its obligations towards the Client hereunder until receipt of payment of such outstanding amounts. Any amounts of undisputed invoices that have not been paid within thirty (30) days after the invoice date shall automatically and without notice be subject to an overdue payment interest equal to the maximum permitted by applicable law. All fees paid by the Client hereunder are final and non-refundable, except in case of termination of material breach on the part of Loxygen.",
      },
      {
        number: "10.3",
        text: "All payments under this Agreement shall be made in the currency as specified in the Order From and are exclusive of taxes or withholdings. If Loxygen is required to pay or collect any VAT, sales, use, property, excise, duties, tariffs, or other import or export costs or taxes in connection with this Agreement, then such taxes shall be billed to and paid by the Client, in addition to the fees to which they relate. The Client agrees to pay for reasonable out-of-pocket costs and expenses incurred by Loxygen in performing the Services, provided that Loxygen provides supporting documentation for such costs and expenses.",
      },
    ],
  },
  {
    number: "11",
    title: "Intellectual Property Rights",
    clauses: [
      {
        number: "11.1",
        text: "Loxygen (or the relevant third party expert or service provider, as applicable) exclusively retains all rights, titles, and interest (including any Intellectual Property Rights) in or related to the Services, Trainings, Training Materials, Platform and Loxygen IP and except as expressly provided otherwise, nothing in this Agreement shall convey to the Client any title or proprietary right or intellectual property rights in or over the aforementioned.",
      },
      {
        number: "11.2",
        text: "Subject to the timely payment of the applicable fees hereunder, the Deliverables, expressly excluding any Training Materials and Loxygen IP that may be incorporated therein, shall be owned by the Client.",
      },
      {
        number: "11.3",
        text: "To the extent Loxygen IP is incorporated in the Deliverables, Loxygen grants the Client a personal, restricted, non-exclusive, non-assignable, non-transferable license, without the right to sublicense, to use the Loxygen IP, for the Client’s internal business purposes solely in conjunction with and as incorporated in the Deliverables.",
      },
      {
        number: "11.4",
        text: "Loxygen and its third party experts or service providers shall be entitled to use the ideas, concepts, methodologies, processes, and know-how gained, developed or created by Loxygen in the course of performing the Services and Trainings. Nothing in this Agreement shall preclude Loxygen or its third party experts or service providers from acquiring, marketing, developing, providing, or (re)using, for itself or others, services or other materials that have the same or similar functions to those provided to the Client under this Agreement, save to the extent such use would result in a breach of Loxygen’s confidentiality undertakings under this Agreement.",
      },
    ],
  },
  {
    number: "12",
    title: "Confidentiality",
    clauses: [
      {
        number: "12.1",
        text: "Each Party shall treat as confidential and keep secret all Confidential Information relating to the other Party and shall not disclose to any third party, other than its agents, officers, employees, professional advisors, insurers, subcontractors, or consultants where such disclosure is necessary for the performance of the Agreement, any Confidential Information learned during the negotiation and performance of the Agreement, except in the event it is granted prior written consent of the disclosing Party to disclose such Confidential Information. Confidential Information disclosed under the Agreement shall not be used by the recipient thereof for any purpose other than as required for the performance of its obligations under the Agreement.",
      },
      {
        number: "12.2",
        text: "Both Parties shall take precautions to maintain the confidentiality of the Confidential Information and, in particular, each Party covenants that it: (i) shall not copy or otherwise exploit any component of the Confidential Information other than as herein provided, nor make any disclosures with reference thereto to any third party, and (ii) shall promptly notify the other Party if it becomes aware of any breach of confidence and give the other Party all reasonable assistance in connection therewith.",
      },
      {
        number: "12.3",
        text: "The provisions of this clause shall not apply to any information which: (i) is published or comes into the public domain other than by a breach of the Agreement, (ii) can be shown to have been known by the receiving Party before disclosure by the disclosing Party, (iii) is lawfully obtained from a third party or, (iv) can be shown to have been created by the receiving Party independently of the disclosure and other than as part of the project in scope of this Agreement. Additionally, the restrictions in this clause do not apply to the extent that any Confidential Information is required to be disclosed by any law or regulation or by any judicial or governmental order or request. In which case the Parties shall cooperate in good faith to ensure the protection of the Confidential Information concerned to the maximum extent permitted by law.",
      },
      {
        number: "12.4",
        text: "Upon expiry or termination of the Agreement, the receiving Party will discontinue use of the disclosing Party’s Confidential Information and return (or alternatively delete and certify such deletion in the disclosing Party’s sole discretion) all documents (or copies made of it) belonging to the disclosing Party.",
      },
      {
        number: "12.5",
        text: "The provisions of this clause shall commence from the start of negotiations and shall continue in force during five (5) years following the termination or expiry of the Agreement (unless such Confidential Information is protected under trade secret or Intellectual Property laws, in which event the obligations of this article shall remain in force for as long as such Confidential Information is protected under such laws).",
      },
    ],
  },
  {
    number: "13",
    title: "Client Data",
    clauses: [
      {
        number: "13.1",
        text: "The Client hereby grants Loxygen and its subcontractors a non-exclusive license to use the Client data to the extent reasonably necessary for Loxygen to fulfill its obligations under the Agreement (including the continuous improvement of its Services and Training sessions (including by using recordings, summaries and transcripts thereof) and the development of Training Materials, subject to its confidentiality undertakings).",
      },
      {
        number: "13.2",
        text: "The Client acknowledges that it is solely liable and responsible for the (accuracy and correctness of) Client data. Loxygen is in no way responsible or liable for such Client data or for any action or decision taken by the Client or its user based on the (output generated on the basis of) Client data provided for the execution of the Services.",
      },
      {
        number: "13.3",
        text: "The Client guarantees that the Client data (i) does not infringe the Intellectual Property Rights or other rights of third parties; (ii) does not violate any applicable local, national or international law, statutes or regulations; and/or (iii) is not misleading or fraudulent.",
      },
    ],
  },
  {
    number: "14",
    title: "Privacy and Data Protection",
    clauses: [
      {
        number: "14.1",
        text: "Each Party shall comply with its respective obligations under the applicable data protection legislation when processing personal data. If and to the extent, Loxygen processes Client personal data on behalf of the Client, it shall process such personal data in accordance with the data processing agreement attached in Annex 1.",
      },
      {
        number: "14.2",
        text: "The Client guarantees that it has the legal right to disclose personal data (such as participant lists and email addresses and contact details of participants in Trainings) that is made available to Loxygen under or in connection with this Agreement and that it has a valid legal basis for processing and disclosing such personal data to Loxygen. The Client undertakes to adequately inform all individuals concerned in accordance with the applicable legislation on the processing of their personal data under the Agreement.",
      },
    ],
  },
  {
    number: "15",
    title: "Warranties and Disclaimer",
    clauses: [
      {
        number: "15.1",
        text: "Except to the extent otherwise provided in this Agreement, the Services, Trainings, Training Materials and the Deliverables are provided “as is”. To the maximum extent permitted by applicable law, Loxygen disclaims any representations or warranties, express or implied, including (without limitation) any implied warranties of accuracy or completeness of data, fitness for a particular purpose, merchantability, or non-infringement.",
      },
      {
        number: "15.2",
        text: "In the performance of the Services, Trainings and Agreement, certain recommendations and advice may be provided. The Client acknowledges that it will bear full responsibility for the implementation and/or execution of such recommendations and advice. The implementation of any advice and recommendations is always context-specific and must be implemented by an experienced expert in the relevant industry, taking into account the relevant situation and applicable (local) legislation. Information provided during Trainings or in the performance of Services, as well as the Training Materials, are purely informative and the Client acknowledges that, given the rapid and constant evolution and complexity of the subjects covered, Loxygen does not give any guarantee and hereby expressly disclaims all liability for the content of Trainings and Training Materials.",
      },
    ],
  },
  {
    number: "16",
    title: "Limitation of Liability",
    clauses: [
      {
        number: "16.1",
        text: "Subject to the maximum extent permitted under mandatory law, Loxygen’s liability under the Agreement, whether arising from negligence, breach of contract or of statutory duty or otherwise howsoever:",
        subitems: [
          "for direct damages arising out of or in connection with an Order Form, shall per event (or series of connected events) not exceed an amount equal to all amounts paid by the Client under such Order Form;",
          "shall be excluded for any indirect, punitive, special, consequential or similar damages (including damages for loss of profit, lost revenue, loss of business, loss of corruption of data, loss of customers and contracts, loss of goodwill, the cost of procuring replacement goods or services, and reputational damage).",
        ],
      },
      {
        number: "16.2",
        text: "Loxygen is not liable for damage (i) caused by systems, actions or inactions of the Client or third parties; (ii) any delay, cancellation, or failure of third-party (travel) services, nor for any personal injury, property damage, or loss arising from On-Site Learning Trips; or (iii) arising from the content of Training Courses and Training Materials or for decisions based thereon.",
      },
    ],
  },
  {
    number: "17",
    title: "Term and Termination",
    clauses: [
      {
        number: "17.1",
        text: "The Agreement will commence as of the effective date set out in the relevant Order Form and will have the duration as specified in the Order Form or expire upon execution of all Services and Trainings set out therein (whichever happens later, unless terminated early in accordance with this Agreement).",
      },
      {
        number: "17.2",
        text: "Either Party may immediately terminate (or Loxygen may suspend) the whole or any portion of the Agreement or an Order Form without any judicial intervention, without being liable for compensation and without prejudice to its rights to damages and any other rights, remedies and/or claim to which it may be entitled by law, upon providing the other Party with written notice of termination if:",
        subitems: [
          "the other Party performs a material breach to any provision of the Agreement and, if capable for remedy, fails to cure such material breach within thirty (30) calendar days after receipt of written notice of the material breach; or",
          "the other Party becomes insolvent, is subject to voluntary or involuntary bankruptcy, insolvency or similar proceeding, or otherwise liquidates or ceases to do business.",
        ],
      },
      {
        number: "17.3",
        text: "In addition, Loxygen may immediately terminate or suspend the whole or any portion of the Agreement or an Order Form without any judicial intervention, without being liable for compensation and without prejudice to its rights to damages and any other rights, remedies, and/or claim to which it may be entitled by law, upon providing the Client with written notice of termination if:",
        subitems: [
          "the Client fails to pay to Loxygen any amounts due hereunder and fails to cure such failure within thirty (30) calendar days from the date of a written notice of default from Loxygen to the Client; or",
          "the Client violates the provisions related to data protection, Intellectual Property Rights or Confidential Information.",
        ],
      },
    ],
  },
  {
    number: "18",
    title: "Effects of Termination",
    clauses: [
      {
        number: "18.1",
        text: "Upon termination of the Agreement for whatever reason:",
        subitems: [
          "each Party shall return, within a reasonable time of such termination or expiration all Confidential Information of the other Party (or alternatively destroy any copies thereof that cannot be returned and confirm in writing that such copies have been destroyed);",
          "the Client shall promptly pay to Loxygen all fees and other amounts due to Loxygen hereunder up to and including the date of termination.",
        ],
      },
      {
        number: "18.2",
        text: "The provisions of the Agreement that are expressly or implicitly intended to survive termination, shall survive any expiration or termination of the Agreement.",
      },
    ],
  },
  {
    number: "19",
    title: "Miscellaneous",
    clauses: [
      {
        number: "19.1",
        label: "Entire agreement –",
        text: "The Agreement constitutes the entire agreement and understanding between the Parties with respect to the subject matter hereof and supersedes all prior oral or written agreements, representations or understandings between the Parties relating to the subject matter hereof.",
      },
      {
        number: "19.2",
        label: "Severability –",
        text: "If any provision of the Agreement is held to be unenforceable (in whole or in part), the other provisions shall nevertheless continue in full force and effect. The provisions found to be unenforceable shall be enforceable to the full extent permitted by applicable law. Each Party shall use its best efforts to immediately negotiate in good faith a valid replacement provision with an equal or similar economic effect.",
      },
      {
        number: "19.3",
        label: "Waiver –",
        text: "Any waiver of a right or remedy must be made in writing and shall not be deemed a waiver of any subsequent right or remedy. Such waiver shall be effective only in the specific instance and for the specific purpose for which it was given.",
      },
      {
        number: "19.4",
        label: "Non-solicitation:",
        text: "During the term of the Agreement and until twelve (12) months after termination, the Client agrees not to hire or solicit any staff from Loxygen directly or indirectly as an employee or on any other basis, nor will the Client attempt to do so. Should the Client act in breach of this clause, the Client will be liable to pay an amount equal to twelve (12) times the monthly gross income of the staff member concerned per breach of this clause, without prejudice to Loxygen’s right to claim additional damages, if it can establish that it has incurred higher damages. The Parties acknowledge that the provisions of this clause are reasonable and necessary to protect the legitimate interests of Loxygen and that if any provision of this clause would exceed the limitations imposed by law, the Parties shall be deemed to have agreed to such provisions that conform with the maximum permitted by law.",
      },
      {
        number: "19.5",
        label: "Assignment –",
        text: "Loxygen may assign, transfer and/or subcontract its rights and obligations under the Agreement to any third party. The Client shall not assign or otherwise transfer any of its right or obligations under the Agreement without Loxygen’s prior written consent.",
      },
      {
        number: "19.6",
        label: "Interpretation and Conflict –",
        text: "Any words following the terms “including”, “include”, “in particular”, “for example” or any similar expression shall be construed as illustrative and shall not limit interpretation of the words, description, definition, phrase or term preceding those terms. If there is a conflict between these Terms and any Order Form, these Terms shall govern, except where it is expressly stated in an Order From that a specific provision of these Terms is to be varied or overridden.",
      },
      {
        number: "19.7",
        label: "Force Majeure –",
        text: "Neither Party will be liable for any delay in performing, or failure to perform, any of its non-monetary obligations under the Agreement due to an event, or a series of related events, that is/are reasonably beyond the control of the Party affected (including power failures, social strikes or other labor actions, changes to the law, epidemics or pandemics, explosions, fires, floods, riots, terrorist attacks, wars, embargo, unfavorable weather conditions, force majeure on the part of the subcontractors of Loxygen, failures in goods, equipment, software or materials of third parties, government measures, disruption of internet, data network or telecommunication facilities, unavailability of third party servers, virus or other (malicious) software attacks, general transportation problems and electricity outages) (“Force Majeure Event”). If a Party refers to a Force Majeure Event, it must immediately inform the other Party of the nature of the Force Majeure Event, stating the date when the Force Majeure Event comes or has come into effect. In the event of delay in performance due to a Force Majeure Event, the execution of the relevant obligation shall be extended by a period reasonably necessary to overcome the effect of such delay. If the delay in performance is likely to extend for a period of ninety (90) days or more, the Parties shall have the right to terminate the Agreement.",
      },
      {
        number: "19.8",
        label: "Electronic signature –",
        text: "The Client acknowledges that this Agreement and Order Forms may be signed using electronic signature technology. In that case, the electronic signature shall be the legally binding equivalent of a handwritten signature and shall have the same force and effect as the issuance of an original paper copy.",
      },
      {
        number: "19.9",
        label: "Notices –",
        text: "Notices of default or termination shall be given by registered letter. Any other notice required to be served by the Agreement shall in first instance be given by electronic mail to the email addresses indicated in the Order Form (or such other email addresses as notified by either Party from time to time). All notices given by electronic mail, shall only be valid in case confirmation of receipt was expressly given by electronic mail from the receiving Party within five (5) business days. In case no confirmation of receipt was given by the receiving Party within five (5) business days, or for notices of default or termination, all notices can be done in writing and served by personal delivery, registered letter, addressed to either Party at its address specified in the Order Form (or such other addresses as notified by either Party from time to time).",
      },
      {
        number: "19.10",
        label: "Publicity –",
        text: "Loxygen shall have the right to use any trademarks, logos or other marks of the Client (including the Client’s corporate name) for Client references on Loxygen website, social media announcements and sales presentations.",
      },
      {
        number: "19.11",
        label: "Governing Law and Jurisdiction. –",
        text: "This Agreement shall be governed by and construed in accordance with Belgian law (excluding its conflict of law principles). All disputes that cannot be settled amicable within a reasonable timeframe, shall be submitted to the exclusive jurisdiction of the courts of Antwerp, Belgium. The United Nations Convention on Contracts for the International Sale of Goods shall not apply to this Agreement.",
      },
    ],
  },
];

function Clause({ clause }) {
  return (
    <div>
      <p className="text-base leading-7 text-slate-600">
        <span className="font-semibold text-brand-navy">{clause.number}. </span>
        {clause.label ? (
          <span className="font-semibold text-brand-navy">{clause.label} </span>
        ) : null}
        {clause.text}
      </p>

      {clause.definitions ? (
        <dl className="mt-4 space-y-4 border-l-2 border-slate-200 pl-6">
          {clause.definitions.map((def) => (
            <div key={def.term}>
              <dt className="italic font-semibold text-brand-navy">&ldquo;{def.term}&rdquo;</dt>
              <dd className="mt-1 text-base leading-7 text-slate-600">{def.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {clause.subitems ? (
        <ol className="mt-4 space-y-3 pl-6">
          {clause.subitems.map((item, i) => (
            // eslint-disable-next-line react/no-array-index-key -- static content, stable order
            <li key={i} className="text-base leading-7 text-slate-600">
              <span className="font-semibold text-brand-navy">
                {String.fromCharCode(97 + i)})
              </span>{" "}
              {item}
            </li>
          ))}
        </ol>
      ) : null}

      {clause.extra ? (
        <p className="mt-4 text-base leading-7 text-slate-600">{clause.extra}</p>
      ) : null}
    </div>
  );
}

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE_URL}/terms-and-conditions`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/terms-and-conditions`} />
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
              Terms &{" "}
              <span className="italic text-brand-accent">conditions.</span>
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Last updated {LAST_UPDATED}
            </p>

            <div className="mt-16 space-y-12">
              {SECTIONS.map((section) => (
                <div key={section.number}>
                  <h2 className="font-display text-2xl text-brand-navy">
                    {section.number}. {section.title}
                  </h2>
                  <div className="mt-6 space-y-6">
                    {section.clauses.map((clause) => (
                      <Clause key={clause.number} clause={clause} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
