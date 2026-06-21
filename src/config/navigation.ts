import { ROUTES } from '@/constants/routes';

export type NavigationItem = Readonly<{
  label: string;
  href: string;
  description?: string;
}>;

export type NavigationGroup = Readonly<{
  key: string;
  label: string;
  items: readonly NavigationItem[];
}>;

export const navigationConfig = {
  primary: [
    { label: 'Find Stay', href: ROUTES.search },
    { label: 'For Operators', href: ROUTES.operators },
    { label: 'About', href: ROUTES.about },
    { label: 'Resources', href: ROUTES.resources },
    { label: 'Help', href: ROUTES.help },
    { label: 'Contact', href: ROUTES.contact },
  ] as const satisfies readonly NavigationItem[],
  operator: [
    { label: 'Operators', href: ROUTES.operators },
    { label: 'Owners', href: ROUTES.operatorsOwners },
    { label: 'Managers', href: ROUTES.operatorsManagers },
    { label: 'Tenants', href: ROUTES.operatorsTenants },
  ] as const satisfies readonly NavigationItem[],
  footer: [
    { label: 'About', href: ROUTES.about },
    { label: 'Pricing', href: ROUTES.pricing },
    { label: 'Features', href: ROUTES.features },
    { label: 'Resources', href: ROUTES.resources },
    { label: 'Contact', href: ROUTES.contact },
  ] as const satisfies readonly NavigationItem[],
} as const satisfies {
  primary: readonly NavigationItem[];
  operator: readonly NavigationItem[];
  footer: readonly NavigationItem[];
};

export const navigationGroups = [
  {
    key: 'primary',
    label: 'Primary',
    items: navigationConfig.primary,
  },
  {
    key: 'operator',
    label: 'Operator',
    items: navigationConfig.operator,
  },
  {
    key: 'footer',
    label: 'Footer',
    items: navigationConfig.footer,
  },
] as const satisfies readonly NavigationGroup[];
