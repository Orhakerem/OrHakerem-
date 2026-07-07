import { redirect } from 'next/navigation';

import AdminShell from '@/components/admin/AdminShell';
import ReservationQuoteForm from '@/components/admin/ReservationQuoteForm';
import { getAdminSession } from '@/lib/admin-session';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';

export default async function AdminDevisPage() {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  const availabilitySnapshot = await getBookablePropertyCalendarSnapshot();

  return (
    <AdminShell
      activePath="/admin/devis"
      title="Reservation quote"
      description="Enter the booking details and send the branded reservation & invoice email to the customer."
    >
      <ReservationQuoteForm availabilitySnapshot={availabilitySnapshot} />
    </AdminShell>
  );
}
