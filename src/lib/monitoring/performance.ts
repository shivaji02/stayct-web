export type PerformanceProvider = 'posthog' | 'plausible' | 'ga4' | 'custom';

export type PerformanceMetric = Readonly<{
  name: string;
  value: number;
  unit: 'ms' | 'count' | 'ratio';
  tags?: Readonly<Record<string, string | number | boolean | null | undefined>>;
}>;

export type PerformanceAdapter = Readonly<{
  provider: PerformanceProvider;
  recordMetric?: (metric: PerformanceMetric) => void;
  recordWebVital?: (name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB', value: number) => void;
}>;

export const noopPerformanceAdapter: PerformanceAdapter = {
  provider: 'custom',
};

export function createPerformanceAdapter(adapter?: PerformanceAdapter): PerformanceAdapter {
  return adapter ?? noopPerformanceAdapter;
}
