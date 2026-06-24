import { ROUTES, routeBuilders } from '@/constants/routes';
import { MOCK_CITIES, MOCK_PROPERTIES, STAY_CATEGORIES } from '@/content/mock-stays';
import type { PageContentEntry } from '@/types';

export const SITE_PAGES = {
  home: {
    path: ROUTES.home,
    title: 'Home',
    description: 'Discover accommodation across major Indian cities with STAYCT.',
    priority: 1,
    changeFrequency: 'weekly',
    sitemap: true,
  },
  about: {
    path: ROUTES.about,
    title: 'About',
    description: 'Learn what STAYCT is, who it serves, and how the platform is structured.',
    priority: 0.7,
    changeFrequency: 'monthly',
    sitemap: true,
  },
  contact: {
    path: ROUTES.contact,
    title: 'Contact',
    description: 'Legacy contact route redirected to Support.',
    priority: 0.6,
    changeFrequency: 'monthly',
    sitemap: false,
    noIndex: true,
  },
  pricing: {
    path: ROUTES.pricing,
    title: 'Pricing',
    description: 'Legacy pricing route redirected to Resources.',
    priority: 0.7,
    changeFrequency: 'monthly',
    sitemap: false,
    noIndex: true,
  },
  features: {
    path: ROUTES.features,
    title: 'Features',
    description: 'Legacy features route redirected to Resources.',
    priority: 0.7,
    changeFrequency: 'monthly',
    sitemap: false,
    noIndex: true,
  },
  resources: {
    path: ROUTES.resources,
    title: 'Resources',
    description: 'Find concise guides for choosing a stay, narrowing a shortlist, and understanding STAYCT.',
    priority: 0.6,
    changeFrequency: 'monthly',
    sitemap: true,
  },
  support: {
    path: ROUTES.support,
    title: 'Support',
    description: 'Get help from STAYCT with FAQs, troubleshooting, phone support, and email support.',
    priority: 0.5,
    changeFrequency: 'monthly',
    sitemap: true,
  },
  help: {
    path: ROUTES.help,
    title: 'Help',
    description: 'Legacy help route redirected to Support.',
    priority: 0.5,
    changeFrequency: 'monthly',
    sitemap: false,
    noIndex: true,
  },
  cities: {
    path: ROUTES.cities,
    title: 'Cities',
    description: 'Browse STAYCT city pages with local inventory, areas, and discovery shortcuts.',
    priority: 0.7,
    changeFrequency: 'weekly',
    sitemap: true,
  },
  categories: {
    path: ROUTES.categories,
    title: 'Categories',
    description: 'Browse PGs, hostels, co-living, shared flats, and rental rooms by stay type.',
    priority: 0.7,
    changeFrequency: 'weekly',
    sitemap: true,
  },
  search: {
    path: ROUTES.search,
    title: 'Search Stays',
    description: 'Search STAYCT stays with city, category, area, and sort filters.',
    priority: 0.9,
    changeFrequency: 'weekly',
    sitemap: true,
  },
  listProperty: {
    path: ROUTES.listProperty,
    title: 'List Your Property',
    description: 'For new operators who want to list accommodation and fill vacancies through STAYCT.',
    priority: 0.6,
    changeFrequency: 'monthly',
    sitemap: true,
  },
  manageProperty: {
    path: ROUTES.manageProperty,
    title: 'Manage Property',
    description: 'For existing STAYCT operators who need the management platform and support recovery paths.',
    priority: 0.5,
    changeFrequency: 'monthly',
    sitemap: true,
  },
  privacy: {
    path: ROUTES.privacy,
    title: 'Privacy',
    description: 'Review how STAYCT handles enquiries, contact details, and website data.',
    priority: 0.3,
    changeFrequency: 'yearly',
    sitemap: true,
  },
  terms: {
    path: ROUTES.terms,
    title: 'Terms',
    description: 'Review the terms that apply to STAYCT website usage and accommodation enquiries.',
    priority: 0.3,
    changeFrequency: 'yearly',
    sitemap: true,
  },
} as const satisfies Record<string, PageContentEntry>;

const dynamicCityEntries: readonly PageContentEntry[] = MOCK_CITIES.map((city) => ({
  path: routeBuilders.city(city.slug) as `/${string}`,
  title: `${city.name} stays`,
  description: `Browse STAYCT stays, areas, and discovery shortcuts in ${city.name}.`,
  priority: 0.8,
  changeFrequency: 'weekly',
}));

const dynamicCategoryEntries: readonly PageContentEntry[] = STAY_CATEGORIES.map((category) => ({
  path: routeBuilders.category(category.slug) as `/${string}`,
  title: `${category.name} stays`,
  description: `Browse ${category.name.toLowerCase()} listings on STAYCT.`,
  priority: 0.7,
  changeFrequency: 'weekly',
}));

const dynamicStayEntries: readonly PageContentEntry[] = MOCK_PROPERTIES.map((property) => ({
  path: routeBuilders.stay(property.slug) as `/${string}`,
  title: property.name,
  description: `${property.name} in ${property.cityName} on STAYCT.`,
  priority: 0.6,
  changeFrequency: 'weekly',
}));

export const SITE_SITEMAP_ENTRIES = [
  ...Object.values(SITE_PAGES).filter((page) => page.sitemap !== false),
  ...dynamicCityEntries,
  ...dynamicCategoryEntries,
  ...dynamicStayEntries,
] as const;
