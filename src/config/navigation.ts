import { ROUTES } from '@/constants/routes';

export type NavigationItem = Readonly<{
  label: string;
  href: string;
  description?: string;
}>;

export const navigationConfig = {
  primary: [
    { label: 'Find Stay', href: ROUTES.search },
    { label: 'Cities', href: ROUTES.cities },
    { label: 'List Property', href: ROUTES.listProperty },
    { label: 'Manage Property', href: ROUTES.manageProperty },
    { label: 'Resources', href: ROUTES.resources },
    { label: 'Support', href: ROUTES.support },
  ] as const satisfies readonly NavigationItem[],
  footer: [
    { label: 'About', href: ROUTES.about },
    { label: 'Privacy', href: ROUTES.privacy },
    { label: 'Terms', href: ROUTES.terms },
    { label: 'Support', href: ROUTES.support },
  ] as const satisfies readonly NavigationItem[],
} as const satisfies {
  primary: readonly NavigationItem[];
  footer: readonly NavigationItem[];
};
