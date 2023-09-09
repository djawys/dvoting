import { CardSkeleton } from '@/components/Dashboard/Billing/card-skeleton';
import { DashboardHeader } from '@/components/Dashboard/header';
import { DashboardShell } from '@/components/Dashboard/shell';

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
