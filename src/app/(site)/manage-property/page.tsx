import Link from 'next/link';

import { Breadcrumbs, SupportContactCard } from '@/components';
import { ROUTES } from '@/constants/routes';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';
import { getManagePropertyUrl } from '@/lib';

export const metadata = buildPageMetadata(SITE_PAGES.manageProperty);

const managePaths = [
  {
    title: 'Open the STAYCT app',
    description: 'Use this when you already have an operator account and want to continue into management immediately.',
  },
  {
    title: 'Recover support quickly',
    description: 'If login, access, or app confusion blocks the session, Support stays nearby instead of sending the user back through generic contact pages.',
  },
  {
    title: 'Return to public discovery only when needed',
    description: 'The website should not confuse existing operators into seeker flows unless they intentionally switch context.',
  },
] as const;

export default function ManagePropertyPage() {
  return (
    <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Manage Property' }]} />

        <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Existing users</p>
          <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
            Existing STAYCT users should get to the management platform with one clear choice.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            Manage Property is for current operators. It exists to send them into the app quickly and keep support within reach if access breaks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={getManagePropertyUrl()}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white"
            >
              Open STAYCT app
            </Link>
            <Link
              href={ROUTES.support}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
            >
              Open support
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {managePaths.map((item) => (
            <article key={item.title} className="rounded-[24px] border border-stayct-border bg-white p-6 shadow-sm">
              <h2 className="text-[22px] font-black tracking-[-0.03em] text-stayct-green-dark">{item.title}</h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-stayct-green-medium">{item.description}</p>
            </article>
          ))}
        </section>

        <div className="mt-8">
          <SupportContactCard description="If the app path is blocked by account or access issues, support should recover the user without sending them through a separate contact maze." />
        </div>
      </div>
    </main>
  );
}
