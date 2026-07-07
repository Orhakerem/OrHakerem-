import {
  addNights,
  compareIsoDates,
  createDateFromIso,
  getNightCount,
  getTodayIsoInTimeZone,
  isIsoDateString,
  type BookingDateRange,
} from './booking-dates';
import type { BookablePropertyId } from './bookable-properties';

export type CalendarEventSource = 'airbnb' | 'booking' | 'vrbo' | 'direct' | 'manual';
export type CalendarEventType =
  | 'booking'
  | 'hold'
  | 'manual_block'
  | 'maintenance'
  | 'owner_block'
  | 'private_event';
export type CalendarEventStatus = 'confirmed' | 'tentative' | 'cancelled';
export type CalendarRuleType =
  | 'min_nights'
  | 'max_nights'
  | 'allowed_check_in_days'
  | 'allowed_check_out_days'
  | 'advance_notice'
  | 'booking_window'
  | 'gap_prevention'
  | 'turnover_buffer'
  | 'cleaning_buffer'
  | 'property_combination'
  | 'manual_exception';
export type CalendarValidationSeverity = 'allow' | 'warn' | 'block';

export interface CalendarEvent {
  id: string;
  propertyId: BookablePropertyId;
  source: CalendarEventSource;
  type: CalendarEventType;
  status: CalendarEventStatus;
  checkIn: string;
  checkOut: string;
  title: string;
  notes?: string | null;
}

export interface CalendarRule {
  id: string;
  propertyId: BookablePropertyId | null;
  ruleType: CalendarRuleType;
  name: string;
  isActive: boolean;
  priority: number;
  severity: CalendarValidationSeverity;
  startsOn: string | null;
  endsOn: string | null;
  minNights: number | null;
  maxNights: number | null;
  allowedCheckInDays: number[] | null;
  allowedCheckOutDays: number[] | null;
  minDaysBeforeCheckIn: number | null;
  maxDaysBeforeCheckIn: number | null;
  gapSizeNights: number | null;
  bufferNights: number | null;
  appliesToCombination: boolean;
  reason: string;
}

export interface CalendarValidationInput {
  propertyIds: readonly BookablePropertyId[];
  checkIn: string;
  checkOut: string;
  events: readonly CalendarEvent[];
  rules: readonly CalendarRule[];
  todayIso?: string;
  isCombination?: boolean;
}

export interface CalendarValidationResult {
  available: boolean;
  severity: CalendarValidationSeverity;
  reasons: string[];
  blockingRuleIds: string[];
  warnings: string[];
  conflictingEventIds: string[];
}

export interface CalendarConflict {
  id: string;
  propertyId: BookablePropertyId;
  checkIn: string;
  checkOut: string;
  eventIds: string[];
  severity: 'warning' | 'critical';
  reason: string;
}

const SOURCE_PRIORITY: Record<CalendarEventSource, number> = {
  direct: 5,
  manual: 4,
  booking: 3,
  airbnb: 2,
  vrbo: 1,
};

function getSeverityRank(severity: CalendarValidationSeverity) {
  return severity === 'block' ? 2 : severity === 'warn' ? 1 : 0;
}

function maxSeverity(
  left: CalendarValidationSeverity,
  right: CalendarValidationSeverity,
): CalendarValidationSeverity {
  return getSeverityRank(left) >= getSeverityRank(right) ? left : right;
}

function sortIsoDates(left: string, right: string) {
  return compareIsoDates(left, right);
}

export function getStayNights(checkIn: string, checkOut: string) {
  const nights: string[] = [];

  if (!isIsoDateString(checkIn) || !isIsoDateString(checkOut)) {
    return nights;
  }

  for (
    let cursor = checkIn;
    compareIsoDates(cursor, checkOut) < 0;
    cursor = addNights(cursor, 1)
  ) {
    nights.push(cursor);
  }

  return nights;
}

export function doDateRangesOverlap(
  left: BookingDateRange,
  right: BookingDateRange,
) {
  if (!left.checkIn || !left.checkOut || !right.checkIn || !right.checkOut) {
    return false;
  }

  return (
    compareIsoDates(left.checkIn, right.checkOut) < 0 &&
    compareIsoDates(right.checkIn, left.checkOut) < 0
  );
}

export function getOverlappingRange(
  left: BookingDateRange,
  right: BookingDateRange,
) {
  if (!doDateRangesOverlap(left, right) || !left.checkIn || !left.checkOut || !right.checkIn || !right.checkOut) {
    return null;
  }

  return {
    checkIn: compareIsoDates(left.checkIn, right.checkIn) >= 0 ? left.checkIn : right.checkIn,
    checkOut: compareIsoDates(left.checkOut, right.checkOut) <= 0 ? left.checkOut : right.checkOut,
  };
}

export function getBlockedDatesFromEvents(
  events: readonly CalendarEvent[],
  propertyIds?: readonly BookablePropertyId[],
) {
  const propertyIdSet = propertyIds ? new Set(propertyIds) : null;
  const blockedDates = new Set<string>();

  for (const event of events) {
    if (event.status === 'cancelled') {
      continue;
    }

    if (propertyIdSet && !propertyIdSet.has(event.propertyId)) {
      continue;
    }

    for (const night of getStayNights(event.checkIn, event.checkOut)) {
      blockedDates.add(night);
    }
  }

  return Array.from(blockedDates).sort(sortIsoDates);
}

function isRuleInScope(
  rule: CalendarRule,
  propertyIds: readonly BookablePropertyId[],
  checkIn: string,
  checkOut: string,
  isCombination: boolean,
) {
  if (!rule.isActive) {
    return false;
  }

  if (rule.propertyId && !propertyIds.includes(rule.propertyId)) {
    return false;
  }

  if (rule.appliesToCombination && !isCombination) {
    return false;
  }

  if (rule.startsOn && compareIsoDates(checkOut, rule.startsOn) <= 0) {
    return false;
  }

  if (rule.endsOn && compareIsoDates(checkIn, addNights(rule.endsOn, 1)) >= 0) {
    return false;
  }

  return true;
}

function getIsoDayOfWeek(value: string) {
  return createDateFromIso(value).getUTCDay();
}

function getDaysBeforeCheckIn(checkIn: string, todayIso: string) {
  const diff = createDateFromIso(checkIn).getTime() - createDateFromIso(todayIso).getTime();

  return Math.floor(diff / (24 * 60 * 60 * 1000));
}

function addRuleIssue(
  result: CalendarValidationResult,
  rule: CalendarRule,
  message: string,
) {
  result.severity = maxSeverity(result.severity, rule.severity);

  if (rule.severity === 'block') {
    result.blockingRuleIds.push(rule.id);
    result.reasons.push(message);
    return;
  }

  if (rule.severity === 'warn') {
    result.warnings.push(message);
  }
}

function getSortedEvents(events: readonly CalendarEvent[], propertyId: BookablePropertyId) {
  return events
    .filter((event) => event.propertyId === propertyId && event.status !== 'cancelled')
    .sort((left, right) => {
      const dateDiff = compareIsoDates(left.checkIn, right.checkIn);

      if (dateDiff !== 0) {
        return dateDiff;
      }

      return SOURCE_PRIORITY[right.source] - SOURCE_PRIORITY[left.source];
    });
}

function violatesGapRule(
  propertyId: BookablePropertyId,
  events: readonly CalendarEvent[],
  checkIn: string,
  checkOut: string,
  gapSizeNights: number,
) {
  const sortedEvents = getSortedEvents(events, propertyId);

  for (const event of sortedEvents) {
    const gapBefore = getNightCount({ checkIn: event.checkOut, checkOut: checkIn });
    const gapAfter = getNightCount({ checkIn: checkOut, checkOut: event.checkIn });

    if (gapBefore > 0 && gapBefore <= gapSizeNights) {
      return true;
    }

    if (gapAfter > 0 && gapAfter <= gapSizeNights) {
      return true;
    }
  }

  return false;
}

function violatesTurnoverBuffer(
  propertyId: BookablePropertyId,
  events: readonly CalendarEvent[],
  checkIn: string,
  checkOut: string,
  bufferNights: number,
) {
  if (bufferNights <= 0) {
    return false;
  }

  const bufferedRange = {
    checkIn: addNights(checkIn, -bufferNights),
    checkOut: addNights(checkOut, bufferNights),
  };

  return getSortedEvents(events, propertyId).some((event) =>
    doDateRangesOverlap(bufferedRange, {
      checkIn: event.checkIn,
      checkOut: event.checkOut,
    }),
  );
}

export function validateCalendarStay(input: CalendarValidationInput): CalendarValidationResult {
  const todayIso = input.todayIso ?? getTodayIsoInTimeZone();
  const totalNights = getNightCount({ checkIn: input.checkIn, checkOut: input.checkOut });
  const result: CalendarValidationResult = {
    available: true,
    severity: 'allow',
    reasons: [],
    blockingRuleIds: [],
    warnings: [],
    conflictingEventIds: [],
  };

  if (
    !isIsoDateString(input.checkIn) ||
    !isIsoDateString(input.checkOut) ||
    compareIsoDates(input.checkOut, input.checkIn) <= 0
  ) {
    return {
      available: false,
      severity: 'block',
      reasons: ['Choose a valid check-in and check-out range.'],
      blockingRuleIds: [],
      warnings: [],
      conflictingEventIds: [],
    };
  }

  for (const event of input.events) {
    if (
      event.status !== 'cancelled' &&
      input.propertyIds.includes(event.propertyId) &&
      doDateRangesOverlap(
        { checkIn: input.checkIn, checkOut: input.checkOut },
        { checkIn: event.checkIn, checkOut: event.checkOut },
      )
    ) {
      result.conflictingEventIds.push(event.id);
      result.reasons.push(`Overlaps ${event.title || event.source} on ${event.propertyId}.`);
      result.severity = 'block';
    }
  }

  const scopedRules = input.rules
    .filter((rule) =>
      isRuleInScope(
        rule,
        input.propertyIds,
        input.checkIn,
        input.checkOut,
        input.isCombination ?? input.propertyIds.length > 1,
      ),
    )
    .sort((left, right) => right.priority - left.priority);

  for (const rule of scopedRules) {
    switch (rule.ruleType) {
      case 'min_nights':
        if (rule.minNights !== null && totalNights < rule.minNights) {
          addRuleIssue(result, rule, rule.reason || `Minimum stay is ${rule.minNights} nights.`);
        }
        break;
      case 'max_nights':
        if (rule.maxNights !== null && totalNights > rule.maxNights) {
          addRuleIssue(result, rule, rule.reason || `Maximum stay is ${rule.maxNights} nights.`);
        }
        break;
      case 'allowed_check_in_days':
        if (rule.allowedCheckInDays && !rule.allowedCheckInDays.includes(getIsoDayOfWeek(input.checkIn))) {
          addRuleIssue(result, rule, rule.reason || 'Check-in is not allowed on this day.');
        }
        break;
      case 'allowed_check_out_days':
        if (rule.allowedCheckOutDays && !rule.allowedCheckOutDays.includes(getIsoDayOfWeek(input.checkOut))) {
          addRuleIssue(result, rule, rule.reason || 'Check-out is not allowed on this day.');
        }
        break;
      case 'advance_notice': {
        const daysBeforeCheckIn = getDaysBeforeCheckIn(input.checkIn, todayIso);

        if (rule.minDaysBeforeCheckIn !== null && daysBeforeCheckIn < rule.minDaysBeforeCheckIn) {
          addRuleIssue(
            result,
            rule,
            rule.reason || `Requires at least ${rule.minDaysBeforeCheckIn} days advance notice.`,
          );
        }
        break;
      }
      case 'booking_window': {
        const daysBeforeCheckIn = getDaysBeforeCheckIn(input.checkIn, todayIso);

        if (rule.maxDaysBeforeCheckIn !== null && daysBeforeCheckIn > rule.maxDaysBeforeCheckIn) {
          addRuleIssue(
            result,
            rule,
            rule.reason || `Cannot book more than ${rule.maxDaysBeforeCheckIn} days ahead.`,
          );
        }
        break;
      }
      case 'gap_prevention':
        if (
          rule.gapSizeNights !== null &&
          input.propertyIds.some((propertyId) =>
            violatesGapRule(propertyId, input.events, input.checkIn, input.checkOut, rule.gapSizeNights ?? 0),
          )
        ) {
          addRuleIssue(result, rule, rule.reason || 'This stay creates an operational gap.');
        }
        break;
      case 'turnover_buffer':
      case 'cleaning_buffer':
        if (
          rule.bufferNights !== null &&
          input.propertyIds.some((propertyId) =>
            violatesTurnoverBuffer(propertyId, input.events, input.checkIn, input.checkOut, rule.bufferNights ?? 0),
          )
        ) {
          addRuleIssue(result, rule, rule.reason || 'This stay violates the required buffer.');
        }
        break;
      case 'property_combination':
        if ((input.isCombination ?? input.propertyIds.length > 1) && rule.severity !== 'allow') {
          addRuleIssue(result, rule, rule.reason || 'Combined-property stay requires review.');
        }
        break;
      case 'manual_exception':
        if (rule.severity !== 'allow') {
          addRuleIssue(result, rule, rule.reason || 'Manual calendar exception applies.');
        }
        break;
      default:
        break;
    }
  }

  result.available = result.severity !== 'block' && result.conflictingEventIds.length === 0;

  if (result.conflictingEventIds.length > 0 && result.blockingRuleIds.length === 0) {
    result.severity = 'block';
  }

  return {
    ...result,
    reasons: Array.from(new Set(result.reasons)),
    warnings: Array.from(new Set(result.warnings)),
    blockingRuleIds: Array.from(new Set(result.blockingRuleIds)),
    conflictingEventIds: Array.from(new Set(result.conflictingEventIds)),
  };
}

export function detectCalendarConflicts(events: readonly CalendarEvent[]) {
  const conflicts: CalendarConflict[] = [];
  const activeEvents = events
    .filter((event) => event.status !== 'cancelled')
    .sort((left, right) => compareIsoDates(left.checkIn, right.checkIn));

  for (let index = 0; index < activeEvents.length; index += 1) {
    const left = activeEvents[index];

    for (let nextIndex = index + 1; nextIndex < activeEvents.length; nextIndex += 1) {
      const right = activeEvents[nextIndex];

      if (left.propertyId !== right.propertyId) {
        continue;
      }

      if (compareIsoDates(right.checkIn, left.checkOut) >= 0) {
        break;
      }

      const overlap = getOverlappingRange(
        { checkIn: left.checkIn, checkOut: left.checkOut },
        { checkIn: right.checkIn, checkOut: right.checkOut },
      );

      if (!overlap) {
        continue;
      }

      conflicts.push({
        id: `${left.id}:${right.id}`,
        propertyId: left.propertyId,
        checkIn: overlap.checkIn,
        checkOut: overlap.checkOut,
        eventIds: [left.id, right.id],
        severity: left.source === right.source ? 'warning' : 'critical',
        reason: `Overlap between ${left.source} and ${right.source}.`,
      });
    }
  }

  return conflicts;
}
