'use client';

import { useState, type FormEvent } from 'react';

import { ListingEnquiryFormView } from './listing-enquiry-form-view';
import { readListingEnquiryFormValues, submitListingEnquiryForm, type ListingEnquiryFieldErrors } from './enquiry';

type ListingEnquiryFormProps = Readonly<{
  slug: string;
  listingTitle: string;
}>;

export function ListingEnquiryForm({ slug, listingTitle }: ListingEnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ListingEnquiryFieldErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    const form = event.currentTarget;
    const formValues = readListingEnquiryFormValues(new FormData(form));

    setStatus('submitting');
    setMessage(null);
    setFieldErrors({});

    const outcome = await submitListingEnquiryForm(slug, formValues);
    if (outcome.status === 'validation') {
      setFieldErrors(outcome.fieldErrors);
      setStatus('idle');
      return;
    }

    if (outcome.status === 'success') {
      setMessage(outcome.message);
      setStatus('success');
      form.reset();
      return;
    }

    setMessage(outcome.message);
    setStatus('error');
  };

  return (
    <ListingEnquiryFormView
      listingTitle={listingTitle}
      status={status}
      message={message}
      fieldErrors={fieldErrors}
      onSubmit={handleSubmit}
    />
  );
}
