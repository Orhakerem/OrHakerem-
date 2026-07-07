import { redirect } from 'next/navigation';

import {
  saveAdminListingPrices,
  saveAdminPricingRules,
  saveAdminSeasonDateOverrides,
  saveAdminSeasonPeriods,
  simulateAdminPricing,
} from '@/actions/admin-pricing';
import AdminPricingEditor from '@/components/admin/AdminPricingEditor';
import AdminShell from '@/components/admin/AdminShell';
import { getAdminSession } from '@/lib/admin-session';
import { fetchAdminPricingSnapshot } from '@/lib/admin-pricing';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

export default async function AdminPricingPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  try {
    const [snapshot, availabilitySnapshot] = await Promise.all([
      fetchAdminPricingSnapshot(getSupabaseAdminClient()),
      getBookablePropertyCalendarSnapshot(),
    ]);

    return (
      <AdminShell
        activePath="/admin/pricing"
        title="Pricing"
        description="Centralize listing prices, seasons, special dates, adjustment rules, and server-side simulations."
      >
        <AdminPricingEditor
          snapshot={snapshot}
          availabilitySnapshot={availabilitySnapshot}
          actions={{
            saveListingPrices: saveAdminListingPrices,
            saveSeasonPeriods: saveAdminSeasonPeriods,
            saveSpecialDates: saveAdminSeasonDateOverrides,
            savePricingRules: saveAdminPricingRules,
            runSimulation: simulateAdminPricing,
          }}
        />
      </AdminShell>
    );
  } catch (error) {
    return (
      <AdminShell
        activePath="/admin/pricing"
        title="Pricing"
        description="Centralize listing prices, seasons, special dates, adjustment rules, and server-side simulations."
      >
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          Pricing admin data is unavailable. Apply the Supabase admin SQL setup and configure
          `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the preview environment.
          <span className="mt-3 block font-mono text-xs">
            {error instanceof Error ? error.message : 'Unknown setup error'}
          </span>
        </div>
      </AdminShell>
    );
  }
}
