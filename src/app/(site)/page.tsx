import {
  Navigation,
  Footer,
  HeroSection,
  FindFillManageSection,
  CategoriesSection,
  HowItWorksSection,
  ForSeekersSection,
  ForOperatorsSection,
  TrustSection,
  FinalCTASection,
} from '@/components';
import { SITE_PAGES } from '@/content';
import { buildPageMetadata } from '@/seo';

export const metadata = buildPageMetadata(SITE_PAGES.home);

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FindFillManageSection />
        <CategoriesSection />
        <HowItWorksSection />
        <ForSeekersSection />
        <ForOperatorsSection />
        <TrustSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
