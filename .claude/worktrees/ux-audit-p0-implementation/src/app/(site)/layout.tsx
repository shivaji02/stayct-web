import type { ReactNode } from 'react';

import { Footer, Navigation, MobileStickyCtA } from '@/components';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[10px] focus:bg-stayct-green-dark focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>
      <Navigation />
      <div className="pb-20 lg:pb-0">{children}</div>
      <MobileStickyCtA />
      <Footer />
    </>
  );
}
