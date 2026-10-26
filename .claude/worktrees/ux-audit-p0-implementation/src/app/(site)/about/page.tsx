import Link from 'next/link';

import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.about);

const audienceGroups = [
  {
    title: 'Accommodation seekers',
    description: 'Students, professionals, interns, migrants, and relocating teams use STAYCT to compare actual stay options faster.',
  },
  {
    title: 'Property operators',
    description: 'Owners and managers use STAYCT to list inventory, fill vacancies, and continue into the management platform.',
  },
  {
    title: 'Support-led journeys',
    description: 'When the user is stuck between city, budget, or stay type, Support prevents that confusion from turning into an exit.',
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'About' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">About STAYCT</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            STAYCT is the discovery layer for accommodation and the handoff into property management.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            The public site exists to help people find a stay, compare options, and recover from confusion without losing their place. The app exists to help operators manage what happens next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={ROUTES.search} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
              Find a stay
            </Link>
            <Link href={ROUTES.listProperty} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
              List your property
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {audienceGroups.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <h2 className="text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{item.description}</p>
            </article>
          ))}
        </section>

        <div className="mt-8">
          <SupportContactCard description="If you need help choosing the right path on STAYCT, Support is the fastest recovery route." />
        </div>
      </div>
    </main>
  );
}
