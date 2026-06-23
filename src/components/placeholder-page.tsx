import Link from 'next/link';
import type { ReactNode } from 'react';

import { ROUTES } from '@/constants/routes';

type RouteAction = Readonly<{
  label: string;
  href: string;
  external?: boolean;
}>;

type RoutePageCopy = Readonly<{
  summary: string;
  primaryAction: RouteAction;
  secondaryActions: readonly RouteAction[];
  relatedLinks: readonly RouteAction[];
}>;

type PlaceholderPageProps = {
  title: string;
  path: string;
  children?: ReactNode;
};

const APP_LOGIN_URL = 'https://app.stayct.in/login';

function renderAction(action: RouteAction, className: string, key: string) {
  const sharedProps = {
    className,
    ...(action.external ? { target: '_blank', rel: 'noreferrer' as const } : {}),
  };

  return action.external ? (
    <a key={key} href={action.href} {...sharedProps}>
      {action.label}
    </a>
  ) : (
    <Link key={key} href={action.href} {...sharedProps}>
      {action.label}
    </Link>
  );
}

function getCopyForPath(path: string): RoutePageCopy {
  const normalizedPath = path.split('?')[0];

  if (normalizedPath === '404') {
    return {
      summary: 'This route does not exist. Use the links below to recover without hitting a dead end.',
      primaryAction: { label: 'Back to Home', href: ROUTES.home },
      secondaryActions: [
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'For Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'Cities', href: ROUTES.cities },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
      ],
    };
  }

  if (normalizedPath.startsWith('/property/')) {
    return {
      summary: 'Property detail entry point for a future listing or a shared property route.',
      primaryAction: { label: 'Find Similar Stays', href: ROUTES.search },
      secondaryActions: [
        { label: 'Browse Cities', href: ROUTES.cities },
        { label: 'For Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'Search', href: ROUTES.search },
        { label: 'About', href: ROUTES.about },
        { label: 'Contact', href: ROUTES.contact },
      ],
    };
  }

  if (normalizedPath.startsWith('/cities/')) {
    return {
      summary: 'City detail entry point for location-specific discovery.',
      primaryAction: { label: 'Search Stays', href: ROUTES.search },
      secondaryActions: [
        { label: 'All Cities', href: ROUTES.cities },
        { label: 'For Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'Search', href: ROUTES.search },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
      ],
    };
  }

  const routeCopy: Record<string, RoutePageCopy> = {
    [ROUTES.home]: {
      summary: 'Discovery home for seekers and operators. Start with search or move into the operator flow.',
      primaryAction: { label: 'Find a Stay', href: ROUTES.search },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'Browse Cities', href: ROUTES.cities },
      ],
      relatedLinks: [
        { label: 'About', href: ROUTES.about },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
      ],
    },
    [ROUTES.about]: {
      summary: 'Learn what STAYCT does and how the public site routes are organized.',
      primaryAction: { label: 'Find a Stay', href: ROUTES.search },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'Resources', href: ROUTES.resources },
      ],
      relatedLinks: [
        { label: 'Contact', href: ROUTES.contact },
        { label: 'Help', href: ROUTES.help },
        { label: 'Cities', href: ROUTES.cities },
      ],
    },
    [ROUTES.contact]: {
      summary: 'Reach STAYCT for support, partnerships, or listing questions.',
      primaryAction: { label: 'Open Help', href: ROUTES.help },
      secondaryActions: [
        { label: 'About', href: ROUTES.about },
        { label: 'For Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'App Login', href: ROUTES.appLogin },
      ],
    },
    [ROUTES.pricing]: {
      summary: 'A simple pricing entry point for seekers and operators who want to understand the platform direction.',
      primaryAction: { label: 'For Operators', href: ROUTES.operators },
      secondaryActions: [
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'Contact', href: ROUTES.contact },
      ],
      relatedLinks: [
        { label: 'Features', href: ROUTES.features },
        { label: 'About', href: ROUTES.about },
        { label: 'Help', href: ROUTES.help },
      ],
    },
    [ROUTES.features]: {
      summary: 'The public feature overview for discovery and operator workflows.',
      primaryAction: { label: 'Find a Stay', href: ROUTES.search },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'Browse Cities', href: ROUTES.cities },
      ],
      relatedLinks: [
        { label: 'About', href: ROUTES.about },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.resources]: {
      summary: 'Supporting material for the public site and its main user journeys.',
      primaryAction: { label: 'Open Help', href: ROUTES.help },
      secondaryActions: [
        { label: 'About', href: ROUTES.about },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
      relatedLinks: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'Cities', href: ROUTES.cities },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.help]: {
      summary: 'Support entry point for common questions and next steps.',
      primaryAction: { label: 'Contact STAYCT', href: ROUTES.contact },
      secondaryActions: [
        { label: 'Resources', href: ROUTES.resources },
        { label: 'About', href: ROUTES.about },
      ],
      relatedLinks: [
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'App Login', href: ROUTES.appLogin },
      ],
    },
    [ROUTES.cities]: {
      summary: 'Browse city-level discovery entry points and continue into search.',
      primaryAction: { label: 'Search Stays', href: ROUTES.search },
      secondaryActions: [
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'For Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'About', href: ROUTES.about },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
      ],
    },
    [ROUTES.search]: {
      summary: 'Search verified stays by category, city, and the other discovery filters exposed on the public site.',
      primaryAction: { label: 'Browse Cities', href: ROUTES.cities },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'About', href: ROUTES.about },
      ],
      relatedLinks: [
        { label: 'App Login', href: ROUTES.appLogin },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.operators]: {
      summary: 'Entry point for property owners, managers, and tenants who need the operator flow.',
      primaryAction: { label: 'Open App Login', href: ROUTES.appLogin },
      secondaryActions: [
        { label: 'Owners', href: ROUTES.operatorsOwners },
        { label: 'Managers', href: ROUTES.operatorsManagers },
      ],
      relatedLinks: [
        { label: 'Tenants', href: ROUTES.operatorsTenants },
        { label: 'Find a Stay', href: ROUTES.search },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.operatorsOwners]: {
      summary: 'Owner-focused entry point for listing and property discovery workflows.',
      primaryAction: { label: 'Open App Login', href: ROUTES.appLogin },
      secondaryActions: [
        { label: 'Operators', href: ROUTES.operators },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
      relatedLinks: [
        { label: 'Managers', href: ROUTES.operatorsManagers },
        { label: 'Tenants', href: ROUTES.operatorsTenants },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.operatorsManagers]: {
      summary: 'Manager-focused entry point for day-to-day property operations.',
      primaryAction: { label: 'Open App Login', href: ROUTES.appLogin },
      secondaryActions: [
        { label: 'Operators', href: ROUTES.operators },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
      relatedLinks: [
        { label: 'Owners', href: ROUTES.operatorsOwners },
        { label: 'Tenants', href: ROUTES.operatorsTenants },
        { label: 'Help', href: ROUTES.help },
      ],
    },
    [ROUTES.operatorsTenants]: {
      summary: 'Tenant-focused entry point for communication and accommodation support.',
      primaryAction: { label: 'Find a Stay', href: ROUTES.search },
      secondaryActions: [
        { label: 'Open App Login', href: ROUTES.appLogin },
        { label: 'Operators', href: ROUTES.operators },
      ],
      relatedLinks: [
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.appLogin]: {
      summary: 'Open the operator workspace to manage listings, tenants, and day-to-day operations.',
      primaryAction: { label: 'Open App Login', href: APP_LOGIN_URL, external: true },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
      relatedLinks: [
        { label: 'About', href: ROUTES.about },
        { label: 'Help', href: ROUTES.help },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
    [ROUTES.privacy]: {
      summary: 'Review how the public site handles data, tracking, and contact information.',
      primaryAction: { label: 'Contact STAYCT', href: ROUTES.contact },
      secondaryActions: [
        { label: 'Help', href: ROUTES.help },
        { label: 'About', href: ROUTES.about },
      ],
      relatedLinks: [
        { label: 'Terms', href: ROUTES.terms },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
    },
    [ROUTES.terms]: {
      summary: 'Review the website terms that apply to public STAYCT usage.',
      primaryAction: { label: 'Contact STAYCT', href: ROUTES.contact },
      secondaryActions: [
        { label: 'Privacy', href: ROUTES.privacy },
        { label: 'Help', href: ROUTES.help },
      ],
      relatedLinks: [
        { label: 'About', href: ROUTES.about },
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Find a Stay', href: ROUTES.search },
      ],
    },
  };

  return (
    routeCopy[normalizedPath] ?? {
      summary: 'This route is present, but it does not yet have a route-specific content block.',
      primaryAction: { label: 'Find a Stay', href: ROUTES.search },
      secondaryActions: [
        { label: 'For Operators', href: ROUTES.operators },
        { label: 'About', href: ROUTES.about },
      ],
      relatedLinks: [
        { label: 'Resources', href: ROUTES.resources },
        { label: 'Help', href: ROUTES.help },
        { label: 'Contact', href: ROUTES.contact },
      ],
    }
  );
}

export function PlaceholderPage({ title, path, children }: PlaceholderPageProps) {
  const copy = getCopyForPath(path);

  return (
    <main className="bg-stayct-beige px-6 py-16 sm:px-10">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <section className="rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-10 sm:py-10">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-stayct-green-accent">Route overview</p>
          <h1 className="mt-3 text-[36px] font-black tracking-[-.04em] text-stayct-green-dark sm:text-[48px]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.75] text-stayct-green-medium">{copy.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {renderAction(
              copy.primaryAction,
              'inline-flex items-center rounded-lg bg-stayct-green-dark px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90',
              copy.primaryAction.label,
            )}
            {copy.secondaryActions.map((action) =>
              renderAction(
                action,
                'inline-flex items-center rounded-lg border border-stayct-border px-5 py-3 text-[14px] font-semibold text-stayct-green-dark transition hover:bg-stayct-bg-light',
                action.label,
              ),
            )}
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {copy.relatedLinks.map((action) =>
              renderAction(
                action,
                'rounded-[14px] border border-stayct-border-light bg-stayct-bg-light px-4 py-4 text-[14px] font-semibold text-stayct-green-dark transition hover:border-stayct-green-accent hover:bg-white',
                action.label,
              ),
            )}
          </div>

          <div className="mt-8 text-[13px] text-stayct-text-muted">
            Current route: <code className="rounded bg-stayct-bg-light px-2 py-1 text-stayct-green-dark">{path}</code>
          </div>
        </section>

        {children ? <div className="rounded-[24px] border border-stayct-border bg-white px-7 py-6 sm:px-10">{children}</div> : null}
      </div>
    </main>
  );
}
