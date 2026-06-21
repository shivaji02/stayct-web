export interface CityOverview {
  slug: string;
  name: string;
  state?: string;
  country: string;
}

export interface CityListItem extends CityOverview {
  propertyCount?: number;
  featuredPropertyCount?: number;
}

export interface CityDetail extends CityOverview {
  description?: string;
  heroImageUrl?: string | null;
  propertyCount?: number;
  featuredPropertyCount?: number;
  updatedAt?: string;
}

export interface CityQuery {
  search?: string;
}

export interface CityListResponse {
  items: readonly CityListItem[];
  total: number;
}
