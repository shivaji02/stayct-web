import Link from 'next/link';

import { appDownloadConfig } from '@/config';

type AppDownloadLinksProps = {
  className?: string;
  itemClassName?: string;
  unavailableClassName?: string;
};

const defaultItemClassName =
  'inline-flex min-h-12 items-center justify-center rounded-[12px] bg-stayct-green-dark px-5 py-3 text-center text-[14px] font-bold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent';

const defaultUnavailableClassName =
  'inline-flex min-h-12 items-center justify-center rounded-[12px] border border-stayct-border bg-stayct-bg-light px-5 py-3 text-center text-[14px] font-bold text-stayct-green-medium';

export function AppDownloadLinks({
  className = 'flex flex-col gap-3 sm:flex-row',
  itemClassName = defaultItemClassName,
  unavailableClassName = defaultUnavailableClassName,
}: AppDownloadLinksProps) {
  const stores = [appDownloadConfig.appStore, appDownloadConfig.googlePlay];

  return (
    <div className={className}>
      {stores.map((store) =>
        store.url ? (
          <Link
            key={store.label}
            href={store.url}
            className={itemClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {store.label}
          </Link>
        ) : (
          <span key={store.label} className={unavailableClassName} aria-disabled="true">
            {store.note}
          </span>
        ),
      )}
    </div>
  );
}
