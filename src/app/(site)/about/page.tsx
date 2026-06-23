import Link from 'next/link';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

const storyPoints = [
  'STAYCT exists to simplify how people discover rental accommodation and how operators manage that journey.',
  'The public site helps visitors understand where to start, while the platform side supports the operating workflow.',
  'The goal is to reduce friction between discovery, onboarding, and day-to-day stay operations.',
];

const whatWeDo = [
  'Help seekers start with the right city or stay type.',
  'Give operators a clearer path for vacancies, occupancy, payments, and complaints.',
  'Connect the public discovery journey with the operator-facing workflow.',
];

export const metadata = buildPageMetadata(SITE_PAGES.about);

export default function AboutPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">About STAYCT</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            STAYCT is built to make accommodation discovery and operations easier to navigate.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Visitors click About to understand what the company does, why the platform exists, and where they should
            go next. This page answers those questions directly.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Company story</h2>
            <div className="mt-5 space-y-4">
              {storyPoints.map((point) => (
                <p key={point} className="text-[15px] leading-[1.75] text-stayct-green-medium">
                  {point}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Mission</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
              The mission is to remove dead ends from the stay journey so both seekers and operators can move from
              intent to action with less friction.
            </p>
          </div>
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">What STAYCT does</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {whatWeDo.map((item) => (
              <div key={item} className="rounded-[18px] bg-stayct-bg-light p-5">
                <p className="text-[14px] leading-[1.7] text-stayct-green-medium">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={ROUTES.search}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Find a stay
            </Link>
            <Link
              href={ROUTES.operators}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
            >
              For operators
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
