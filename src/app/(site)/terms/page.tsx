import { Breadcrumbs } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = {
  ...buildPageMetadata(SITE_PAGES.terms),
  title: {
    absolute: 'Terms of Service | stayct',
  },
  applicationName: 'stayct',
  openGraph: {
    ...buildPageMetadata(SITE_PAGES.terms).openGraph,
    siteName: 'stayct',
  },
};

type LegalSubsection = Readonly<{
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}>;

type LegalSection = Readonly<{
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  subsections?: readonly LegalSubsection[];
  emphasis?: readonly string[];
}>;

const termsSections: readonly LegalSection[] = [
  {
    title: '1. Scope',
    paragraphs: [
      'These terms apply to your use of the stayct website at stayct.in, the stayct mobile applications for iOS and Android, the stayct property-management platform at app.stayct.in, support, and related services provided by stayct.',
      'By using any of these, you agree to these terms. If you do not agree, do not use stayct.',
      'How we handle information is described separately in our Privacy Policy at https://stayct.in/privacy.',
    ],
  },
  {
    title: '2. Accounts and eligibility',
    paragraphs: [
      'You need an account to use the stayct property-management features. Accounts are for adults who own, manage or work in an accommodation business. These terms refer to that account holder as the owner/operator.',
      'Residents are different. In the current stayct operating model a resident is a record created and maintained by an owner/operator. Residents do not sign in to stayct and do not hold a stayct account. Creating a resident record does not create a stayct account for that person.',
      'stayct uses phone number and PIN authentication. You are responsible for keeping your PIN confidential, everything done through your account, telling us promptly at support@stayct.in if you believe your account has been accessed without permission, and keeping your account details accurate and current.',
      "You may not share an account with someone who should not have access to the records it contains, create an account using someone else's phone number, or transfer your account to another person without our agreement.",
    ],
  },
  {
    title: '3. Operator responsibilities',
    paragraphs: ['If you use stayct to manage a property, you are responsible for:'],
    bullets: [
      'having the authority to manage the properties you add, whether as owner, manager or authorised staff',
      'the accuracy and lawfulness of everything you enter, including property, room, bed, resident, rent, deposit, expense and complaint records',
      'having a proper basis to record and manage information about the residents you add',
      'meeting your own legal obligations to residents, including under any tenancy, licence or accommodation agreement between you',
      'your own tax, accounting, registration and licensing obligations',
    ],
    emphasis: [
      'stayct is a tool for recording and organising your operations. It does not make you compliant with any law, and it does not assume any of your obligations to your residents.',
    ],
  },
  {
    title: '4. Resident information',
    paragraphs: [
      'Owner/operators must have appropriate authority and a lawful basis to enter, store and manage resident information through stayct.',
      "Because residents do not hold stayct accounts, everything recorded about a resident is recorded by you, on your authority, and sits within your account. Before recording a resident's details you should have told that resident what you are recording and why, as your own local law requires. You remain responsible for that information for as long as it is in your account, and for removing it when you no longer need it.",
      'If a resident asks you about their information, or asks you to correct or delete it, that request is yours to handle.',
      "Ending a stay is not the same as deleting a record. Marking a resident as vacated records that their occupancy has ended. It does not by itself remove their information, and historical operational records connected to that stay may remain in your account. If a resident's information should be removed entirely, that is a separate step you need to take.",
    ],
  },
  {
    title: '5. Property information',
    paragraphs: [
      'You are responsible for the accuracy of the property information you publish or record, including property details and addresses, room and bed information, availability and occupancy, descriptions, photographs, pricing and terms shown to prospective residents.',
    ],
    emphasis: [
      'Availability, pricing, amenities and room details change. Anyone relying on information discovered through stayct.in should confirm it directly with the operator before making arrangements.',
    ],
  },
  {
    title: '6. Rent, deposits, payments and expenses',
    paragraphs: [
      'stayct helps you record and manage information about real-world accommodation transactions, including rent amounts, rent due and paid status, payment history, security deposits, deposit refunds, expenses and other accommodation-related transaction records.',
      'These are operational records you create, confirm or manage through stayct. Recording a payment in stayct is a bookkeeping entry describing something that took place between an operator and a resident.',
      'For the current product, stayct does not collect rent from residents, hold security deposits, hold customer funds, transfer money between owners and residents, or act as a bank, wallet, escrow provider or payment processor.',
      'stayct is not a landlord, property owner, letting agent, bank, payment institution, payment processor or financial adviser, and does not become a party to any agreement between an operator and a resident.',
      'A record in stayct does not by itself constitute a receipt, an invoice, a tenancy or licence agreement, or any financial or tax document you are legally required to issue or keep. You remain responsible for issuing and retaining those separately.',
    ],
  },
  {
    title: '7. Acceptable use',
    paragraphs: ['You may not:'],
    bullets: [
      'use stayct for any unlawful purpose, or in breach of any law that applies to you',
      'access, or try to access, any account, property or record you are not authorised to see',
      'use stayct to commit fraud, or to misrepresent a property, a stay, or a payment',
      'impersonate another person or business, or falsely claim authority over a property',
      'upload anything containing malware, or anything designed to damage or interfere with the service',
      'scrape, harvest or bulk-extract content or data from stayct without our written permission',
      'probe, disrupt or overload our systems, or bypass any security or access control',
      "misuse another person's information obtained through stayct, including contacting residents for purposes unrelated to their stay",
      "upload content that is unlawful, abusive, harassing, defamatory, obscene, or that infringes someone else's rights",
      'resell or make the service available to third parties except as part of operating your own accommodation business',
    ],
    emphasis: ['We may investigate suspected misuse and take the steps described in Section 15.'],
  },
  {
    title: '8. User content',
    paragraphs: [
      'User content means anything you submit, upload, enter or store through stayct, including:',
    ],
    bullets: [
      'property details, addresses and descriptions',
      'room and bed information',
      'resident records and resident contact information entered by an owner/operator',
      'occupancy and stay information',
      'rent, payment, deposit and expense records',
      'complaints, notes and operational records',
      'photographs and other attachments',
      'messages you send us through support',
    ],
  },
  {
    title: '9. Ownership of user content',
    paragraphs: [
      'You keep ownership of your user content. Submitting content to stayct does not transfer ownership of it to us, and stayct claims no ownership in the property information, records, photographs or other material you enter.',
    ],
  },
  {
    title: '10. Licence you grant to stayct',
    paragraphs: [
      'So that we can actually run the service, you grant stayct a non-exclusive, worldwide, royalty-free licence to host, store, copy, back up, process, transmit, adapt for technical formatting and display your user content.',
      'This licence is limited to what is reasonably necessary to provide and operate the stayct services to you and to the people you authorise, display your content back to you and to others within your account who are entitled to see it, store, back up and restore your content, keep the service secure, detect and prevent fraud and abuse, provide support at your request, and meet our legal obligations.',
      'The licence does not permit stayct to sell your content, license it to third parties for their own purposes, use it in advertising, or use it to promote any business other than yours. It lasts as long as your content is in the service, and ends when the content is deleted, subject to the retention described in our Privacy Policy and to backup copies persisting for a limited period before being overwritten.',
    ],
  },
  {
    title: '11. Your rights in what you submit',
    paragraphs: ['By submitting user content to stayct, you represent and warrant that:'],
    bullets: [
      'you own it, or you otherwise have all rights, permissions, consents and authority necessary to submit it',
      'you have the authority to grant the licence in Section 10',
      'where the content is a photograph, you have the right to use that image, and any person identifiable in it has consented as required',
      'where the content contains information about another person, including a resident who does not hold a stayct account, you have a lawful basis to record it and to have stayct process it on your behalf',
      "the content does not infringe anyone's intellectual property, privacy or other rights, and does not breach any law",
    ],
    emphasis: [
      'If you cannot make these assurances about a particular item, do not submit it.',
      'If you believe content on stayct infringes your rights, write to support@stayct.in with enough detail to identify the content and your claim, and we will review it.',
    ],
  },
  {
    title: '12. stayct intellectual property',
    paragraphs: [
      'The stayct software, applications, website, interface, design, and the stayct name, logo and branding are owned by stayct or licensed to us. Original content we publish, such as our guides and resources, belongs to us.',
      'You get a limited, non-exclusive, non-transferable, revocable right to use stayct for its intended purpose while you comply with these terms. That right does not let you copy, modify, reverse engineer, decompile, resell or create derivative works from the service or its software, or use the stayct name or branding without our written permission.',
    ],
  },
  {
    title: '13. Third-party services',
    paragraphs: [
      'Parts of stayct depend on third-party providers, including cloud infrastructure, analytics and crash reporting, and messaging delivery. Those providers are described in our Privacy Policy.',
      'Where stayct links to or connects with a third-party service, that service is governed by its own terms and privacy policy, and we are not responsible for it.',
    ],
  },
  {
    title: '14. Service availability',
    paragraphs: [
      'We work to keep stayct available and reliable, but we do not guarantee uninterrupted or error-free service.',
      'Access may be unavailable during maintenance, updates, or because of faults, third-party outages, or events outside our control. We may change, add or remove features over time. Where a change materially reduces functionality you depend on, we will give reasonable notice where we can.',
      'You are responsible for keeping your own copies of any records you need to retain independently of stayct.',
    ],
  },
  {
    title: '15. Suspension and termination',
    paragraphs: ['We may suspend or terminate your access if:'],
    bullets: [
      'you breach these terms, including the acceptable use rules in Section 7',
      "we reasonably suspect fraud, unlawful activity, or misuse of another person's information",
      'it is necessary to protect the service, other users, or the public',
      'we are required to by law',
    ],
    emphasis: [
      'Where circumstances allow, we will tell you why and give you a chance to put it right. For serious breaches we may act immediately.',
      'You can stop using stayct at any time, and can delete your account as described in Section 16.',
    ],
  },
  {
    title: "16. Account deletion and ending a resident's stay",
    paragraphs: ['These are two different actions and they have different consequences.'],
    subsections: [
      {
        title: 'Deleting your owner/operator account',
        paragraphs: [
          'If you hold a stayct account, you can delete it using the account-deletion function in the stayct mobile application. This is an account-level action.',
          'Deleting your account ends your access and begins removal of the account and the operational records held in it from the live service. This cannot be undone, so export or otherwise record anything you need to keep before you delete.',
          'Deleting your account also removes the property and resident records held in it. You remain responsible for meeting any obligation you have to keep those records elsewhere, including for accounting, tax or dispute purposes.',
          'Some information may be retained after deletion, as described in our Privacy Policy.',
        ],
      },
      {
        title: 'Marking a resident as vacated',
        paragraphs: [
          "Marking a resident as vacated is an operational property-management action within your account. It records that a resident's occupancy or stay has ended.",
          "It is not account deletion. It does not delete your stayct account, and it does not delete the resident's information.",
          'Historical operational records associated with that stay may remain in your account where appropriate, including occupancy and stay history, rent and payment records, security deposit and refund records, expenses, and complaints. Those records are part of your own bookkeeping.',
        ],
      },
    ],
  },
  {
    title: '17. Disclaimers',
    paragraphs: [
      'stayct is provided as it is. We do not promise that it will meet every requirement you have, that it will be uninterrupted, or that it will be free of defects.',
      'stayct organises information you provide. We do not verify the accuracy of property listings, resident records, payment entries or any other content entered by users, and we are not responsible for decisions made on the basis of that content.',
      'stayct does not provide legal, tax, accounting or financial advice. Nothing in the service is a substitute for professional advice on your obligations as an accommodation operator.',
      'Arrangements between operators and residents, including tenancy, rent and deposits, are between those parties. stayct is not a party to them.',
    ],
  },
  {
    title: '18. Limitation of liability',
    paragraphs: [
      'To the extent permitted by law, stayct is not liable for indirect, incidental, special or consequential loss, or for loss of profits, revenue, goodwill, business or data, arising from your use of the service.',
      'Nothing in these terms limits liability that cannot be limited by law, including liability for death or personal injury caused by negligence, or for fraud.',
    ],
  },
  {
    title: '19. Changes to these terms',
    paragraphs: [
      'We may update these terms as stayct changes. When we do, we will revise the "Last updated" date at the top of this page. Where a change materially affects your rights or obligations, we will give notice through the service before it takes effect.',
      'Continuing to use stayct after a change takes effect means you accept the updated terms.',
    ],
  },
  {
    title: '20. Contact',
    paragraphs: [
      'Email: support@stayct.in',
      'Phone: +91 91363 37031',
      'Web: https://stayct.in',
      'For support enquiries, see https://stayct.in/support.',
    ],
  },
];

function LegalSectionCard({ section }: { section: LegalSection }) {
  return (
    <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
      <h2 className="text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">
        {section.title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-stayct-green-medium">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets ? (
          <ul className="list-disc space-y-2 pl-5">
            {section.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {section.emphasis?.map((paragraph) => (
          <p key={paragraph} className="font-semibold text-stayct-green-dark">
            {paragraph}
          </p>
        ))}
        {section.subsections?.map((subsection) => (
          <section key={subsection.title} className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
            <h3 className="text-[17px] font-black text-stayct-green-dark">{subsection.title}</h3>
            <div className="mt-3 space-y-3">
              {subsection.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {subsection.bullets ? (
                <ul className="list-disc space-y-2 pl-5">
                  {subsection.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export default function TermsPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[{ label: 'Home', href: ROUTES.home }, { label: 'Terms of Service' }]}
        />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
            Terms of Service
          </p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Terms governing your use of the stayct platform and services.
          </p>
          <p className="mt-5 text-[13px] font-semibold text-stayct-green-accent">
            Last updated: 14 September 2026
          </p>
        </section>

        <section className="mt-8 space-y-5">
          {termsSections.map((section) => (
            <LegalSectionCard key={section.title} section={section} />
          ))}
        </section>
      </div>
    </main>
  );
}
