import { redirect } from 'next/navigation';

import AdminCalendarManager from '@/components/admin/AdminCalendarManager';
import AdminShell from '@/components/admin/AdminShell';
import { fetchAdminCalendarSnapshot } from '@/lib/admin-calendar';
import { getAdminSession } from '@/lib/admin-session';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

export default async function AdminCalendarPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  let snapshot;
  let fallbackError: unknown = null;

  try {
    snapshot = await fetchAdminCalendarSnapshot(getSupabaseAdminClient());
  } catch (error) {
    fallbackError = error;
    snapshot = await fetchAdminCalendarSnapshot();
  }

  return (
    <AdminShell
      activePath="/admin/calendar"
      title="Calendar"
      description="Internal multi-calendar for sync health, blocks, conflicts, holds, and operational stay rules."
    >
      {fallbackError !== null ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          The Supabase admin client is unavailable, so this calendar was loaded with the public
          client — data may be incomplete and admin-only rows are hidden. Check
          `SUPABASE_SECRET_KEY` / `SUPABASE_SERVICE_ROLE_KEY` in this environment.
          <span className="mt-3 block font-mono text-xs">
            {fallbackError instanceof Error ? fallbackError.message : 'Unknown setup error'}
          </span>
        </div>
      ) : null}
      <AdminCalendarManager snapshot={snapshot} />
    </AdminShell>
  );
}
