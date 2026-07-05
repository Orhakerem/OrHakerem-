import { redirect } from 'next/navigation';
import Link from 'next/link';

import AdminShell from '@/components/admin/AdminShell';
import { getAdminSession } from '@/lib/admin-session';

export default async function AdminPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  return (
    <AdminShell
      title="Dashboard"
      description="Choose the back-office workflow you want to manage."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/devis"
          className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/60">
            Devis
          </p>
          <h2 className="mt-2 font-head text-2xl font-light tracking-h3 text-black">
            Reservation quote
          </h2>
          <p className="mt-2 text-sm text-black/60">
            Prepare and send the branded reservation invoice email to the customer.
          </p>
        </Link>

        <Link
          href="/admin/pricing"
          className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/60">
            Pricing
          </p>
          <h2 className="mt-2 font-head text-2xl font-light tracking-h3 text-black">
            Pricing editor
          </h2>
          <p className="mt-2 text-sm text-black/60">
            Manage listing rates, seasonal periods, and pricing rules.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
