'use client';

import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ShieldAlert,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';

import {
  cancelAdminCalendarEvent,
  saveAdminCalendarBlock,
  saveAdminCalendarRule,
  saveAdminPropertyStatus,
  validateAdminCalendarRange,
} from '@/actions/admin-calendar';
import {
  BOOKABLE_PROPERTY_OPTIONS,
  type BookablePropertyId,
} from '@/lib/bookable-properties';
import { addNights, compareIsoDates, getTodayIsoInTimeZone } from '@/lib/booking-dates';
import { adminCalendarRuleInputSchema } from '@/lib/admin-calendar-input-schemas';
import type {
  AdminCalendarBlockInput,
  AdminCalendarSnapshot,
  AdminPropertyStatus,
  PropertyOperationalStatus,
} from '@/lib/admin-calendar';
import type { CalendarEvent, CalendarRuleType } from '@/lib/calendar-rules';

import {
  AdminField,
  AdminIconButton,
  AdminPanel,
  AdminPill,
  AdminSaveButton,
  AdminSelect,
  AdminTextarea,
  AdminToggle,
  type AdminSectionSaveState,
} from './admin-ui';

interface AdminCalendarManagerProps {
  snapshot: AdminCalendarSnapshot;
}

interface CalendarRuleDraft {
  id?: string;
  propertyId: string;
  ruleType: CalendarRuleType;
  name: string;
  isActive: boolean;
  priority: string;
  severity: 'allow' | 'warn' | 'block';
  startsOn: string;
  endsOn: string;
  minNights: string;
  maxNights: string;
  allowedCheckInDays: string;
  allowedCheckOutDays: string;
  minDaysBeforeCheckIn: string;
  maxDaysBeforeCheckIn: string;
  gapSizeNights: string;
  bufferNights: string;
  appliesToCombination: boolean;
  reason: string;
}

const COMBINED_VALUE = 'combined';
const EVENT_TYPE_OPTIONS = [
  { value: 'manual_block', label: 'Manual block' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'owner_block', label: 'Owner block' },
  { value: 'private_event', label: 'Private event' },
  { value: 'hold', label: 'Tentative hold' },
] as const;
const RULE_TYPE_OPTIONS: Array<{ value: CalendarRuleType; label: string }> = [
  { value: 'min_nights', label: 'Minimum nights' },
  { value: 'max_nights', label: 'Maximum nights' },
  { value: 'allowed_check_in_days', label: 'Allowed check-in days' },
  { value: 'allowed_check_out_days', label: 'Allowed check-out days' },
  { value: 'advance_notice', label: 'Advance notice' },
  { value: 'booking_window', label: 'Booking window' },
  { value: 'gap_prevention', label: 'Gap prevention' },
  { value: 'turnover_buffer', label: 'Turnover buffer' },
  { value: 'cleaning_buffer', label: 'Cleaning buffer' },
  { value: 'property_combination', label: 'Penthouse + Studio' },
  { value: 'manual_exception', label: 'Manual exception' },
];
const DAY_OPTIONS = [
  { value: '', label: 'Any day' },
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
] as const;
const PROPERTY_STATUS_OPTIONS = [
  { value: 'clean', label: 'Clean' },
  { value: 'dirty', label: 'Dirty' },
  { value: 'occupied', label: 'Occupied' },
] as const;

const PROPERTY_STATUS_TONES: Record<PropertyOperationalStatus, 'success' | 'warning' | 'neutral'> = {
  clean: 'success',
  dirty: 'warning',
  occupied: 'neutral',
};

function getPropertyOptions(includeCombined = false) {
  const options = BOOKABLE_PROPERTY_OPTIONS.map((property) => ({
    value: property.id,
    label: property.title,
  }));

  return includeCombined
    ? [...options, { value: COMBINED_VALUE, label: 'Penthouse + Studio' }]
    : options;
}

function titleCase(value: string) {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getPropertyTitle(propertyId: string) {
  return (
    BOOKABLE_PROPERTY_OPTIONS.find((property) => property.id === propertyId)?.title ?? propertyId
  );
}

function formatRange(event: Pick<CalendarEvent, 'checkIn' | 'checkOut'>) {
  return `${event.checkIn} - ${event.checkOut}`;
}

function getMonthDays(monthStart: string) {
  const days: string[] = [];
  let cursor = monthStart;

  while (cursor.slice(0, 7) === monthStart.slice(0, 7)) {
    days.push(cursor);
    cursor = addNights(cursor, 1);
  }

  return days;
}

function getVisibleEvents(
  snapshot: AdminCalendarSnapshot,
  propertyFilter: string,
  sourceFilter: string,
) {
  return snapshot.events.filter((event) => {
    if (propertyFilter !== 'all' && event.propertyId !== propertyFilter) {
      return false;
    }

    if (sourceFilter !== 'all' && event.source !== sourceFilter) {
      return false;
    }

    return true;
  });
}

function getEventsForDate(events: readonly CalendarEvent[], date: string) {
  return events.filter(
    (event) =>
      event.status !== 'cancelled' &&
      compareIsoDates(event.checkIn, date) <= 0 &&
      compareIsoDates(date, event.checkOut) < 0,
  );
}

function toPropertyStatusDrafts(statuses: readonly AdminPropertyStatus[]) {
  const statusByProperty = new Map(statuses.map((status) => [status.propertyId, status]));

  return BOOKABLE_PROPERTY_OPTIONS.map((property) => {
    const persistedStatus = statusByProperty.get(property.id);

    return {
      propertyId: property.id,
      title: property.title,
      status: persistedStatus?.status ?? 'clean',
      note: persistedStatus?.note ?? '',
      updatedAt: persistedStatus?.updatedAt ?? null,
    };
  });
}

export default function AdminCalendarManager({ snapshot }: AdminCalendarManagerProps) {
  const todayIso = getTodayIsoInTimeZone();
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [monthStart, setMonthStart] = useState(`${todayIso.slice(0, 7)}-01`);
  const [blockState, setBlockState] = useState<AdminSectionSaveState>('idle');
  const [ruleState, setRuleState] = useState<AdminSectionSaveState>('idle');
  const [validationState, setValidationState] = useState<AdminSectionSaveState>('idle');
  const [propertyStatusState, setPropertyStatusState] = useState<Record<string, AdminSectionSaveState>>({});
  const [propertyStatusDrafts, setPropertyStatusDrafts] = useState(() =>
    toPropertyStatusDrafts(snapshot.propertyStatuses),
  );
  const [blockDraft, setBlockDraft] = useState<AdminCalendarBlockInput>({
    propertyId: 'penthouse-jacuzzi',
    eventType: 'manual_block',
    status: 'confirmed',
    checkIn: todayIso,
    checkOut: addNights(todayIso, 1),
    title: 'Manual block',
    notes: '',
  });
  const [ruleDraft, setRuleDraft] = useState<CalendarRuleDraft>({
    propertyId: '',
    ruleType: 'min_nights',
    name: 'Minimum stay',
    isActive: true,
    priority: '0',
    severity: 'block',
    startsOn: '',
    endsOn: '',
    minNights: '',
    maxNights: '',
    allowedCheckInDays: '',
    allowedCheckOutDays: '',
    minDaysBeforeCheckIn: '',
    maxDaysBeforeCheckIn: '',
    gapSizeNights: '',
    bufferNights: '',
    appliesToCombination: false,
    reason: '',
  });
  const [validationDraft, setValidationDraft] = useState({
    property: 'penthouse-jacuzzi',
    checkIn: todayIso,
    checkOut: addNights(todayIso, 1),
  });
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const visibleEvents = useMemo(
    () => getVisibleEvents(snapshot, propertyFilter, sourceFilter),
    [propertyFilter, snapshot, sourceFilter],
  );
  const monthDays = useMemo(() => getMonthDays(monthStart), [monthStart]);
  const displayedDays = viewMode === 'week' ? monthDays.slice(0, 7) : monthDays;
  const sourceOptions = [
    { value: 'all', label: 'All sources' },
    { value: 'airbnb', label: 'Airbnb' },
    { value: 'booking', label: 'Booking' },
    { value: 'vrbo', label: 'Vrbo' },
    { value: 'direct', label: 'Direct' },
    { value: 'manual', label: 'Manual' },
  ];
  const propertyOptions = [{ value: 'all', label: 'All properties' }, ...getPropertyOptions()];

  async function handleSaveBlock() {
    setBlockState('saving');
    const result = await saveAdminCalendarBlock(blockDraft);

    if (result.success) {
      toast.success(result.message);
      setBlockState('saved');
      return;
    }

    toast.error(result.error);
    setBlockState('error');
  }

  async function handleSaveRule() {
    // Validate with the same schema the server action parses, instead of the
    // previous unchecked `as unknown as` cast of the string-based draft.
    const parsed = adminCalendarRuleInputSchema.safeParse(ruleDraft);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Invalid calendar rule.');
      setRuleState('error');
      return;
    }

    setRuleState('saving');
    const result = await saveAdminCalendarRule(parsed.data);

    if (result.success) {
      toast.success(result.message);
      setRuleState('saved');
      return;
    }

    toast.error(result.error);
    setRuleState('error');
  }

  async function handleCancelEvent(eventId: string) {
    const result = await cancelAdminCalendarEvent(eventId);

    if (result.success) {
      toast.success(result.message);
      return;
    }

    toast.error(result.error);
  }

  async function handleValidateRange() {
    setValidationState('saving');
    const propertyIds =
      validationDraft.property === COMBINED_VALUE
        ? ['penthouse-jacuzzi', 'cozy-studio']
        : [validationDraft.property];
    const result = await validateAdminCalendarRange({
      propertyIds: propertyIds as BookablePropertyId[],
      checkIn: validationDraft.checkIn,
      checkOut: validationDraft.checkOut,
    });

    setValidationResult(
      result.available
        ? `Available with ${result.warnings.length} warning(s).`
        : result.reasons.join(' ') || 'Unavailable.',
    );
    setValidationState(result.available ? 'saved' : 'error');
  }

  async function handleSavePropertyStatus(propertyId: BookablePropertyId) {
    const draft = propertyStatusDrafts.find((candidate) => candidate.propertyId === propertyId);

    if (!draft) {
      return;
    }

    setPropertyStatusState((current) => ({ ...current, [propertyId]: 'saving' }));
    const result = await saveAdminPropertyStatus({
      propertyId,
      status: draft.status,
      note: draft.note,
    });

    if (result.success) {
      toast.success(result.message);
      setPropertyStatusState((current) => ({ ...current, [propertyId]: 'saved' }));
      setPropertyStatusDrafts((current) =>
        current.map((status) =>
          status.propertyId === propertyId
            ? { ...status, updatedAt: new Date().toISOString() }
            : status,
        ),
      );
      return;
    }

    toast.error(result.error);
    setPropertyStatusState((current) => ({ ...current, [propertyId]: 'error' }));
  }

  function updatePropertyStatus(
    propertyId: BookablePropertyId,
    updater: (status: (typeof propertyStatusDrafts)[number]) => (typeof propertyStatusDrafts)[number],
  ) {
    setPropertyStatusDrafts((current) =>
      current.map((status) => (status.propertyId === propertyId ? updater(status) : status)),
    );
    setPropertyStatusState((current) => ({ ...current, [propertyId]: 'idle' }));
  }

  return (
    <div className="space-y-6">
      {snapshot.unavailableReason ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          Calendar admin tables are not fully available yet: {snapshot.unavailableReason}
        </div>
      ) : null}

      <AdminPanel title="Risk panel" eyebrow="Conflicts" icon={ShieldAlert}>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-black/60">Conflicts</span>
            <span className="font-semibold text-black">{snapshot.conflicts.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/60">Health issues</span>
            <span className="font-semibold text-black">{snapshot.healthIssues.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black/60">Rules</span>
            <span className="font-semibold text-black">{snapshot.rules.length}</span>
          </div>
          {snapshot.healthIssues.map((issue) => (
            <p key={issue} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
              {issue}
            </p>
          ))}
        </div>
      </AdminPanel>

      <AdminPanel title="Apartment status" eyebrow="Housekeeping" icon={CheckCircle2}>
        <div className="grid gap-3 md:grid-cols-2">
          {propertyStatusDrafts.map((propertyStatus) => (
            <div
              key={propertyStatus.propertyId}
              className="rounded-xl border border-primary/10 bg-cream/35 p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
                    {propertyStatus.propertyId}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-black">{propertyStatus.title}</h3>
                </div>
                <AdminPill tone={PROPERTY_STATUS_TONES[propertyStatus.status]}>
                  {titleCase(propertyStatus.status)}
                </AdminPill>
              </div>
              <div className="grid gap-3 sm:grid-cols-[10rem_1fr_auto]">
                <AdminSelect
                  label="Status"
                  value={propertyStatus.status}
                  onChange={(value) =>
                    updatePropertyStatus(propertyStatus.propertyId, (current) => ({
                      ...current,
                      status: value as PropertyOperationalStatus,
                    }))
                  }
                  options={PROPERTY_STATUS_OPTIONS}
                />
                <AdminField
                  label="Note"
                  value={propertyStatus.note}
                  onChange={(value) =>
                    updatePropertyStatus(propertyStatus.propertyId, (current) => ({
                      ...current,
                      note: value,
                    }))
                  }
                />
                <div className="flex items-end">
                  <AdminSaveButton
                    state={propertyStatusState[propertyStatus.propertyId] ?? 'idle'}
                    onClick={() => handleSavePropertyStatus(propertyStatus.propertyId)}
                    label="Save"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-black/45">
                Updated: {propertyStatus.updatedAt ?? 'Not saved yet'}
              </p>
            </div>
          ))}
        </div>
      </AdminPanel>

      <AdminPanel
        title="Calendar"
        eyebrow="Multi calendar"
        icon={CalendarDays}
        action={
          <div className="flex flex-wrap gap-2">
            {(['month', 'week', 'list'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  viewMode === mode
                    ? 'border-primary bg-primary text-cream'
                    : 'border-primary/20 text-primary'
                }`}
              >
                {titleCase(mode)}
              </button>
            ))}
          </div>
        }
      >
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <AdminSelect
            label="Property"
            value={propertyFilter}
            onChange={setPropertyFilter}
            options={propertyOptions}
          />
          <AdminSelect
            label="Source"
            value={sourceFilter}
            onChange={setSourceFilter}
            options={sourceOptions}
          />
          <AdminField
            label="Month"
            type="month"
            value={monthStart.slice(0, 7)}
            onChange={(value) => setMonthStart(`${value}-01`)}
          />
        </div>

        {viewMode === 'list' ? (
          <EventList events={visibleEvents} onCancel={handleCancelEvent} />
        ) : (
          <div className="w-full">
            <div className="mb-2 hidden gap-1 sm:grid sm:grid-cols-7">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid gap-1 sm:grid-cols-7">
            {displayedDays.map((day) => {
              const events = getEventsForDate(visibleEvents, day);

              return (
                <div
                  key={day}
                  className="flex min-h-32 flex-col rounded-xl border border-primary/10 bg-cream/25 p-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-black">{Number(day.slice(-2))}</span>
                    <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
                      {day.slice(0, 7)}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-lg border border-primary/15 bg-white px-2 py-1 text-xs text-black/70"
                      >
                        <span className="font-semibold">{titleCase(event.source)}</span>
                        <span className="block truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </AdminPanel>

      {snapshot.conflicts.length > 0 ? (
        <AdminPanel title="Detected conflicts" eyebrow="Review" icon={AlertTriangle}>
          <div className="space-y-2">
            {snapshot.conflicts.map((conflict) => (
              <div key={conflict.id} className="rounded-xl border border-primary/10 bg-cream/35 p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-semibold text-black">
                    {getPropertyTitle(conflict.propertyId)} · {conflict.checkIn} - {conflict.checkOut}
                  </span>
                  <AdminPill tone={conflict.severity === 'critical' ? 'warning' : 'neutral'}>
                    {conflict.severity}
                  </AdminPill>
                </div>
                <p className="mt-1 text-black/60">{conflict.reason}</p>
              </div>
            ))}
          </div>
        </AdminPanel>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminPanel
          title="Internal block"
          eyebrow="Manual"
          icon={CalendarDays}
          action={<AdminSaveButton state={blockState} onClick={handleSaveBlock} label="Save block" />}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminSelect
              label="Property"
              value={blockDraft.propertyId}
              onChange={(value) =>
                setBlockDraft((current) => ({ ...current, propertyId: value as BookablePropertyId }))
              }
              options={getPropertyOptions()}
            />
            <AdminSelect
              label="Type"
              value={blockDraft.eventType ?? 'manual_block'}
              onChange={(value) =>
                setBlockDraft((current) => ({
                  ...current,
                  eventType: value as AdminCalendarBlockInput['eventType'],
                }))
              }
              options={EVENT_TYPE_OPTIONS}
            />
            <AdminField
              label="Check-in"
              type="date"
              value={blockDraft.checkIn}
              onChange={(value) => setBlockDraft((current) => ({ ...current, checkIn: value }))}
            />
            <AdminField
              label="Check-out"
              type="date"
              value={blockDraft.checkOut}
              onChange={(value) => setBlockDraft((current) => ({ ...current, checkOut: value }))}
            />
            <AdminField
              label="Title"
              value={blockDraft.title}
              onChange={(value) => setBlockDraft((current) => ({ ...current, title: value }))}
            />
            <AdminTextarea
              label="Notes"
              value={blockDraft.notes ?? ''}
              onChange={(value) => setBlockDraft((current) => ({ ...current, notes: value }))}
            />
          </div>
        </AdminPanel>

        <AdminPanel
          title="Stay validation"
          eyebrow="Rules"
          icon={CheckCircle2}
          action={
            <AdminSaveButton
              state={validationState}
              onClick={handleValidateRange}
              label="Validate"
            />
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <AdminSelect
              label="Property"
              value={validationDraft.property}
              onChange={(value) => setValidationDraft((current) => ({ ...current, property: value }))}
              options={getPropertyOptions(true)}
            />
            <div />
            <AdminField
              label="Check-in"
              type="date"
              value={validationDraft.checkIn}
              onChange={(value) => setValidationDraft((current) => ({ ...current, checkIn: value }))}
            />
            <AdminField
              label="Check-out"
              type="date"
              value={validationDraft.checkOut}
              onChange={(value) => setValidationDraft((current) => ({ ...current, checkOut: value }))}
            />
          </div>
          {validationResult ? (
            <p className="mt-4 rounded-xl border border-primary/10 bg-cream/40 px-4 py-3 text-sm text-black/70">
              {validationResult}
            </p>
          ) : null}
        </AdminPanel>
      </div>

      <AdminPanel
        title="Calendar rule"
        eyebrow="Rule engine"
        icon={SlidersHorizontal}
        action={<AdminSaveButton state={ruleState} onClick={handleSaveRule} label="Save rule" />}
      >
        <div className="grid gap-3 md:grid-cols-4">
          <AdminField
            label="Name"
            value={ruleDraft.name}
            onChange={(value) => setRuleDraft((current) => ({ ...current, name: value }))}
          />
          <AdminSelect
            label="Rule"
            value={ruleDraft.ruleType}
            onChange={(value) =>
              setRuleDraft((current) => ({ ...current, ruleType: value as CalendarRuleType }))
            }
            options={RULE_TYPE_OPTIONS}
          />
          <AdminSelect
            label="Property"
            value={ruleDraft.propertyId}
            onChange={(value) => setRuleDraft((current) => ({ ...current, propertyId: value }))}
            options={[{ value: '', label: 'All properties' }, ...getPropertyOptions()]}
          />
          <AdminSelect
            label="Severity"
            value={ruleDraft.severity ?? 'block'}
            onChange={(value) =>
              setRuleDraft((current) => ({
                ...current,
                severity: value as CalendarRuleDraft['severity'],
              }))
            }
            options={[
              { value: 'block', label: 'Block' },
              { value: 'warn', label: 'Warn' },
              { value: 'allow', label: 'Allow' },
            ]}
          />
          <AdminField
            label="Start"
            type="date"
            value={ruleDraft.startsOn}
            onChange={(value) => setRuleDraft((current) => ({ ...current, startsOn: value }))}
          />
          <AdminField
            label="End"
            type="date"
            value={ruleDraft.endsOn}
            onChange={(value) => setRuleDraft((current) => ({ ...current, endsOn: value }))}
          />
          <AdminField
            label="Min nights"
            type="number"
            value={String(ruleDraft.minNights ?? '')}
            onChange={(value) => setRuleDraft((current) => ({ ...current, minNights: value }))}
          />
          <AdminField
            label="Max nights"
            type="number"
            value={String(ruleDraft.maxNights ?? '')}
            onChange={(value) => setRuleDraft((current) => ({ ...current, maxNights: value }))}
          />
          <AdminSelect
            label="Check-in day"
            value={String(ruleDraft.allowedCheckInDays ?? '')}
            onChange={(value) =>
              setRuleDraft((current) => ({ ...current, allowedCheckInDays: value }))
            }
            options={DAY_OPTIONS}
          />
          <AdminSelect
            label="Check-out day"
            value={String(ruleDraft.allowedCheckOutDays ?? '')}
            onChange={(value) =>
              setRuleDraft((current) => ({ ...current, allowedCheckOutDays: value }))
            }
            options={DAY_OPTIONS}
          />
          <AdminField
            label="Min lead days"
            type="number"
            value={String(ruleDraft.minDaysBeforeCheckIn ?? '')}
            onChange={(value) =>
              setRuleDraft((current) => ({ ...current, minDaysBeforeCheckIn: value }))
            }
          />
          <AdminField
            label="Max lead days"
            type="number"
            value={String(ruleDraft.maxDaysBeforeCheckIn ?? '')}
            onChange={(value) =>
              setRuleDraft((current) => ({ ...current, maxDaysBeforeCheckIn: value }))
            }
          />
          <AdminField
            label="Gap nights"
            type="number"
            value={String(ruleDraft.gapSizeNights ?? '')}
            onChange={(value) => setRuleDraft((current) => ({ ...current, gapSizeNights: value }))}
          />
          <AdminField
            label="Buffer nights"
            type="number"
            value={String(ruleDraft.bufferNights ?? '')}
            onChange={(value) => setRuleDraft((current) => ({ ...current, bufferNights: value }))}
          />
          <AdminField
            label="Priority"
            type="number"
            value={String(ruleDraft.priority ?? 0)}
            onChange={(value) => setRuleDraft((current) => ({ ...current, priority: value }))}
          />
          <div className="flex items-end">
            <AdminToggle
              label="Combination only"
              checked={Boolean(ruleDraft.appliesToCombination)}
              onChange={(checked) =>
                setRuleDraft((current) => ({ ...current, appliesToCombination: checked }))
              }
            />
          </div>
          <div className="md:col-span-4">
            <AdminTextarea
              label="Reason shown to admin"
              value={ruleDraft.reason ?? ''}
              onChange={(value) => setRuleDraft((current) => ({ ...current, reason: value }))}
            />
          </div>
        </div>
      </AdminPanel>
    </div>
  );
}

function EventList({
  events,
  onCancel,
}: {
  events: readonly CalendarEvent[];
  onCancel: (eventId: string) => void;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-secondary/40 bg-cream/40 px-4 py-8 text-center text-sm text-black/55">
        No calendar events match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-primary/10">
      <table className="w-full min-w-[52rem] text-left text-sm">
        <thead className="bg-white text-[10px] uppercase tracking-[0.18em] text-black/45">
          <tr>
            <th className="px-4 py-3 font-semibold">Date</th>
            <th className="px-4 py-3 font-semibold">Property</th>
            <th className="px-4 py-3 font-semibold">Source</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 text-right font-semibold">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-3 font-medium text-black">{formatRange(event)}</td>
              <td className="px-4 py-3 text-black/65">{getPropertyTitle(event.propertyId)}</td>
              <td className="px-4 py-3 text-black/65">{titleCase(event.source)}</td>
              <td className="px-4 py-3 text-black/65">{titleCase(event.type)}</td>
              <td className="px-4 py-3 text-black/65">{event.title}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  {event.source === 'manual' || event.source === 'direct' ? (
                    <AdminIconButton
                      label="Remove event"
                      icon={Trash2}
                      tone="danger"
                      onClick={() => onCancel(event.id)}
                    />
                  ) : (
                    <span className="text-xs text-black/40">Read only</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
