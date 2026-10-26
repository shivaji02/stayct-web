import type { CityListItem } from '@/types/city';
import type { PropertyListItem } from '@/types/property';

export interface SearchQuery {
  q?: string;
  citySlug?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface SearchResultGroup {
  label: string;
  total: number;
  items: readonly PropertyListItem[] | readonly CityListItem[];
}

export interface SearchResponse {
  query: SearchQuery;
  properties: readonly PropertyListItem[];
  cities: readonly CityListItem[];
  groups: readonly SearchResultGroup[];
  total: number;
}
