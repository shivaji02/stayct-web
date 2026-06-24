import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs, StayCard, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import {
  getPropertiesForCategory,
  getStayCategory,
  MOCK_CITIES,
  STAY_CATEGORIES,
} from '@/content';
import { buildSearchHref } from '@/lib';
import { buildPageMetadata } from '@/seo';
import type { RouteParams } from '@/types';

type CategoryPageProps = {
  params: RouteParams<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await Promise.resolve(params);
  const categoryData = getStayCategory(category as Parameters<typeof getStayCategory>[0]);

  if (!categoryData) {
    return buildPageMetadata({
      title: 'Category Not Found',
      description: 'The requested stay category is not available.',
      path: `/categories/${encodeURIComponent(category)}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${categoryData.name} stays`,
    description: `Browse ${categoryData.name.toLowerCase()} listings and related city shortcuts on STAYCT.`,
    path: `/categories/${encodeURIComponent(category)}`,
  });
}

export function generateStaticParams() {
  return STAY_CATEGORIES.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await Promise.resolve(params);
  const categoryData = getStayCategory(category as Parameters<typeof getStayCategory>[0]);

  if (!categoryData) {
    notFound();
  }

  const stays = getPropertiesForCategory(categoryData.slug);
  const cities = MOCK_CITIES.filter((city) => stays.some((stay) => stay.citySlug === city.slug));

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Categories', href: ROUTES.categories },
            { label: categoryData.name },
          ]}
        />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Category page</p>
              <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
                {categoryData.name} stays that match the move you are planning.
              </h1>
              <p className="mt-4 text-[16px] leading-[1.75] text-stayct-green-medium">{categoryData.description}</p>
            </div>
            <div className="rounded-[20px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Inventory</div>
              <div className="mt-2 text-[28px] font-black text-stayct-green-dark">{stays.length}</div>
              <div className="text-[14px] text-stayct-green-medium">{categoryData.name} previews</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={buildSearchHref({ category: categoryData.slug })}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white"
            >
              Search {categoryData.name}
            </Link>
            <Link
              href={ROUTES.support}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Ask which format fits
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Best for</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {categoryData.bestFor.map((item) => (
                <span key={item} className="rounded-full bg-stayct-bg-light px-4 py-3 text-[13px] font-semibold text-stayct-green-dark">
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Cities with this stay type</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={buildSearchHref({ city: city.slug, category: categoryData.slug })}
                  className="rounded-full border border-stayct-border px-4 py-3 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Listings</p>
              <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Compare {categoryData.name.toLowerCase()} options before you branch elsewhere.
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {stays.map((stay) => (
              <StayCard key={stay.slug} stay={stay} />
            ))}
          </div>
        </section>

        <div className="mt-8">
          <SupportContactCard description={`If ${categoryData.name.toLowerCase()} still feels too broad, contact STAYCT support and explain the city, budget, and room format you need.`} />
        </div>
      </div>
    </main>
  );
}
