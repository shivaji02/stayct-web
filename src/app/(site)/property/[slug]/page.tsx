import { PlaceholderPage } from '@/components';
import { titleCaseFromSlug } from '@/lib';
import { buildPageMetadata } from '@/seo';
import type { RouteParams } from '@/types';

type PropertyPageProps = {
  params: RouteParams<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PropertyPageProps) {
  const { slug } = await Promise.resolve(params);
  const slugTitle = titleCaseFromSlug(slug);

  return buildPageMetadata({
    title: slugTitle,
    description: 'Placeholder route for a property detail page.',
    path: `/property/${encodeURIComponent(slug)}`,
  });
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await Promise.resolve(params);
  const slugTitle = titleCaseFromSlug(slug);

  return <PlaceholderPage title={slugTitle} path={`/property/${slug}`} />;
}
