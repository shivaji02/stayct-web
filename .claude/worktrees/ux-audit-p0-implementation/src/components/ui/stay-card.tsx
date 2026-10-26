import Link from 'next/link';

import { routeBuilders } from '@/constants/routes';
import { getStayCategory } from '@/content';
import type { MockProperty } from '@/content/mock-stays';

type StayCardProps = {
  stay: MockProperty;
  showCity?: boolean;
};

const availabilityStyles = {
  available: 'bg-emerald-100 text-emerald-900',
  limited: 'bg-amber-100 text-amber-900',
  waitlist: 'bg-slate-200 text-slate-900',
} as const;

export function StayCard({ stay, showCity = true }: StayCardProps) {
  const category = getStayCategory(stay.category);

  return (
    <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stayct-bg-light px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
              {category?.name ?? stay.stayType}
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${availabilityStyles[stay.availability]}`}>
              {stay.availabilityLabel}
            </span>
          </div>
          <h3 className="mt-3 text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">{stay.name}</h3>
          <p className="mt-2 text-[14px] text-stayct-green-medium">
            {stay.locality}
            {showCity ? `, ${stay.cityName}` : ''}
          </p>
        </div>
        <div className="text-right">
          <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Starting from</div>
          <div className="mt-1 text-[16px] font-black text-stayct-green-dark">{stay.startingPrice}</div>
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{stay.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {stay.highlights.slice(0, 3).map((highlight) => (
          <span key={highlight} className="rounded-full bg-stayct-bg-light px-3 py-2 text-[12px] font-medium text-stayct-green-dark">
            {highlight}
          </span>
        ))}
      </div>

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
    </article>
  );
}
