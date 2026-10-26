import { env } from '@/config/env';
import type { PublicStayDetail, PublicStayListResponse } from '@/types/public-stay';

const API_PREFIX = '/api/v1';

export class PublicApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'PublicApiError';
  }
}

export class PublicApiNotFoundError extends PublicApiError {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = 'PublicApiNotFoundError';
  }
}

type ApiEnvelope<T> = { success: true; message: string; data: T } | { success: false; error: string };

export type PublicPropertiesQuery = Readonly<{
  search?: string;
  city?: string;
  locality?: string;
  category?: string;
  availability?: 'available' | 'limited' | 'waitlist';
  sortBy?: 'recommended' | 'price-low' | 'price-high' | 'city';
  page?: number;
  limit?: number;
}>;

function requireApiBaseUrl(): string {
  if (!env.publicApiBaseUrl) {
    throw new PublicApiError('Public API base URL is not configured (NEXT_PUBLIC_API_BASE_URL).', 500);
  }
  return env.publicApiBaseUrl;
}

function buildQueryString(query: PublicPropertiesQuery): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') continue;
    params.set(key, String(value));
  }

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

async function readEnvelope<T>(response: Response): Promise<T> {
  let body: ApiEnvelope<T> | null = null;

  try {
    body = (await response.json()) as ApiEnvelope<T>;
  } catch {
    body = null;
  }

  if (response.status === 404) {
    throw new PublicApiNotFoundError(body && !body.success ? body.error : 'Not found');
  }

  if (!response.ok || !body || !body.success) {
    const message = body && !body.success ? body.error : `Request failed with status ${response.status}`;
    throw new PublicApiError(message, response.status);
  }

  return body.data;
}

/**
 * Search page always reads dynamic query params, so every request is fresh — no benefit to caching here.
 */
export async function getPublicProperties(query: PublicPropertiesQuery): Promise<PublicStayListResponse> {
  const baseUrl = requireApiBaseUrl();
  const response = await fetch(`${baseUrl}${API_PREFIX}/public/properties${buildQueryString(query)}`, {
    cache: 'no-store',
  });

  return readEnvelope<PublicStayListResponse>(response);
}

/**
 * Detail pages revalidate every 30s so a freshly approved listing shows up without needing a full redeploy,
 * while still allowing Next to serve a cached response for concurrent requests within that window.
 */
export async function getPublicProperty(identifier: string): Promise<PublicStayDetail> {
  const baseUrl = requireApiBaseUrl();
  const response = await fetch(`${baseUrl}${API_PREFIX}/public/properties/${encodeURIComponent(identifier)}`, {
    next: { revalidate: 30 },
  });

  return readEnvelope<PublicStayDetail>(response);
}
