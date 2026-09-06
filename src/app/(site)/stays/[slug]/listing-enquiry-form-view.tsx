import type { FormEvent, FormEventHandler, InputHTMLAttributes } from 'react';

import {
  ENQUIRY_SUCCESS_MESSAGE,
  type ListingEnquiryFieldErrors,
  type ListingEnquiryFormValues,
} from './enquiry';

type ListingEnquiryFormViewProps = Readonly<{
  listingTitle: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string | null;
  fieldErrors: ListingEnquiryFieldErrors;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[13px] font-medium text-rose-700">{message}</p>;
}

type InputShellProps = Readonly<{
  label: string;
  name: keyof ListingEnquiryFormValues;
  fieldErrors: ListingEnquiryFieldErrors;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  placeholder?: string;
  maxLength?: number;
  digitsOnly?: boolean;
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
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        pattern={digitsOnly ? '[0-9]*' : undefined}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onInput={handleInput}
        className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
      />
      <FieldError message={fieldErrors[name]} />
    </label>
  );
}

export function ListingEnquiryFormView({
  listingTitle,
  status,
  message,
  fieldErrors,
  onSubmit,
}: ListingEnquiryFormViewProps) {
  if (status === 'success') {
    return (
      <div className="mt-8 rounded-[18px] bg-stayct-bg-light px-5 py-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Enquiry sent</p>
        <h3 className="mt-2 text-[20px] font-black tracking-[-0.03em] text-stayct-green-dark">We received your enquiry.</h3>
        <p className="mt-3 text-[15px] leading-[1.7] text-stayct-green-medium">{message ?? ENQUIRY_SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[18px] bg-stayct-bg-light px-5 py-5">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Send enquiry</p>
      <h3 className="mt-2 text-[20px] font-black tracking-[-0.03em] text-stayct-green-dark">
        Leave your details for {listingTitle}.
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-stayct-green-medium">
        Share your name and phone number. Email enquiry remains available if you prefer to write instead.
      </p>

      {status === 'error' && message ? (
        <div className="mt-4 rounded-[16px] border border-stayct-border bg-white px-4 py-3 text-[14px] leading-[1.7] text-stayct-green-medium">
          {message}
        </div>
      ) : null}

      <form className="mt-5 space-y-4" onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'}>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputShell
            label="Name"
            name="name"
            required
            disabled={status === 'submitting'}
            placeholder="Your name"
            maxLength={120}
            fieldErrors={fieldErrors}
          />
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
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-[12px] bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending...' : 'Send enquiry'}
        </button>
      </form>
    </div>
  );
}
