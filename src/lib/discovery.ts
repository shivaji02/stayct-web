import { CITIES, getCity, getPopularAreas } from '@/content/cities';
import { CATEGORY_API_TO_SLUG, CATEGORY_SLUG_TO_API, isStayCategorySlug, type StayCategorySlug } from '@/content/categories';
import { MANAGE_PROPERTY_APP_URL, ROUTES } from '@/constants/routes';
import type {
  DiscoveryAvailabilityStatus,
  DiscoveryCategory,
  DiscoveryGenderPreference,
  DiscoveryListingDetail,
  DiscoveryListingsQuery,
  DiscoveryListingsSort,
} from '@/types/discovery';

type SearchHrefInput = Readonly<{
  q?: string;
  city?: string;
  category?: string;
  area?: string;
  sort?: string;
  page?: number;
}>;

export function pickFirst(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function normalizePositiveInt(value: string | undefined, fallback = 1) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
}

export function toCanonicalSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeCitySlug(value: string | undefined | null): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const slug = toCanonicalSlug(value);
  if (!slug) {
    return undefined;
  }

  const bySlug = CITIES.find((city) => city.slug === slug);
  if (bySlug) {
    return bySlug.slug;
  }

  const byName = CITIES.find((city) => toCanonicalSlug(city.name) === slug);
  if (byName) {
    return byName.slug;
  }

  return slug;
}

export function normalizeCategorySlug(value: string | undefined | null): StayCategorySlug | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const slug = toCanonicalSlug(value);
  if (isStayCategorySlug(slug)) {
    return slug;
  }

  const enumKey = value.trim().toUpperCase().replace(/-/g, '_') as DiscoveryCategory;
  return CATEGORY_API_TO_SLUG[enumKey];
}

export function normalizeAreaSlug(value: string | undefined | null, citySlug?: string): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const slug = toCanonicalSlug(value);
  if (!slug) {
    return undefined;
  }

  const areas = getPopularAreas(citySlug);
  const match = areas.find((area) => area.slug === slug || toCanonicalSlug(area.name) === slug);
  return match?.slug ?? slug;
}

export function normalizeSearchSort(value: string | undefined | null): DiscoveryListingsSort {
  return value === 'title' ? 'title' : 'recommended';
}

export function citySlugToApiFilter(citySlug: string | undefined): string | undefined {
  if (!citySlug) {
    return undefined;
  }

  return getCity(citySlug)?.name ?? citySlug;
}

export function areaSlugToApiFilter(areaSlug: string | undefined, citySlug?: string): string | undefined {
  if (!areaSlug) {
    return undefined;
  }

  const areas = getPopularAreas(citySlug);
  const match = areas.find((area) => area.slug === areaSlug);
  return match?.name ?? areaSlug;
}

export function categorySlugToApi(categorySlug: StayCategorySlug): DiscoveryCategory {
  return CATEGORY_SLUG_TO_API[categorySlug];
}

export function categoryApiToSlug(category: DiscoveryCategory): StayCategorySlug {
  return CATEGORY_API_TO_SLUG[category];
}

export function toDiscoveryListingsQuery(input: {
  q?: string;
  city?: string;
  category?: string;
  area?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): DiscoveryListingsQuery {
  const citySlug = normalizeCitySlug(input.city);
  const categorySlug = normalizeCategorySlug(input.category);
  const areaSlug = normalizeAreaSlug(input.area, citySlug);
  const sort = normalizeSearchSort(input.sort);

  return {
    search: input.q?.trim() || undefined,
    city: citySlugToApiFilter(citySlug),
    locality: areaSlugToApiFilter(areaSlug, citySlug),
    category: categorySlug ? categorySlugToApi(categorySlug) : undefined,
    page: input.page,
    limit: input.limit,
    ...(sort === 'title' ? { sortBy: 'title', sortOrder: 'asc' as const } : {}),
  };
}

export function buildSearchHref({ q, city, category, area, sort, page }: SearchHrefInput) {
  const params = new URLSearchParams();
  const query = q?.trim();
  const citySlug = normalizeCitySlug(city);
  const categorySlug = normalizeCategorySlug(category);
  const areaSlug = normalizeAreaSlug(area, citySlug);
  const normalizedSort = normalizeSearchSort(sort);

  if (query) {
    params.set('q', query);
  }

  if (citySlug) {
    params.set('city', citySlug);
  }

  if (categorySlug) {
    params.set('category', categorySlug);
  }

  if (areaSlug) {
    params.set('area', areaSlug);
  }

  if (normalizedSort !== 'recommended') {
    params.set('sort', normalizedSort);
  }

  if (page && page > 1) {
    params.set('page', String(page));
  }

  const suffix = params.toString();

  return suffix ? `${ROUTES.search}?${suffix}` : ROUTES.search;
}

export function availabilityStatusLabel(status: DiscoveryAvailabilityStatus) {
  switch (status) {
    case 'AVAILABLE':
      return 'Available';
    case 'CURRENTLY_FULL':
      return 'Currently full';
    case 'CONTACT_FOR_AVAILABILITY':
      return 'Contact for availability';
  }
}

export function genderPreferenceLabel(value: DiscoveryGenderPreference | null) {
  switch (value) {
    case 'MENS':
      return 'Men';
    case 'WOMENS':
      return 'Women';
    case 'CO_LIVING':
      return 'Co-living';
    case 'UNISEX':
      return 'Anyone';
    case 'FAMILY':
      return 'Family';
    default:
      return null;
  }
}

export function hasContactWhatsapp(value: string | null | undefined): value is string {
  return Boolean(value?.trim());
}

export function listingAmenities(amenities: DiscoveryListingDetail['amenities'] | null | undefined) {
  if (!Array.isArray(amenities)) {
    return [];
  }

  return amenities.filter((amenity) => amenity?.name?.trim());
}

export function buildSupportEnquiryMailto(subject: string, body: string) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:support@stayct.in?subject=${encodedSubject}&body=${encodedBody}`;
}

export function getPhotoToneClasses(tone: 'sage' | 'sand' | 'mist' | 'clay') {
  const toneMap = {
    sage: 'from-emerald-200 via-emerald-100 to-white text-emerald-950',
    sand: 'from-amber-200 via-orange-100 to-white text-amber-950',
    mist: 'from-sky-200 via-slate-100 to-white text-slate-900',
    clay: 'from-rose-200 via-orange-100 to-white text-rose-950',
  } as const;

  return toneMap[tone];
}

export function isDiscoveryPath(pathname: string) {
  return (
    pathname === ROUTES.home ||
    pathname.startsWith(ROUTES.search) ||
    pathname.startsWith(ROUTES.categories) ||
    pathname.startsWith(ROUTES.stays)
  );
}

export function getManagePropertyUrl() {
  return MANAGE_PROPERTY_APP_URL;
}
