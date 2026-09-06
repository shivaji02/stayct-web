import type { DiscoveryCategory } from '@/types/discovery';

export type StayCategorySlug = 'pg' | 'hostel' | 'co-living' | 'shared-flat' | 'rental-room' | 'individual-room';

export const CATEGORY_SLUG_TO_API: Record<StayCategorySlug, DiscoveryCategory> = {
  pg: 'PG',
  hostel: 'HOSTEL',
  'co-living': 'CO_LIVING',
  'shared-flat': 'SHARED_FLAT',
  'rental-room': 'RENTAL_ROOM',
  'individual-room': 'INDIVIDUAL_ROOM',
};

export const CATEGORY_API_TO_SLUG: Record<DiscoveryCategory, StayCategorySlug> = {
  PG: 'pg',
  HOSTEL: 'hostel',
  CO_LIVING: 'co-living',
  SHARED_FLAT: 'shared-flat',
  RENTAL_ROOM: 'rental-room',
  INDIVIDUAL_ROOM: 'individual-room',
};

export type StayCategory = Readonly<{
  slug: StayCategorySlug;
  name: string;
  shortDescription: string;
  description: string;
  bestFor: readonly string[];
  searchHint: string;
}>;

export const STAY_CATEGORIES: readonly StayCategory[] = [
  {
    slug: 'pg',
    name: 'PG',
    shortDescription: 'Managed rooms with meals and daily essentials.',
    description: 'PG stays work well when you want a furnished room, clear monthly pricing, and low setup friction.',
    bestFor: ['Students moving for a semester', 'First-job relocations', 'Interns who need a quick move-in'],
    searchHint: 'Meals, furnished rooms, and practical move-ins',
  },
  {
    slug: 'hostel',
    name: 'Hostel',
    shortDescription: 'Shared living with simple budgets and community spaces.',
    description: 'Hostels suit people who want flexible occupancy, social living, and location-first shortlists.',
    bestFor: ['Students', 'Short-stay seekers', 'People prioritizing budget and community'],
    searchHint: 'Dorms, twin sharing, and social spaces',
  },
  {
    slug: 'co-living',
    name: 'Co-Living',
    shortDescription: 'Shared spaces with stronger amenity and community setup.',
    description: 'Co-living helps professionals find a more service-led shared stay with stronger common areas.',
    bestFor: ['Working professionals', 'Relocating teams', 'Longer stays with shared amenities'],
    searchHint: 'Flexible living with lounges, work areas, and community vibe',
  },
  {
    slug: 'shared-flat',
    name: 'Shared Flat',
    shortDescription: 'Apartment-style sharing with more privacy and home feel.',
    description: 'Shared flats fit renters who want private rooms with common kitchens and lower day-to-day supervision.',
    bestFor: ['Longer professional stays', 'Small groups moving together', 'People wanting apartment-style living'],
    searchHint: 'Private rooms inside a shared apartment',
  },
  {
    slug: 'rental-room',
    name: 'Rental Room',
    shortDescription: 'Independent room options with direct operator contact.',
    description: 'Rental rooms are useful when the seeker wants a simpler, direct room option without a PG or hostel format.',
    bestFor: ['Professionals with a fixed work zone', 'People comparing private room budgets', 'Seekers who prefer a direct room listing'],
    searchHint: 'Private room options with direct enquiries',
  },
  {
    slug: 'individual-room',
    name: 'Individual Room',
    shortDescription: 'A single private room listed on its own.',
    description: 'Individual rooms suit seekers who want one private room without a PG, hostel, or rental-room format.',
    bestFor: ['Solo movers wanting a private room', 'People comparing room-first stays', 'Seekers who do not need a full PG setup'],
    searchHint: 'Single private rooms listed independently',
  },
] as const;

const STAY_CATEGORY_SLUGS = new Set<string>(STAY_CATEGORIES.map((category) => category.slug));

export function isStayCategorySlug(value: string): value is StayCategorySlug {
  return STAY_CATEGORY_SLUGS.has(value);
}

export function getStayCategory(categorySlug: string) {
  return STAY_CATEGORIES.find((category) => category.slug === categorySlug);
}
