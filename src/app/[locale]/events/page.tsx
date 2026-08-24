import { getPropertyAvailability } from '@/lib/airbnb-calendar';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import { getVideoStructuredData } from '@/lib/site-schema';
import { getEventsHeroVideo } from '@/lib/site-videos';

import EventsClient from './events-client';

export const dynamic = 'force-dynamic';

export default async function Events({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const penthouseAvailability = await getPropertyAvailability('penthouse-jacuzzi');
  const heroVideoSchema = getVideoStructuredData(
    getEventsHeroVideo(locale),
    localizePath(locale, '/events'),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroVideoSchema) }}
      />
      <EventsClient
        blockedDates={penthouseAvailability.blockedDates}
        availabilityStatus={penthouseAvailability.status}
      />
    </>
  );
}
