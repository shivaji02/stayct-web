import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.terms);

const termsSections = [
  {
    title: 'Website usage',
    body: 'STAYCT website content is provided to help users discover accommodation, compare options, and contact support or operators through approved public paths.',
  },
  {
    title: 'Listing information',
    body: 'Availability, pricing, amenities, and room details can change. Users should verify final stay details directly through STAYCT support or the relevant operator conversation.',
  },
  {
    title: 'Responsible use',
    body: 'Users should not misuse enquiry forms, scrape protected information, impersonate another person, or interfere with the website’s normal discovery and support flows.',
  },
] as const;

export default function TermsPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Terms' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Terms</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Terms should clarify expectations without becoming another dead end.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            These terms summarize how the public STAYCT website should be used and where final verification still belongs.
          </p>
        </section>

        <section className="mt-8 space-y-5">
          {termsSections.map((section) => (
            <article key={section.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <h2 className="text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">{section.title}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{section.body}</p>
            </article>
          ))}
        </section>

        <div className="mt-8">
          <SupportContactCard description="If website terms affect a support or stay enquiry, contact STAYCT support for clarification before you proceed." />
        </div>
      </div>
    </main>
  );
}
