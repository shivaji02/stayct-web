import Link from 'next/link';
import { SITE_PAGES, SUPPORT_CONTACT } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.help);

export default function HelpPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Help</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            Need help?
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Contact STAYCT if you are unsure where to go next, cannot find the right stay path, or need help with an
            operator or listing question.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Contact support</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link
                href={SUPPORT_CONTACT.emailHref}
                className="rounded-[18px] bg-stayct-bg-light px-5 py-5 transition hover:border-stayct-green-accent"
              >
                <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Email</div>
                <div className="mt-2 text-[17px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
              </Link>
              <Link
                href={SUPPORT_CONTACT.phoneHref}
                className="rounded-[18px] bg-stayct-bg-light px-5 py-5 transition hover:border-stayct-green-accent"
              >
                <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Phone</div>
                <div className="mt-2 text-[17px] font-black text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
              </Link>
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Next actions</h2>
            <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-stayct-green-medium">
              <p>Use search if you already know the city or stay type.</p>
              <p>Use cities if you want to browse by destination first.</p>
              <p>Use operators if your question is about listings or accommodation operations.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
              >
                Open search
              </Link>
              <Link
                href="/contact"
                className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
              >
                Contact page
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
