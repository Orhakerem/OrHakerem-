import ReservationForm from './reservation-form';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';

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
