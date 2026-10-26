import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs, StayCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { getStayCategory, SUPPORT_CONTACT } from '@/content';
import { buildSearchHref, buildSupportEnquiryMailto } from '@/lib/discovery';
import { buildPageMetadata } from '@/seo';
import { getPublicProperties, getPublicProperty, PublicApiNotFoundError } from '@/services/public-api';
import { toStayCardData } from '@/types/public-stay';
import type { RouteParams } from '@/types';

type StayPageProps = {
  params: RouteParams<{
    slug: string;
  }>;
};

const FLAT_TYPE_LABELS: Record<string, string> = {
  ROOM: 'Shared room',
  ONE_RK: '1 RK',
  ONE_BHK: '1 BHK',
  TWO_BHK: '2 BHK',
};

function formatStartingPrice(rent: number | null): string {
  if (rent === null) return 'Contact for pricing';
  return `From Rs. ${rent.toLocaleString('en-IN')} / month`;
}

export async function generateMetadata({ params }: StayPageProps) {
  const { slug } = await Promise.resolve(params);

  try {
    const property = await getPublicProperty(slug);

    return buildPageMetadata({
      title: property.name,
      description: `${property.name} in ${property.city ?? 'STAYCT'} with STAYCT stay details, photos, and contact actions.`,
      path: `/stays/${encodeURIComponent(slug)}`,
    });
  } catch {
    return buildPageMetadata({
      title: 'Stay Not Found',
      description: 'The requested stay page is not available.',
      path: `/stays/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }
}

export default async function StayPage({ params }: StayPageProps) {
  const { slug } = await Promise.resolve(params);

  let property;
  try {
    property = await getPublicProperty(slug);
  } catch (error) {
    if (error instanceof PublicApiNotFoundError) {
      notFound();
    }
    throw error;
  }

  const category = getStayCategory(property.category);
  const cityName = property.city ?? 'STAYCT city';
  const locality = property.locality ?? property.addressLine1;
  const enquiryMailto = buildSupportEnquiryMailto(
    `Enquiry for ${property.name}`,
    `Hi STAYCT,\n\nI want to know more about ${property.name} in ${cityName}. Please share the next steps.\n`,
  );

  const roomOptions = Array.from(
    new Set(
      property.floors
        .flatMap((floor) => floor.flats.map((flat) => flat.flatType))
        .filter((flatType): flatType is NonNullable<typeof flatType> => Boolean(flatType))
        .map((flatType) => FLAT_TYPE_LABELS[flatType] ?? flatType),
    ),
  );

  let related: ReturnType<typeof toStayCardData>[] = [];
  try {
    const relatedResponse = await getPublicProperties({
      category: property.category,
      city: property.city ?? undefined,
      limit: 4,
    });
    related = relatedResponse.items.filter((item) => item.identifier !== property.identifier).slice(0, 3).map(toStayCardData);
  } catch {
    related = [];
  }

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Search', href: ROUTES.search },
            { label: property.name },
          ]}
        />

        <div className="mb-6">
          <Link
            href={buildSearchHref({ city: property.city ?? undefined, category: property.category })}
            className="inline-flex rounded-full border border-stayct-border bg-white px-4 py-2 text-[13px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-stayct-bg-light"
          >
            Back to search
          </Link>
        </div>

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-stayct-bg-light px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                  {category?.name ?? 'Stay'}
                </span>
                <span className="rounded-full bg-stayct-green-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                  {property.availabilityLabel}
                </span>
              </div>
              <h1 className="mt-4 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
                {property.name}
              </h1>
              <p className="mt-3 text-[16px] font-semibold text-stayct-green-medium">
                {locality}, {cityName}
              </p>
              <p className="mt-4 text-[16px] leading-[1.75] text-stayct-green-medium">
                {property.name} is a {category?.name.toLowerCase() ?? 'stay'} in {locality}, {cityName}, managed by {property.organizationName}.
              </p>
            </div>

            <div className="rounded-[24px] bg-stayct-bg-light p-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Starting from</div>
              <div className="mt-2 text-[28px] font-black text-stayct-green-dark">{formatStartingPrice(property.startingFromRent)}</div>
              <div className="mt-5 space-y-3 text-[14px] text-stayct-green-medium">
                <p>{property.availableBeds} of {property.totalBeds} beds available</p>
                <p>Managed by {property.organizationName}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#contact"
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Contact this stay
            </Link>
            {property.city ? (
              <Link
                href={buildSearchHref({ city: property.city })}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                More stays in {cityName}
              </Link>
            ) : null}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {property.photos.length > 0 ? (
            property.photos.map((photoUrl) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photoUrl}
                src={photoUrl}
                alt={property.name}
                className="h-56 w-full rounded-[24px] border border-stayct-border object-cover shadow-sm"
              />
            ))
          ) : (
            <div className="min-h-56 rounded-[24px] border border-stayct-border bg-stayct-bg-light p-6 shadow-sm lg:col-span-3">
              <p className="text-[14px] text-stayct-green-medium">No photos uploaded yet for this stay.</p>
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Why shortlist this</p>
            <div className="mt-5 grid gap-3">
              {property.amenities.slice(0, 3).map((item) => (
                <div key={item} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.7] text-stayct-green-medium">
                  {item}
                </div>
              ))}
              {property.amenities.length === 0 && (
                <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.7] text-stayct-green-medium">
                  Contact the property for amenity details.
                </div>
              )}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Stay essentials</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Type</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{category?.name ?? 'Stay'}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Availability</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{property.availabilityLabel}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{cityName}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Area</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{locality}</div>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <h2 className="text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">Amenities</h2>
            <div className="mt-4 space-y-3">
              {property.amenities.length > 0 ? (
                property.amenities.map((item) => (
                  <div key={item} className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                    {item}
                  </div>
                ))
              ) : (
                <div className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                  Contact the property for amenity details.
                </div>
              )}
            </div>
          </article>
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <h2 className="text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">Room options</h2>
            <div className="mt-4 space-y-3">
              {roomOptions.length > 0 ? (
                roomOptions.map((item) => (
                  <div key={item} className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                    {item}
                  </div>
                ))
              ) : (
                <div className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                  Contact the property for room details.
                </div>
              )}
            </div>
          </article>
        </section>

        <section id="contact" className="mt-8 rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Contact CTA</p>
          <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
            Ready to ask about {property.name}?
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            The stay page should never feel isolated. Use the property-specific enquiry or go back to filtered search if you want to compare more options first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={enquiryMailto}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white"
            >
              Email enquiry
            </Link>
            <Link
              href={SUPPORT_CONTACT.phoneHref}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Call support
            </Link>
            <Link
              href={buildSearchHref({ city: property.city ?? undefined, category: property.category })}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Back to search
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Email</div>
              <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
            </div>
            <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Phone</div>
              <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Related properties</p>
                <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-stayct-green-dark">
                  Keep comparison paths open.
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-3">
              {related.map((stay) => (
                <StayCard key={stay.slug} stay={stay} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
