import Link from 'next/link';

import { Breadcrumbs, CityCard, SupportContactCard } from '@/components';
import { ROUTES, routeBuilders } from '@/constants/routes';
import { buildSearchHref } from '@/lib';
import { buildPageMetadata } from '@/seo';
import { MOCK_CITIES, getPropertiesForCity, SITE_PAGES, STAY_CATEGORIES } from '@/content';

export const metadata = buildPageMetadata(SITE_PAGES.cities);

export default function CitiesPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Cities' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Cities</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Choose the city first, then compare stays inside it.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Every city page now carries listings, area shortcuts, categories, and recovery paths so it never behaves like a dead-end explainer.
          </p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {MOCK_CITIES.map((city) => (
            <CityCard key={city.slug} city={city} propertyCount={getPropertiesForCity(city.slug).length} />
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Discovery shortcuts</p>
            <h2 className="mt-3 text-[28px] font-black tracking-[-0.04em] text-stayct-green-dark">
              Move into search without losing your location context.
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {MOCK_CITIES.slice(0, 6).map((city) => (
                <Link
                  key={city.slug}
                  href={buildSearchHref({ city: city.slug })}
                  className="rounded-full border border-stayct-border px-4 py-2 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
                >
                  Search {city.name}
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Categories</p>
            <h2 className="mt-3 text-[28px] font-black tracking-[-0.04em] text-stayct-green-dark">
              Switch between stay types without leaving discovery.
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {STAY_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={routeBuilders.category(category.slug)}
                  className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light"
                >
                  <div className="text-[15px] font-bold text-stayct-green-dark">{category.name}</div>
                  <div className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{category.shortDescription}</div>
                </Link>
              ))}
            </div>
          </article>
        </section>

        <div className="mt-8">
          <SupportContactCard description="If you know the city but still do not know the right area or stay type, contact STAYCT support and explain the move-in problem you are solving." />
        </div>
      </div>
    </main>
  );
}
