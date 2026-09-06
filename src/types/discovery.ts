export type DiscoveryCategory = 'PG' | 'HOSTEL' | 'CO_LIVING' | 'SHARED_FLAT' | 'RENTAL_ROOM' | 'INDIVIDUAL_ROOM';

export type DiscoveryGenderPreference = 'MENS' | 'WOMENS' | 'CO_LIVING' | 'UNISEX' | 'FAMILY';

export type DiscoveryAvailabilityStatus = 'AVAILABLE' | 'CURRENTLY_FULL' | 'CONTACT_FOR_AVAILABILITY';

export type DiscoveryPublishStatus = 'DRAFT' | 'SUBMITTED' | 'PUBLISHED' | 'REJECTED' | 'HIDDEN';

export type DiscoverySource = 'APP_PROPERTY' | 'PUBLIC_WEB' | 'ADMIN';

export interface PublicDiscoverySubmissionInput {
  title: string;
  businessName: string;
  phone: string;
  whatsappPhone?: string;
  category: DiscoveryCategory;
  genderPreference?: DiscoveryGenderPreference;
  addressLine1: string;
  locality?: string;
  city: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  startingPrice?: number;
  description?: string;
  availabilityStatus?: DiscoveryAvailabilityStatus;
}

export interface PublicDiscoverySubmissionResult {
  id: string;
  slug: string;
  title: string;
  publishStatus: DiscoveryPublishStatus;
  source: DiscoverySource;
  duplicate: boolean;
}

export type DiscoveryVerificationStatus = 'NOT_VERIFIED' | 'VERIFIED';

export type DiscoveryListingsSort = 'recommended' | 'title';

export interface DiscoveryListingsQuery {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  locality?: string;
  category?: DiscoveryCategory;
  genderPreference?: DiscoveryGenderPreference;
  availabilityStatus?: DiscoveryAvailabilityStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DiscoveryAmenity {
  id: string;
  name: string;
}

export interface DiscoveryListingListItem {
  id: string;
  slug: string;
  title: string;
  category: DiscoveryCategory;
  genderPreference: DiscoveryGenderPreference | null;
  addressLine1: string;
  locality: string | null;
  city: string;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  startingPrice: number | null;
  availabilityStatus: DiscoveryAvailabilityStatus;
  verificationStatus: DiscoveryVerificationStatus;
  contactPhone: string;
  contactWhatsapp: string | null;
  createdAt: string;
}

export interface DiscoveryListingDetail extends DiscoveryListingListItem {
  description: string | null;
  photos: readonly string[];
  amenities: readonly DiscoveryAmenity[];
}

export interface PublicDiscoveryListingEnquiryInput {
  name: string;
  phone: string;
}

export interface PublicDiscoveryListingEnquiryResult {
  id: string;
  listingId: string;
  createdAt: string;
}

export interface DiscoveryListingsResponse {
  items: readonly DiscoveryListingListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
