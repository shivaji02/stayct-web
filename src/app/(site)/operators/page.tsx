import Link from 'next/link';
import { SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

const operatorCapabilities = [
  {
    title: 'Vacancy management',
    description: 'Keep new leads moving into the right property path instead of handling every inquiry manually.',
  },
  {
    title: 'Occupancy management',
    description: 'Give teams one operating layer for current residents, room status, and day-to-day follow-up.',
  },
  {
    title: 'Payments',
    description: 'Use STAYCT to keep payment workflows closer to the accommodation operation, not split across tools.',
  },
  {
    title: 'Complaints',
    description: 'Create a clearer process for resident issues so they are tracked, owned, and closed with context.',
  },
];

export const metadata = buildPageMetadata(SITE_PAGES.operators);

export default function OperatorsPage() {
  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">For operators</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            STAYCT helps operators run discovery and operations with one flow.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            This page exists for owners, managers, and operating teams who clicked to understand the business value,
            not just reach another route.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ROUTES.contact}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Contact STAYCT
            </Link>
            <Link
              href={ROUTES.appLogin}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
            >
              Open operator app
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {operatorCapabilities.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
              <h2 className="text-[22px] font-black tracking-[-.03em] text-stayct-green-dark">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10">
          <h2 className="text-[28px] font-black tracking-[-.03em] text-stayct-green-dark">Why operators click this</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[18px] bg-stayct-bg-light p-5">
              <div className="text-[15px] font-bold text-stayct-green-dark">Understand the workflow</div>
              <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">
                See the core operating areas before speaking to STAYCT.
              </p>
            </div>
            <div className="rounded-[18px] bg-stayct-bg-light p-5">
              <div className="text-[15px] font-bold text-stayct-green-dark">Decide the next conversation</div>
              <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">
                Move to contact when you want a commercial or onboarding discussion.
              </p>
            </div>
            <div className="rounded-[18px] bg-stayct-bg-light p-5">
              <div className="text-[15px] font-bold text-stayct-green-dark">Continue into the app</div>
              <p className="mt-2 text-[14px] leading-[1.65] text-stayct-green-medium">
                Existing teams can go straight into the operator workspace.
              </p>
            </div>
          </div>
        </section>

        <SupportContactCard description="If you need to discuss onboarding, listing structure, or whether STAYCT fits your operation, contact support directly." />
      </div>
    </main>
  );
}
