import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';

import {
  BOOKABLE_PROPERTIES,
  BOOKABLE_PROPERTY_IDS,
  type BookablePropertyId,
  type CalendarSyncStatus,
  type PropertyAvailabilityStatusMap,
  type PropertyBlockedDatesMap,
} from './bookable-properties';
import {
  isPropertyOperationalStatus,
  type AdminPropertyStatus,
  type AdminPropertyStatusInput,
  type PropertyOperationalStatus,
} from './admin-calendar-status';
import { addNights, compareIsoDates, isIsoDateString } from './booking-dates';
import {
  detectCalendarConflicts,
  getBlockedDatesFromEvents,
  validateCalendarStay,
  type CalendarConflict,
  type CalendarEvent,
  type CalendarEventSource,
  type CalendarEventStatus,
  type CalendarEventType,
  type CalendarRule,
  type CalendarRuleType,
  type CalendarValidationResult,
  type CalendarValidationSeverity,
} from './calendar-rules';
import { getSupabaseAdminClient, MissingSupabaseAdminEnvError } from './supabase-admin';

export type CalendarSourceStatus = CalendarSyncStatus;
export type { AdminPropertyStatus, AdminPropertyStatusInput, PropertyOperationalStatus };

export interface AdminCalendarSource {
  id: string;
  propertyId: BookablePropertyId;
  channel: Exclude<CalendarEventSource, 'direct' | 'manual'>;
  name: string;
  icalUrl: string;
  isEnabled: boolean;
  status: CalendarSourceStatus;
  lastSyncAt: string | null;
  lastSuccessAt: string | null;
  lastError: string | null;
}

export interface AdminCalendarSnapshot {
  sources: AdminCalendarSource[];
  events: CalendarEvent[];
  rules: CalendarRule[];
  propertyStatuses: AdminPropertyStatus[];
  conflicts: CalendarConflict[];
  blockedDatesByProperty: PropertyBlockedDatesMap;
  availabilityStatusByProperty: PropertyAvailabilityStatusMap;
  lastSyncAt: string | null;
  healthIssues: string[];
  unavailableReason?: string;
}

export interface AdminCalendarValidationInput {
  propertyIds: BookablePropertyId[];
  checkIn: string;
  checkOut: string;
}

export interface AdminCalendarValidationOutput extends CalendarValidationResult {
  sourceStatus: CalendarSyncStatus;
}

const CALENDAR_CHANNELS = ['airbnb', 'booking', 'vrbo'] as const;
const CALENDAR_EVENT_TYPES = [
  'booking',
  'hold',
  'manual_block',
  'maintenance',
  'owner_block',
  'private_event',
] as const;
const CALENDAR_EVENT_STATUSES = ['confirmed', 'tentative', 'cancelled'] as const;
const CALENDAR_RULE_TYPES = [
  'min_nights',
  'max_nights',
  'allowed_check_in_days',
  'allowed_check_out_days',
  'advance_notice',
  'booking_window',
  'gap_prevention',
  'turnover_buffer',
  'cleaning_buffer',
  'property_combination',
  'manual_exception',
] as const;
const CALENDAR_VALIDATION_SEVERITIES = ['allow', 'warn', 'block'] as const;

const bookablePropertyIdSchema = z.enum(BOOKABLE_PROPERTY_IDS as [BookablePropertyId, ...BookablePropertyId[]]);
const nullableBookablePropertyIdSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  bookablePropertyIdSchema.nullable(),
);
const optionalIsoDateSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date').nullable(),
);
const optionalIntegerSchema = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  z.coerce.number().int().nullable(),
);
const optionalDayListSchema = z.preprocess((value) => {
  if (value === '' || value === undefined || value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return String(value)
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((item) => Number.isInteger(item));
}, z.array(z.number().int().min(0).max(6)).nullable());

export const adminCalendarBlockInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    propertyId: bookablePropertyIdSchema,
    eventType: z.enum(CALENDAR_EVENT_TYPES).default('manual_block'),
    status: z.enum(CALENDAR_EVENT_STATUSES).default('confirmed'),
    checkIn: z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date'),
    checkOut: z.string().refine((value) => isIsoDateString(value), 'Expected YYYY-MM-DD date'),
    title: z.string().trim().min(1),
    notes: z.string().trim().optional().default(''),
  })
  .superRefine((value, ctx) => {
    if (compareIsoDates(value.checkOut, value.checkIn) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['checkOut'],
        message: 'Check-out must be after check-in',
      });
    }
  });

export const adminCalendarRuleInputSchema = z
  .object({
    id: z.string().uuid().optional(),
    propertyId: nullableBookablePropertyIdSchema,
    ruleType: z.enum(CALENDAR_RULE_TYPES),
    name: z.string().trim().min(1),
    isActive: z.boolean().default(true),
    priority: z.coerce.number().int().min(0).default(0),
    severity: z.enum(CALENDAR_VALIDATION_SEVERITIES).default('block'),
    startsOn: optionalIsoDateSchema,
    endsOn: optionalIsoDateSchema,
    minNights: optionalIntegerSchema,
    maxNights: optionalIntegerSchema,
    allowedCheckInDays: optionalDayListSchema,
    allowedCheckOutDays: optionalDayListSchema,
    minDaysBeforeCheckIn: optionalIntegerSchema,
    maxDaysBeforeCheckIn: optionalIntegerSchema,
    gapSizeNights: optionalIntegerSchema,
    bufferNights: optionalIntegerSchema,
    appliesToCombination: z.boolean().default(false),
    reason: z.string().trim().optional().default(''),
  })
  .superRefine((value, ctx) => {
    if (value.startsOn && value.endsOn && compareIsoDates(value.endsOn, value.startsOn) < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endsOn'],
        message: 'End date must be on or after start date',
      });
    }
  });

export type AdminCalendarBlockInput = z.input<typeof adminCalendarBlockInputSchema>;
export type AdminCalendarRuleInput = z.input<typeof adminCalendarRuleInputSchema>;

interface CalendarSourceRow {
  id: string;
  property_id: string;
  channel: string;
  name: string | null;
  ical_url: string;
  is_enabled: boolean | null;
  status: CalendarSourceStatus | null;
  last_sync_at: string | null;
  last_success_at: string | null;
  last_error: string | null;
}

interface CalendarEventRow {
  id: string;
  property_id: string;
  source: string;
  event_type: string;
  status: string;
  check_in: string;
  check_out: string;
  title: string | null;
  notes: string | null;
}

interface CalendarRuleRow {
  id: string;
  property_id: string | null;
  rule_type: CalendarRuleType;
  name: string | null;
  is_active: boolean | null;
  priority: number | string | null;
  severity: CalendarValidationSeverity | null;
  starts_on: string | null;
  ends_on: string | null;
  min_nights: number | string | null;
  max_nights: number | string | null;
  allowed_check_in_days: number[] | string | null;
  allowed_check_out_days: number[] | string | null;
  min_days_before_check_in: number | string | null;
  max_days_before_check_in: number | string | null;
  gap_size_nights: number | string | null;
  buffer_nights: number | string | null;
  applies_to_combination: boolean | null;
  reason: string | null;
}

interface PropertyStatusRow {
  property_id: string;
  status: string | null;
  note: string | null;
  updated_at: string | null;
  updated_by: string | null;
}

function toInteger(value: number | string | null, fallback = 0) {
  const parsedValue = typeof value === 'string' ? Number(value) : value;

  return parsedValue !== null && Number.isInteger(parsedValue) ? parsedValue : fallback;
}

function toNullableInteger(value: number | string | null) {
  if (value === null || value === '') {
    return null;
  }

  return toInteger(value);
}

function parseDayList(value: number[] | string | null) {
  if (Array.isArray(value)) {
    return value.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
  }

  if (!value) {
    return null;
  }

  return value
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
}

function isBookablePropertyIdValue(value: string): value is BookablePropertyId {
  return BOOKABLE_PROPERTY_IDS.includes(value as BookablePropertyId);
}

function mapSource(row: CalendarSourceRow): AdminCalendarSource | null {
  if (!isBookablePropertyIdValue(row.property_id) || !CALENDAR_CHANNELS.includes(row.channel as never)) {
    return null;
  }

  return {
    id: row.id,
    propertyId: row.property_id,
    channel: row.channel as AdminCalendarSource['channel'],
    name: row.name ?? row.channel,
    icalUrl: row.ical_url,
    isEnabled: row.is_enabled !== false,
    status: row.status ?? 'ready',
    lastSyncAt: row.last_sync_at,
    lastSuccessAt: row.last_success_at,
    lastError: row.last_error,
  };
}

function mapEvent(row: CalendarEventRow): CalendarEvent | null {
  if (!isBookablePropertyIdValue(row.property_id)) {
    return null;
  }

  return {
    id: row.id,
    propertyId: row.property_id,
    source: row.source as CalendarEventSource,
    type: row.event_type as CalendarEventType,
    status: row.status as CalendarEventStatus,
    checkIn: row.check_in,
    checkOut: row.check_out,
    title: row.title ?? row.source,
    notes: row.notes,
  };
}

function mapRule(row: CalendarRuleRow): CalendarRule | null {
  if (row.property_id && !isBookablePropertyIdValue(row.property_id)) {
    return null;
  }

  return {
    id: row.id,
    propertyId: row.property_id as BookablePropertyId | null,
    ruleType: row.rule_type,
    name: row.name ?? row.rule_type,
    isActive: row.is_active !== false,
    priority: toInteger(row.priority, 0),
    severity: row.severity ?? 'block',
    startsOn: row.starts_on,
    endsOn: row.ends_on,
    minNights: toNullableInteger(row.min_nights),
    maxNights: toNullableInteger(row.max_nights),
    allowedCheckInDays: parseDayList(row.allowed_check_in_days),
    allowedCheckOutDays: parseDayList(row.allowed_check_out_days),
    minDaysBeforeCheckIn: toNullableInteger(row.min_days_before_check_in),
    maxDaysBeforeCheckIn: toNullableInteger(row.max_days_before_check_in),
    gapSizeNights: toNullableInteger(row.gap_size_nights),
    bufferNights: toNullableInteger(row.buffer_nights),
    appliesToCombination: row.applies_to_combination === true,
    reason: row.reason ?? '',
  };
}

function mapPropertyStatus(row: PropertyStatusRow): AdminPropertyStatus | null {
  if (
    !isBookablePropertyIdValue(row.property_id) ||
    !isPropertyOperationalStatus(row.status)
  ) {
    return null;
  }

  return {
    propertyId: row.property_id,
    status: row.status as PropertyOperationalStatus,
    note: row.note ?? '',
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}

function getDefaultSources(): AdminCalendarSource[] {
  return BOOKABLE_PROPERTY_IDS.flatMap((propertyId) =>
    BOOKABLE_PROPERTIES[propertyId].icalUrls.map((icalUrl, index) => {
      const channel = icalUrl.includes('booking.com') ? 'booking' : 'airbnb';

      return {
        id: `default:${propertyId}:${index}`,
        propertyId,
        channel,
        name: `${BOOKABLE_PROPERTIES[propertyId].title} ${channel}`,
        icalUrl,
        isEnabled: true,
        status: 'ready' as const,
        lastSyncAt: null,
        lastSuccessAt: null,
        lastError: null,
      };
    }),
  );
}

function getDefaultPropertyStatuses(): AdminPropertyStatus[] {
  return BOOKABLE_PROPERTY_IDS.map((propertyId) => ({
    propertyId,
    status: 'clean',
    note: '',
    updatedAt: null,
    updatedBy: null,
  }));
}

function getEmptyBlockedDateMap(): PropertyBlockedDatesMap {
  return BOOKABLE_PROPERTY_IDS.reduce((blockedDatesByProperty, propertyId) => {
    blockedDatesByProperty[propertyId] = [];

    return blockedDatesByProperty;
  }, {} as PropertyBlockedDatesMap);
}

function getReadyStatusMap(): PropertyAvailabilityStatusMap {
  return Object.fromEntries(BOOKABLE_PROPERTY_IDS.map((propertyId) => [propertyId, 'ready'])) as PropertyAvailabilityStatusMap;
}

function getStatusByProperty(sources: readonly AdminCalendarSource[]) {
  const statusByProperty = getReadyStatusMap();

  for (const source of sources) {
    if (!source.isEnabled) {
      continue;
    }

    if (source.status === 'error') {
      statusByProperty[source.propertyId] = 'error';
    } else if (source.status === 'stale' && statusByProperty[source.propertyId] !== 'error') {
      statusByProperty[source.propertyId] = 'stale';
    }
  }

  return statusByProperty;
}

function buildSnapshot(
  sources: AdminCalendarSource[],
  events: CalendarEvent[],
  rules: CalendarRule[],
  propertyStatuses: AdminPropertyStatus[],
  unavailableReason?: string,
): AdminCalendarSnapshot {
  const blockedDatesByProperty = getEmptyBlockedDateMap();
  const healthIssues: string[] = [];

  for (const propertyId of BOOKABLE_PROPERTY_IDS) {
    blockedDatesByProperty[propertyId] = getBlockedDatesFromEvents(events, [propertyId]);
  }

  for (const source of sources) {
    if (source.status === 'error') {
      healthIssues.push(`${source.name}: ${source.lastError ?? 'sync error'}`);
    } else if (source.status === 'stale') {
      healthIssues.push(`${source.name}: stale calendar data`);
    }
  }

  const lastSyncAt = sources
    .map((source) => source.lastSyncAt)
    .filter((value): value is string => Boolean(value))
    .sort(compareIsoDates)
    .at(-1) ?? null;

  return {
    sources,
    events,
    rules,
    propertyStatuses,
    conflicts: detectCalendarConflicts(events),
    blockedDatesByProperty,
    availabilityStatusByProperty: getStatusByProperty(sources),
    lastSyncAt,
    healthIssues,
    unavailableReason,
  };
}

async function fetchRows(client: SupabaseClient) {
  const [sourcesResult, eventsResult, rulesResult, propertyStatusesResult] = await Promise.all([
    client
      .from('calendar_sources')
      .select('id, property_id, channel, name, ical_url, is_enabled, status, last_sync_at, last_success_at, last_error')
      .order('property_id', { ascending: true }),
    client
      .from('calendar_events')
      .select('id, property_id, source, event_type, status, check_in, check_out, title, notes')
      .neq('status', 'cancelled')
      .order('check_in', { ascending: true }),
    client
      .from('calendar_rules')
      .select('id, property_id, rule_type, name, is_active, priority, severity, starts_on, ends_on, min_nights, max_nights, allowed_check_in_days, allowed_check_out_days, min_days_before_check_in, max_days_before_check_in, gap_size_nights, buffer_nights, applies_to_combination, reason')
      .eq('is_active', true)
      .order('priority', { ascending: false }),
    client
      .from('property_operational_statuses')
      .select('property_id, status, note, updated_at, updated_by')
      .order('property_id', { ascending: true }),
  ]);

  if (sourcesResult.error || eventsResult.error || rulesResult.error) {
    throw new Error(
      sourcesResult.error?.message ??
        eventsResult.error?.message ??
        rulesResult.error?.message ??
        'Calendar tables unavailable',
    );
  }

  return {
    sources: (sourcesResult.data ?? [])
      .map((row) => mapSource(row as CalendarSourceRow))
      .filter((source): source is AdminCalendarSource => Boolean(source)),
    events: (eventsResult.data ?? [])
      .map((row) => mapEvent(row as CalendarEventRow))
      .filter((event): event is CalendarEvent => Boolean(event)),
    rules: (rulesResult.data ?? [])
      .map((row) => mapRule(row as CalendarRuleRow))
      .filter((rule): rule is CalendarRule => Boolean(rule)),
    propertyStatuses: (propertyStatusesResult.error ? [] : (propertyStatusesResult.data ?? []))
      .map((row) => mapPropertyStatus(row as PropertyStatusRow))
      .filter((status): status is AdminPropertyStatus => Boolean(status)),
  };
}

async function getAdminClient() {
  return getSupabaseAdminClient();
}

export async function fetchAdminCalendarSnapshot(
  client?: SupabaseClient,
): Promise<AdminCalendarSnapshot> {
  try {
    const supabase = client ?? await getAdminClient();
    const rows = await fetchRows(supabase);
    const sources = rows.sources.length > 0 ? rows.sources : getDefaultSources();
    const persistedStatuses = new Map(
      rows.propertyStatuses.map((status) => [status.propertyId, status]),
    );
    const propertyStatuses = getDefaultPropertyStatuses().map(
      (status) => persistedStatuses.get(status.propertyId) ?? status,
    );

    return buildSnapshot(sources, rows.events, rows.rules, propertyStatuses);
  } catch (error) {
    const message =
      error instanceof MissingSupabaseAdminEnvError
        ? 'Calendar admin tables unavailable without a Supabase admin key.'
        : error instanceof Error
          ? error.message
          : 'Calendar admin tables unavailable';

    return buildSnapshot(getDefaultSources(), [], [], getDefaultPropertyStatuses(), message);
  }
}

export async function fetchConsolidatedCalendarAvailability() {
  const snapshot = await fetchAdminCalendarSnapshot();

  return {
    blockedDatesByProperty: snapshot.blockedDatesByProperty,
    availabilityStatusByProperty: snapshot.availabilityStatusByProperty,
    snapshot,
  };
}

export function validateAdminCalendarStay(
  snapshot: AdminCalendarSnapshot,
  input: AdminCalendarValidationInput,
): AdminCalendarValidationOutput {
  const sourceStatus = input.propertyIds.reduce<CalendarSyncStatus>((status, propertyId) => {
    const propertyStatus = snapshot.availabilityStatusByProperty[propertyId] ?? 'ready';

    if (propertyStatus === 'error') {
      return 'error';
    }

    if (propertyStatus === 'stale' && status !== 'error') {
      return 'stale';
    }

    return status;
  }, 'ready');

  if (sourceStatus === 'error') {
    return {
      available: false,
      severity: 'block',
      reasons: ['Calendar availability is temporarily unavailable. Refresh before sending.'],
      blockingRuleIds: [],
      warnings: [],
      conflictingEventIds: [],
      sourceStatus,
    };
  }

  const validation = validateCalendarStay({
    propertyIds: input.propertyIds,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    events: snapshot.events,
    rules: snapshot.rules,
    isCombination: input.propertyIds.length > 1,
  });

  return {
    ...validation,
    warnings:
      sourceStatus === 'stale'
        ? ['Calendar source is stale; review before confirming.', ...validation.warnings]
        : validation.warnings,
    sourceStatus,
  };
}

export function buildCalendarEventRow(input: AdminCalendarBlockInput) {
  const parsed = adminCalendarBlockInputSchema.parse(input);

  return {
    ...(parsed.id ? { id: parsed.id } : {}),
    property_id: parsed.propertyId,
    source: 'manual',
    event_type: parsed.eventType,
    status: parsed.status,
    check_in: parsed.checkIn,
    check_out: parsed.checkOut,
    title: parsed.title,
    notes: parsed.notes,
  };
}

export function buildCalendarRuleRow(input: AdminCalendarRuleInput) {
  const parsed = adminCalendarRuleInputSchema.parse(input);

  return {
    ...(parsed.id ? { id: parsed.id } : {}),
    property_id: parsed.propertyId,
    rule_type: parsed.ruleType,
    name: parsed.name,
    is_active: parsed.isActive,
    priority: parsed.priority,
    severity: parsed.severity,
    starts_on: parsed.startsOn,
    ends_on: parsed.endsOn,
    min_nights: parsed.minNights,
    max_nights: parsed.maxNights,
    allowed_check_in_days: parsed.allowedCheckInDays,
    allowed_check_out_days: parsed.allowedCheckOutDays,
    min_days_before_check_in: parsed.minDaysBeforeCheckIn,
    max_days_before_check_in: parsed.maxDaysBeforeCheckIn,
    gap_size_nights: parsed.gapSizeNights,
    buffer_nights: parsed.bufferNights,
    applies_to_combination: parsed.appliesToCombination,
    reason: parsed.reason,
  };
}

export function expandEventToBlockedDates(event: Pick<CalendarEvent, 'checkIn' | 'checkOut'>) {
  const blockedDates: string[] = [];

  for (
    let cursor = event.checkIn;
    compareIsoDates(cursor, event.checkOut) < 0;
    cursor = addNights(cursor, 1)
  ) {
    blockedDates.push(cursor);
  }

  return blockedDates;
}
