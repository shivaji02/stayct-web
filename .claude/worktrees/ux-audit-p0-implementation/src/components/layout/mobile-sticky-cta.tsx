'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { isDiscoveryPath } from '@/lib/discovery';

export function MobileStickyCtA() {
  const pathname = usePathname();

  const isSearchPage = isDiscoveryPath(pathname);
  const isCitiesPage = pathname === ROUTES.cities || pathname.startsWith(`${ROUTES.cities}/`);
  const isPropertyPage = pathname.startsWith(ROUTES.stays);
  const isOperatorPage =
    pathname === ROUTES.listProperty || pathname === ROUTES.manageProperty;

  if (pathname === ROUTES.home) {
    return null;
  }

  let ctaText = 'Find Stay';
  let ctaHref = ROUTES.search;

  if (isPropertyPage) {
    ctaText = 'Contact Support';
    ctaHref = ROUTES.support;
  } else if (isOperatorPage) {
    ctaText = 'Get Help';
    ctaHref = ROUTES.support;
  } else if (isSearchPage || isCitiesPage) {
    ctaText = 'Need Help?';
    ctaHref = ROUTES.support;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stayct-border bg-stayct-beige/95 backdrop-blur lg:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href={ctaHref}
          className="block w-full py-3 text-center font-bold text-white rounded-t-[16px] bg-stayct-green-dark transition hover:opacity-90 text-[15px]"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
