import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

export function FindFillManageSection() {
  const items = [
    {
      label: 'FIND',
      title: 'Browse stays you\'ll love.',
      description:
        'Verified accommodation across every category — PGs to rental communities. All in one place, all in India.',
      href: ROUTES.search,
      cta: 'Browse Stays →',
    },
    {
      label: 'FILL',
      title: 'List it. Get discovered.',
      description:
        'Own or manage accommodation? Reach people actively looking. Fill vacancies without brokers in the middle.',
      href: ROUTES.operators,
      cta: 'List Your Property →',
    },
    {
      label: 'MANAGE',
      title: 'Run your rental, simply.',
      description:
        'Daily operations, payments, and tenant communication — all inside app.stayct.in.',
      href: ROUTES.appLogin,
      cta: 'Go to App →',
    },
  ];

  return (
    <section className="bg-stayct-green-dark py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`${idx < 2 ? 'md:border-r md:border-white/10' : ''} ${idx === 0 ? 'md:pr-14' : idx === 1 ? 'md:px-14' : 'md:pl-14'}`}
            >
              <div className="mb-[18px] text-[10px] font-bold uppercase tracking-[.18em] text-stayct-green-light">
                {item.label}
              </div>
              <h3 className="mb-[14px] text-[26px] font-black leading-[1.2] tracking-[-.02em] text-white">
                {item.title}
              </h3>
              <p className="mb-[22px] text-[15px] leading-[1.75] text-stayct-green-lighter">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="text-[14px] font-bold text-stayct-green-light transition hover:text-stayct-overlay-light"
              >
                {item.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
