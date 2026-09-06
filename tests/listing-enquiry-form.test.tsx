import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { PublicApiError, submitDiscoveryListingEnquiry } from '@/services/public-api';

import {
  ENQUIRY_GENERIC_FAILURE_MESSAGE,
  ENQUIRY_RATE_LIMIT_MESSAGE,
  ENQUIRY_SUCCESS_MESSAGE,
  buildListingEnquiryPayload,
  createInitialListingEnquiryFormValues,
  readListingEnquiryFormValues,
  submitListingEnquiryForm,
  validateListingEnquiryForm,
} from '../src/app/(site)/stays/[slug]/enquiry';
import { ListingEnquiryFormView } from '../src/app/(site)/stays/[slug]/listing-enquiry-form-view';

process.env.NEXT_PUBLIC_API_BASE_URL ??= 'http://localhost:4000/api/v1';
process.env.NEXT_PUBLIC_SITE_URL ??= 'http://localhost:3000';

function makeValidValues(
  overrides: Partial<ReturnType<typeof createInitialListingEnquiryFormValues>> = {},
): ReturnType<typeof createInitialListingEnquiryFormValues> {
  return {
    ...createInitialListingEnquiryFormValues(),
    name: 'Rahul Sharma',
    phone: '9000000001',
    ...overrides,
  };
}

function makeFormData(values: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
}

test('renders the listing enquiry form without WhatsApp send state', () => {
  const html = renderToStaticMarkup(
    <ListingEnquiryFormView
      listingTitle="Powai Co-living House"
      status="idle"
      message={null}
      fieldErrors={{}}
      onSubmit={() => undefined}
    />,
  );

  assert.match(html, /Send enquiry/);
  assert.match(html, /Name/);
  assert.match(html, /Phone Number/);
  assert.doesNotMatch(html, /WhatsApp/);
});

test('shows enquiry success and error states', () => {
  const success = renderToStaticMarkup(
    <ListingEnquiryFormView
      listingTitle="Powai Co-living House"
      status="success"
      message={ENQUIRY_SUCCESS_MESSAGE}
      fieldErrors={{}}
      onSubmit={() => undefined}
    />,
  );
  assert.match(success, /We received your enquiry/);
  assert.match(success, /Your enquiry has been sent/);

  const error = renderToStaticMarkup(
    <ListingEnquiryFormView
      listingTitle="Powai Co-living House"
      status="error"
      message={ENQUIRY_GENERIC_FAILURE_MESSAGE}
      fieldErrors={{}}
      onSubmit={() => undefined}
    />,
  );
  assert.match(error, /Something went wrong/);
  assert.match(error, /Send enquiry/);

  const submitting = renderToStaticMarkup(
    <ListingEnquiryFormView
      listingTitle="Powai Co-living House"
      status="submitting"
      message={null}
      fieldErrors={{}}
      onSubmit={() => undefined}
    />,
  );
  assert.match(submitting, /Sending\.\.\./);
  assert.match(submitting, /disabled/);
});

test('validates required enquiry fields', () => {
  const errors = validateListingEnquiryForm(createInitialListingEnquiryFormValues());
  assert.equal(errors.name, 'Name is required.');
  assert.equal(errors.phone, 'Phone Number is required.');

  const invalidPhone = validateListingEnquiryForm(makeValidValues({ phone: '919000000001' }));
  assert.equal(invalidPhone.phone, 'Enter a valid 10-digit Indian mobile number.');
});

test('maps the enquiry form into the backend payload', () => {
  assert.deepEqual(buildListingEnquiryPayload(makeValidValues({ name: ' Rahul Sharma ' })), {
    name: 'Rahul Sharma',
    phone: '9000000001',
  });

  const values = readListingEnquiryFormValues(
    makeFormData({
      name: ' Rahul Sharma ',
      phone: '9000000001',
    }),
  );
  assert.equal(values.name, ' Rahul Sharma ');
  assert.equal(values.phone, '9000000001');
});

test('posts listing enquiries to the public discovery endpoint', async () => {
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
          id: '00000000-0000-4000-8000-000000000099',
          listingId: '00000000-0000-4000-8000-000000000001',
          createdAt: '2026-09-04T08:00:00.000Z',
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
    const result = await submitDiscoveryListingEnquiry('powai-coliving-house', {
      name: 'Rahul Sharma',
      phone: '9000000001',
    });

    assert.equal(capturedUrl, 'http://localhost:4000/api/v1/public/discovery/listings/powai-coliving-house/enquiries');
    assert.equal(capturedMethod, 'POST');
    assert.deepEqual(JSON.parse(capturedBody), {
      name: 'Rahul Sharma',
      phone: '9000000001',
    });
    assert.equal(result.id, '00000000-0000-4000-8000-000000000099');
  } finally {
    global.fetch = originalFetch;
  }
});

test('handles enquiry success, rate-limit, and failure outcomes', async () => {
  const validValues = makeValidValues();

  const success = await submitListingEnquiryForm('powai-coliving-house', validValues, async () => ({
    id: '00000000-0000-4000-8000-000000000099',
    listingId: '00000000-0000-4000-8000-000000000001',
    createdAt: '2026-09-04T08:00:00.000Z',
  }));
  assert.equal(success.status, 'success');
  assert.equal(success.message, ENQUIRY_SUCCESS_MESSAGE);

  const rateLimited = await submitListingEnquiryForm('powai-coliving-house', validValues, async () => {
    throw new PublicApiError(429, 'rate limited');
  });
  assert.equal(rateLimited.status, 'error');
  assert.equal(rateLimited.message, ENQUIRY_RATE_LIMIT_MESSAGE);

  const apiValidation = await submitListingEnquiryForm('powai-coliving-house', validValues, async () => {
    throw new PublicApiError(400, 'internal field slug_mismatch');
  });
  assert.equal(apiValidation.status, 'error');
  assert.equal(apiValidation.message, 'Please review your details and try again.');
  assert.doesNotMatch(apiValidation.message, /slug_mismatch/);

  const genericFailure = await submitListingEnquiryForm('powai-coliving-house', validValues, async () => {
    throw new Error('boom');
  });
  assert.equal(genericFailure.status, 'error');
  assert.equal(genericFailure.message, ENQUIRY_GENERIC_FAILURE_MESSAGE);
});
