'use client';

import { useEffect, useState } from 'react';

import { ROUTES } from '@/constants/routes';
import type { StayCategory } from '@/content/categories';
import type { CityContent } from '@/content/cities';

type SearchFormProps = {
  q: string;
  city: string;
  category: string;
  sort: string;
  cities: readonly CityContent[];
  categories: readonly StayCategory[];
};

export function SearchForm({ q, city, category, sort, cities, categories }: SearchFormProps) {
  const formKey = `${city}|${category}|${q}|${sort}`;
  const [query, setQuery] = useState(q);
  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedCategory, setSelectedCategory] = useState(category);

  useEffect(() => {
    setQuery(q);
    setSelectedCity(city);
    setSelectedCategory(category);
  }, [q, city, category, sort]);

  return (
    <form key={formKey} action={ROUTES.search} className="mt-8 grid gap-4 lg:grid-cols-[2fr_1fr_1fr_auto]">
      <input type="hidden" name="sort" value={sort} />
      <label className="flex flex-col gap-2">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Query</span>
        <input
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Property, area, commute, or need"
          className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark placeholder:text-stayct-text-muted focus:border-stayct-green-accent focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">City</span>
        <select
          name="city"
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
          className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
        >
          <option value="">All cities</option>
          {cities.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-stayct-green-accent">Category</span>
        <select
          name="category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="rounded-[16px] border border-stayct-border bg-stayct-bg-light px-4 py-4 text-[15px] text-stayct-green-dark focus:border-stayct-green-accent focus:outline-none"
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-[16px] bg-stayct-green-dark px-6 py-4 text-[15px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent"
      >
        Update search
      </button>
    </form>
  );
}
