import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function FinalCTASection() {
  return (
    <section className="bg-stayct-beige py-16 text-center sm:py-20 lg:pb-[100px] lg:pt-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <h2 className="mb-5 text-[40px] font-black leading-[1.02] tracking-[-.04em] text-stayct-green-dark sm:text-[52px] lg:text-[60px]">
          Your next stay<br />
          is on STAYCT.
        </h2>

        <p className="mx-auto mb-10 max-w-[440px] text-[16px] leading-[1.7] text-stayct-green-medium sm:mb-12 sm:text-[17px]">
          Browse verified rental accommodation — or list your property and start getting discovered today.
        </p>

        <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
          <Link
            href={ROUTES.search}
            className="inline-block rounded-lg bg-stayct-green-dark px-11 py-4 text-base font-bold text-white transition hover:opacity-90"
          >
            Find a Stay
          </Link>
          <Link
            href={ROUTES.operators}
            className="inline-block rounded-lg border-2 border-stayct-green-dark px-11 py-3.5 text-base font-semibold text-stayct-green-dark transition hover:bg-stayct-beige"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}
