import Link from 'next/link';

import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildSearchHref } from '@/lib/discovery';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.resources);

const resourceCards = [
  {
    title: 'Choose the right city first',
    description: 'Use city pages when the biggest uncertainty is location, commute, or local area fit.',
    href: ROUTES.cities,
    cta: 'Browse city pages',
  },
  {
    title: 'Choose the right stay category',
    description: 'Use category pages when the question is PG vs hostel vs co-living vs shared flat vs rental room.',
    href: ROUTES.categories,
    cta: 'Browse categories',
  },
  {
    title: 'Use search without losing state',
    description: 'STAYCT search keeps filters in the URL so refresh and browser back do not reset the shortlist.',
    href: ROUTES.search,
    cta: 'Open search',
  },
] as const;

const faqItems = [
  {
    question: 'Where should a new visitor start?',
    answer: 'Start with Search if you know the city or stay type. Start with Cities if you need location orientation first.',
  },
  {
    question: 'What if a city has multiple good areas?',
    answer: 'Use the city page first, then move into area shortcuts or filtered search so you keep the city context.',
  },
  {
    question: 'How should operators use the website?',
    answer: 'New operators use List Your Property. Existing users use Manage Property. Support sits beside both.',
  },
] as const;

export default function ResourcesPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Resources' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Resources</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Short guides that move the user back into action.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Resources should explain just enough to keep discovery moving. They are not a substitute for search, cities, categories, or support.
          </p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {resourceCards.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <h2 className="text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{item.description}</p>
              <Link href={item.href} className="mt-6 inline-flex rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[14px] font-bold text-white">
                {item.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Useful jumps</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={buildSearchHref({ category: 'pg' })} className="rounded-full border border-stayct-border px-4 py-3 text-[13px] font-semibold text-stayct-green-dark">
                PG search
              </Link>
              <Link href={buildSearchHref({ city: 'hyderabad' })} className="rounded-full border border-stayct-border px-4 py-3 text-[13px] font-semibold text-stayct-green-dark">
                Hyderabad stays
              </Link>
              <Link href={buildSearchHref({ city: 'delhi-ncr' })} className="rounded-full border border-stayct-border px-4 py-3 text-[13px] font-semibold text-stayct-green-dark">
                Delhi NCR stays
              </Link>
            </div>
          </article>
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">FAQ</p>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                  <h2 className="text-[15px] font-bold text-stayct-green-dark">{item.question}</h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <div className="mt-8">
          <SupportContactCard description="If the guide still leaves the user uncertain, Support should take over instead of sending them in circles." />
        </div>
      </div>
    </main>
  );
}
