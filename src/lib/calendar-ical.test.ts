import assert from 'node:assert/strict';
import test from 'node:test';

import { parseBlockedDatesFromCalendar, parseIcalEvents } from './calendar-ical';

const calendarText = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:booking-1
DTSTART;VALUE=DATE:20260810
DTEND;VALUE=DATE:20260813
SUMMARY:Airbnb booking
END:VEVENT
BEGIN:VEVENT
UID:booking-2
DTSTART;VALUE=DATE:20260812
DTEND;VALUE=DATE:20260814
SUMMARY:Booking.com
END:VEVENT
BEGIN:VEVENT
UID:ignored-zero
DTSTART;VALUE=DATE:20260820
DTEND;VALUE=DATE:20260820
SUMMARY:Invalid
END:VEVENT
END:VCALENDAR`;

test('parses normalized iCal events with half-open ranges', () => {
  assert.deepEqual(parseIcalEvents(calendarText), [
    {
      uid: 'booking-1',
      checkIn: '2026-08-10',
      checkOut: '2026-08-13',
      summary: 'Airbnb booking',
    },
    {
      uid: 'booking-2',
      checkIn: '2026-08-12',
      checkOut: '2026-08-14',
      summary: 'Booking.com',
    },
  ]);
});

test('deduplicates blocked nights across overlapping iCal events', () => {
  assert.deepEqual(parseBlockedDatesFromCalendar(calendarText), [
    '2026-08-10',
    '2026-08-11',
    '2026-08-12',
    '2026-08-13',
  ]);
});
