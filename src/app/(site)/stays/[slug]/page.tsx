import { cache } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumbs, PublicStayCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { getStayCategory } from '@/content';
import {
  availabilityStatusLabel,
  buildSearchHref,
  buildSupportEnquiryMailto,
  categoryApiToSlug,
  genderPreferenceLabel,
  getPhotoToneClasses,
  hasContactWhatsapp,
  listingAmenities,
  normalizeCitySlug,
  toDiscoveryListingsQuery,
} from '@/lib/discovery';
import { getDiscoveryListing, getDiscoveryListings, PublicApiError } from '@/services/public-api';
import { buildPageMetadata } from '@/seo';
import type { RouteParams } from '@/types';
import type { DiscoveryListingDetail, DiscoveryListingListItem } from '@/types/discovery';

import { ListingEnquiryForm } from './listing-enquiry-form';

export const dynamic = 'force-dynamic';

type StayPageProps = {
  params: RouteParams<{
    slug: string;
  }>;
};

const loadDiscoveryListing = cache(async (slug: string): Promise<DiscoveryListingDetail | null> => {
  try {
    return await getDiscoveryListing(slug);
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
});

export async function generateMetadata({ params }: StayPageProps) {
  const { slug } = await Promise.resolve(params);
  const listing = await loadDiscoveryListing(slug);

  if (!listing) {
    return buildPageMetadata({
      title: 'Stay Not Found',
      description: 'The requested stay page is not available.',
      path: `/stays/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }

  const location = [listing.locality, listing.city].filter(Boolean).join(', ');

  return buildPageMetadata({
    title: listing.title,
    description: `${listing.title}${location ? ` in ${location}` : ''} with live listing details and enquiry actions.`,
    path: `/stays/${encodeURIComponent(slug)}`,
  });
}

export default async function StayPage({ params }: StayPageProps) {
  const { slug } = await Promise.resolve(params);
  const listing = await loadDiscoveryListing(slug);

  if (!listing) {
    notFound();
  }

  const citySlug = normalizeCitySlug(listing.city);
  const categorySlug = categoryApiToSlug(listing.category);
  const category = getStayCategory(categorySlug);
  let related: DiscoveryListingListItem[] = [];
  try {
    const result = await getDiscoveryListings(
      toDiscoveryListingsQuery({
        city: citySlug,
        category: categorySlug,
        limit: 4,
      }),
    );
    related = result.items.filter((item) => item.slug !== listing.slug).slice(0, 3);
  } catch {
    related = [];
  }

  const enquiryMailto = buildSupportEnquiryMailto(
    `Enquiry for ${listing.title}`,
    `Hi STAYCT,\n\nI want to know more about ${listing.title} in ${listing.city}. Please share the next steps.\n`,
  );
  const photoCards = listing.photos.length > 0 ? listing.photos : [null, null, null];
  const addressLabel = [listing.locality, listing.city].filter(Boolean).join(', ') || listing.addressLine1;
  const genderLabel = genderPreferenceLabel(listing.genderPreference);
  const amenities = listingAmenities(listing.amenities);
  const phoneHref = listing.contactPhone ? `tel:${listing.contactPhone}` : null;
  const whatsappNumber = hasContactWhatsapp(listing.contactWhatsapp) ? listing.contactWhatsapp.trim() : null;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : null;

  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: ROUTES.home },
            { label: 'Cities', href: ROUTES.cities },
            { label: listing.city, href: buildSearchHref({ city: citySlug }) },
            { label: listing.title },
          ]}
        />

        <div className="mb-6">
          <Link
            href={buildSearchHref({ city: citySlug, category: categorySlug })}
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
                  {category?.name ?? listing.category}
                </span>
                <span className="rounded-full bg-stayct-green-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                  {availabilityStatusLabel(listing.availabilityStatus)}
                </span>
                {listing.verificationStatus === 'VERIFIED' ? (
                  <span className="rounded-full bg-stayct-bg-light px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                    Verified
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
                {listing.title}
              </h1>
              <p className="mt-3 text-[16px] font-semibold text-stayct-green-medium">{addressLabel}</p>
              {listing.description ? (
                <p className="mt-4 text-[16px] leading-[1.75] text-stayct-green-medium">{listing.description}</p>
              ) : null}
            </div>

            <div className="rounded-[24px] bg-stayct-bg-light p-5">
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Starting from</div>
              <div className="mt-2 text-[28px] font-black text-stayct-green-dark">
                {listing.startingPrice === null ? 'Contact for rent' : `₹${listing.startingPrice.toLocaleString('en-IN')} / month`}
              </div>
              <div className="mt-5 space-y-3 text-[14px] text-stayct-green-medium">
                <p>City: {listing.city}</p>
                {listing.locality ? <p>Area: {listing.locality}</p> : null}
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
            <Link
              href={buildSearchHref({ city: citySlug })}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
            >
              Back to {listing.city}
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {photoCards.map((photo, index) => (
            <article
              key={photo ?? index}
              className={`min-h-56 rounded-[24px] border border-stayct-border bg-gradient-to-br p-6 shadow-sm ${
                photo
                  ? 'bg-cover bg-center text-white'
                  : getPhotoToneClasses(['sage', 'sand', 'mist', 'clay'][index % 4] as 'sage' | 'sand' | 'mist' | 'clay')
              }`}
              style={photo ? { backgroundImage: `linear-gradient(180deg, rgba(10, 14, 18, 0.18), rgba(10, 14, 18, 0.35)), url(${photo})` } : undefined}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.12em]">Photo</p>
              <h2 className="mt-3 text-[24px] font-black tracking-[-0.03em]">
                {photo ? `Image ${index + 1}` : 'No photo uploaded'}
              </h2>
              <p className="mt-3 max-w-xs text-[15px] leading-[1.7]">
                {photo ? 'Public listing photo from the listing record.' : 'No public photo is available for this listing yet.'}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Stay essentials</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Type</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{category?.name ?? listing.category}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Availability</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{availabilityStatusLabel(listing.availabilityStatus)}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{listing.city}</div>
              </div>
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Area</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{listing.locality ?? '—'}</div>
              </div>
              {genderLabel ? (
                <div className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                  <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">For</div>
                  <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{genderLabel}</div>
                </div>
              ) : null}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Address</p>
            <div className="mt-5 space-y-3">
              {[listing.addressLine1, listing.locality, listing.city, listing.state].filter(Boolean).map((item) => (
                <div key={item} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.7] text-stayct-green-medium">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        {amenities.length > 0 ? (
          <section className="mt-8 rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Amenities</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {amenities.map((amenity) => (
                <span
                  key={amenity.id || amenity.name}
                  className="rounded-full bg-stayct-bg-light px-4 py-3 text-[13px] font-semibold text-stayct-green-dark"
                >
                  {amenity.name}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section id="contact" className="mt-8 rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Contact CTA</p>
          <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
            Ready to ask about {listing.title}?
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Use the listing contact details or go back to filtered search if you want to compare more options first.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {phoneHref ? (
              <Link href={phoneHref} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
                Call listing
              </Link>
            ) : null}
            {whatsappHref ? (
              <Link href={whatsappHref} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
                WhatsApp
              </Link>
            ) : null}
            <Link href={enquiryMailto} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
              Email enquiry
            </Link>
            <Link
              href={buildSearchHref({ city: citySlug, category: categorySlug })}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Back to search
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {listing.contactPhone ? (
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Phone</div>
                <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{listing.contactPhone}</div>
              </div>
            ) : null}
            {whatsappNumber ? (
              <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">WhatsApp</div>
                <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{whatsappNumber}</div>
              </div>
            ) : null}
          </div>
          <ListingEnquiryForm slug={listing.slug} listingTitle={listing.title} />
        </section>

        {related.length > 0 ? (
          <section className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Related listings</p>
                <h2 className="mt-2 text-[32px] font-black tracking-[-0.04em] text-stayct-green-dark">
                  Keep comparison paths open.
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-5 xl:grid-cols-3">
              {related.map((stay) => (
                <PublicStayCard key={stay.slug} stay={stay} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
