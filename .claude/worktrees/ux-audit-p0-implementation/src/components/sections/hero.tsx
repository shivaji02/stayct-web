import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function HeroSection() {
  return (
    <section className="bg-stayct-beige pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-[84px] lg:pt-[100px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-20">
        <div className="mb-7 flex items-center gap-3 sm:mb-9">
          <div className="h-0.5 w-9 bg-stayct-green-dark"></div>
          <span className="text-[10px] font-bold uppercase tracking-[.13em] text-stayct-green-dark sm:text-[11px]">
            Your next stay, simplified.
          </span>
        </div>

        <h1 className="mb-7 max-w-[11ch] text-[56px] font-black leading-[0.96] tracking-[-.04em] text-stayct-green-dark sm:mb-9 sm:max-w-[860px] sm:text-[72px] lg:text-[100px]">
          Your next stay<br />
          starts here.
        </h1>

        <div className="mb-7 h-px w-full max-w-[860px] bg-stayct-border-light sm:mb-9"></div>

        <p className="mb-8 max-w-[580px] text-[16px] font-medium leading-[1.7] text-stayct-green-medium sm:mb-12 sm:text-[19px] sm:leading-[1.75]">
          Find verified rental accommodation — PGs, hostels, co-living, shared flats, and more. Connect directly with
          operators. No brokerage, ever.
        </p>

        <div className="flex flex-col gap-3.5 sm:flex-row">
          <Link
            href={ROUTES.search}
            className="inline-block rounded-lg bg-stayct-green-dark px-8 py-4 text-center text-base font-bold text-white transition hover:opacity-90 sm:px-10"
          >
            Find a Stay
          </Link>
          <Link
            href={ROUTES.operators}
            className="inline-block rounded-lg border-2 border-stayct-green-dark px-8 py-3.5 text-center text-base font-semibold text-stayct-green-dark transition hover:bg-stayct-beige sm:px-10"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
}
