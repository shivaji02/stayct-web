import { Breadcrumbs } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = {
  ...buildPageMetadata(SITE_PAGES.privacy),
  title: {
    absolute: 'Privacy Policy | stayct',
  },
  applicationName: 'stayct',
  openGraph: {
    ...buildPageMetadata(SITE_PAGES.privacy).openGraph,
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

const privacySections: readonly LegalSection[] = [
  {
    title: '1. Scope',
    paragraphs: [
      'This policy explains how stayct handles information. It applies to the stayct website at stayct.in, the stayct mobile applications for iOS and Android, the stayct property-management platform at app.stayct.in, support, and related services provided by stayct.',
      'Two different things sit at the centre of this policy, and the difference between them matters throughout.',
      'Owner/operator accounts. The owner, manager or authorised staff member of a PG, hostel, co-living space, rental property or other managed accommodation business is the stayct account holder. They sign in to stayct and use it to manage properties, rooms and beds, residents, rent and payment records, security deposits, expenses, complaints and day-to-day operations.',
      'Resident records. Residents are the people staying at those properties. In the current stayct operating model a resident is a record created and maintained by an owner/operator. Residents do not sign in to stayct and do not hold a stayct account. Having a resident record in the system is not the same as having a stayct account.',
      "Where an owner/operator enters information about a resident, that operator decides what is recorded and why. stayct processes it on the operator's behalf and makes it available only to that operator's account.",
      'Contact details for privacy questions are in Section 16.',
    ],
  },
  {
    title: '2. Information you provide',
    paragraphs: [
      "Owner/operator account information. stayct uses phone number and PIN authentication. We do not use email and password sign-in. To create and access an account we collect the account holder's phone number and the PIN they set.",
      'Property information. Property names, addresses, rooms, beds, capacity, occupancy and vacancy status, along with any descriptions you add.',
      'Resident information. Resident contact phone numbers and stay details entered by an owner/operator, such as which bed a resident occupies, the period of their stay, and whether that stay is current or has ended. Residents do not enter this themselves and do not have a stayct login; the operator maintains the record.',
      'Rent, deposit and expense records. Rent amounts, rent due and paid status, payment history, security deposits, deposit refunds, expenses, and other accommodation-related transaction records. See Section 6 for how this differs from payment processing.',
      'Complaints and operational notes. Text describing issues raised at a property, their status, and any follow-up recorded against them.',
      'Photos and attachments. Images of properties and images attached to complaint records, uploaded from your device camera or photo library with your permission.',
      'Website enquiries. Where you use an enquiry or contact form on stayct.in, we collect the name, phone number, email address, city and stay-related context you provide.',
      'Support communications. Messages, calls and emails you send us, and our replies.',
    ],
  },
  {
    title: '3. Information collected automatically',
    paragraphs: [
      'Application and usage events. Which screens and features are used within the app, collected through Google Analytics for Firebase, so we can understand how stayct is used and improve it.',
      'Diagnostic and crash information. Technical details captured when the app fails or behaves unexpectedly, collected through Firebase Crashlytics, so we can identify and fix defects.',
      'Device and application identifiers. An application instance identifier associated with the above services, together with basic device and operating system details.',
      'Network information. IP address and related connection information observed by our infrastructure when you use the website or the app.',
      'Approximate location. Where you grant permission, the app collects coarse, area-level location to provide property context. stayct does not collect precise GPS location.',
    ],
  },
  {
    title: '4. Device permissions',
    paragraphs: [
      'The stayct mobile application asks for the following permissions. Each is optional, and declining one does not prevent you using the rest of the app.',
    ],
    bullets: [
      'Camera: to take photographs to attach to property and complaint records.',
      'Photo library: to select existing images to attach to property and complaint records. stayct does not scan, index or read your photo library beyond the images you choose.',
      'Location (approximate): to provide area-level property context within the app.',
    ],
    emphasis: [
      'stayct does not request access to your contacts, microphone, calendar, health data or precise location.',
    ],
  },
  {
    title: '5. How information is used',
    paragraphs: ['We use the information described above to:'],
    bullets: [
      'create, authenticate and secure your stayct account',
      'operate the property-management features you use, including properties, rooms, beds, residents and occupancy',
      'maintain the rent, deposit and expense records you enter',
      'record and track complaints and operational follow-up',
      'store and display photographs and attachments you upload',
      'provide area-level property context in the app',
      'respond to enquiries and provide support',
      'send service and account communications relating to your use of stayct',
      'detect, investigate and prevent misuse, fraud and security incidents',
      'diagnose faults, fix defects and improve the reliability and usefulness of the service',
    ],
    emphasis: [
      'We do not use your information to build advertising profiles, and stayct does not display third-party advertising.',
    ],
  },
  {
    title: '6. Rent, deposits and financial records',
    paragraphs: [
      'stayct records information about real-world accommodation transactions. This includes rent amounts, rent due and paid status, payment history, security deposits, deposit refunds, expenses and other accommodation-related transaction records.',
      'These are operational records entered or managed through stayct. Recording a payment in stayct is a bookkeeping entry about something that happened between an operator and a resident. It is not the payment itself.',
      'For the current product, stayct does not collect rent from residents, hold security deposits, hold customer funds, transfer money between owners and residents, or act as a bank, wallet, escrow provider or payment processor.',
      'stayct does not store card numbers or bank account numbers.',
    ],
  },
  {
    title: '7. Communications and WhatsApp',
    paragraphs: [
      "stayct uses the WhatsApp Business Platform, operated by Meta, to deliver operational messages and notifications. Where a message is sent this way, the recipient's phone number and the content of that message are processed by WhatsApp in order to deliver it.",
      'This is a one-way notification channel. stayct does not provide in-app chat or direct messaging between users, and WhatsApp messages sent through stayct are not a conversation thread inside the application.',
    ],
  },
  {
    title: '8. Service providers',
    paragraphs: [
      'We rely on a small number of providers to operate stayct, and share information with them only to the extent needed to deliver the service:',
    ],
    bullets: [
      'Cloud hosting and database infrastructure, to store and serve your account and property records.',
      'Google LLC (Firebase), for application analytics and crash reporting.',
      'Meta Platforms (WhatsApp Business Platform), to deliver operational notifications as described in Section 7.',
    ],
    emphasis: [
      'These providers act on our instructions and are not permitted to use your information for their own unrelated purposes.',
    ],
  },
  {
    title: '9. Sharing information',
    paragraphs: ['We share information only in these circumstances:'],
    bullets: [
      'with the service providers described in Section 8',
      "with the operator managing a resident's stay, where the information concerns that stay",
      'where you ask us to, or otherwise direct us to share it',
      'where we are required to by law, regulation, or a valid legal request',
      'to establish, exercise or defend legal claims, or to protect the rights and safety of users and the public',
      'in connection with a merger, acquisition or transfer of the business, in which case we will tell you before your information becomes subject to a different policy',
    ],
    emphasis: [
      'stayct does not sell personal information, and does not share it with advertising networks or data brokers.',
      "An operator's records are not visible to other operators. A resident's information is visible only to the operator managing their stay.",
    ],
  },
  {
    title: '10. Data retention',
    paragraphs: [
      'We keep information for as long as it is needed for the purpose it was collected, which generally means:',
    ],
    bullets: [
      'Owner/operator account and operational records are kept while the account is active and in use.',
      'Resident records are kept by the operator for as long as they need them. Ending a stay does not automatically remove the record, as explained in Section 11.',
      'Rent, deposit and expense records may be kept beyond account closure where they are needed to meet accounting, tax or other legal obligations, or to resolve a dispute.',
      'Website enquiry details are kept while we follow up on the enquiry and for a reasonable period afterwards.',
      'Diagnostic and analytics information is kept in line with the retention settings of the providers named in Section 8.',
    ],
    emphasis: ['Where information is no longer needed, it is deleted or anonymised.'],
  },
  {
    title: "11. Account deletion, and ending a resident's stay",
    paragraphs: ['These are two different actions. Please read both.'],
    subsections: [
      {
        title: 'Deleting your stayct account',
        paragraphs: [
          'Account deletion applies to owner/operator account holders, who are the people who actually hold a stayct account.',
          'If you hold a stayct account, you can delete it using the account-deletion function in the stayct mobile application. Deleting your account ends your access and begins removal of the account and the operational records held in it from the live service.',
          'Some information may be retained after deletion where it is reasonably necessary for meeting legal and regulatory obligations, accounting, tax and financial or transaction record requirements, security and fraud prevention, establishing or defending legal claims, resolving disputes, or legitimate operational recordkeeping.',
          'Backup copies may also persist for a period before being overwritten in the normal course of operations. We do not promise that every record is erased from every system the moment you press delete.',
          'If you cannot access the app, you can request deletion by writing to support@stayct.in from the phone number associated with your account. We will verify your identity before acting on the request.',
        ],
      },
      {
        title: 'Marking a resident as vacated',
        paragraphs: [
          "Marking a resident as vacated is a property-management action taken by an owner/operator. It records that the resident's occupancy or stay has ended.",
          "It is not account deletion. It does not delete the operator's stayct account, and it does not by itself delete the resident's information.",
          "Historical operational records associated with that stay may remain in the operator's account where appropriate, including occupancy and stay history, rent and payment records, security deposit and refund records, expenses, and complaints. These records belong to the operator's own bookkeeping and may be needed for accounting, tax or dispute purposes.",
        ],
      },
      {
        title: 'If you are a resident',
        paragraphs: [
          'Residents do not hold a stayct account, so there is no stayct account for a resident to delete. Your information is held by the owner/operator who recorded it, and they decide what is kept and for how long.',
          'If you want your information corrected or removed, contact that operator first. If you cannot reach them, or you are not getting a response, write to support@stayct.in and we will help where we can.',
        ],
      },
    ],
  },
  {
    title: '12. Security',
    paragraphs: [
      'We use technical and organisational measures appropriate to the information we hold. Information is transmitted over encrypted connections and stored on access-controlled infrastructure, and access to your account requires your PIN.',
      'No method of transmission or storage is completely secure, and we cannot guarantee absolute security. Keep your PIN private, and contact us at support@stayct.in immediately if you believe your account has been accessed without your permission.',
    ],
  },
  {
    title: '13. Your choices and rights',
    paragraphs: ['If you hold a stayct account, you can:'],
    bullets: [
      'access the information in your account through the app at any time',
      'correct information that is inaccurate, by editing it in the app or by asking us',
      'delete your account and associated information, as described in Section 11',
      'request a copy of the information you provided to us',
      'decline permissions for camera, photo library and location at any time in your device settings',
      'object to or ask us to limit a particular use of your information',
    ],
    emphasis: [
      'To make a request, write to support@stayct.in. We will respond within a reasonable period and may need to verify your identity first.',
      'If you are a resident rather than an account holder, the operator who recorded your information is the right first point of contact, as explained in Section 11.',
    ],
  },
  {
    title: '14. Children',
    paragraphs: [
      'stayct is a business tool built for adults who operate accommodation businesses. It is not directed at children and we do not knowingly collect information from children. If you believe a child has provided us with information, write to support@stayct.in and we will remove it.',
    ],
  },
  {
    title: '15. Changes to this policy',
    paragraphs: [
      'We may update this policy as stayct changes. When we do, we will revise the "Last updated" date shown at the top of this page. Where a change materially affects how we use your information, we will give notice through the service.',
    ],
  },
  {
    title: '16. Contact',
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

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Privacy Policy' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
            Privacy Policy
          </p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            How stayct collects, uses and protects information across our website and applications.
          </p>
          <p className="mt-5 text-[13px] font-semibold text-stayct-green-accent">
            Last updated: 14 September 2026
          </p>
        </section>

        <section className="mt-8 space-y-5">
          {privacySections.map((section) => (
            <LegalSectionCard key={section.title} section={section} />
          ))}
        </section>
      </div>
    </main>
  );
}
