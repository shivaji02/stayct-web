import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { CITIES, CATEGORY_API_TO_SLUG, CATEGORY_SLUG_TO_API, SITE_SITEMAP_ENTRIES, STAY_CATEGORIES } from '../src/content';
import {
  buildSearchHref,
  categoryApiToSlug,
  genderPreferenceLabel,
  hasContactWhatsapp,
  listingAmenities,
  normalizeCategorySlug,
  normalizeCitySlug,
  toDiscoveryListingsQuery,
} from '../src/lib/discovery';
import { getDiscoveryListing, getDiscoveryListings, PublicApiError } from '../src/services/public-api';
import { SearchForm } from '../src/app/(site)/search/search-form';
import SearchPage from '../src/app/(site)/search/page';
import HomePage from '../src/app/(site)/page';
import CityPage from '../src/app/(site)/cities/[city]/page';
import CategoryPage from '../src/app/(site)/categories/[category]/page';
import StayPage from '../src/app/(site)/stays/[slug]/page';

process.env.NEXT_PUBLIC_API_BASE_URL ??= 'http://localhost:4000/api/v1';
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3000';

const listing = {
  id: '00000000-0000-4000-8000-000000000001',
  slug: 'powai-coliving-house',
  title: 'Powai Co-living House',
  category: 'PG' as 'PG' | 'HOSTEL' | 'CO_LIVING' | 'SHARED_FLAT' | 'RENTAL_ROOM' | 'INDIVIDUAL_ROOM',
  genderPreference: 'UNISEX' as 'MENS' | 'WOMENS' | 'CO_LIVING' | 'UNISEX' | 'FAMILY',
  addressLine1: '12 Main Road, Powai',
  locality: 'Powai',
  city: 'Mumbai',
  state: 'Maharashtra',
  latitude: null,
  longitude: null,
  startingPrice: 18500,
  availabilityStatus: 'AVAILABLE' as const,
  verificationStatus: 'VERIFIED' as const,
  contactPhone: '9000000001',
  contactWhatsapp: null as string | null,
  createdAt: '2026-01-15T10:30:00.000Z',
  amenities: [] as { id: string; name: string }[],
};

const listingPage = {
  items: [listing],
  page: 1,
  limit: 12,
  total: 1,
  totalPages: 1,
};

type MockListingDetail = Partial<typeof listing> & {
  description?: string | null;
  photos?: readonly string[];
};

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify({ success: true, data }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function mockDiscoveryFetch(options?: {
  empty?: boolean;
  fail?: boolean;
  detail?: MockListingDetail;
}) {
  const originalFetch = global.fetch;
  const captured: string[] = [];
  const detail = {
    ...listing,
    description: 'Managed co-living near Powai.',
    photos: [] as string[],
    ...options?.detail,
  };

  global.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    captured.push(url);

    if (options?.fail) {
      return new Response(JSON.stringify({ success: false, message: 'Discovery unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (/\/public\/discovery\/listings\/[^/?]+/.test(url)) {
      return jsonResponse(detail);
    }

    if (url.includes('/public/discovery/listings')) {
      return jsonResponse(options?.empty ? { items: [], page: 1, limit: 12, total: 0, totalPages: 1 } : listingPage);
    }

    throw new Error(`Unexpected fetch: ${url}`);
  }) as typeof fetch;

  return {
    captured,
    restore() {
      global.fetch = originalFetch;
    },
  };
}

function hasSelectedOption(html: string, value: string, label: string) {
  const selectedThenValue = new RegExp(`<option[^>]*selected[^>]*value="${value}"[^>]*>${label}</option>`);
  const valueThenSelected = new RegExp(`<option[^>]*value="${value}"[^>]*selected[^>]*>${label}</option>`);
  return selectedThenValue.test(html) || valueThenSelected.test(html);
}

test('normalizes city display names and category enums to canonical slugs', () => {
  assert.equal(normalizeCitySlug('Mumbai'), 'mumbai');
  assert.equal(normalizeCitySlug('MUMBAI'), 'mumbai');
  assert.equal(normalizeCitySlug('mumbai'), 'mumbai');
  assert.equal(normalizeCitySlug('Delhi NCR'), 'delhi-ncr');
  assert.equal(normalizeCategorySlug('pg'), 'pg');
  assert.equal(normalizeCategorySlug('PG'), 'pg');
  assert.equal(normalizeCategorySlug('CO_LIVING'), 'co-living');
});

test('buildSearchHref never emits city=Mumbai and always uses canonical slugs', () => {
  assert.equal(buildSearchHref({ city: 'Mumbai', category: 'PG' }), '/search?city=mumbai&category=pg');
  assert.equal(buildSearchHref({ city: 'mumbai', category: 'pg' }), '/search?city=mumbai&category=pg');
  assert.doesNotMatch(buildSearchHref({ city: 'Mumbai' }), /city=Mumbai/);
});

test('maps search URL state onto Discovery query params', () => {
  assert.deepEqual(toDiscoveryListingsQuery({ city: 'mumbai', category: 'pg', q: 'powai', area: 'powai', page: 1, limit: 12 }), {
    search: 'powai',
    city: 'Mumbai',
    locality: 'Powai',
    category: 'PG',
    page: 1,
    limit: 12,
  });
});

test('search selects show Mumbai and PG for ?city=mumbai&category=pg and update after URL changes', () => {
  const mumbaiPg = renderToStaticMarkup(
    <SearchForm q="" city="mumbai" category="pg" sort="recommended" cities={CITIES} categories={STAY_CATEGORIES} />,
  );
  assert.equal(hasSelectedOption(mumbaiPg, 'mumbai', 'Mumbai'), true);
  assert.equal(hasSelectedOption(mumbaiPg, 'pg', 'PG'), true);

  const bengaluruHostel = renderToStaticMarkup(
    <SearchForm q="" city="bengaluru" category="hostel" sort="recommended" cities={CITIES} categories={STAY_CATEGORIES} />,
  );
  assert.equal(hasSelectedOption(bengaluruHostel, 'bengaluru', 'Bengaluru'), true);
  assert.equal(hasSelectedOption(bengaluruHostel, 'hostel', 'Hostel'), true);
  assert.equal(hasSelectedOption(bengaluruHostel, 'mumbai', 'Mumbai'), false);
  assert.equal(hasSelectedOption(bengaluruHostel, 'pg', 'PG'), false);
});

test('search page keeps Mumbai + PG in sync from URL params, including display-name city values', async () => {
  const mock = mockDiscoveryFetch();
  try {
    const html = renderToStaticMarkup(
      await SearchPage({ searchParams: Promise.resolve({ city: 'mumbai', category: 'pg' }) }),
    );
    assert.equal(hasSelectedOption(html, 'mumbai', 'Mumbai'), true);
    assert.equal(hasSelectedOption(html, 'pg', 'PG'), true);
    assert.match(html, /Powai Co-living House/);
    assert.match(mock.captured[0] ?? '', /\/public\/discovery\/listings/);
    assert.match(mock.captured[0] ?? '', /city=Mumbai/);
    assert.match(mock.captured[0] ?? '', /category=PG/);
    assert.doesNotMatch(html, /\/public\/properties/);

    const renamed = renderToStaticMarkup(
      await SearchPage({ searchParams: Promise.resolve({ city: 'Mumbai', category: 'PG' }) }),
    );
    assert.equal(hasSelectedOption(renamed, 'mumbai', 'Mumbai'), true);
    assert.equal(hasSelectedOption(renamed, 'pg', 'PG'), true);
  } finally {
    mock.restore();
  }
});

test('search page renders Discovery results and an empty state without mocks', async () => {
  const withResults = mockDiscoveryFetch();
  try {
    const html = renderToStaticMarkup(await SearchPage({ searchParams: Promise.resolve({}) }));
    assert.match(html, /1 stay found/);
    assert.match(html, /Powai Co-living House/);
    assert.doesNotMatch(html, /Sri Lakshmi PG/);
  } finally {
    withResults.restore();
  }

  const empty = mockDiscoveryFetch({ empty: true });
  try {
    const html = renderToStaticMarkup(await SearchPage({ searchParams: Promise.resolve({ city: 'mumbai' }) }));
    assert.match(html, /No stay matches these filters yet/);
    assert.doesNotMatch(html, /Powai Co-living House/);
  } finally {
    empty.restore();
  }
});

test('search page shows API failure without falling back to mocks', async () => {
  const mock = mockDiscoveryFetch({ fail: true });
  try {
    const html = renderToStaticMarkup(await SearchPage({ searchParams: Promise.resolve({ city: 'mumbai', category: 'pg' }) }));
    assert.match(html, /Live listings are temporarily unavailable/);
    assert.doesNotMatch(html, /Powai Co-living House/);
    assert.doesNotMatch(html, /Sri Lakshmi PG/);
    assert.equal(hasSelectedOption(html, 'mumbai', 'Mumbai'), true);
    assert.equal(hasSelectedOption(html, 'pg', 'PG'), true);
  } finally {
    mock.restore();
  }
});

test('Discovery listing client hits the public listings endpoints', async () => {
  const mock = mockDiscoveryFetch();
  try {
    const page = await getDiscoveryListings({ city: 'Mumbai', category: 'PG', limit: 12 });
    assert.equal(page.items[0]?.title, 'Powai Co-living House');
    assert.match(mock.captured[0] ?? '', /http:\/\/localhost:4000\/api\/v1\/public\/discovery\/listings/);

    const detail = await getDiscoveryListing('powai-coliving-house');
    assert.equal(detail.slug, 'powai-coliving-house');
    assert.match(mock.captured[1] ?? '', /\/public\/discovery\/listings\/powai-coliving-house/);
  } finally {
    mock.restore();
  }
});

test('Discovery listing client surfaces API errors instead of mock data', async () => {
  const mock = mockDiscoveryFetch({ fail: true });
  try {
    await assert.rejects(() => getDiscoveryListings({ city: 'Mumbai' }), (error: unknown) => {
      assert.equal(error instanceof PublicApiError, true);
      return true;
    });
  } finally {
    mock.restore();
  }
});

test('homepage, city, and category pages load Discovery listings', async () => {
  const mock = mockDiscoveryFetch();
  try {
    const home = renderToStaticMarkup(await HomePage());
    assert.match(home, /Powai Co-living House/);
    assert.match(mock.captured[0] ?? '', /\/public\/discovery\/listings/);
    assert.doesNotMatch(mock.captured.join('\n'), /\/public\/properties/);

    const city = renderToStaticMarkup(await CityPage({ params: Promise.resolve({ city: 'mumbai' }) }));
    assert.match(city, /Powai Co-living House/);
    assert.match(city, /href="\/search\?city=mumbai"/);

    const category = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ category: 'pg' }) }));
    assert.match(category, /Powai Co-living House/);
    assert.match(category, /href="\/search\?city=mumbai&amp;category=pg"|href="\/search\?category=pg"/);
  } finally {
    mock.restore();
  }
});

test('stay detail uses Discovery by slug and emits canonical search links', async () => {
  const mock = mockDiscoveryFetch();
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.match(html, /Powai Co-living House/);
    assert.match(html, /\/search\?city=mumbai/);
    assert.match(html, /category=pg/);
    assert.doesNotMatch(html, /city=Mumbai/);
    assert.match(html, /Call listing/);
    assert.match(html, /Email enquiry/);
    assert.match(html, /Send enquiry/);
    assert.doesNotMatch(html, /WhatsApp/);
    assert.doesNotMatch(html, /Not listed/);
    assert.doesNotMatch(html, />Amenities</);
    assert.match(mock.captured[0] ?? '', /\/public\/discovery\/listings\/powai-coliving-house/);
  } finally {
    mock.restore();
  }
});

test('maps Individual Room separately from Rental Room across slug, search, and sitemap', () => {
  assert.equal(normalizeCategorySlug('individual-room'), 'individual-room');
  assert.equal(normalizeCategorySlug('INDIVIDUAL_ROOM'), 'individual-room');
  assert.equal(normalizeCategorySlug('rental-room'), 'rental-room');
  assert.equal(normalizeCategorySlug('RENTAL_ROOM'), 'rental-room');
  assert.equal(categoryApiToSlug('INDIVIDUAL_ROOM'), 'individual-room');
  assert.equal(categoryApiToSlug('RENTAL_ROOM'), 'rental-room');
  assert.equal(CATEGORY_SLUG_TO_API['individual-room'], 'INDIVIDUAL_ROOM');
  assert.equal(CATEGORY_SLUG_TO_API['rental-room'], 'RENTAL_ROOM');
  assert.equal(CATEGORY_API_TO_SLUG.INDIVIDUAL_ROOM, 'individual-room');
  assert.equal(CATEGORY_API_TO_SLUG.RENTAL_ROOM, 'rental-room');
  assert.equal(buildSearchHref({ category: 'INDIVIDUAL_ROOM' }), '/search?category=individual-room');
  assert.equal(buildSearchHref({ category: 'individual-room' }), '/search?category=individual-room');
  assert.equal(buildSearchHref({ category: 'RENTAL_ROOM' }), '/search?category=rental-room');
  assert.deepEqual(toDiscoveryListingsQuery({ category: 'individual-room' }).category, 'INDIVIDUAL_ROOM');
  assert.deepEqual(toDiscoveryListingsQuery({ category: 'rental-room' }).category, 'RENTAL_ROOM');
  assert.equal(
    STAY_CATEGORIES.some((category) => category.slug === 'individual-room' && category.name === 'Individual Room'),
    true,
  );
  assert.equal(
    STAY_CATEGORIES.some((category) => category.slug === 'rental-room' && category.name === 'Rental Room'),
    true,
  );
  assert.equal(
    SITE_SITEMAP_ENTRIES.some((entry) => entry.path === '/categories/individual-room'),
    true,
  );
  assert.equal(
    SITE_SITEMAP_ENTRIES.some((entry) => entry.path === '/categories/rental-room'),
    true,
  );
});

test('maps Family as a Property For label, not a stay category', () => {
  assert.equal(genderPreferenceLabel('FAMILY'), 'Family');
  assert.equal(genderPreferenceLabel('UNISEX'), 'Anyone');
  assert.equal(STAY_CATEGORIES.some((category) => category.name === 'Family' || String(category.slug) === 'family'), false);
});

test('stay detail renders amenities only when present', async () => {
  const withAmenities = mockDiscoveryFetch({
    detail: {
      amenities: [
        { id: 'wifi', name: 'Wi-Fi' },
        { id: 'meals', name: 'Meals' },
      ],
    },
  });
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.match(html, /Amenities/);
    assert.match(html, /Wi-Fi/);
    assert.match(html, /Meals/);
  } finally {
    withAmenities.restore();
  }

  const emptyAmenities = mockDiscoveryFetch({ detail: { amenities: [] } });
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.doesNotMatch(html, />Amenities</);
  } finally {
    emptyAmenities.restore();
  }
});

test('stay detail shows WhatsApp only when a number is present', async () => {
  const withWhatsapp = mockDiscoveryFetch({
    detail: { contactWhatsapp: '9000000099' },
  });
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.match(html, /WhatsApp/);
    assert.match(html, /https:\/\/wa\.me\/9000000099/);
    assert.match(html, /9000000099/);
    assert.doesNotMatch(html, /Not listed/);
    assert.match(html, /Call listing/);
  } finally {
    withWhatsapp.restore();
  }

  const emptyWhatsapp = mockDiscoveryFetch({
    detail: { contactWhatsapp: '   ' },
  });
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.doesNotMatch(html, /WhatsApp/);
    assert.doesNotMatch(html, /Not listed/);
  } finally {
    emptyWhatsapp.restore();
  }
});

test('stay detail labels Individual Room and Family without mixing those concepts', async () => {
  const mock = mockDiscoveryFetch({
    detail: {
      category: 'INDIVIDUAL_ROOM',
      genderPreference: 'FAMILY',
      title: 'Andheri Individual Room',
    },
  });
  try {
    const html = renderToStaticMarkup(await StayPage({ params: Promise.resolve({ slug: 'powai-coliving-house' }) }));
    assert.match(html, /Individual Room/);
    assert.match(html, /Family/);
    assert.match(html, /category=individual-room/);
    assert.doesNotMatch(html, /category=rental-room/);
    assert.doesNotMatch(html, /href="\/categories\/family"/);
  } finally {
    mock.restore();
  }
});

test('Individual Room and Rental Room category pages stay distinct', async () => {
  const individual = mockDiscoveryFetch();
  try {
    const html = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ category: 'individual-room' }) }));
    assert.match(html, /Individual Room stays/);
    assert.match(html, /href="\/search\?category=individual-room"/);
    assert.doesNotMatch(html, /href="\/search\?category=rental-room"/);
  } finally {
    individual.restore();
  }

  const rental = mockDiscoveryFetch();
  try {
    const html = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ category: 'rental-room' }) }));
    assert.match(html, /Rental Room stays/);
    assert.match(html, /href="\/search\?category=rental-room"/);
    assert.doesNotMatch(html, /href="\/search\?category=individual-room"/);
  } finally {
    rental.restore();
  }
});

test('search form and query mapping keep Mumbai + PG working after new enums', () => {
  const html = renderToStaticMarkup(
    <SearchForm q="" city="mumbai" category="pg" sort="recommended" cities={CITIES} categories={STAY_CATEGORIES} />,
  );
  assert.equal(hasSelectedOption(html, 'mumbai', 'Mumbai'), true);
  assert.equal(hasSelectedOption(html, 'pg', 'PG'), true);
  assert.match(html, /Individual Room/);
  assert.match(html, /Rental Room/);
  assert.equal(buildSearchHref({ city: 'mumbai', category: 'pg' }), '/search?city=mumbai&category=pg');
  const query = toDiscoveryListingsQuery({ city: 'mumbai', category: 'pg' });
  assert.equal(query.city, 'Mumbai');
  assert.equal(query.category, 'PG');
});

test('listing amenity and WhatsApp helpers hide empty values', () => {
  assert.deepEqual(listingAmenities([]), []);
  assert.deepEqual(listingAmenities(undefined), []);
  assert.equal(listingAmenities([{ id: 'wifi', name: 'Wi-Fi' }]).length, 1);
  assert.equal(hasContactWhatsapp(null), false);
  assert.equal(hasContactWhatsapp(''), false);
  assert.equal(hasContactWhatsapp('9000000099'), true);
});

