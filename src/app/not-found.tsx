import Link from 'next/link';

import { Breadcrumbs, Footer, Navigation } from '@/components';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="bg-stayct-beige px-4 py-10 sm:px-6 lg:px-20 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ label: 'Home', href: ROUTES.home }, { label: 'Page not found' }]} />

          <section className="rounded-[28px] border border-stayct-border bg-white p-8 shadow-sm sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">404</p>
            <h1 className="mt-3 text-[38px] font-black tracking-[-0.05em] text-stayct-green-dark sm:text-[52px]">
              This page does not exist.
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-stayct-green-medium">
              Use a supported recovery path so the visit does not end here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={ROUTES.search} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
                Find a stay
              </Link>
              <Link href={ROUTES.cities} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
                Browse cities
              </Link>
              <Link href={ROUTES.support} className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark">
                Open support
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
