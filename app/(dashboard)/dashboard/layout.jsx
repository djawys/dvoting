import { notFound } from 'next/navigation';

import { dashboardConfig } from '@/lib/configs';
import { getCurrentUser } from '@/data/server/session';
import { MainNav } from '@/components/Shared/main-nav';
import { DashboardNav } from '@/components/Dashboard/dashboard-nav';
import { SiteFooter } from '@/components//Shared/site-footer';
import { UserAccountNav } from '@/components/Dashboard/user-account-nav';

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
