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

  try {
    snapshot = await fetchAdminCalendarSnapshot(getSupabaseAdminClient());
  } catch {
    snapshot = await fetchAdminCalendarSnapshot();
  }

  return (
    <AdminShell
      activePath="/admin/calendar"
      title="Calendar"
      description="Internal multi-calendar for sync health, blocks, conflicts, holds, and operational stay rules."
    >
      <AdminCalendarManager snapshot={snapshot} />
    </AdminShell>
  );
}
