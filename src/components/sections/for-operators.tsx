import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { FeatureList } from '@/components/ui/feature-list';

export function ForOperatorsSection() {
  const features = [
    {
      title: 'List in minutes',
      description: 'Add your property and start getting discovered immediately',
    },
    {
      title: 'Reach the right people',
      description: 'Seekers actively looking for accommodation in your area, your category',
    },
    {
      title: 'Operate from app.stayct.in',
      description: 'Once listed, manage day-to-day rental operations from the operator app',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex min-h-[280px] flex-col items-center justify-end overflow-hidden rounded-[20px] bg-gradient-to-br from-stayct-beige/30 to-stayct-beige/20 pb-7 sm:min-h-[360px] lg:min-h-[420px]">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 560 420"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="560" height="420" fill="#f5edd8" />
              <circle cx="80" cy="380" r="160" fill="#e8d8b0" opacity="0.25" />
              <circle cx="500" cy="100" r="120" fill="#e0cc98" opacity="0.2" />
              <rect x="160" y="200" width="240" height="180" rx="2" fill="#ecd8b0" opacity="0.6" />
              <rect x="160" y="200" width="240" height="180" rx="2" fill="none" stroke="#c8a050" strokeWidth="1.5" opacity="0.5" />
              <polygon points="140,200 280,120 420,200" fill="#e8d0a0" opacity="0.55" />
              <polygon points="140,200 280,120 420,200" fill="none" stroke="#c8a050" strokeWidth="1.5" opacity="0.45" />
              <rect x="245" y="300" width="70" height="80" rx="2" fill="none" stroke="#c8a050" strokeWidth="1.5" opacity="0.55" />
              <rect x="180" y="230" width="36" height="46" rx="1" fill="none" stroke="#c8a050" strokeWidth="1" opacity="0.4" />
              <rect x="344" y="230" width="36" height="46" rx="1" fill="none" stroke="#c8a050" strokeWidth="1" opacity="0.4" />
              <line x1="120" y1="380" x2="440" y2="380" stroke="#c8a050" strokeWidth="1" opacity="0.3" />
            </svg>
            <span className="relative z-10 text-[11px] font-semibold tracking-[.12em] uppercase text-center text-yellow-800">
              property exterior · welcoming entrance
            </span>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.13em] text-stayct-green-accent">
              For Property Operators
            </p>
            <h2 className="mb-5 text-[34px] font-black leading-[1.1] tracking-[-.02em] text-stayct-green-dark sm:text-[40px]">
              Get discovered.<br />
              Fill your rooms.
            </h2>
            <p className="mb-8 text-[16px] leading-[1.75] text-stayct-green-medium">
              STAYCT puts your property in front of people actively looking for accommodation. Direct connection with seekers
              — no brokers, no commission.
            </p>

            <div className="mb-10">
              <FeatureList items={features} />
            </div>

            <Link href={ROUTES.operators} className="text-[15px] font-bold text-stayct-green-accent transition hover:text-stayct-green-dark">
              List Your Property →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
