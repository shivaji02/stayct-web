'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '@/config/navigation';
import { ROUTES } from '@/constants/routes';
import { isDiscoveryPath } from '@/lib';

function isActivePath(pathname: string, href: string) {
  if (href === ROUTES.search) {
    return isDiscoveryPath(pathname);
  }

  if (href === ROUTES.cities) {
    return pathname === ROUTES.cities || pathname.startsWith(`${ROUTES.cities}/`);
  }

  if (href === ROUTES.manageProperty || href === ROUTES.listProperty) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const currentItem = navigationConfig.primary.find((item) => isActivePath(pathname, item.href));
  const currentLabel = pathname === ROUTES.home ? 'Home' : currentItem?.label ?? 'Current page';

  return (
    <header className="sticky top-0 z-50 border-b border-stayct-border bg-stayct-beige/95 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Link
              href={ROUTES.home}
              className="font-black tracking-[-0.03em] text-stayct-green-dark transition hover:text-stayct-green-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
            >
              STAYCT
            </Link>
            <span className="hidden rounded-full border border-stayct-border bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-stayct-green-accent sm:inline-flex">
              Discovery Platform
            </span>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {navigationConfig.primary.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-4 py-2 text-[14px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent ${
                    active
                      ? 'bg-stayct-green-dark text-white'
                      : 'text-stayct-green-dark hover:bg-white hover:text-stayct-green-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <span className="text-right text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
              {currentLabel}
            </span>
            <details className="relative">
              <summary
                className="cursor-pointer list-none rounded-[10px] border border-stayct-border bg-white px-3 py-2 text-[13px] font-bold text-stayct-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
                style={{ listStyle: 'none' }}
              >
                Menu
              </summary>
              <div className="absolute right-0 top-full mt-2 w-64 rounded-[18px] border border-stayct-border bg-white p-2 shadow-lg shadow-black/10">
                <div className="rounded-[12px] bg-stayct-bg-light px-3 py-2 text-[12px] font-semibold text-stayct-green-medium">
                  Current page: <span className="text-stayct-green-dark">{currentLabel}</span>
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  {navigationConfig.primary.map((item) => {
                    const active = isActivePath(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`rounded-[12px] px-3 py-3 text-[14px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent ${
                          active
                            ? 'bg-stayct-green-dark text-white'
                            : 'text-stayct-green-dark hover:bg-stayct-bg-light'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </details>
          </div>
        </div>
      </nav>
    </header>
  );
}
