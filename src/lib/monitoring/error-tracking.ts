export type ErrorTrackingProvider = 'sentry' | 'custom';

export type TrackedErrorContext = Readonly<{
  route?: string;
  release?: string;
  environment?: string;
  severity?: 'fatal' | 'error' | 'warning' | 'info';
}>;

export type ErrorTrackingAdapter = Readonly<{
  provider: ErrorTrackingProvider;
  captureException?: (error: Error, context?: TrackedErrorContext) => void;
  captureMessage?: (message: string, context?: TrackedErrorContext) => void;
}>;

export const noopErrorTrackingAdapter: ErrorTrackingAdapter = {
  provider: 'custom',
};

export function createErrorTrackingAdapter(adapter?: ErrorTrackingAdapter): ErrorTrackingAdapter {
  return adapter ?? noopErrorTrackingAdapter;
}
