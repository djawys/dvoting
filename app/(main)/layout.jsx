import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { MainNav } from '@/components/Shared/main-nav';
import { SiteFooter } from '@/components/Shared/site-footer';

import { marketingConfig } from '@/lib/configs';
import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/data/server/session';

// import Astm from '@/components/filters/Astm';
// import Division from '@/components/filters/Division';
// import Manufacturer from '@/components/filters/Manufacturer';

export default async function MarketingLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          {user ? (
            <nav>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4'
                )}
              >
                DashBoard
              </Link>{' '}
            </nav>
          ) : (
            <nav>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4'
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4'
                )}
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </header>

      <aside>
        <div className="space-y-4 w-40">
          {/* <Astm /> */}
          {/* <Division /> */}
          {/* <Manufacturer /> */}
        </div>
      </aside>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
