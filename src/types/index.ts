import type { MetadataRoute } from 'next';

export type Awaitable<T> = T | Promise<T>;

export type RouteParams<T extends Record<string, string>> = Promise<T>;

export type SitemapChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

export type PageMetadataInput = {
  title: string;
  description?: string;
  path: `/${string}` | '/';
  noIndex?: boolean;
};

export type PageContentEntry = {
  path: `/${string}` | '/';
  title: string;
  description?: string;
  noIndex?: boolean;
  sitemap?: boolean;
  priority?: number;
  changeFrequency?: SitemapChangeFrequency;
};

export type { CityDetail, CityListItem, CityListResponse, CityOverview, CityQuery } from './city';
export type { LeadContactDetails, LeadCreateInput, LeadCreateResponse, LeadSource, LeadType } from './lead';
export type {
  PropertyAddress,
  PropertyAmenity,
  PropertyCategory,
  PropertyDetail,
  PropertyListItem,
  PropertyListResponse,
  PropertyLocation,
  PropertyQuery,
  PropertyStatus,
} from './property';
export type { SearchQuery, SearchResponse, SearchResultGroup } from './search';
