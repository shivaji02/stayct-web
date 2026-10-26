import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { FeatureList } from '@/components/ui/feature-list';

export function ForSeekersSection() {
  const features = [
    {
      title: 'Verified listings only',
      description: 'Every property reviewed before it appears on STAYCT',
    },
    {
      title: 'All 8 accommodation categories',
      description: 'PGs, hostels, co-living, student housing, corporate housing, and more',
    },
    {
      title: 'Zero brokerage, always',
      description: 'Connect directly. No broker. No commission. No surprises.',
    },
    {
      title: 'Real information, not marketing',
      description: 'Accurate details, real photos, honest pricing',
    },
  ];

  return (
    <section className="bg-stayct-beige py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.13em] text-stayct-green-accent">
              For Accommodation Seekers
            </p>
            <h2 className="mb-5 text-[34px] font-black leading-[1.1] tracking-[-.02em] text-stayct-green-dark sm:text-[40px]">
              Browse stays you&apos;ll actually love.
            </h2>
            <p className="mb-8 text-[16px] leading-[1.75] text-stayct-green-medium">
              Stop searching through unverified listings and unreliable brokers. STAYCT gives you real accommodation, real
              details, and a direct line to the people who run them.
            </p>

            <div className="mb-10">
              <FeatureList items={features} />
            </div>

            <Link href={ROUTES.search} className="text-[15px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark">
              Browse Accommodation →
            </Link>
          </div>

          <div className="relative flex min-h-[280px] flex-col items-center justify-end overflow-hidden rounded-[20px] bg-gradient-to-br from-stayct-bg-light/40 to-stayct-bg-light pb-7 sm:min-h-[360px] lg:min-h-[420px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 560 420"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="560" height="420" fill="#e4f0e8" />
              <circle cx="280" cy="200" r="180" fill="#cce4d4" opacity="0.4" />
              <circle cx="100" cy="300" r="120" fill="#b8d8c4" opacity="0.25" />
              <circle cx="460" cy="100" r="100" fill="#c8ddd0" opacity="0.25" />
              <circle cx="280" cy="170" r="34" fill="none" stroke="#4a9068" strokeWidth="2" opacity="0.45" />
              <circle cx="280" cy="158" r="14" fill="#4a9068" opacity="0.18" />
              <path d="M248 204 Q280 218 312 204" fill="none" stroke="#4a9068" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
              <circle cx="170" cy="230" r="22" fill="none" stroke="#4a9068" strokeWidth="1.5" opacity="0.3" />
              <circle cx="170" cy="222" r="9" fill="#4a9068" opacity="0.15" />
              <circle cx="390" cy="230" r="22" fill="none" stroke="#4a9068" strokeWidth="1.5" opacity="0.3" />
              <circle cx="390" cy="222" r="9" fill="#4a9068" opacity="0.15" />
              <line x1="192" y1="248" x2="258" y2="248" stroke="#4a9068" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
              <line x1="302" y1="248" x2="368" y2="248" stroke="#4a9068" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
            </svg>
            <span className="relative z-10 text-[11px] font-semibold tracking-[.12em] uppercase text-center text-green-700">
              community living · warm, welcoming spaces
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
