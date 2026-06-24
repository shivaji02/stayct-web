import Link from 'next/link';

import { Breadcrumbs, StayCard, SupportContactCard } from '@/components';
import { ROUTES, routeBuilders } from '@/constants/routes';
import { buildSearchHref } from '@/lib';
import { buildPageMetadata } from '@/seo';
import { getFeaturedProperties, SITE_PAGES, STAY_CATEGORIES } from '@/content';

export const metadata = buildPageMetadata(SITE_PAGES.categories);

export default function CategoriesPage() {
  const featured = getFeaturedProperties(5);

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Categories' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Categories</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Pick the stay format that fits your move.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Category pages exist to shorten the decision, not add content overhead. Each one points back to live search and city recovery paths.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {STAY_CATEGORIES.map((category) => (
            <article key={category.slug} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Stay type</p>
              <h2 className="mt-3 text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">{category.name}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.bestFor.map((item) => (
                  <span key={item} className="rounded-full bg-stayct-bg-light px-3 py-2 text-[12px] font-medium text-stayct-green-dark">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={routeBuilders.category(category.slug)}
                  className="rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[14px] font-bold text-white"
                >
                  Browse {category.name}
                </Link>
                <Link
                  href={buildSearchHref({ category: category.slug })}
                  className="rounded-[12px] border border-stayct-green-dark px-4 py-3 text-[14px] font-bold text-stayct-green-dark"
                >
                  Search stays
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Featured stays</p>
              <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-stayct-green-dark">
                The category view still leads back to real listings.
              </h2>
            </div>
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {featured.map((stay) => (
              <StayCard key={stay.slug} stay={stay} />
            ))}
          </div>
        </section>

        <div className="mt-8">
          <SupportContactCard description="If you know the move-in goal but not the right stay format, contact STAYCT support so the category choice does not become a blocker." />
        </div>
      </div>
    </main>
  );
}
