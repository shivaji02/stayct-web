import Link from 'next/link';
import { SITE_PAGES, SUPPORT_CONTACT } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.contact);

export default function ContactPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Contact STAYCT</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            Reach STAYCT directly for support, questions, and business conversations.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Use email when you want to share context in writing. Use phone when you need a faster conversation about
            support or operator needs.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href={SUPPORT_CONTACT.emailHref}
              className="rounded-[18px] border border-stayct-border bg-stayct-bg-light px-6 py-5 transition hover:border-stayct-green-accent"
            >
              <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Support email</div>
              <div className="mt-2 text-[18px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
              <div className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">Email STAYCT support</div>
            </Link>
            <Link
              href={SUPPORT_CONTACT.phoneHref}
              className="rounded-[18px] border border-stayct-border bg-stayct-bg-light px-6 py-5 transition hover:border-stayct-green-accent"
            >
              <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Support phone</div>
              <div className="mt-2 text-[18px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
              <div className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">Call STAYCT support</div>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">General enquiries</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
              Contact STAYCT here if you are unsure where to start, need help using the public site, or want guidance
              on the next page to use.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={SUPPORT_CONTACT.emailHref}
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Email support
              </Link>
              <Link
                href={SUPPORT_CONTACT.phoneHref}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Call support
              </Link>
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Business support</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">
              Use this route for operator onboarding, listing questions, workflow discussions, or partnership-related
              conversations.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={SUPPORT_CONTACT.emailHref}
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Email business support
              </Link>
              <Link
                href={SUPPORT_CONTACT.phoneHref}
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Call business support
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
