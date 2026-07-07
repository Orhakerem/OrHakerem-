'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FileText } from 'lucide-react';

import { updateAdminRequestStatus } from '@/actions/admin-requests';
import {
  ADMIN_REQUEST_STATUSES,
  type AdminRequestStatus,
} from '@/lib/admin-request-status';
import type { AdminCustomerRequestSummary } from '@/lib/admin-requests';

interface AdminRequestsInboxProps {
  requests: AdminCustomerRequestSummary[];
}

const STATUS_LABELS: Record<AdminRequestStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  quote_sent: 'Quote sent',
  accepted: 'Accepted',
  declined: 'Declined',
  expired: 'Expired',
  confirmed: 'Confirmed',
};

const STATUS_TONES: Record<AdminRequestStatus, string> = {
  new: 'border-blue-200 bg-blue-50 text-blue-900',
  in_progress: 'border-amber-200 bg-amber-50 text-amber-900',
  quote_sent: 'border-primary/20 bg-primary/[0.05] text-primary',
  accepted: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  declined: 'border-red-200 bg-red-50 text-red-900',
  expired: 'border-black/10 bg-black/[0.04] text-black/60',
  confirmed: 'border-green-200 bg-green-50 text-green-900',
};

function getRequestKey(request: AdminCustomerRequestSummary) {
  return `${request.sourceType}:${request.sourceId}`;
}

export default function AdminRequestsInbox({ requests }: AdminRequestsInboxProps) {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(requests.map((request) => [getRequestKey(request), request.status])),
  );
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const totals = useMemo(
    () =>
      requests.reduce(
        (summary, request) => {
          const status = statuses[getRequestKey(request)] ?? request.status;
          summary[status] += 1;
          return summary;
        },
        ADMIN_REQUEST_STATUSES.reduce(
          (summary, status) => ({ ...summary, [status]: 0 }),
          {} as Record<AdminRequestStatus, number>,
        ),
      ),
    [requests, statuses],
  );

  async function handleStatusChange(
    request: AdminCustomerRequestSummary,
    status: AdminRequestStatus,
  ) {
    const key = getRequestKey(request);
    const previousStatus = statuses[key] ?? request.status;

    setStatuses((current) => ({ ...current, [key]: status }));
    setSavingKey(key);

    try {
      const result = await updateAdminRequestStatus({
        sourceType: request.sourceType,
        sourceId: request.sourceId,
        status,
        note: request.statusNote,
      });

      if (result.success) {
        toast.success('Request status saved.');
      } else {
        setStatuses((current) => ({ ...current, [key]: previousStatus }));
        toast.error(result.error);
      }
    } catch (error) {
      console.error('Request status update failed:', error);
      setStatuses((current) => ({ ...current, [key]: previousStatus }));
      toast.error('Failed to save request status.');
    } finally {
      setSavingKey(null);
    }
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-primary/10 bg-white p-6 text-sm text-black/60 shadow-sm">
        No apartment or event requests are waiting in the inbox.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {ADMIN_REQUEST_STATUSES.map((status) => (
          <div
            key={status}
            className="rounded-xl border border-primary/10 bg-white p-4 shadow-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
              {STATUS_LABELS[status]}
            </p>
            <p className="mt-1 font-head text-3xl font-light text-black">
              {totals[status]}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[62rem] text-left text-sm">
            <thead className="border-b border-primary/10 bg-cream/40 text-[10px] uppercase tracking-[0.18em] text-black/45">
              <tr>
                <th className="px-4 py-3 font-semibold">Request</th>
                <th className="px-4 py-3 font-semibold">Guest</th>
                <th className="px-4 py-3 font-semibold">Dates</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {requests.map((request) => {
                const key = getRequestKey(request);
                const status = statuses[key] ?? request.status;

                return (
                  <tr key={key}>
                    <td className="px-4 py-4 align-top">
                      <p className="font-semibold text-black">{request.title}</p>
                      <p className="mt-1 text-xs text-black/50">
                        {request.kind === 'event' ? 'Event request' : 'Apartment request'}
                        {request.detailLabel ? ` · ${request.detailLabel}` : ''}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top text-black/70">
                      <p className="font-medium text-black">{request.guestName}</p>
                      <p className="text-xs text-black/50">{request.guestEmail}</p>
                      <p className="text-xs text-black/50">{request.guestPhone}</p>
                    </td>
                    <td className="px-4 py-4 align-top text-black/70">{request.dateLabel}</td>
                    <td className="px-4 py-4 align-top font-semibold text-black">
                      {request.amountLabel}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_TONES[status]}`}>
                          {STATUS_LABELS[status]}
                        </span>
                        <select
                          value={status}
                          disabled={savingKey === key}
                          onChange={(event) =>
                            handleStatusChange(request, event.target.value as AdminRequestStatus)
                          }
                          className="h-9 rounded-lg border border-primary/20 bg-white px-2 text-xs font-medium text-black outline-none focus:border-primary/60"
                        >
                          {ADMIN_REQUEST_STATUSES.map((option) => (
                            <option key={option} value={option}>
                              {STATUS_LABELS[option]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      <Link
                        href={request.quoteHref}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-cream transition-colors hover:bg-primary-light"
                      >
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        Create quote
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
