import Link from 'next/link';

import { ROUTES } from '@/constants/routes';
import { SUPPORT_CONTACT } from '@/content';

export function Footer() {
  return (
    <footer className="border-t border-stayct-border bg-stayct-green-dark py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">For Seekers</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={ROUTES.search} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Search stays
              </Link>
              <Link href={ROUTES.cities} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Browse cities
              </Link>
              <Link href={ROUTES.categories} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Stay categories
              </Link>
              <Link href={ROUTES.resources} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Discovery guides
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">For Operators</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={ROUTES.listProperty} className="text-[14px] text-stayct-text-light transition hover:text-white">
                List your property
              </Link>
              <Link href={ROUTES.manageProperty} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Manage property
              </Link>
              <Link href={ROUTES.support} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Operator support
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Company</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={ROUTES.about} className="text-[14px] text-stayct-text-light transition hover:text-white">
                About STAYCT
              </Link>
              <Link href={ROUTES.privacy} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Privacy
              </Link>
              <Link href={ROUTES.terms} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Terms
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-light">Support</h2>
            <div className="mt-4 flex flex-col gap-3">
              <Link href={SUPPORT_CONTACT.emailHref} className="text-[14px] text-stayct-text-light transition hover:text-white">
                <div className="font-semibold">{SUPPORT_CONTACT.email}</div>
              </Link>
              <Link href={SUPPORT_CONTACT.phoneHref} className="text-[14px] text-stayct-text-light transition hover:text-white">
                <div className="font-semibold">{SUPPORT_CONTACT.phoneDisplay}</div>
              </Link>
              <Link href={ROUTES.support} className="text-[14px] text-stayct-text-light transition hover:text-white">
                Get support
              </Link>
            </div>
          </section>

          <section>
            <p className="text-[22px] font-black tracking-[-0.03em] text-white">STAYCT</p>
            <p className="mt-3 text-[12px] leading-[1.6] text-stayct-text-light">
              Discovery-first accommodation for PGs, hostels, co-living, shared flats, and rooms across Indian cities.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[13px] text-stayct-text-light">
          © 2026 STAYCT · stayct.in
        </div>
      </div>
    </footer>
  );
}
