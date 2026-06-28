import { redirect } from 'next/navigation';

import { logoutAdmin } from '@/actions/admin';
import ReservationQuoteForm from '@/components/admin/ReservationQuoteForm';
import { getAdminSession } from '@/lib/admin-session';

export default function AdminPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-primary/15 pb-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-primary/70">
            Or Hakerem · Back office
          </p>
          <h1 className="mt-2 font-head text-4xl font-light tracking-h1 text-black">
            Reservation quote
          </h1>
          <p className="mt-2 max-w-xl text-sm text-black/60">
            Enter the booking details and send the branded reservation &amp; invoice email to the
            customer.
          </p>
        </div>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-full border-2 border-primary/30 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            Log out
          </button>
        </form>
      </header>

      <ReservationQuoteForm />
    </div>
  );
}
