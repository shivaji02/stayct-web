import { PublicApiError, submitDiscoveryListingEnquiry } from '@/services/public-api';
import type {
  PublicDiscoveryListingEnquiryInput,
  PublicDiscoveryListingEnquiryResult,
} from '@/types/discovery';

export const ENQUIRY_SUCCESS_MESSAGE = 'Your enquiry has been sent. The listing team will follow up with you.';

export const ENQUIRY_RATE_LIMIT_MESSAGE = 'Too many enquiries right now. Please wait a minute and try again.';

export const ENQUIRY_GENERIC_FAILURE_MESSAGE = 'Something went wrong. Please try again.';

export type ListingEnquiryFormValues = Readonly<{
  name: string;
  phone: string;
}>;

export type ListingEnquiryFieldErrors = Partial<Record<keyof ListingEnquiryFormValues, string>> & {
  form?: string;
};

export type ListingEnquirySubmissionOutcome =
  | Readonly<{
      status: 'success';
      message: string;
      result: PublicDiscoveryListingEnquiryResult;
    }>
  | Readonly<{
      status: 'validation';
      fieldErrors: ListingEnquiryFieldErrors;
    }>
  | Readonly<{
      status: 'error';
      message: string;
    }>;

function readString(formData: FormData, name: keyof ListingEnquiryFormValues): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

function isIndianMobileNumber(value: string): boolean {
  const digits = value.trim().replace(/\D/g, '');
  return digits.length === 10;
}

export function createInitialListingEnquiryFormValues(): ListingEnquiryFormValues {
  return {
    name: '',
    phone: '',
  };
}

export function readListingEnquiryFormValues(formData: FormData): ListingEnquiryFormValues {
  return {
    name: readString(formData, 'name'),
    phone: readString(formData, 'phone'),
  };
}

export function validateListingEnquiryForm(values: ListingEnquiryFormValues): ListingEnquiryFieldErrors {
  const errors: ListingEnquiryFieldErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();

  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2 || name.length > 120) {
    errors.name = 'Name must be between 2 and 120 characters.';
  }

  if (!phone) {
    errors.phone = 'Phone Number is required.';
  } else if (!isIndianMobileNumber(phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  return errors;
}

export function buildListingEnquiryPayload(values: ListingEnquiryFormValues): PublicDiscoveryListingEnquiryInput {
  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
  };
}

export function mapEnquiryFailureMessage(error: unknown): string {
  if (error instanceof PublicApiError) {
    if (error.status === 429) {
      return ENQUIRY_RATE_LIMIT_MESSAGE;
    }
    if (error.status === 400) {
      return 'Please review your details and try again.';
    }
    if (error.status === 0) {
      return error.message || ENQUIRY_GENERIC_FAILURE_MESSAGE;
    }
    return ENQUIRY_GENERIC_FAILURE_MESSAGE;
  }

  return ENQUIRY_GENERIC_FAILURE_MESSAGE;
}

export async function submitListingEnquiryForm(
  slug: string,
  values: ListingEnquiryFormValues,
  submit = submitDiscoveryListingEnquiry,
): Promise<ListingEnquirySubmissionOutcome> {
  const fieldErrors = validateListingEnquiryForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'validation',
      fieldErrors,
    };
  }

  const payload = buildListingEnquiryPayload(values);

  try {
    const result = await submit(slug, payload);
    return {
      status: 'success',
      message: ENQUIRY_SUCCESS_MESSAGE,
      result,
    };
  } catch (error) {
    return {
      status: 'error',
      message: mapEnquiryFailureMessage(error),
    };
  }
}
