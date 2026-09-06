import Link from 'next/link';

import { routeBuilders } from '@/constants/routes';
import { getStayCategory } from '@/content';
import { availabilityStatusLabel, categoryApiToSlug } from '@/lib/discovery';
import type { DiscoveryListingListItem } from '@/types/discovery';

type PublicStayCardProps = {
  stay: DiscoveryListingListItem;
  showCity?: boolean;
};

export function PublicStayCard({ stay, showCity = true }: PublicStayCardProps) {
  const category = getStayCategory(categoryApiToSlug(stay.category));
  const priceLabel = stay.startingPrice === null ? 'Contact for rent' : `From ₹${stay.startingPrice.toLocaleString('en-IN')} / month`;
  const locationLabel = [stay.locality, showCity ? stay.city : null].filter(Boolean).join(', ');

  return (
    <article className="overflow-hidden rounded-[24px] border border-stayct-border bg-white shadow-sm">
      <div className="min-h-[180px] bg-gradient-to-br from-stayct-bg-light to-stayct-beige" />
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-stayct-bg-light px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
                {category?.name ?? stay.category}
              </span>
              <span className="rounded-full bg-stayct-green-dark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                {availabilityStatusLabel(stay.availabilityStatus)}
              </span>
            </div>
            <h3 className="mt-3 text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">{stay.title}</h3>
            {locationLabel ? <p className="mt-2 text-[14px] text-stayct-green-medium">{locationLabel}</p> : null}
          </div>
          <div className="text-right">
            <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Starting from</div>
            <div className="mt-1 text-[16px] font-black text-stayct-green-dark">{priceLabel}</div>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">
          {stay.addressLine1}
          {stay.state ? `, ${stay.state}` : ''}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={routeBuilders.stay(stay.slug)}
            className="rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[14px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
          >
            View stay
          </Link>
          <Link
            href={`${routeBuilders.stay(stay.slug)}#contact`}
            className="rounded-[12px] border border-stayct-green-dark px-4 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
          >
            Contact for this stay
          </Link>
        </div>
      </div>
    </article>
  );
}
