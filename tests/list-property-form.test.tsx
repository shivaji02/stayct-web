import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { PublicApiError, submitPublicDiscoverySubmission } from '@/services/public-api';

import { ListPropertyFormView } from '../src/app/(site)/list-property/list-property-form-view';
import {
  DISCOVERY_CATEGORY_OPTIONS,
  DISCOVERY_CITY_OPTIONS,
  DISCOVERY_GENDER_OPTIONS,
  buildPublicDiscoverySubmissionPayload,
  createInitialListPropertyFormValues,
  DUPLICATE_MESSAGE,
  GENERIC_FAILURE_MESSAGE,
  RATE_LIMIT_MESSAGE,
  readListPropertyFormValues,
  SUCCESS_MESSAGE,
  submitListPropertyForm,
  validateListPropertyForm,
} from '../src/app/(site)/list-property/submission';

function makeValidValues(
  overrides: Partial<ReturnType<typeof createInitialListPropertyFormValues>> = {},
): ReturnType<typeof createInitialListPropertyFormValues> {
  return {
    ...createInitialListPropertyFormValues(),
    title: 'Sri Lakshmi PG',
    businessName: 'Sai Hostels',
    phone: '9000000001',
    category: 'PG',
    genderPreference: 'UNISEX',
    addressLine1: '12 Main Road, Madhapur',
    city: 'Hyderabad',
    cityOther: '',
    startingPrice: '12500',
    description: 'Near metro, food available, Wi-Fi included.',
    ...overrides,
  } as ReturnType<typeof createInitialListPropertyFormValues>;
}

function makeFormData(values: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
}

test('renders the simplified list-property form and omits removed fields', () => {
  const html = renderToStaticMarkup(
    <ListPropertyFormView
      status="idle"
      duplicate={false}
      message={null}
      fieldErrors={{}}
      citySelection=""
      onCitySelectionChange={() => undefined}
      onSubmit={() => undefined}
    />,
  );

  assert.match(html, /Property \/ Hostel Name/);
  assert.match(html, /Owner \/ Business Name/);
  assert.match(html, /Property Type/);
  assert.match(html, /Property For/);
  assert.match(html, /City/);
  assert.match(html, /Submit for Review/);
  assert.match(html, /Hyderabad/);
  assert.match(html, /Bengaluru/);
  assert.match(html, /Other/);
  assert.match(html, /Individual Room/);
  assert.match(html, /Rental Room/);
  assert.match(html, /Family/);
  assert.doesNotMatch(html, /WhatsApp Number/);
  assert.doesNotMatch(html, /Locality/);
  assert.doesNotMatch(html, /State/);
  assert.doesNotMatch(html, /Latitude/);
  assert.doesNotMatch(html, /Longitude/);
  assert.doesNotMatch(html, /Availability/);
});

test('reveals the city text field when Other is selected', () => {
  const html = renderToStaticMarkup(
    <ListPropertyFormView
      status="idle"
      duplicate={false}
      message={null}
      fieldErrors={{}}
      citySelection="OTHER"
      onCitySelectionChange={() => undefined}
      onSubmit={() => undefined}
    />,
  );

  assert.match(html, /City name/);
  assert.match(html, /Enter your city/);
});

test('shows the success confirmation state', () => {
  const html = renderToStaticMarkup(
    <ListPropertyFormView
      status="success"
      duplicate={false}
      message={SUCCESS_MESSAGE}
      fieldErrors={{}}
      citySelection=""
      onCitySelectionChange={() => undefined}
      onSubmit={() => undefined}
    />,
  );

  assert.match(html, /Your property has been submitted for review\./);
  assert.match(html, /Browse Properties/);
  assert.match(html, /Back to Home/);
});

test('shows the disabled submitting state', () => {
  const html = renderToStaticMarkup(
    <ListPropertyFormView
      status="submitting"
      duplicate={false}
      message={null}
      fieldErrors={{}}
      citySelection=""
      onCitySelectionChange={() => undefined}
      onSubmit={() => undefined}
    />,
  );

  assert.match(html, /Submitting\.\.\./);
  assert.match(html, /disabled/);
});

test('validates required fields and simplified constraints', () => {
  const errors = validateListPropertyForm(createInitialListPropertyFormValues());

  assert.equal(errors.title, 'Property / Hostel Name is required.');
  assert.equal(errors.businessName, 'Owner / Business Name is required.');
  assert.equal(errors.phone, 'Phone Number is required.');
  assert.equal(errors.category, 'Property Type is required.');
  assert.equal(errors.addressLine1, 'Full Address is required.');
  assert.equal(errors.city, 'City is required.');
  assert.equal(errors.startingPrice, 'Starting Rent is required.');
  assert.equal(errors.description, undefined);

  const invalidPhone = validateListPropertyForm(makeValidValues({ phone: '919000000001' }));
  assert.equal(invalidPhone.phone, 'Enter a valid 10-digit Indian mobile number.');
});

test('maps the simplified form into the backend payload', () => {
  const payload = buildPublicDiscoverySubmissionPayload(makeValidValues({ city: 'OTHER', cityOther: 'Visakhapatnam' }));

  assert.deepEqual(payload, {
    title: 'Sri Lakshmi PG',
    businessName: 'Sai Hostels',
    phone: '9000000001',
    category: 'PG',
    genderPreference: 'UNISEX',
    addressLine1: '12 Main Road, Madhapur',
    city: 'Visakhapatnam',
    startingPrice: 12500,
    description: 'Near metro, food available, Wi-Fi included.',
    availabilityStatus: 'CONTACT_FOR_AVAILABILITY',
  });
});

test('reads the simplified form data into values', () => {
  const values = readListPropertyFormValues(
    makeFormData({
      title: ' Sri Lakshmi PG ',
      businessName: 'Sai Hostels',
      phone: '9000000001',
      category: 'PG',
      genderPreference: '',
      addressLine1: '12 Main Road, Madhapur',
      city: 'OTHER',
      cityOther: 'Visakhapatnam',
      startingPrice: '12500',
      description: 'Near metro, food available, Wi-Fi included.',
    }),
  );

  assert.equal(values.city, 'OTHER');
  assert.equal(values.cityOther, 'Visakhapatnam');
  assert.equal(values.genderPreference, 'UNISEX');
});

test('keeps the public discovery endpoint and payload clean', async () => {
  const originalFetch = global.fetch;
  let capturedUrl = '';
  let capturedMethod = '';
  let capturedBody = '';

  global.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    capturedUrl = String(input);
    capturedMethod = init?.method ?? 'GET';
    capturedBody = typeof init?.body === 'string' ? init.body : '';

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          id: '00000000-0000-4000-8000-000000000001',
          slug: 'sri-lakshmi-pg-madhapur',
          title: 'Sri Lakshmi PG',
          publishStatus: 'SUBMITTED',
          source: 'PUBLIC_WEB',
          duplicate: false,
        },
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }) as typeof fetch;

  try {
    const result = await submitPublicDiscoverySubmission({
      title: 'Sri Lakshmi PG',
      businessName: 'Sai Hostels',
      phone: '9000000001',
      category: 'PG',
      genderPreference: 'UNISEX',
      addressLine1: '12 Main Road, Madhapur',
      city: 'Hyderabad',
      startingPrice: 12500,
      availabilityStatus: 'CONTACT_FOR_AVAILABILITY',
    });

    assert.equal(capturedUrl, 'http://localhost:4000/api/v1/public/discovery/submissions');
    assert.equal(capturedMethod, 'POST');
    assert.deepEqual(JSON.parse(capturedBody), {
      title: 'Sri Lakshmi PG',
      businessName: 'Sai Hostels',
      phone: '9000000001',
      category: 'PG',
      genderPreference: 'UNISEX',
      addressLine1: '12 Main Road, Madhapur',
      city: 'Hyderabad',
      startingPrice: 12500,
      availabilityStatus: 'CONTACT_FOR_AVAILABILITY',
    });
    assert.equal(result.duplicate, false);
    assert.equal(result.publishStatus, 'SUBMITTED');
  } finally {
    global.fetch = originalFetch;
  }
});

test('handles successful, duplicate, rate-limit, and failure outcomes', async () => {
  const validValues = makeValidValues();

  const success = await submitListPropertyForm(validValues, async () => ({
    id: '00000000-0000-4000-8000-000000000002',
    slug: 'sri-lakshmi-pg-madhapur',
    title: 'Sri Lakshmi PG',
    publishStatus: 'SUBMITTED',
    source: 'PUBLIC_WEB',
    duplicate: false,
  }));
  assert.equal(success.status, 'success');
  assert.equal(success.message, SUCCESS_MESSAGE);

  const duplicate = await submitListPropertyForm(validValues, async () => ({
    id: '00000000-0000-4000-8000-000000000003',
    slug: 'sri-lakshmi-pg-madhapur',
    title: 'Sri Lakshmi PG',
    publishStatus: 'SUBMITTED',
    source: 'PUBLIC_WEB',
    duplicate: true,
  }));
  assert.equal(duplicate.status, 'success');

  const duplicateConflict = await submitListPropertyForm(validValues, async () => {
    throw new PublicApiError(409, 'already received recently');
  });
  assert.equal(duplicateConflict.status, 'duplicate');
  assert.equal(duplicateConflict.message, DUPLICATE_MESSAGE);

  const rateLimited = await submitListPropertyForm(validValues, async () => {
    throw new PublicApiError(429, 'rate limited');
  });
  assert.equal(rateLimited.status, 'rate-limit');
  assert.equal(rateLimited.message, RATE_LIMIT_MESSAGE);

  const apiValidation = await submitListPropertyForm(validValues, async () => {
    throw new PublicApiError(400, 'Invalid input. Please check your details.');
  });
  assert.equal(apiValidation.status, 'error');
  assert.equal(apiValidation.message, 'Invalid input. Please check your details.');

  const genericFailure = await submitListPropertyForm(validValues, async () => {
    throw new Error('boom');
  });
  assert.equal(genericFailure.status, 'error');
  assert.equal(genericFailure.message, GENERIC_FAILURE_MESSAGE);
});

test('lists the supported finite dropdown options', () => {
  assert.deepEqual(
    DISCOVERY_CATEGORY_OPTIONS.map((option) => option.value),
    ['PG', 'HOSTEL', 'CO_LIVING', 'SHARED_FLAT', 'RENTAL_ROOM', 'INDIVIDUAL_ROOM'],
  );
  assert.deepEqual(
    DISCOVERY_GENDER_OPTIONS.map((option) => option.value),
    ['UNISEX', 'MENS', 'WOMENS', 'CO_LIVING', 'FAMILY'],
  );
  assert.ok(DISCOVERY_CITY_OPTIONS.some((option) => option.value === 'OTHER'));
  assert.ok(DISCOVERY_CATEGORY_OPTIONS.some((option) => option.label === 'Individual Room'));
  assert.ok(DISCOVERY_CATEGORY_OPTIONS.some((option) => option.label === 'Rental Room'));
  assert.ok(DISCOVERY_GENDER_OPTIONS.some((option) => option.label === 'Family'));
});
