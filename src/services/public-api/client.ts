import { env } from '@/config/env';
import type {
  DiscoveryListingDetail,
  DiscoveryListingsQuery,
  DiscoveryListingsResponse,
  PublicDiscoveryListingEnquiryInput,
  PublicDiscoveryListingEnquiryResult,
  PublicDiscoverySubmissionInput,
  PublicDiscoverySubmissionResult,
} from '@/types/discovery';
import type { PropertyDetail, PropertyListResponse, PropertyQuery } from '@/types/property';
import { PUBLIC_API_PATHS } from './contracts';

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
};

type QueryValue = string | number | boolean | null | undefined;

export class PublicApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'PublicApiError';
  }
}

const API_BASE = env.publicApiBaseUrl;

function resolveBaseUrl() {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL or API_BASE_URL is required to load public listings.');
  }
  return API_BASE;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    const text = await response.text();
    return text ? text : null;
  }

  try {
    return await response.json();
  } catch {
    throw new PublicApiError(response.status, 'Server returned invalid JSON');
  }
}

function unwrapPayload<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'success' in body && 'data' in body) {
    return (body as ApiEnvelope<T>).data;
  }
  return body as T;
}

type PublicFetchOptions = Readonly<{
  method?: 'GET' | 'POST';
  body?: unknown;
}>;

async function publicFetch<T>(path: string, options: PublicFetchOptions = {}): Promise<T> {
  const method = options.method ?? 'GET';
  const url = `${resolveBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
  const hasBody = options.body !== undefined;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      },
      ...(hasBody ? { body: JSON.stringify(options.body) } : {}),
    });
  } catch {
    throw new PublicApiError(0, 'Network error. Check your connection and try again.');
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await parseResponseBody(response);
      if (body && typeof body === 'object') {
        const record = body as { error?: string; message?: string; code?: string; errorCode?: string };
        message = record.error || record.message || message;
        throw new PublicApiError(response.status, message, record.code || record.errorCode);
      }
    } catch (err) {
      if (err instanceof PublicApiError) throw err;
    }
    throw new PublicApiError(response.status, message);
  }

  const json = await parseResponseBody(response);
  return unwrapPayload<T>(json);
}

function buildQuery(params: Record<string, QueryValue>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    qs.set(key, String(value));
  }
  const suffix = qs.toString();
  return suffix ? `?${suffix}` : '';
}

export async function getPublicProperties(query: PropertyQuery = {}): Promise<PropertyListResponse> {
  return publicFetch<PropertyListResponse>(`/public/properties${buildQuery(query as Record<string, QueryValue>)}`);
}

export async function getPublicProperty(identifier: string): Promise<PropertyDetail> {
  return publicFetch<PropertyDetail>(`/public/properties/${encodeURIComponent(identifier)}`);
}

export async function getPublicPropertySlugs(query: PropertyQuery = {}): Promise<string[]> {
  const page = await getPublicProperties({ ...query, page: 1, limit: 100 });
  return page.items.map((item) => item.identifier);
}

export async function getDiscoveryListings(query: DiscoveryListingsQuery = {}): Promise<DiscoveryListingsResponse> {
  return publicFetch<DiscoveryListingsResponse>(
    `${PUBLIC_API_PATHS.discoveryListings}${buildQuery(query as Record<string, QueryValue>)}`,
  );
}

export async function getDiscoveryListing(slug: string): Promise<DiscoveryListingDetail> {
  return publicFetch<DiscoveryListingDetail>(PUBLIC_API_PATHS.discoveryListingBySlug(encodeURIComponent(slug)));
}

export async function getDiscoveryListingSlugs(query: DiscoveryListingsQuery = {}): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getDiscoveryListings({ ...query, page, limit: 100 });
    slugs.push(...result.items.map((item) => item.slug));
    totalPages = result.totalPages;
    page += 1;
  } while (page <= totalPages && page <= 20);

  return slugs;
}

export async function submitPublicDiscoverySubmission(
  input: PublicDiscoverySubmissionInput,
): Promise<PublicDiscoverySubmissionResult> {
  return publicFetch<PublicDiscoverySubmissionResult>(PUBLIC_API_PATHS.discoverySubmissions, {
    method: 'POST',
    body: input,
  });
}

export async function submitDiscoveryListingEnquiry(
  slug: string,
  input: PublicDiscoveryListingEnquiryInput,
): Promise<PublicDiscoveryListingEnquiryResult> {
  return publicFetch<PublicDiscoveryListingEnquiryResult>(PUBLIC_API_PATHS.discoveryListingEnquiry(encodeURIComponent(slug)), {
    method: 'POST',
    body: input,
  });
}
