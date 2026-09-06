import Link from 'next/link';
import type {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  InputHTMLAttributes,
} from 'react';

import { ROUTES } from '@/constants/routes';

import {
  DISCOVERY_CATEGORY_OPTIONS,
  DISCOVERY_CITY_OPTIONS,
  DISCOVERY_GENDER_OPTIONS,
  type ListPropertyFieldErrors,
  type ListPropertyFormValues,
  SUCCESS_MESSAGE,
} from './submission';

type ListPropertyFormViewProps = Readonly<{
  status: 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';
  duplicate: boolean;
  message: string | null;
  fieldErrors: ListPropertyFieldErrors;
  citySelection: string;
  onCitySelectionChange: ChangeEventHandler<HTMLSelectElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[13px] font-medium text-rose-700">{message}</p>;
}

type InputShellProps = Readonly<{
  label: string;
  name: keyof ListPropertyFormValues;
  fieldErrors: ListPropertyFieldErrors;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  placeholder?: string;
  maxLength?: number;
  digitsOnly?: boolean;
  min?: string | number;
  step?: string;
  prefix?: string;
  textarea?: boolean;
  rows?: number;
}>;

function InputShell({
  label,
  name,
  fieldErrors,
  required = false,
  disabled = false,
  type = 'text',
  inputMode,
  placeholder,
  maxLength,
  digitsOnly = false,
  min,
  step,
  prefix,
  textarea = false,
  rows,
}: InputShellProps) {
  const handleInput = digitsOnly
    ? (event: FormEvent<HTMLInputElement>) => {
        const target = event.currentTarget;
        const digits = target.value.replace(/\D/g, '').slice(0, maxLength ?? 10);
        if (target.value !== digits) {
          target.value = digits;
        }
      }
    : undefined;

  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
        {label}
        {required ? ' *' : ''}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={rows ?? 4}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
        />
      ) : prefix ? (
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-stayct-green-medium">
            {prefix}
          </span>
          <input
            name={name}
            type={type}
            inputMode={inputMode}
            pattern={digitsOnly ? '[0-9]*' : undefined}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            min={min}
            step={step}
            onInput={handleInput}
            className="w-full rounded-[16px] border border-stayct-border bg-stayct-bg-light px-8 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
          />
        </div>
      ) : (
        <input
          name={name}
          type={type}
          inputMode={inputMode}
          pattern={digitsOnly ? '[0-9]*' : undefined}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          min={min}
          step={step}
          onInput={handleInput}
          className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
        />
      )}
      <FieldError message={fieldErrors[name]} />
    </label>
  );
}

type SelectShellProps = Readonly<{
  label: string;
  name: keyof ListPropertyFormValues;
  options: readonly { value: string; label: string }[];
  fieldErrors: ListPropertyFieldErrors;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
}>;

function SelectShell({
  label,
  name,
  options,
  fieldErrors,
  required = false,
  disabled = false,
  defaultValue,
  value,
  onChange,
  placeholder,
}: SelectShellProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">
        {label}
        {required ? ' *' : ''}
      </span>
      <select
        name={name}
        required={required}
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError message={fieldErrors[name]} />
    </label>
  );
}

export function ListPropertyFormView({
  status,
  duplicate,
  message,
  fieldErrors,
  citySelection,
  onCitySelectionChange,
  onSubmit,
}: ListPropertyFormViewProps) {
  if (status === 'success') {
    return (
      <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Submitted</p>
        <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
          Your property has been submitted for review.
        </h2>
        <p className="mt-4 max-w-3xl text-[16px] leading-[1.75] text-stayct-green-medium">{SUCCESS_MESSAGE}</p>
        {duplicate ? (
          <p className="mt-3 max-w-3xl rounded-[16px] bg-stayct-bg-light px-4 py-3 text-[14px] text-stayct-green-medium">
            We already had a matching submission recently, so we kept the existing record.
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={ROUTES.home} className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white">
            Back to Home
          </Link>
          <Link
            href={ROUTES.search}
            className="rounded-[12px] border border-stayct-green-dark px-5 py-3 text-[14px] font-bold text-stayct-green-dark"
          >
            Browse Properties
          </Link>
        </div>
      </section>
    );
  }

  const showCityOther = citySelection === 'OTHER';

  return (
    <section className="rounded-[28px] border border-stayct-border bg-white p-6 shadow-sm sm:p-8">
      <div className="max-w-3xl">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Third-party listing form</p>
        <h2 className="mt-3 text-[34px] font-black tracking-[-0.04em] text-stayct-green-dark">
          Send your property details for review.
        </h2>
        <p className="mt-4 text-[16px] leading-[1.75] text-stayct-green-medium">
          Keep it simple. We only ask for the details needed to review and publish your listing.
        </p>
      </div>

      {status === 'duplicate' || status === 'error' ? (
        <div className="mt-6 rounded-[18px] border border-stayct-border bg-stayct-bg-light px-5 py-4 text-[15px] leading-[1.7] text-stayct-green-medium">
          {message}
        </div>
      ) : null}

      <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
        <div className="grid gap-4 md:grid-cols-2">
          <InputShell
            label="Property / Hostel Name"
            name="title"
            required
            disabled={status === 'submitting'}
            placeholder="Sri Lakshmi PG"
            fieldErrors={fieldErrors}
          />
          <InputShell
            label="Owner / Business Name"
            name="businessName"
            required
            disabled={status === 'submitting'}
            placeholder="Sai Hostels"
            fieldErrors={fieldErrors}
          />
          <div className="md:col-span-2">
          <InputShell
            label="Phone Number"
            name="phone"
            type="tel"
            required
            disabled={status === 'submitting'}
            placeholder="10-digit Indian mobile number"
            inputMode="numeric"
            maxLength={10}
            digitsOnly
            fieldErrors={fieldErrors}
          />
          </div>
          <SelectShell
            label="Property Type"
            name="category"
            required
            disabled={status === 'submitting'}
            placeholder="Choose a property type"
            options={DISCOVERY_CATEGORY_OPTIONS}
            fieldErrors={fieldErrors}
          />
          <SelectShell
            label="Property For"
            name="genderPreference"
            disabled={status === 'submitting'}
            options={DISCOVERY_GENDER_OPTIONS}
            defaultValue="UNISEX"
            fieldErrors={fieldErrors}
          />
          <div className="md:col-span-2">
            <InputShell
              label="Full Address"
              name="addressLine1"
              required
              disabled={status === 'submitting'}
              placeholder="Building, street, area and landmark"
              fieldErrors={fieldErrors}
            />
          </div>
          <SelectShell
            label="City"
            name="city"
            required
            disabled={status === 'submitting'}
            placeholder="Choose a city"
            options={DISCOVERY_CITY_OPTIONS}
            value={citySelection}
            onChange={onCitySelectionChange}
            fieldErrors={fieldErrors}
          />
          <InputShell
            label="Starting Rent"
            name="startingPrice"
            type="text"
            required
            disabled={status === 'submitting'}
            inputMode="numeric"
            placeholder="8,000 / month"
            prefix="₹"
            fieldErrors={fieldErrors}
          />
          {showCityOther ? (
            <div className="md:col-span-2">
              <InputShell
                label="City name"
                name="cityOther"
                required
                disabled={status === 'submitting'}
                placeholder="Enter your city"
                fieldErrors={fieldErrors}
              />
            </div>
          ) : null}
          <div className="md:col-span-2">
            <InputShell
              label="About Your Property"
              name="description"
              disabled={status === 'submitting'}
              placeholder="Near metro, food available, Wi-Fi included..."
              textarea
              rows={3}
              fieldErrors={fieldErrors}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-[16px] bg-stayct-green-dark px-6 py-4 text-[15px] font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </form>
    </section>
  );
}
