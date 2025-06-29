import ReservationForm from './reservation-form';

export default async function Reservation({ 
  searchParams 
}: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  return <ReservationForm initialSearchParams={searchParams} />;
}