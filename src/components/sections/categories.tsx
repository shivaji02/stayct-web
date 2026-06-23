import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { CategoryCard } from '@/components/ui/category-card';

export function CategoriesSection() {
  const categories = [
    {
      slug: 'pg',
      title: 'PG',
      description: 'Paying Guest · Furnished rooms with meals',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="17" rx="1.5" stroke="#2d6a4f" strokeWidth="1.5" />
          <rect x="6" y="5" width="8" height="9" fill="#c0ddd0" />
          <circle cx="12.5" cy="10" r="1" fill="#2d6a4f" />
        </svg>
      ),
    },
    {
      slug: 'hostel',
      title: 'Hostel',
      description: 'Social living · Shared spaces',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="6" width="16" height="4" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" />
          <rect x="2" y="12" width="16" height="4" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" />
          <rect x="2" y="10" width="1.5" height="2" fill="#2d6a4f" />
          <rect x="16.5" y="10" width="1.5" height="2" fill="#2d6a4f" />
        </svg>
      ),
    },
    {
      slug: 'co-living',
      title: 'Co-living',
      description: 'Community-driven spaces',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="7.5" cy="10" r="5" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" opacity="0.9" />
          <circle cx="13" cy="10" r="5" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" opacity="0.9" />
        </svg>
      ),
    },
    {
      slug: 'shared-flat',
      title: 'Shared Flat',
      description: 'Private rooms · Shared apartment',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="2" width="16" height="16" rx="1.5" stroke="#2d6a4f" strokeWidth="1.5" />
          <line x1="10" y1="2" x2="10" y2="18" stroke="#2d6a4f" strokeWidth="1.5" />
          <line x1="2" y1="10" x2="10" y2="10" stroke="#2d6a4f" strokeWidth="1" />
        </svg>
      ),
    },
    {
      slug: 'student-housing',
      title: 'Student Housing',
      description: 'Near colleges and universities',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="4" y="8" width="12" height="10" rx="1" stroke="#2d6a4f" strokeWidth="1.5" />
          <polygon points="2,8 10,3 18,8" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" />
          <rect x="8" y="13" width="4" height="5" fill="#2d6a4f" opacity="0.35" />
        </svg>
      ),
    },
    {
      slug: 'workforce-housing',
      title: 'Workforce Housing',
      description: 'For working professionals',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="9" width="16" height="9" rx="1" stroke="#2d6a4f" strokeWidth="1.5" />
          <rect x="6" y="5" width="8" height="6" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" />
          <line x1="2" y1="13" x2="18" y2="13" stroke="#2d6a4f" strokeWidth="1" />
        </svg>
      ),
    },
    {
      slug: 'corporate-housing',
      title: 'Corporate Housing',
      description: 'Business travel and relocations',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="1" stroke="#2d6a4f" strokeWidth="1.5" />
          <line x1="3" y1="7" x2="17" y2="7" stroke="#2d6a4f" strokeWidth="1" />
          <rect x="7" y="9" width="2.5" height="2.5" rx="0.5" fill="#2d6a4f" opacity="0.45" />
          <rect x="11" y="9" width="2.5" height="2.5" rx="0.5" fill="#2d6a4f" opacity="0.45" />
          <rect x="7" y="13" width="2.5" height="2.5" rx="0.5" fill="#2d6a4f" opacity="0.45" />
          <rect x="11" y="13" width="2.5" height="2.5" rx="0.5" fill="#2d6a4f" opacity="0.45" />
        </svg>
      ),
    },
    {
      slug: 'rental-community',
      title: 'Rental Community',
      description: 'Gated communities and apartments',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="9" width="7" height="9" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" opacity="0.6" />
          <rect x="12" y="6" width="7" height="12" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" opacity="0.6" />
          <rect x="6" y="11" width="8" height="7" rx="1" stroke="#2d6a4f" strokeWidth="1.5" fill="#c0ddd0" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-stayct-beige py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-8 flex flex-col gap-4 sm:mb-11 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[.13em] text-stayct-green-accent">
              Every kind of stay
            </p>
            <h2 className="text-[32px] font-black leading-[1.12] tracking-[-.02em] text-stayct-green-dark sm:text-[36px]">
              Built for all rental accommodation.
            </h2>
          </div>
          <Link
            href={ROUTES.search}
            className="mb-1 whitespace-nowrap text-[14px] font-semibold text-stayct-green-accent transition hover:text-stayct-green-dark"
          >
            Browse all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} href={`${ROUTES.search}?category=${category.slug}`} {...category} />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2.5">
          <div className="h-px w-5 bg-stayct-border-light"></div>
          <span className="text-[12px] font-medium text-stayct-text-muted">
            More accommodation types coming as STAYCT grows
          </span>
        </div>
      </div>
    </section>
  );
}
