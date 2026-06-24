import Link from 'next/link';

import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES, SUPPORT_CONTACT } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.listProperty);

const onboardingBenefits = [
  'Create a direct discovery path for seekers looking in your city and category.',
  'Reduce vacancy friction with clearer listing visibility and property detail pages.',
  'Move from public discovery into the STAYCT management platform once onboarding is complete.',
] as const;

export default function ListPropertyPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'List Your Property' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">New operators</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            List your property without forcing new operators through multiple branches.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            This page exists for first-time STAYCT operators. It should explain the onboarding value, show the next action, and hand off to support cleanly.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={SUPPORT_CONTACT.emailHref} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
              Start by email
            </Link>
            <Link href={SUPPORT_CONTACT.phoneHref} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
              Call STAYCT
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {onboardingBenefits.map((item) => (
            <article key={item} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <p className="text-[15px] leading-[1.75] text-stayct-green-medium">{item}</p>
            </article>
          ))}
        </section>

        <div className="mt-8">
          <SupportContactCard description="If you need to discuss onboarding, vacancy structure, or whether STAYCT fits your property, support should be the next step." />
        </div>
      </div>
    </main>
  );
}
