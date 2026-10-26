export const ROUTES = {
  home: '/',
  about: '/about',
  resources: '/resources',
  support: '/support',
  cities: '/cities',
  categories: '/categories',
  search: '/search',
  listProperty: '/list-property',
  manageProperty: '/manage-property',
  stays: '/stays',
  privacy: '/privacy',
  terms: '/terms',
  contact: '/contact',
  pricing: '/pricing',
  features: '/features',
  help: '/help',
  operators: '/operators',
  operatorsOwners: '/operators/owners',
  operatorsManagers: '/operators/managers',
  operatorsTenants: '/operators/tenants',
  property: '/property',
  appLogin: '/app-login',
} as const;

export const routeBuilders = {
  city: (citySlug: string) => `${ROUTES.cities}/${citySlug}`,
  category: (categorySlug: string) => `${ROUTES.categories}/${categorySlug}`,
  stay: (slug: string) => `${ROUTES.stays}/${slug}`,
} as const;

export const MANAGE_PROPERTY_APP_URL = 'https://app.stayct.in/login';
