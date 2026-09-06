'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

import {
  readListPropertyFormValues,
  submitListPropertyForm,
  type ListPropertyFieldErrors,
} from './submission';
import { ListPropertyFormView } from './list-property-form-view';

export function ListPropertyForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ListPropertyFieldErrors>({});
  const [citySelection, setCitySelection] = useState('');

  const handleCitySelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCitySelection(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    const form = event.currentTarget;
    const formValues = readListPropertyFormValues(new FormData(form));

    setStatus('submitting');
    setMessage(null);
    setFieldErrors({});

    const outcome = await submitListPropertyForm(formValues);
    if (outcome.status === 'validation') {
      setFieldErrors(outcome.fieldErrors);
      setStatus('idle');
      return;
    }

    if (outcome.status === 'success') {
      setDuplicate(outcome.duplicate);
      setMessage(outcome.message);
      setStatus('success');
      form.reset();
      setCitySelection('');
      return;
    }

    setDuplicate(false);
    setMessage(outcome.message);
    setStatus(outcome.status === 'duplicate' ? 'duplicate' : 'error');
  };

  return (
    <ListPropertyFormView
      status={status}
      duplicate={duplicate}
      message={message}
      fieldErrors={fieldErrors}
      citySelection={citySelection}
      onCitySelectionChange={handleCitySelectionChange}
      onSubmit={handleSubmit}
    />
  );
}
