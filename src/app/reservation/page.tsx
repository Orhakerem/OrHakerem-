import ReservationForm from './reservation-form';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';

export const dynamic = 'force-dynamic';

export default async function Reservation({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  const { blockedDatesByProperty, availabilityStatusByProperty } =
    await getBookablePropertyCalendarSnapshot();

  return (
    <ReservationForm
      initialSearchParams={searchParams}
      availabilityByProperty={blockedDatesByProperty}
      availabilityStatusByProperty={availabilityStatusByProperty}
    />
  );
}
