import { MANAGE_PROPERTY_APP_URL, ROUTES } from '@/constants/routes';

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

export function buildSearchHref({ q, city, category, area, sort, page }: SearchHrefInput) {
  const params = new URLSearchParams();

  if (q) {
    params.set('q', q);
  }

  if (city) {
    params.set('city', city);
  }

  if (category) {
    params.set('category', category);
  }

  if (area) {
    params.set('area', area);
  }

  if (sort && sort !== 'recommended') {
    params.set('sort', sort);
  }

  if (page && page > 1) {
    params.set('page', String(page));
  }

  const query = params.toString();

  return query ? `${ROUTES.search}?${query}` : ROUTES.search;
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
