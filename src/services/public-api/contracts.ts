import type { CityDetail, CityListItem, CityListResponse, CityQuery } from '@/types/city';
import type {
  PropertyDetail,
  PropertyListItem,
  PropertyListResponse,
  PropertyQuery,
} from '@/types/property';
import type { LeadCreateInput, LeadCreateResponse } from '@/types/lead';
import type {
  DiscoveryListingDetail,
  DiscoveryListingsQuery,
  DiscoveryListingsResponse,
  PublicDiscoveryListingEnquiryInput,
  PublicDiscoveryListingEnquiryResult,
  PublicDiscoverySubmissionInput,
  PublicDiscoverySubmissionResult,
} from '@/types/discovery';
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
  discoverySubmissions: '/public/discovery/submissions',
  discoveryListings: '/public/discovery/listings',
  discoveryListingBySlug: (slug: string) => `/public/discovery/listings/${slug}`,
  discoveryListingEnquiry: (slug: string) => `/public/discovery/listings/${slug}/enquiries`,
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

export type PublicDiscoverySubmissionContract = PublicApiEndpoint<
  'POST',
  typeof PUBLIC_API_PATHS.discoverySubmissions,
  PublicDiscoverySubmissionInput,
  PublicDiscoverySubmissionResult
>;

export type PublicDiscoveryListingsContract = PublicApiEndpoint<
  'GET',
  typeof PUBLIC_API_PATHS.discoveryListings,
  DiscoveryListingsQuery,
  DiscoveryListingsResponse
>;

export type PublicDiscoveryListingDetailContract = PublicApiEndpoint<
  'GET',
  '/public/discovery/listings/:slug',
  { slug: string },
  DiscoveryListingDetail
>;

export type PublicDiscoveryListingEnquiryContract = PublicApiEndpoint<
  'POST',
  '/public/discovery/listings/:slug/enquiries',
  PublicDiscoveryListingEnquiryInput,
  PublicDiscoveryListingEnquiryResult
>;

export type PublicApiContracts = Readonly<{
  properties: PublicPropertiesListContract;
  propertyDetail: PublicPropertyDetailContract;
  cities: PublicCitiesListContract;
  cityDetail: PublicCityDetailContract;
  search: PublicSearchContract;
  enquiry: PublicLeadCreateContract;
  discoverySubmission: PublicDiscoverySubmissionContract;
  discoveryListings: PublicDiscoveryListingsContract;
  discoveryListingDetail: PublicDiscoveryListingDetailContract;
  discoveryListingEnquiry: PublicDiscoveryListingEnquiryContract;
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
