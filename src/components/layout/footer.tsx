import Link from 'next/link';

import { navigationConfig } from '@/config/navigation';
import { routeBuilders, ROUTES } from '@/constants/routes';
import { CITIES, STAY_CATEGORIES, SUPPORT_CONTACT } from '@/content';

export function Footer() {
  const footerCities = CITIES.slice(0, 6);

  return (
    <footer className="border-t border-stayct-border bg-stayct-green-dark py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <section className="max-w-md">
            <p className="text-[22px] font-black tracking-[-0.03em] text-white">STAYCT</p>
            <p className="mt-4 text-[14px] leading-[1.75] text-stayct-text-light">
              Discovery-first accommodation search for PGs, hostels, co-living, shared flats, rental rooms, and individual rooms.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={SUPPORT_CONTACT.emailHref}
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-stayct-text-light transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Email</div>
                <div className="mt-2 font-semibold text-white">{SUPPORT_CONTACT.email}</div>
              </Link>
              <Link
                href={SUPPORT_CONTACT.phoneHref}
                className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-[14px] text-stayct-text-light transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Phone</div>
                <div className="mt-2 font-semibold text-white">{SUPPORT_CONTACT.phoneDisplay}</div>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Discover</h2>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href={ROUTES.search} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Search stays
              </Link>
              <Link href={ROUTES.cities} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Browse cities
              </Link>
              <Link
                href={ROUTES.categories}
                className="text-[14px] text-stayct-text-light transition hover:text-white"
              >
                Stay categories
              </Link>
              <Link href={ROUTES.resources} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Resources
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Cities</h2>
            <div className="mt-3 flex flex-col gap-2.5">
              {footerCities.map((city) => (
                <Link
                  key={city.slug}
                  href={routeBuilders.city(city.slug)}
                  className="text-[14px] text-stayct-text-light transition hover:text-white"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Categories</h2>
            <div className="mt-3 flex flex-col gap-2.5">
              {STAY_CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={routeBuilders.category(category.slug)}
                  className="text-[14px] text-stayct-text-light transition hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-12 sm:gap-4 sm:pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            {navigationConfig.footer.map((item) => (
              <Link key={item.href} href={item.href} className="text-[13px] text-stayct-text-light transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-[13px] text-stayct-text-light">© 2026 STAYCT · stayct.in</div>
        </div>
      </div>
    </footer>
  );
}
