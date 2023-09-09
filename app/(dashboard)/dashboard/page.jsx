import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/data/server/session';
import { EmptyPlaceholder } from '@/components/Dashboard/Products/empty-placeholder';
import { DashboardHeader } from '@/components/Dashboard/header';
import { ProductCreateButton } from '@/components/Dashboard/Products/product-create-button';
import { DashboardShell } from '@/components/Dashboard/shell';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Create and manage products.">
        <ProductCreateButton />
      </DashboardHeader>
      <div>
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="product" />
          <EmptyPlaceholder.Title>No products created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any products yet. Start creating content.
          </EmptyPlaceholder.Description>
          <ProductCreateButton variant="outline" />
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}
