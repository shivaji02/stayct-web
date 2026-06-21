export type AnalyticsProvider = 'sentry' | 'posthog' | 'plausible' | 'ga4' | 'custom';

export type AnalyticsEventName = string;

export type AnalyticsProperties = Readonly<Record<string, string | number | boolean | null | undefined>>;

export type AnalyticsEvent = Readonly<{
  name: AnalyticsEventName;
  properties?: AnalyticsProperties;
}>;

export type AnalyticsAdapter = Readonly<{
  provider: AnalyticsProvider;
  identify?: (userId: string, properties?: AnalyticsProperties) => void;
  track?: (event: AnalyticsEvent) => void;
  pageView?: (path: string, properties?: AnalyticsProperties) => void;
}>;

export const noopAnalyticsAdapter: AnalyticsAdapter = {
  provider: 'custom',
};

export function createAnalyticsAdapter(adapter?: AnalyticsAdapter): AnalyticsAdapter {
  return adapter ?? noopAnalyticsAdapter;
}
