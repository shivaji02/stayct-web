import Link from 'next/link';

import { Breadcrumbs } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES, SUPPORT_CONTACT } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.support);

const faqItems = [
  {
    question: 'I do not know whether to start with city or category.',
    answer: 'Start with Cities if location is unclear. Start with Categories if the stay format is the real blocker.',
  },
  {
    question: 'I found a stay, but I still need confirmation before deciding.',
    answer: 'Use the property-specific contact CTA first, then Support if you need clarification on availability or next steps.',
  },
  {
    question: 'I am an operator. Which path should I use?',
    answer: 'Use List Your Property if you are new. Use Manage Property if you already operate through STAYCT.',
  },
] as const;

const troubleshootingSteps = [
  'Use Search when you know the city, stay type, or area.',
  'Use Cities when the user first needs neighborhood context.',
  'Use Categories when the user is choosing between PG, hostel, co-living, shared flat, or rental room.',
  'Use Support when none of those paths resolves the decision cleanly.',
] as const;

export default function SupportPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Support' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Support</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            One support destination for questions, troubleshooting, and recovery.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Support replaces the old split between Help and Contact so users do not have to guess which page will actually help them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={SUPPORT_CONTACT.emailHref} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
              Email support
            </Link>
            <Link
              href={SUPPORT_CONTACT.phoneHref}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Call support
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">FAQ</p>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[18px] bg-stayct-bg-light px-5 py-4">
                  <h2 className="text-[15px] font-bold text-stayct-green-dark">{item.question}</h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">{item.answer}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Contact options</p>
            <div className="mt-5 grid gap-4">
              <Link href={SUPPORT_CONTACT.emailHref} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Email support</div>
                <div className="mt-2 text-[18px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">Best when the user needs written follow-up or wants to share more detail.</p>
              </Link>
              <Link href={SUPPORT_CONTACT.phoneHref} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light">
                <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Phone support</div>
                <div className="mt-2 text-[18px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">Best when the next action is time-sensitive or the shortlist still is not clear.</p>
              </Link>
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Troubleshooting</p>
            <div className="mt-5 space-y-3">
              {troubleshootingSteps.map((step) => (
                <div key={step} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.7] text-stayct-green-medium">
                  {step}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Getting started</p>
            <div className="mt-5 grid gap-3">
              <Link href={ROUTES.search} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light">
                <div className="text-[15px] font-bold text-stayct-green-dark">Find a stay</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">For discovery, comparison, and first shortlist creation.</p>
              </Link>
              <Link href={ROUTES.listProperty} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light">
                <div className="text-[15px] font-bold text-stayct-green-dark">List Your Property</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">For new operators who want inventory on STAYCT.</p>
              </Link>
              <Link href={ROUTES.manageProperty} className="rounded-[18px] bg-stayct-bg-light px-5 py-4 transition hover:bg-stayct-overlay-light">
                <div className="text-[15px] font-bold text-stayct-green-dark">Manage Property</div>
                <p className="mt-2 text-[14px] leading-[1.7] text-stayct-green-medium">For existing users who need the STAYCT app and support recovery paths.</p>
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
