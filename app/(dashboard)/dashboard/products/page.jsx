import { redirect } from 'next/navigation';

import { getCurrentUser } from '@/data/server/session';
import { EmptyPlaceholder } from '@/components/Dashboard/Products/empty-placeholder';
import { DashboardHeader } from '@/components/Dashboard/header';
import { ProductCreateButton } from '@/components/Dashboard/Products/product-create-button';
import { DashboardShell } from '@/components/Dashboard/shell';
import { db } from '@/prisma/db';
import { ProductItem } from '@/components/Dashboard/Products/product-item';

export const metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const products = await db.product.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      updated_at: 'desc',
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Create and manage products.">
        <ProductCreateButton />
      </DashboardHeader>
      <div>
        {products?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="product" />
            <EmptyPlaceholder.Title>No products created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any products yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ProductCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
