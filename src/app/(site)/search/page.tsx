import Link from 'next/link';

import { Breadcrumbs, StayCard, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import {
  getPopularAreas,
  MOCK_CITIES,
  searchProperties,
  SITE_PAGES,
  STAY_CATEGORIES,
} from '@/content';
import type { StayCategorySlug, StaySort } from '@/content/mock-stays';
import { buildSearchHref, normalizePositiveInt, pickFirst } from '@/lib/discovery';
import { buildPageMetadata } from '@/seo';

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = buildPageMetadata(SITE_PAGES.search);

const sortOptions: ReadonlyArray<{
  label: string;
  value: StaySort;
}> = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'City', value: 'city' },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await Promise.resolve(searchParams ?? {})) as Record<string, string | string[] | undefined>;
  const q = pickFirst(params.q)?.trim() ?? '';
  const city = pickFirst(params.city);
  const category = pickFirst(params.category);
  const area = pickFirst(params.area);
  const sort = (pickFirst(params.sort) as StaySort | undefined) ?? 'recommended';
  const page = normalizePositiveInt(pickFirst(params.page), 1);

  const results = searchProperties(
    {
      q,
      city,
      category: category as StayCategorySlug | undefined,
      area,
      sort,
    },
    page,
  );
  const activeCity = city ? MOCK_CITIES.find((item) => item.slug === city) : undefined;
  const areaOptions = (city ? getPopularAreas(city) : getPopularAreas()).slice(0, 8);
  const activeCategory = category ? STAY_CATEGORIES.find((item) => item.slug === category) : undefined;
  const summaryLabel = [
    activeCity?.name,
    activeCategory?.name,
    areaOptions.find((item) => item.slug === area)?.name,
    q ? `“${q}”` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Search Stays' },
          ]}
        />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Search stays</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            See listings first, then refine.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Use filters that survive refresh and browser back so the shortlist never collapses into a dead end.
          </p>

          <form action={ROUTES.search} className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]">
            <input type="hidden" name="sort" value={sort} />
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Query</span>
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Property, area, commute, or need"
                className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</span>
              <select
                name="city"
                defaultValue={city ?? ''}
                className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
              >
                <option value="">All cities</option>
                {MOCK_CITIES.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Category</span>
              <select
                name="category"
                defaultValue={category ?? ''}
                className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
              >
                <option value="">All categories</option>
                {STAY_CATEGORIES.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="rounded-[16px] bg-stayct-green-dark px-6 py-4 text-[15px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
            >
              Update search
            </button>
          </form>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
          <aside className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[18px] font-black tracking-[-0.03em] text-stayct-green-dark">Filters</h2>
              <Link href={ROUTES.search} className="text-[13px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark">
                Clear all
              </Link>
            </div>

            <div className="mt-6">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Stay type</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {STAY_CATEGORIES.map((item) => {
                  const active = category === item.slug;

                  return (
                    <Link
                      key={item.slug}
                      href={buildSearchHref({ q, city, category: active ? undefined : item.slug, area, sort })}
                      className={`rounded-full px-3 py-2 text-[12px] font-semibold transition ${
                        active
                          ? 'bg-stayct-green-dark text-white'
                          : 'border border-stayct-border text-stayct-green-dark hover:border-stayct-green-accent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</h3>
              <div className="mt-3 flex flex-col gap-2">
                {MOCK_CITIES.map((item) => {
                  const active = city === item.slug;

                  return (
                    <Link
                      key={item.slug}
                      href={buildSearchHref({ q, city: active ? undefined : item.slug, category, area: undefined, sort })}
                      className={`rounded-[14px] px-3 py-3 text-[14px] font-semibold transition ${
                        active
                          ? 'bg-stayct-green-dark text-white'
                          : 'bg-stayct-bg-light text-stayct-green-dark hover:bg-stayct-overlay-light'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Popular areas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {areaOptions.map((item) => {
                  const active = area === item.slug;
                  const citySlug = 'citySlug' in item ? item.citySlug : city;

                  return (
                    <Link
                      key={`${citySlug}-${item.slug}`}
                      href={buildSearchHref({ q, city: citySlug ?? city, category, area: active ? undefined : item.slug, sort })}
                      className={`rounded-full px-3 py-2 text-[12px] font-semibold transition ${
                        active
                          ? 'bg-stayct-green-dark text-white'
                          : 'border border-stayct-border text-stayct-green-dark hover:border-stayct-green-accent'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[18px] bg-stayct-bg-light p-4">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Recovery</h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-stayct-green-medium">
                If the shortlist is still unclear, use a city page or open Support instead of abandoning the search.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={ROUTES.cities} className="text-[13px] font-bold text-stayct-green-accent">
                  Browse cities
                </Link>
                <Link href={ROUTES.support} className="text-[13px] font-bold text-stayct-green-accent">
                  Open support
                </Link>
              </div>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Results</p>
                  <h2 className="mt-2 text-[30px] font-black tracking-[-0.04em] text-stayct-green-dark">
                    {results.total} stay{results.total === 1 ? '' : 's'} found
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
                    {summaryLabel || 'Showing all available discovery listings.'}
                  </p>
                </div>
                <div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Sort</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sortOptions.map((option) => {
                      const active = sort === option.value;

                      return (
                        <Link
                          key={option.value}
                          href={buildSearchHref({ q, city, category, area, sort: option.value })}
                          className={`rounded-full px-3 py-2 text-[12px] font-semibold transition ${
                            active
                              ? 'bg-stayct-green-dark text-white'
                              : 'border border-stayct-border text-stayct-green-dark hover:border-stayct-green-accent'
                          }`}
                        >
                          {option.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {results.total > 0 ? (
              <>
                <div className="grid gap-5 xl:grid-cols-2">
                  {results.items.map((stay) => (
                    <StayCard key={stay.slug} stay={stay} />
                  ))}
                </div>

                <div className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[14px] text-stayct-green-medium">
                      Page {results.page} of {results.totalPages}. Browser back and refresh keep these filters because the state lives in the URL.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {results.page > 1 ? (
                        <Link
                          href={buildSearchHref({ q, city, category, area, sort, page: results.page - 1 })}
                          className="rounded-[12px] border border-stayct-green-dark px-4 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
                        >
                          Previous
                        </Link>
                      ) : null}
                      {results.page < results.totalPages ? (
                        <Link
                          href={buildSearchHref({ q, city, category, area, sort, page: results.page + 1 })}
                          className="rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
                        >
                          Load more stays
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-[24px] border border-stayct-border bg-white p-8 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Empty state</p>
                <h2 className="mt-3 text-[30px] font-black tracking-[-0.04em] text-stayct-green-dark">No stay matches these filters yet.</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-stayct-green-medium">
                  Widen the city, remove the area, or switch stay type. If you still need help, use Support so the journey does not end here.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={ROUTES.search} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
                    Reset search
                  </Link>
                  <Link
                    href={ROUTES.support}
                    className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
                  >
                    Get support
                  </Link>
                </div>
              </div>
            )}

            <SupportContactCard description="If filters still are not enough, contact STAYCT support with the city, area, and stay type you need." />
          </section>
        </div>
      </div>
    </main>
  );
}
