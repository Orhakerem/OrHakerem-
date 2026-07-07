import { getPropertyAvailability } from '@/lib/airbnb-calendar';

import EventsClient from './events-client';

export const dynamic = 'force-dynamic';

export default async function Events() {
  const penthouseAvailability = await getPropertyAvailability('penthouse-jacuzzi');

  return (
    <EventsClient
      blockedDates={penthouseAvailability.blockedDates}
      availabilityStatus={penthouseAvailability.status}
    />
  );
}
