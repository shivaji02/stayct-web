export type PropertyStatus = 'draft' | 'review' | 'published' | 'paused' | 'archived';

export type PropertyCategory =
  | 'pg'
  | 'hostel'
  | 'co_living'
  | 'shared_flat'
  | 'student_housing'
  | 'workforce_housing'
  | 'corporate_housing'
  | 'rental_community';

export interface PropertyLocation {
  city: string;
  citySlug: string;
  state?: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertyAddress {
  line1?: string;
  line2?: string;
  locality?: string;
  postalCode?: string;
  location: PropertyLocation;
}

export interface PropertyAmenity {
  code: string;
  label: string;
}

export interface PropertyListItem {
  id: string;
  slug: string;
  name: string;
  category: PropertyCategory;
  status: PropertyStatus;
  location: PropertyLocation;
  thumbnailUrl?: string | null;
  priceFrom?: number | null;
  currency?: string;
}

export interface PropertyDetail extends PropertyListItem {
  description?: string;
  address?: PropertyAddress;
  amenities: readonly PropertyAmenity[];
  imageUrls: readonly string[];
  operatorName?: string;
  updatedAt?: string;
}

export interface PropertyQuery {
  citySlug?: string;
  category?: PropertyCategory;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface PropertyListResponse {
  items: readonly PropertyListItem[];
  total: number;
  page: number;
  pageSize: number;
}
