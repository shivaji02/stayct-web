import { PublicApiError, submitPublicDiscoverySubmission } from '@/services/public-api';
import type {
  DiscoveryAvailabilityStatus,
  DiscoveryCategory,
  DiscoveryGenderPreference,
  PublicDiscoverySubmissionInput,
  PublicDiscoverySubmissionResult,
} from '@/types/discovery';

export const DISCOVERY_CATEGORY_OPTIONS = [
  { value: 'PG', label: 'PG' },
  { value: 'HOSTEL', label: 'Hostel' },
  { value: 'CO_LIVING', label: 'Co-living' },
  { value: 'SHARED_FLAT', label: 'Shared Flat' },
  { value: 'RENTAL_ROOM', label: 'Rental Room' },
  { value: 'INDIVIDUAL_ROOM', label: 'Individual Room' },
] as const;

export const DISCOVERY_GENDER_OPTIONS = [
  { value: 'UNISEX', label: 'Anyone' },
  { value: 'MENS', label: 'Men' },
  { value: 'WOMENS', label: 'Women' },
  { value: 'CO_LIVING', label: 'Co-living' },
  { value: 'FAMILY', label: 'Family' },
] as const;

export const DISCOVERY_CITY_OPTIONS = [
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Bengaluru', label: 'Bengaluru' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'OTHER', label: 'Other' },
] as const;

const DEFAULT_AVAILABILITY_STATUS: DiscoveryAvailabilityStatus = 'CONTACT_FOR_AVAILABILITY';
const OTHER_CITY_VALUE = 'OTHER';

export const SUCCESS_MESSAGE =
  'Your property has been submitted for review. Our StayCT team will verify the details before publishing it.';

export const DUPLICATE_MESSAGE =
  'We already received a similar submission recently. We kept that record and did not create a duplicate.';

export const RATE_LIMIT_MESSAGE = 'Too many submissions right now. Please wait a minute and try again.';

export const GENERIC_FAILURE_MESSAGE = 'Something went wrong. Please try again.';

export type ListPropertyFormValues = Readonly<{
  title: string;
  businessName: string;
  phone: string;
  category: DiscoveryCategory | '';
  genderPreference: DiscoveryGenderPreference;
  addressLine1: string;
  city: string;
  cityOther: string;
  startingPrice: string;
  description: string;
}>;

export type ListPropertyFieldErrors = Partial<Record<keyof ListPropertyFormValues, string>> & {
  form?: string;
};

export type ListPropertySubmissionOutcome =
  | Readonly<{
      status: 'success';
      duplicate: boolean;
      message: string;
      result: PublicDiscoverySubmissionResult;
    }>
  | Readonly<{
      status: 'duplicate';
      message: string;
    }>
  | Readonly<{
      status: 'validation';
      fieldErrors: ListPropertyFieldErrors;
    }>
  | Readonly<{
      status: 'rate-limit' | 'error';
      message: string;
    }>;

const CATEGORY_VALUES = new Set<DiscoveryCategory>(DISCOVERY_CATEGORY_OPTIONS.map((option) => option.value));
const GENDER_VALUES = new Set<DiscoveryGenderPreference>(DISCOVERY_GENDER_OPTIONS.map((option) => option.value));
const CITY_VALUES = new Set<string>(
  DISCOVERY_CITY_OPTIONS.map((option) => option.value).filter((value) => value !== OTHER_CITY_VALUE),
);

function readString(formData: FormData, name: keyof ListPropertyFormValues): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

function isIndianMobileNumber(value: string): boolean {
  const digits = value.trim().replace(/\D/g, '');
  return digits.length === 10;
}

function addLengthError(
  errors: ListPropertyFieldErrors,
  key: keyof ListPropertyFormValues,
  value: string,
  min: number,
  max: number,
  label: string,
) {
  const trimmed = value.trim();
  if (!trimmed) {
    errors[key] = `${label} is required.`;
    return;
  }

  if (trimmed.length < min || trimmed.length > max) {
    errors[key] = `${label} must be between ${min} and ${max} characters.`;
  }
}

export function createInitialListPropertyFormValues(): ListPropertyFormValues {
  return {
    title: '',
    businessName: '',
    phone: '',
    category: '',
    genderPreference: 'UNISEX',
    addressLine1: '',
    city: '',
    cityOther: '',
    startingPrice: '',
    description: '',
  };
}

export function readListPropertyFormValues(formData: FormData): ListPropertyFormValues {
  return {
    title: readString(formData, 'title'),
    businessName: readString(formData, 'businessName'),
    phone: readString(formData, 'phone'),
    category: readString(formData, 'category') as DiscoveryCategory | '',
    genderPreference: (readString(formData, 'genderPreference') || 'UNISEX') as DiscoveryGenderPreference,
    addressLine1: readString(formData, 'addressLine1'),
    city: readString(formData, 'city'),
    cityOther: readString(formData, 'cityOther'),
    startingPrice: readString(formData, 'startingPrice'),
    description: readString(formData, 'description'),
  };
}

export function validateListPropertyForm(values: ListPropertyFormValues): ListPropertyFieldErrors {
  const errors: ListPropertyFieldErrors = {};

  addLengthError(errors, 'title', values.title, 2, 120, 'Property / Hostel Name');
  addLengthError(errors, 'businessName', values.businessName, 2, 120, 'Owner / Business Name');
  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required.';
  } else if (!isIndianMobileNumber(values.phone)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!CATEGORY_VALUES.has(values.category as DiscoveryCategory)) {
    errors.category = 'Property Type is required.';
  }

  if (values.genderPreference && !GENDER_VALUES.has(values.genderPreference)) {
    errors.genderPreference = 'Choose a valid option for Property For.';
  }

  addLengthError(errors, 'addressLine1', values.addressLine1, 3, 300, 'Full Address');

  if (!values.city.trim()) {
    errors.city = 'City is required.';
  } else if (values.city === OTHER_CITY_VALUE) {
    addLengthError(errors, 'cityOther', values.cityOther, 2, 120, 'City name');
  } else if (!CITY_VALUES.has(values.city)) {
    errors.city = 'Choose a valid city.';
  }

  if (!values.startingPrice.trim()) {
    errors.startingPrice = 'Starting Rent is required.';
  } else {
    const startingPrice = Number(values.startingPrice);
    if (!Number.isFinite(startingPrice) || startingPrice <= 0) {
      errors.startingPrice = 'Starting Rent must be a valid positive number.';
    } else if (startingPrice > 1_000_000) {
      errors.startingPrice = 'Starting Rent must be 1,000,000 or less.';
    }
  }

  if (values.description.trim() && values.description.trim().length > 500) {
    errors.description = 'About Your Property must be 500 characters or fewer.';
  }

  return errors;
}

export function buildPublicDiscoverySubmissionPayload(values: ListPropertyFormValues): PublicDiscoverySubmissionInput {
  const payload: PublicDiscoverySubmissionInput = {
    title: values.title.trim(),
    businessName: values.businessName.trim(),
    phone: values.phone.trim(),
    category: values.category as DiscoveryCategory,
    genderPreference: values.genderPreference,
    addressLine1: values.addressLine1.trim(),
    city: values.city === OTHER_CITY_VALUE ? values.cityOther.trim() : values.city.trim(),
    startingPrice: Number(values.startingPrice.trim()),
    description: values.description.trim() || undefined,
    availabilityStatus: DEFAULT_AVAILABILITY_STATUS,
  };

  return payload;
}

export function mapSubmissionFailureMessage(error: unknown): string {
  if (error instanceof PublicApiError) {
    if (error.status === 409) {
      return DUPLICATE_MESSAGE;
    }
    if (error.status === 429) {
      return RATE_LIMIT_MESSAGE;
    }
    if (error.status === 400) {
      return error.message || 'Please review your details and try again.';
    }
    if (error.status === 0) {
      return error.message || GENERIC_FAILURE_MESSAGE;
    }
    return error.message || GENERIC_FAILURE_MESSAGE;
  }

  return GENERIC_FAILURE_MESSAGE;
}

export async function submitListPropertyForm(
  values: ListPropertyFormValues,
  submit = submitPublicDiscoverySubmission,
): Promise<ListPropertySubmissionOutcome> {
  const fieldErrors = validateListPropertyForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'validation',
      fieldErrors,
    };
  }

  const payload = buildPublicDiscoverySubmissionPayload(values);

  try {
    const result = await submit(payload);
    return {
      status: 'success',
      duplicate: result.duplicate,
      message: SUCCESS_MESSAGE,
      result,
    };
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 409) {
      return {
        status: 'duplicate',
        message: mapSubmissionFailureMessage(error),
      };
    }

    if (error instanceof PublicApiError && error.status === 429) {
      return {
        status: 'rate-limit',
        message: mapSubmissionFailureMessage(error),
      };
    }

    return {
      status: 'error',
      message: mapSubmissionFailureMessage(error),
    };
  }
}
