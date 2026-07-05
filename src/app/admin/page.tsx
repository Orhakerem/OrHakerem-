import { redirect } from 'next/navigation';

import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminShell from '@/components/admin/AdminShell';
import { getAdminSession } from '@/lib/admin-session';
import { fetchAdminDashboardSummary, type AdminDashboardSummary } from '@/lib/admin-pricing';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

async function getDashboardSummary(): Promise<AdminDashboardSummary> {
  try {
    return await fetchAdminDashboardSummary(getSupabaseAdminClient());
  } catch (error) {
    return {
      recentQuotes: [],
      activeSeasonCount: 0,
      specialDateCount: 0,
      activeAdjustmentRuleCount: 0,
      pricingTierCount: 0,
      unavailableReason: error instanceof Error ? error.message : 'Dashboard data unavailable',
    };
  }
}

export default async function AdminPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  const summary = await getDashboardSummary();

  return (
    <AdminShell
      title="Dashboard"
      description="Choose the back-office workflow you want to manage."
    >
      <AdminDashboard summary={summary} />
    </AdminShell>
  );
}
