import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export function CategoryCard({ title, description, icon, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-[14px] border-[1.5px] border-stayct-border bg-white p-5 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stayct-green-accent sm:p-6"
    >
      <div className="w-10 h-10 bg-stayct-bg-light rounded-[10px] mb-3.5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="mb-1 text-[14px] font-black text-stayct-green-dark">{title}</div>
      <div className="text-[12px] leading-[1.5] text-stayct-green-medium">{description}</div>
    </Link>
  );
}
