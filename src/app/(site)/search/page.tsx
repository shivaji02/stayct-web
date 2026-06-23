import Link from 'next/link';
import { SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const categoryChips = [
  { label: 'PG', query: 'pg' },
  { label: 'Hostel', query: 'hostel' },
  { label: 'Co-living', query: 'co-living' },
  { label: 'Shared Flat', query: 'shared-flat' },
];

const citySuggestions = ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Delhi NCR', 'Mumbai'];

const accommodationTypes = [
  {
    title: 'Student stays',
    description: 'Start with PGs, hostels, and student-friendly shared living options.',
    href: `${ROUTES.search}?type=student-housing`,
  },
  {
    title: 'Working professional stays',
    description: 'Browse co-living, shared flats, and workforce-ready accommodation.',
    href: `${ROUTES.search}?type=workforce-housing`,
  },
  {
    title: 'Team and corporate stays',
    description: 'Use this path when you are booking for staff, projects, or longer managed stays.',
    href: `${ROUTES.search}?type=corporate-housing`,
  },
];

export const metadata = buildPageMetadata(SITE_PAGES.search);

function pickFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await Promise.resolve(searchParams ?? {})) as Record<string, string | string[] | undefined>;
  const query = pickFirst(params.q) ?? '';
  const activeCategory = pickFirst(params.category);
  const activeCity = pickFirst(params.city);
  const activeType = pickFirst(params.type);

  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">
            Find a stay
          </p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            Start discovery with the city, stay type, or need you already know.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Use search to narrow the shortlist first, then move into the most relevant accommodation path instead of
            browsing everything at once.
          </p>

          <form action={ROUTES.search} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by city, area, property type, or need"
              className="w-full rounded-[14px] border border-stayct-border bg-stayct-bg-light px-5 py-4 text-[15px] text-stayct-green-dark outline-none transition placeholder:text-stayct-text-muted focus:border-stayct-green-accent"
            />
            <button
              type="submit"
              className="rounded-[14px] bg-stayct-green-dark px-6 py-4 text-[15px] font-bold text-white transition hover:opacity-90"
            >
              Search stays
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            {categoryChips.map((chip) => {
              const isActive = activeCategory === chip.query;

              return (
                <Link
                  key={chip.query}
                  href={`${ROUTES.search}?category=${chip.query}`}
                  className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition ${
                    isActive
                      ? 'border-stayct-green-dark bg-stayct-green-dark text-white'
                      : 'border-stayct-border bg-white text-stayct-green-dark hover:border-stayct-green-accent'
                  }`}
                >
                  {chip.label}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_.95fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">City suggestions</h2>
                <p className="mt-2 text-[15px] leading-[1.7] text-stayct-green-medium">
                  Begin with a city if location is your first decision.
                </p>
              </div>
              <Link
                href={ROUTES.cities}
                className="text-[14px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark"
              >
                Browse all cities
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {citySuggestions.map((city) => {
                const isActive = activeCity === city;

                return (
                  <Link
                    key={city}
                    href={`${ROUTES.search}?city=${encodeURIComponent(city)}`}
                    className={`rounded-[16px] border px-5 py-4 transition ${
                      isActive
                        ? 'border-stayct-green-dark bg-stayct-overlay-light'
                        : 'border-stayct-border bg-stayct-bg-light hover:border-stayct-green-accent'
                    }`}
                  >
                    <div className="text-[15px] font-bold text-stayct-green-dark">{city}</div>
                    <div className="mt-1 text-[13px] leading-[1.6] text-stayct-green-medium">
                      Open a city-led search path.
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">How discovery works</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-[1.7] text-stayct-green-medium">
              <p>1. Start with a query, category, or city.</p>
              <p>2. Use the accommodation path that matches your stage of search.</p>
              <p>3. Continue into city or property pages once you know what to compare next.</p>
            </div>

            <div className="mt-6 rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[13px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">
                Empty state
              </div>
              <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">
                {query || activeCategory || activeCity || activeType
                  ? `You are exploring ${query || activeCategory || activeCity || activeType}. Refine with another city or stay type if you need a narrower path.`
                  : 'No filters are applied yet. Choose a chip, pick a city, or search for the need you already have in mind.'}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">
                Popular accommodation paths
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-stayct-green-medium">
                Choose the path that matches the kind of stay you are evaluating.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {accommodationTypes.map((item) => {
              const isActive = activeType === item.href.split('=')[1];

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`rounded-[18px] border p-6 transition ${
                    isActive
                      ? 'border-stayct-green-dark bg-stayct-overlay-light'
                      : 'border-stayct-border bg-white hover:border-stayct-green-accent'
                  }`}
                >
                  <div className="text-[17px] font-black text-stayct-green-dark">{item.title}</div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{item.description}</p>
                  <div className="mt-5 text-[13px] font-bold text-stayct-green-accent">Use this path</div>
                </Link>
              );
            })}
          </div>
        </section>

        <SupportContactCard description="If you cannot narrow the right stay path yet, contact STAYCT support and describe the city, stay type, or problem you are trying to solve." />
      </div>
    </main>
  );
}
