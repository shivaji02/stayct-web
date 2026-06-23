import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { SUPPORT_CONTACT } from '@/content';

export function Footer() {
  const footerLinks = {
    platform: [
      { label: 'Find Stay', href: ROUTES.search },
      { label: 'For Operators', href: ROUTES.operators },
      { label: 'App Login', href: ROUTES.appLogin },
    ],
    stays: [
      { label: 'PG / Paying Guest', href: `${ROUTES.search}?category=pg` },
      { label: 'Hostel', href: `${ROUTES.search}?category=hostel` },
      { label: 'Co-living', href: `${ROUTES.search}?category=co-living` },
      { label: 'Shared Flat', href: `${ROUTES.search}?category=shared-flat` },
      { label: 'All 8 categories →', href: ROUTES.search, highlight: true },
    ],
    company: [
      { label: 'About', href: ROUTES.about },
      { label: 'Contact', href: ROUTES.contact },
      { label: 'Support', href: ROUTES.help },
      { label: 'Privacy', href: ROUTES.privacy },
      { label: 'Terms', href: ROUTES.terms },
    ],
  };

  return (
    <footer className="bg-stayct-green-dark py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-10 grid gap-10 lg:mb-14 lg:grid-cols-[1.2fr_1fr] lg:justify-between">
          <div className="max-w-60">
            <div className="mb-3 text-[20px] font-black tracking-[-.03em] text-white">STAYCT</div>
            <div className="text-[14px] leading-[1.75] text-stayct-text-link">
              The platform for rental accommodation — PGs, hostels, co-living, shared flats, and more across India.
            </div>
            <div className="mt-6">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-[.1em] text-stayct-text-link">Support</div>
              <div className="flex flex-col gap-2">
                <Link
                  href={SUPPORT_CONTACT.emailHref}
                  className="text-[14px] text-stayct-text-link hover:text-stayct-overlay-light transition"
                >
                  {SUPPORT_CONTACT.email}
                </Link>
                <Link
                  href={SUPPORT_CONTACT.phoneHref}
                  className="text-[14px] text-stayct-text-link hover:text-stayct-overlay-light transition"
                >
                  {SUPPORT_CONTACT.phoneDisplay}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
            <div>
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[.1em] text-stayct-text-link">
                Platform
              </div>
              <div className="flex flex-col gap-3">
                {footerLinks.platform.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[14px] text-stayct-text-link hover:text-stayct-overlay-light transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[.1em] text-stayct-text-link">
                Stays
              </div>
              <div className="flex flex-col gap-3">
                {footerLinks.stays.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[14px] transition ${
                      link.highlight
                        ? 'font-semibold text-stayct-green-light hover:text-stayct-overlay-light'
                        : 'text-stayct-text-link hover:text-stayct-overlay-light'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[.1em] text-stayct-text-link">
                Company
              </div>
              <div className="flex flex-col gap-3">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[14px] text-stayct-text-link hover:text-stayct-overlay-light transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[13px] text-stayct-text-link">
            © 2025 STAYCT · All rights reserved
          </span>
          <span className="text-[13px] text-stayct-text-link">
            stayct.in
          </span>
        </div>
      </div>
    </footer>
  );
}
