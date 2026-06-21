import { PlaceholderPage } from '@/components';
import { titleCaseFromSlug } from '@/lib';
import { buildPageMetadata } from '@/seo';
import type { RouteParams } from '@/types';

type CityPageProps = {
  params: RouteParams<{
    city: string;
  }>;
};

export async function generateMetadata({ params }: CityPageProps) {
  const { city } = await Promise.resolve(params);
  const cityName = titleCaseFromSlug(city);

  return buildPageMetadata({
    title: cityName,
    description: 'Placeholder route for a city page.',
    path: `/cities/${encodeURIComponent(city)}`,
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await Promise.resolve(params);
  const cityName = titleCaseFromSlug(city);

  return <PlaceholderPage title={cityName} path={`/cities/${city}`} />;
}
