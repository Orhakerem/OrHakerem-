import { addNights, compareIsoDates } from './booking-dates';

export interface ParsedIcalEvent {
  uid: string;
  checkIn: string;
  checkOut: string;
  summary: string;
}

function unfoldIcalLines(calendarText: string) {
  const lines = calendarText.split(/\r?\n/);
  const unfoldedLines: string[] = [];

  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && unfoldedLines.length > 0) {
      unfoldedLines[unfoldedLines.length - 1] += line.slice(1);
      continue;
    }

    unfoldedLines.push(line);
  }

  return unfoldedLines;
}

function extractIcalPropertyValue(eventLines: readonly string[], propertyName: string) {
  const line = eventLines.find(
    (candidateLine) =>
      candidateLine.startsWith(`${propertyName}:`) ||
      candidateLine.startsWith(`${propertyName};`),
  );

  if (!line) {
    return null;
  }

  const separatorIndex = line.indexOf(':');

  return separatorIndex === -1 ? null : line.slice(separatorIndex + 1).trim();
}

function parseIcalDate(value: string | null) {
  if (!value) {
    return null;
  }

  const match = value.match(/^(\d{4})(\d{2})(\d{2})/);

  if (!match) {
    return null;
  }

  return `${match[1]}-${match[2]}-${match[3]}`;
}

export function parseIcalEvents(calendarText: string): ParsedIcalEvent[] {
  const events: ParsedIcalEvent[] = [];
  const unfoldedLines = unfoldIcalLines(calendarText);
  let currentEventLines: string[] | null = null;

  for (const rawLine of unfoldedLines) {
    const line = rawLine.trimEnd();

    if (line === 'BEGIN:VEVENT') {
      currentEventLines = [];
      continue;
    }

    if (line === 'END:VEVENT') {
      if (currentEventLines) {
        const checkIn = parseIcalDate(extractIcalPropertyValue(currentEventLines, 'DTSTART'));
        const checkOut = parseIcalDate(extractIcalPropertyValue(currentEventLines, 'DTEND'));
        const uid = extractIcalPropertyValue(currentEventLines, 'UID');
        const summary = extractIcalPropertyValue(currentEventLines, 'SUMMARY') ?? 'External booking';

        if (checkIn && checkOut && compareIsoDates(checkIn, checkOut) < 0) {
          events.push({
            uid: uid || `${checkIn}:${checkOut}:${summary}`,
            checkIn,
            checkOut,
            summary,
          });
        }
      }

      currentEventLines = null;
      continue;
    }

    currentEventLines?.push(line);
  }

  return events;
}

export function parseBlockedDatesFromCalendar(calendarText: string) {
  const blockedDates = new Set<string>();

  for (const event of parseIcalEvents(calendarText)) {
    for (
      let dateCursor = event.checkIn;
      compareIsoDates(dateCursor, event.checkOut) < 0;
      dateCursor = addNights(dateCursor, 1)
    ) {
      blockedDates.add(dateCursor);
    }
  }

  return Array.from(blockedDates).sort(compareIsoDates);
}
