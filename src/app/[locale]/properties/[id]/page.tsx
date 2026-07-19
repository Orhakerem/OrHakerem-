import PropertyDetailsClient from './property-details-client';
import { getPropertyAvailability } from '@/lib/airbnb-calendar';
import { isBookablePropertyId } from '@/lib/bookable-properties';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isBookablePropertyId(params.id)) {
    notFound();
  }

  const availability = await getPropertyAvailability(params.id);

  return (
    <PropertyDetailsClient
      propertyId={params.id}
      blockedDates={availability.blockedDates}
      availabilityStatus={availability.status}
    />
  );
}
