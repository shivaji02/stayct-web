import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { getMockCity, getPropertiesForCity } from '@/content';
import { buildPageMetadata } from '@/seo';
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
      description: 'The requested city sample is not available.',
      path: `/cities/${encodeURIComponent(city)}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: `${cityData.name} stays`,
    description: `Browse sample STAYCT stays in ${cityData.name} and move toward a property enquiry.`,
    path: `/cities/${encodeURIComponent(city)}`,
  });
}

export function generateStaticParams() {
  return ['hyderabad', 'bengaluru', 'pune'].map((city) => ({ city }));
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await Promise.resolve(params);
  const cityData = getMockCity(city);

  if (!cityData) {
    notFound();
  }

  const properties = getPropertiesForCity(cityData.slug);
  const primaryProperty = properties[0];

  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">{cityData.name}</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            {cityData.headline}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">{cityData.summary}</p>
          {primaryProperty ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`${ROUTES.property}/${primaryProperty.slug}`}
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                View {primaryProperty.name}
              </Link>
              <Link
                href={`${ROUTES.property}/${primaryProperty.slug}#enquiry`}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Enquire now
              </Link>
            </div>
          ) : null}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Who this city suits</h2>
            <div className="mt-5 space-y-3">
              {cityData.bestFor.map((item) => (
                <div key={item} className="rounded-[16px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.65] text-stayct-green-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Popular localities</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {cityData.localities.map((locality) => (
                <div
                  key={locality}
                  className="rounded-full border border-stayct-border bg-white px-4 py-2 text-[13px] font-semibold text-stayct-green-dark"
                >
                  {locality}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[13px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">
                What to expect
              </div>
              <div className="mt-3 space-y-3">
                {cityData.whatToExpect.map((item) => (
                  <p key={item} className="text-[14px] leading-[1.7] text-stayct-green-medium">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">Sample stays in {cityData.name}</h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-stayct-green-medium">
                These static examples show how a visitor can move from a city decision into a real property comparison.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {properties.map((property) => (
              <article key={property.slug} className="rounded-[18px] border border-stayct-border bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[20px] font-black text-stayct-green-dark">{property.name}</div>
                    <div className="mt-1 text-[14px] text-stayct-green-medium">
                      {property.locality} · {property.stayType}
                    </div>
                  </div>
                  <div className="text-[13px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">
                    {property.startingPrice}
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-[1.7] text-stayct-green-medium">{property.audience}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {property.highlights.map((highlight) => (
                    <div key={highlight} className="rounded-full bg-stayct-bg-light px-3 py-2 text-[12px] font-medium text-stayct-green-dark">
                      {highlight}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`${ROUTES.property}/${property.slug}`}
                    className="rounded-[10px] bg-stayct-green-dark px-4 py-2 text-[13px] font-bold text-white transition hover:opacity-90"
                  >
                    View stay
                  </Link>
                  <Link
                    href={`${ROUTES.property}/${property.slug}#enquiry`}
                    className="rounded-[10px] border border-stayct-green-dark px-4 py-2 text-[13px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
                  >
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SupportContactCard description={`If ${cityData.name} feels close but you are still unsure which stay to choose, contact STAYCT support and mention the city and stay type you want help with.`} />
      </div>
    </main>
  );
}
