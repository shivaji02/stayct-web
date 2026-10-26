import type { StayAvailability, StayCategorySlug } from '@/content/mock-stays';

export type PublicStayListItem = Readonly<{
  id: string;
  identifier: string;
  name: string;
  category: StayCategorySlug;
  genderCategory: 'GENTS' | 'LADIES' | 'UNISEX';
  addressLine1: string;
  locality: string | null;
  city: string | null;
  state: string | null;
  coverPhotoUrl: string | null;
  photos: readonly string[];
  amenities: readonly string[];
  startingFromRent: number | null;
  totalBeds: number;
  availableBeds: number;
  organizationName: string;
  availabilityLabel: string;
}>;

export type PublicStayFlat = Readonly<{
  id: string;
  name: string;
  unitNumber: string;
  capacity: number;
  available: number;
  flatType: 'ROOM' | 'ONE_RK' | 'ONE_BHK' | 'TWO_BHK' | null;
  monthlyRent: number | null;
}>;

export type PublicStayFloor = Readonly<{
  id: string;
  name: string;
  floorNumber: number;
  flats: readonly PublicStayFlat[];
}>;

export type PublicStayDetail = PublicStayListItem &
  Readonly<{
    occupiedBeds: number;
    reservedBeds: number;
    organization: Readonly<{ name: string; displayCode: string | null }>;
    floors: readonly PublicStayFloor[];
  }>;

export type PublicStayListResponse = Readonly<{
  items: readonly PublicStayListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}>;

/** The narrow shape StayCard actually reads — satisfied by both MockProperty and mapped public API results. */
export type StayCardData = Readonly<{
  slug: string;
  name: string;
  cityName: string;
  locality: string;
  category: StayCategorySlug;
  availability: StayAvailability;
  availabilityLabel: string;
  startingPrice: string;
  summary: string;
  highlights: readonly string[];
}>;

function deriveAvailability(availableBeds: number, totalBeds: number): StayAvailability {
  if (availableBeds === 0) return 'waitlist';
  if (availableBeds < totalBeds * 0.35) return 'limited';
  return 'available';
}

function formatStartingPrice(rent: number | null): string {
  if (rent === null) return 'Contact for pricing';
  return `From Rs. ${rent.toLocaleString('en-IN')} / month`;
}

export function toStayCardData(item: PublicStayListItem): StayCardData {
  return {
    slug: item.identifier,
    name: item.name,
    cityName: item.city ?? 'STAYCT city',
    locality: item.locality ?? item.addressLine1,
    category: item.category,
    availability: deriveAvailability(item.availableBeds, item.totalBeds),
    availabilityLabel: item.availabilityLabel,
    startingPrice: formatStartingPrice(item.startingFromRent),
    summary: item.amenities.length > 0 ? `${item.amenities.slice(0, 3).join(', ')} near ${item.locality ?? item.city ?? 'the area'}.` : `Managed by ${item.organizationName}.`,
    highlights: item.amenities.slice(0, 3),
  };
}
