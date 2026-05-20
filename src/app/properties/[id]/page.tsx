import PropertyDetailsClient from './property-details-client';
import { getPropertyAvailability } from '@/lib/airbnb-calendar';
import { isBookablePropertyId } from '@/lib/bookable-properties';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const availability = isBookablePropertyId(params.id)
    ? await getPropertyAvailability(params.id)
    : {
        blockedDates: [],
        fetchedAtIso: null,
        status: 'error' as const,
      };

  return (
    <PropertyDetailsClient
      propertyId={params.id}
      blockedDates={availability.blockedDates}
      availabilityStatus={availability.status}
    />
  );
}
