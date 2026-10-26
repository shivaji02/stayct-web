import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.privacy);

const privacySections = [
  {
    title: 'What STAYCT collects',
    body: 'The public site primarily collects the information a user shares in an enquiry or support interaction, such as name, phone number, email, city, and stay-related context.',
  },
  {
    title: 'Why the information is used',
    body: 'STAYCT uses that information to respond to property enquiries, support requests, onboarding conversations, and service follow-up tied to the user’s stated accommodation need.',
  },
  {
    title: 'How long it is kept',
    body: 'Data should be retained only as long as needed for service delivery, support, compliance, and legitimate business follow-up tied to the enquiry.',
  },
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Privacy' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Privacy</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Privacy details should stay readable, not hidden behind placeholders.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            This page explains the high-level privacy expectations for the public STAYCT website and its enquiry flows.
          </p>
        </section>

        <section className="mt-8 space-y-5">
          {privacySections.map((section) => (
            <article key={section.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <h2 className="text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">{section.title}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{section.body}</p>
            </article>
          ))}
        </section>

        <div className="mt-8">
          <SupportContactCard description="If you need clarification on privacy handling for a specific enquiry or support interaction, contact STAYCT support directly." />
        </div>
      </div>
    </main>
  );
}
