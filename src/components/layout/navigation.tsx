import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function Navigation() {
  const navItems = [
    { label: 'Find Stay', href: ROUTES.search },
    { label: 'For Operators', href: ROUTES.operators },
    { label: 'About', href: ROUTES.about },
    { label: 'Resources', href: ROUTES.resources },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-stayct-beige border-b border-stayct-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-20">
        <Link href={ROUTES.home} className="font-black text-[20px] tracking-[-.03em] text-stayct-green-dark">
          STAYCT
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-4">
            {navItems.map((item, idx) => (
              <div key={item.href} className="flex items-center gap-4">
                <Link
                  href={item.href}
                  className="text-[15px] font-medium text-stayct-green-medium hover:text-stayct-green-dark transition"
                >
                  {item.label}
                </Link>
                {idx < navItems.length - 1 && (
                  <span className="text-stayct-green-medium">·</span>
                )}
              </div>
            ))}
          </div>

          <Link
            href={ROUTES.appLogin}
            className="text-[13px] font-bold text-white bg-stayct-green-dark px-5 py-2 rounded-[6px] hover:opacity-90 transition tracking-[.01em]"
          >
            App Login
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <details className="relative group">
            <summary
              className="cursor-pointer list-none rounded-[6px] border border-stayct-border bg-white/50 px-3 py-2 text-[13px] font-bold text-stayct-green-dark"
              style={{ listStyle: 'none' }}
            >
              Menu
            </summary>
            <div className="absolute right-0 top-full mt-2 w-44 rounded-[14px] border border-stayct-border bg-stayct-beige p-2 shadow-lg shadow-black/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[10px] px-3 py-2 text-[14px] font-semibold text-stayct-green-dark hover:bg-white/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href={ROUTES.appLogin}
            className="rounded-[6px] bg-stayct-green-dark px-3 py-2 text-[12px] font-bold text-white hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
