import Link from 'next/link';
import { SUPPORT_CONTACT } from '@/content';

type SupportContactCardProps = {
  title?: string;
  description: string;
  className?: string;
};

export function SupportContactCard({
  title = 'Need assistance?',
  description,
  className = '',
}: SupportContactCardProps) {
  return (
    <section className={`rounded-[24px] border border-stayct-border bg-white px-7 py-8 shadow-sm sm:px-8 ${className}`.trim()}>
      <h2 className="text-[24px] font-black tracking-[-.03em] text-stayct-green-dark">{title}</h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-[1.75] text-stayct-green-medium">{description}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href={SUPPORT_CONTACT.emailHref}
          className="rounded-[16px] bg-stayct-bg-light px-5 py-4 transition hover:border-stayct-green-accent"
        >
          <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Email</div>
          <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.email}</div>
        </Link>
        <Link
          href={SUPPORT_CONTACT.phoneHref}
          className="rounded-[16px] bg-stayct-bg-light px-5 py-4 transition hover:border-stayct-green-accent"
        >
          <div className="text-[12px] font-bold uppercase tracking-[.12em] text-stayct-green-accent">Phone</div>
          <div className="mt-2 text-[16px] font-bold text-stayct-green-dark">{SUPPORT_CONTACT.phoneDisplay}</div>
        </Link>
      </div>
    </section>
  );
}
