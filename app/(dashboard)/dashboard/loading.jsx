import { DashboardHeader } from '@/components/Dashboard/header';
import { ProductCreateButton } from '@/components/Dashboard/Products/product-create-button';
import { ProductItem } from '@/components/Dashboard/Products/product-item';
import { DashboardShell } from '@/components/Dashboard/shell';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Create and manage products.">
        <ProductCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <ProductItem.Skeleton />
        <ProductItem.Skeleton />
        <ProductItem.Skeleton />
        <ProductItem.Skeleton />
        <ProductItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
