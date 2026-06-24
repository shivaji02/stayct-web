import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs, StayCard, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import {
  buildPageMetadata,
} from '@/seo';
import {
  buildSearchHref,
} from '@/lib';
import {
  getMockCity,
  getPropertiesForCity,
  MOCK_CITIES,
  STAY_CATEGORIES,
} from '@/content';
import type { RouteParams } from '@/types';

type CityPageProps = {
  params: RouteParams<{
    city: string;
  }>;
};

export async function generateMetadata({ params }: CityPageProps) {
  const { city } = await Promise.resolve(params);
  const cityData = getMockCity(city);

  if (!cityData) {
    return buildPageMetadata({
      title: 'City Not Found',
      description: 'The requested city page is not available.',
      path: `/cities/${encodeURIComponent(city)}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${cityData.name} stays`,
    description: `Browse areas, categories, and STAYCT stay listings in ${cityData.name}.`,
    path: `/cities/${encodeURIComponent(city)}`,
  });
}

export function generateStaticParams() {
  return MOCK_CITIES.map((city) => ({ city: city.slug }));
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await Promise.resolve(params);
  const cityData = getMockCity(city);

  if (!cityData) {
    notFound();
  }

  const stays = getPropertiesForCity(cityData.slug);
  const categoriesInCity = STAY_CATEGORIES.filter((category) =>
    stays.some((stay) => stay.category === category.slug),
  );

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Cities', href: ROUTES.cities },
            { label: cityData.name },
          ]}
        />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City page</p>
              <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
                {cityData.headline}
              </h1>
              <p className="mt-4 text-[16px] leading-[1.75] text-stayct-green-medium">{cityData.summary}</p>
            </div>
            <div className="rounded-[20px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Inventory</div>
              <div className="mt-2 text-[28px] font-black text-stayct-green-dark">{stays.length}</div>
              <div className="text-[14px] text-stayct-green-medium">stay previews in {cityData.name}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={buildSearchHref({ city: cityData.slug })}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Search {cityData.name}
            </Link>
            <Link
              href={ROUTES.support}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
            >
              Get help choosing
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Quick filters</p>
              <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Switch category without leaving {cityData.name}.
              </h2>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {categoriesInCity.map((category) => (
              <Link
                key={category.slug}
                href={buildSearchHref({ city: cityData.slug, category: category.slug })}
                className="rounded-full border border-stayct-border px-4 py-2 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Featured listings</p>
              <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Listings appear before city explanation.
              </h2>
            </div>
            <Link href={buildSearchHref({ city: cityData.slug })} className="text-[14px] font-bold text-stayct-green-accent">
              View filtered search
            </Link>
          </div>

          <div className="mt-6 grid gap-5 xl:grid-cols-2">
            {stays.map((stay) => (
              <StayCard key={stay.slug} stay={stay} showCity={false} />
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Popular areas</p>
            <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em] text-stayct-green-dark">
              Use neighborhoods as search shortcuts.
            </h2>
            <div className="mt-5 grid gap-3">
              {cityData.popularAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={buildSearchHref({ city: cityData.slug, area: area.slug })}
                  className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light"
                >
                  <div className="text-[15px] font-bold text-stayct-green-dark">{area.name}</div>
                  <div className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{area.note}</div>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City information</p>
            <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em] text-stayct-green-dark">
              What this city page helps you decide.
            </h2>
            <div className="mt-5 space-y-3">
              {cityData.whatToExpect.map((item) => (
                <div key={item} className="rounded-[18px] border border-stayct-border bg-white px-5 py-4 text-[14px] leading-[1.7] text-stayct-green-medium">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Best for</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {cityData.bestFor.map((item) => (
                <span key={item} className="rounded-full bg-stayct-bg-light px-4 py-3 text-[13px] font-semibold text-stayct-green-dark">
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Related searches</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {cityData.relatedSearches.map((label) => (
                <Link
                  key={label}
                  href={buildSearchHref({ city: cityData.slug, q: label })}
                  className="rounded-full border border-stayct-border px-4 py-3 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
                >
                  {label}
                </Link>
              ))}
            </div>
          </article>
        </section>

        <div className="mt-8">
          <SupportContactCard description={`If ${cityData.name} still feels broad, contact STAYCT support and mention the area, budget, or stay type you want help narrowing.`} />
        </div>
      </div>
    </main>
  );
}
