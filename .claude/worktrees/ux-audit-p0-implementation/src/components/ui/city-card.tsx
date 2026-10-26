import Link from 'next/link';

import { routeBuilders } from '@/constants/routes';
import { buildSearchHref } from '@/lib/discovery';
import type { DiscoveryCity } from '@/content/mock-stays';

type CityCardProps = {
  city: DiscoveryCity;
  propertyCount: number;
};

export function CityCard({ city, propertyCount }: CityCardProps) {
  return (
    <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">{city.name}</h3>
          <p className="mt-2 text-[15px] leading-[1.7] text-stayct-green-medium">{city.headline}</p>
        </div>
        <span className="rounded-full bg-stayct-bg-light px-3 py-1 text-[12px] font-bold text-stayct-green-dark">
          {propertyCount} stays
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {city.popularAreas.slice(0, 3).map((area) => (
          <span key={area.slug} className="rounded-full border border-stayct-border px-3 py-2 text-[12px] font-medium text-stayct-green-medium">
            {area.name}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={routeBuilders.city(city.slug)}
          className="rounded-[12px] bg-stayct-green-dark px-4 py-3 text-[14px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
        >
          Browse city
        </Link>
        <Link
          href={buildSearchHref({ city: city.slug })}
          className="rounded-[12px] border border-stayct-green-dark px-4 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
        >
          Search stays
        </Link>
      </div>
    </article>
  );
}
