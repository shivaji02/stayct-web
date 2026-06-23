import Link from 'next/link';
import { SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

const cityGroups = [
  {
    name: 'Bengaluru',
    note: 'For students, new hires, and professionals comparing neighborhood-led stays.',
  },
  {
    name: 'Hyderabad',
    note: 'Useful when you need operator-managed inventory in fast-growing work hubs.',
  },
  {
    name: 'Pune',
    note: 'A practical starting point for campus, workforce, and shared living searches.',
  },
  {
    name: 'Chennai',
    note: 'Browse city-led discovery when location stability matters more than category first.',
  },
  {
    name: 'Delhi NCR',
    note: 'Use this path to explore a larger multi-area market before narrowing further.',
  },
  {
    name: 'Mumbai',
    note: 'Start here when commute, budget, and room format need to be balanced together.',
  },
];

const destinationThemes = [
  'Student-friendly cities',
  'Working professional hubs',
  'Managed housing markets',
];

export const metadata = buildPageMetadata(SITE_PAGES.cities);

function toCitySlug(city: string) {
  return city.toLowerCase().replace(/\s+/g, '-');
}

export default function CitiesPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Browse by city</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            Pick the city first when location is the main decision.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            This page gives you city-led entry points so you can move into discovery with a clear market, not a blank
            search.
          </p>
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">Sample city grid</h2>
              <p className="mt-2 text-[15px] leading-[1.7] text-stayct-green-medium">
                Use a city card to open a city page or continue straight into search with that city applied.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cityGroups.map((city) => (
              <div key={city.name} className="rounded-[18px] border border-stayct-border bg-white p-6">
                <div className="text-[18px] font-black text-stayct-green-dark">{city.name}</div>
                <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">{city.note}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`${ROUTES.cities}/${toCitySlug(city.name)}`}
                    className="rounded-[10px] bg-stayct-green-dark px-4 py-2 text-[13px] font-bold text-white transition hover:opacity-90"
                  >
                    Browse city
                  </Link>
                  <Link
                    href={`${ROUTES.search}?city=${encodeURIComponent(city.name)}`}
                    className="rounded-[10px] border border-stayct-green-dark px-4 py-2 text-[13px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
                  >
                    Search stays
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Popular destinations</h2>
            <div className="mt-5 space-y-3">
              {destinationThemes.map((theme) => (
                <div key={theme} className="rounded-[16px] bg-stayct-bg-light px-5 py-4">
                  <div className="text-[15px] font-bold text-stayct-green-dark">{theme}</div>
                  <div className="mt-1 text-[14px] leading-[1.65] text-stayct-green-medium">
                    Start with a city above, then compare stay types inside that market.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">
              Browse by city experience
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
              City browsing is useful when you want to understand where to search next, what kind of stay makes sense
              in that market, and which route should be narrowed first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={ROUTES.search}
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Open search
              </Link>
              <Link
                href={ROUTES.contact}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Ask for help
              </Link>
            </div>
          </div>
        </section>

        <SupportContactCard description="If you are unsure which city path to choose, contact STAYCT support and share the location, budget, or accommodation format you are looking for." />
      </div>
    </main>
  );
}
