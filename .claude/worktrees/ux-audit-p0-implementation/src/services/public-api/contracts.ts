import type { CityDetail, CityListItem, CityListResponse, CityQuery } from '@/types/city';
import type {
  PropertyDetail,
  PropertyListItem,
  PropertyListResponse,
  PropertyQuery,
} from '@/types/property';
import type { LeadCreateInput, LeadCreateResponse } from '@/types/lead';
import type { SearchQuery, SearchResponse } from '@/types/search';

export type PublicApiMethod = 'GET' | 'POST';

export type PublicApiEndpoint<TMethod extends PublicApiMethod, TPath extends string, TRequest, TResponse> = Readonly<{
  method: TMethod;
  path: TPath;
  request: TRequest;
  response: TResponse;
}>;

export const PUBLIC_API_PATHS = {
  properties: '/public/properties',
  propertyBySlug: (slug: string) => `/public/properties/${slug}`,
  cities: '/public/cities',
  search: '/public/search',
  enquiry: '/public/enquiry',
} as const;

export type PublicPropertiesListContract = PublicApiEndpoint<
  'GET',
  typeof PUBLIC_API_PATHS.properties,
  PropertyQuery,
  PropertyListResponse
>;

export type PublicPropertyDetailContract = PublicApiEndpoint<
  'GET',
  '/public/properties/:slug',
  { slug: string },
  PropertyDetail
>;

export type PublicCitiesListContract = PublicApiEndpoint<
  'GET',
  typeof PUBLIC_API_PATHS.cities,
  CityQuery,
  CityListResponse
>;

export type PublicCityDetailContract = PublicApiEndpoint<
  'GET',
  '/public/cities/:slug',
  { slug: string },
  CityDetail
>;

export type PublicSearchContract = PublicApiEndpoint<
  'GET',
  typeof PUBLIC_API_PATHS.search,
  SearchQuery,
  SearchResponse
>;

export type PublicLeadCreateContract = PublicApiEndpoint<
  'POST',
  typeof PUBLIC_API_PATHS.enquiry,
  LeadCreateInput,
  LeadCreateResponse
>;

export type PublicApiContracts = Readonly<{
  properties: PublicPropertiesListContract;
  propertyDetail: PublicPropertyDetailContract;
  cities: PublicCitiesListContract;
  cityDetail: PublicCityDetailContract;
  search: PublicSearchContract;
  enquiry: PublicLeadCreateContract;
}>;

export type PublicApiListItemTypes = {
  property: PropertyListItem;
  city: CityListItem;
};

export type PublicApiCollectionResponse<TItem> = Readonly<{
  items: readonly TItem[];
  total: number;
  page: number;
  pageSize: number;
}>;

export type PublicApiPathMap = typeof PUBLIC_API_PATHS;
