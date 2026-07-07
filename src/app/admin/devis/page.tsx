import { redirect } from 'next/navigation';

import AdminShell from '@/components/admin/AdminShell';
import ReservationQuoteForm from '@/components/admin/ReservationQuoteForm';
import {
  fetchAdminRequestQuoteDraft,
  normalizeAdminRequestSource,
} from '@/lib/admin-requests';
import { getAdminSession } from '@/lib/admin-session';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';

interface AdminDevisPageProps {
  searchParams?: {
    sourceType?: string;
    sourceId?: string;
  };
}

export default async function AdminDevisPage({ searchParams }: AdminDevisPageProps) {
  if (!getAdminSession()) {
    redirect('/admin/login');
  }

  const source = normalizeAdminRequestSource({
    sourceType: searchParams?.sourceType,
    sourceId: searchParams?.sourceId,
  });
  const availabilitySnapshot = await getBookablePropertyCalendarSnapshot();
  const draft = source
    ? await fetchAdminRequestQuoteDraft(source).catch((error) => {
        console.error('Admin request quote draft load failed:', error);

        return null;
      })
    : null;

  return (
    <AdminShell
      activePath="/admin/devis"
      title="Reservation quote"
      description="Enter the booking details and send the branded reservation & invoice email to the customer."
    >
      <ReservationQuoteForm
        availabilitySnapshot={availabilitySnapshot}
        initialQuote={draft?.quote}
        sourceContext={draft?.source ?? null}
        sourceRequest={draft?.request ?? null}
      />
    </AdminShell>
  );
}
