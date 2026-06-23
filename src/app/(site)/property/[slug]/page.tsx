import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { getMockProperty, SUPPORT_CONTACT } from '@/content';
import { buildPageMetadata } from '@/seo';
import type { RouteParams } from '@/types';

type PropertyPageProps = {
  params: RouteParams<{
    slug: string;
  }>;
};

function buildEnquiryMailto(propertyName: string, cityName: string) {
  const subject = encodeURIComponent(`Enquiry for ${propertyName}`);
  const body = encodeURIComponent(
    `Hi STAYCT,\n\nI want to know more about ${propertyName} in ${cityName}. Please share the next steps.\n`
  );

  return `${SUPPORT_CONTACT.emailHref}?subject=${subject}&body=${body}`;
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await Promise.resolve(params);
  const property = getMockProperty(slug);

  if (!property) {
    return buildPageMetadata({
      title: 'Property Not Found',
      description: 'The requested sample property is not available.',
      path: `/property/${encodeURIComponent(slug)}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: property.name,
    description: `${property.name} in ${property.cityName} with sample STAYCT property details and enquiry actions.`,
    path: `/property/${encodeURIComponent(slug)}`,
  });
}

export function generateStaticParams() {
  return ['sri-lakshmi-pg', 'green-nest-coliving', 'urban-square-hostel', 'river-view-shared-flat'].map((slug) => ({
    slug,
  }));
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await Promise.resolve(params);
  const property = getMockProperty(slug);

  if (!property) {
    notFound();
  }

  const enquiryMailto = buildEnquiryMailto(property.name, property.cityName);

  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">
            {property.cityName} stay
          </p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            {property.name}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">{property.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-full bg-stayct-bg-light px-4 py-2 text-[13px] font-semibold text-stayct-green-dark">
              {property.locality}
            </div>
            <div className="rounded-full bg-stayct-bg-light px-4 py-2 text-[13px] font-semibold text-stayct-green-dark">
              {property.stayType}
            </div>
            <div className="rounded-full bg-stayct-bg-light px-4 py-2 text-[13px] font-semibold text-stayct-green-dark">
              {property.startingPrice}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Why someone would shortlist this stay</h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-stayct-green-medium">{property.audience}</p>
            <div className="mt-5 space-y-3">
              {property.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[16px] bg-stayct-bg-light px-5 py-4 text-[14px] leading-[1.65] text-stayct-green-medium">
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8">
            <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">Stay essentials</h2>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[16px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Deposit</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{property.deposit}</div>
              </div>
              <div className="rounded-[16px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Response time</div>
                <div className="mt-2 text-[15px] font-bold text-stayct-green-dark">{property.responseTime}</div>
              </div>
              <div className="rounded-[16px] bg-stayct-bg-light px-5 py-4">
                <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">City path</div>
                <Link
                  href={`${ROUTES.cities}/${property.citySlug}`}
                  className="mt-2 block text-[15px] font-bold text-stayct-green-dark underline-offset-4 hover:underline"
                >
                  Back to {property.cityName}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[22px] font-black tracking-[-.03em] text-stayct-green-dark">Room options</h2>
            <div className="mt-4 space-y-3">
              {property.roomOptions.map((room) => (
                <div key={room} className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                  {room}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[22px] font-black tracking-[-.03em] text-stayct-green-dark">Included</h2>
            <div className="mt-4 space-y-3">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                  {amenity}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-stayct-border bg-white p-7 shadow-sm">
            <h2 className="text-[22px] font-black tracking-[-.03em] text-stayct-green-dark">Commute notes</h2>
            <div className="mt-4 space-y-3">
              {property.commute.map((item) => (
                <div key={item} className="rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="enquiry"
          className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10"
        >
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Enquiry</p>
          <h2 className="mt-3 text-[32px] font-black tracking-[-.04em] text-stayct-green-dark">
            Ready to ask about {property.name}?
          </h2>
          <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">
            This is the point where a future STAYCT user would move from browsing into an actual property enquiry.
            Use one of the actions below to continue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={enquiryMailto}
              className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90"
            >
              Email enquiry
            </Link>
            <Link
              href={SUPPORT_CONTACT.phoneHref}
              className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark transition hover:bg-stayct-overlay-light"
            >
              Call STAYCT
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Email</div>
              <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
            </div>
            <div className="rounded-[18px] bg-stayct-bg-light px-5 py-5">
              <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Phone</div>
              <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
