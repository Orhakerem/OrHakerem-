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
  let draftLoadError: unknown = null;
  const draft = source
    ? await fetchAdminRequestQuoteDraft(source).catch((error) => {
        console.error('Admin request quote draft load failed:', error);
        draftLoadError = error;

        return null;
      })
    : null;

  return (
    <AdminShell
      activePath="/admin/devis"
      title="Reservation quote"
      description="Enter the booking details and send the branded reservation & invoice email to the customer."
    >
      {draftLoadError !== null ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          The request could not be loaded, so this form starts blank instead of being prefilled
          from the customer request. Reload the page or go back to the Requests inbox and retry.
          <span className="mt-3 block font-mono text-xs">
            {draftLoadError instanceof Error ? draftLoadError.message : 'Unknown load error'}
          </span>
        </div>
      ) : null}
      <ReservationQuoteForm
        availabilitySnapshot={availabilitySnapshot}
        initialQuote={draft?.quote}
        sourceContext={draft?.source ?? null}
        sourceRequest={draft?.request ?? null}
      />
    </AdminShell>
  );
}
