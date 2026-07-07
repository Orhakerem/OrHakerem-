import { redirect } from 'next/navigation';

import AdminRequestsInbox from '@/components/admin/AdminRequestsInbox';
import AdminShell from '@/components/admin/AdminShell';
import { fetchAdminCustomerRequests } from '@/lib/admin-requests';
import { getAdminSession } from '@/lib/admin-session';

export default async function AdminRequestsPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  try {
    const requests = await fetchAdminCustomerRequests();

    return (
      <AdminShell
        activePath="/admin/requests"
        title="Requests"
        description="Review apartment and event requests, track their status, and create customer quotes."
      >
        <AdminRequestsInbox requests={requests} />
      </AdminShell>
    );
  } catch (error) {
    return (
      <AdminShell
        activePath="/admin/requests"
        title="Requests"
        description="Review apartment and event requests, track their status, and create customer quotes."
      >
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          Request inbox data is unavailable. Apply the Supabase admin SQL setup and configure
          `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in the preview environment.
          <span className="mt-3 block font-mono text-xs">
            {error instanceof Error ? error.message : 'Unknown setup error'}
          </span>
        </div>
      </AdminShell>
    );
  }
}
