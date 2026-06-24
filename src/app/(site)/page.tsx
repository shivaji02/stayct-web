import Link from 'next/link';

import { CityCard, StayCard } from '@/components';
import { ROUTES, routeBuilders } from '@/constants/routes';
import {
  getFeaturedProperties,
  getPopularAreas,
  getPropertiesForCity,
  MOCK_CITIES,
  SITE_PAGES,
  STAY_CATEGORIES,
} from '@/content';
import { buildSearchHref } from '@/lib';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.home);

const processSteps = [
  {
    title: 'Search by city or stay type',
    description: 'Start with the city, category, or area you already know instead of reading a long company pitch first.',
  },
  {
    title: 'Compare real stay cards',
    description: 'See pricing, availability, and highlights before you commit to a listing page.',
  },
  {
    title: 'Contact the right property faster',
    description: 'Move from shortlist to property enquiry with clearer recovery paths and support close by.',
  },
] as const;

export default function HomePage() {
  const featuredStays = getFeaturedProperties(6);
  const popularAreas = getPopularAreas().slice(0, 8);

  return (
    <main id="main-content">
      <section className="bg-stayct-beige pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stayct-green-accent">
              Find stays first
            </p>
            <h1 className="mt-4 max-w-4xl text-[44px] font-black leading-[1.02] tracking-[-0.05em] text-stayct-green-dark sm:text-[60px] lg:text-[76px]">
              Search accommodation by city, area, and stay type.
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-[1.8] text-stayct-green-medium">
              STAYCT helps students, professionals, interns, and relocating teams shortlist PGs, hostels, co-living,
              shared flats, and rental rooms without losing orientation.
            </p>
          </div>

          <div className="mt-8 rounded-[28px] border border-stayct-border bg-white p-5 shadow-sm sm:p-7">
            <form action={ROUTES.search} className="grid gap-4 lg:grid-cols-[2.2fr_1fr_1fr_auto]">
              <label className="flex flex-col gap-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                  What are you looking for?
                </span>
                <input
                  type="search"
                  name="q"
                  placeholder="Search by property, area, commute, or need"
                  className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</span>
                <select
                  name="city"
                  className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
                  defaultValue=""
                >
                  <option value="">All cities</option>
                  {MOCK_CITIES.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                  Category
                </span>
                <select
                  name="category"
                  className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
                  defaultValue=""
                >
                  <option value="">All stays</option>
                  {STAY_CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="rounded-[16px] bg-stayct-green-dark px-6 py-4 text-[15px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
              >
                Find a stay
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-3">
              {STAY_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={buildSearchHref({ category: category.slug })}
                  className="rounded-full border border-stayct-border px-4 py-2 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Top cities</p>
              <h2 className="mt-2 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Start with the city if location decides the shortlist.
              </h2>
            </div>
            <Link href={ROUTES.cities} className="text-[14px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark">
              View all city pages
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {MOCK_CITIES.map((city) => (
              <CityCard key={city.slug} city={city} propertyCount={getPropertiesForCity(city.slug).length} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stayct-beige py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Categories</p>
              <h2 className="mt-2 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Browse by the stay type you already trust.
              </h2>
            </div>
            <Link
              href={ROUTES.categories}
              className="text-[14px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark"
            >
              Open categories
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {STAY_CATEGORIES.map((category) => (
              <article key={category.slug} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Stay type</p>
                <h3 className="mt-3 text-[21px] font-black tracking-[-0.03em] text-stayct-green-dark">{category.name}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-stayct-green-medium">{category.shortDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.bestFor.slice(0, 2).map((item) => (
                    <span key={item} className="rounded-full bg-stayct-bg-light px-3 py-2 text-[12px] font-medium text-stayct-green-dark">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={routeBuilders.category(category.slug)}
                    className="rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[13px] font-bold text-white transition hover:opacity-90"
                  >
                    Browse {category.name}
                  </Link>
                  <Link
                    href={buildSearchHref({ category: category.slug })}
                    className="rounded-[12px] border border-stayct-green-dark px-4 py-3 text-[13px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
                  >
                    Search
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Featured stays</p>
              <h2 className="mt-2 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Compare real listing previews before you read more company copy.
              </h2>
            </div>
            <Link href={ROUTES.search} className="text-[14px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark">
              See full search
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {featuredStays.map((stay) => (
              <StayCard key={stay.slug} stay={stay} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stayct-green-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Popular areas</p>
              <h2 className="mt-2 text-[34px] font-black tracking-[-0.04em] text-white">
                Jump straight to areas people actually search.
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-[1.75] text-stayct-text-light">
                Area shortcuts keep the discovery journey moving when the user already knows the neighborhood but not the exact property.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {popularAreas.map((area) => (
                <Link
                  key={`${area.citySlug ?? 'all'}-${area.slug}`}
                  href={buildSearchHref({ city: area.citySlug, area: area.slug })}
                  className="rounded-[20px] border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <div className="text-[16px] font-black text-white">{area.name}</div>
                  <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-stayct-green-light">
                    {area.cityName}
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.7] text-stayct-text-light">{area.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stayct-beige py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">How it works</p>
              <h2 className="mt-2 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
                Keep the journey simple from first click to property enquiry.
              </h2>
            </div>
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <article key={step.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-3 text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
          <div className="rounded-[28px] border border-stayct-border bg-stayct-green-dark p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">For operators</p>
                <h2 className="mt-2 text-[36px] font-black tracking-[-0.04em] text-white">
                  List property if you are new. Manage property if you already use STAYCT.
                </h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-stayct-text-light">
                  The public site should not force owners into multiple branches. One path brings new operators in. The other gets existing teams back to work.
                </p>
              </div>
              <div className="grid gap-4">
                <Link
                  href={ROUTES.listProperty}
                  className="rounded-[20px] bg-white p-6 transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">New operator</div>
                  <div className="mt-3 text-[24px] font-black tracking-[-0.03em] text-stayct-green-dark">List Your Property</div>
                  <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
                    Use this path if you want to list inventory, fill vacancies, and talk to STAYCT about onboarding.
                  </p>
                </Link>
                <Link
                  href={ROUTES.manageProperty}
                  className="rounded-[20px] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Existing user</div>
                  <div className="mt-3 text-[24px] font-black tracking-[-0.03em] text-white">Manage Property</div>
                  <p className="mt-3 text-[15px] leading-[1.75] text-stayct-text-light">
                    Open the STAYCT management platform, recover support contacts, and return to day-to-day operations quickly.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
