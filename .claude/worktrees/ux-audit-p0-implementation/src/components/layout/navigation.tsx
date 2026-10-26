'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

import { navigationConfig } from '@/config/navigation';
import { ROUTES } from '@/constants/routes';
import { isDiscoveryPath, buildSearchHref } from '@/lib/discovery';

function isActivePath(pathname: string, href: string) {
  if (href === ROUTES.search) {
    return isDiscoveryPath(pathname);
  }

  if (href === ROUTES.cities) {
    return pathname === ROUTES.cities || pathname.startsWith(`${ROUTES.cities}/`);
  }

  if (href === ROUTES.categories) {
    return pathname === ROUTES.categories || pathname.startsWith(`${ROUTES.categories}/`);
  }

  if (href === ROUTES.manageProperty || href === ROUTES.listProperty) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const currentItem = navigationConfig.primary.find((item) => isActivePath(pathname, item.href));
  const currentLabel = pathname === ROUTES.home ? 'Home' : currentItem?.label ?? 'Current page';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchInputRef.current?.value.trim();
    if (query) {
      router.push(buildSearchHref({ q: query }));
    }
  };

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

          <div className="hidden items-center gap-3 lg:flex">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search stays..."
                className="rounded-l-[16px] border border-stayct-border bg-white px-4 py-2 text-[14px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
                aria-label="Search stays"
              />
              <button
                type="submit"
                className="rounded-r-[16px] border border-l-0 border-stayct-border bg-stayct-green-dark px-3 py-2 text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
                aria-label="Submit search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

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

                <form onSubmit={handleSearch} className="mt-3 flex gap-1">
                  <input
                    type="search"
                    placeholder="Search stays..."
                    className="flex-1 rounded-l-[12px] border border-stayct-border bg-white px-3 py-2 text-[13px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
                    aria-label="Search stays on mobile"
                  />
                  <button
                    type="submit"
                    className="rounded-r-[12px] border border-l-0 border-stayct-border bg-stayct-green-dark px-3 py-2 text-white transition hover:opacity-90"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>

                <div className="mt-3 flex flex-col gap-1">
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
