// import { Card } from '@/components/ui/card';
// import { CardSkeleton } from '@/components/Dashboard/Billing/card-skeleton';
import { DashboardHeader } from '@/components/Dashboard/header';
import { DashboardShell } from '@/components/Dashboard/shell';

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">{/* <CardSkeleton /> */}</div>
    </DashboardShell>
  );
}
