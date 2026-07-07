export const ADMIN_REQUEST_STATUSES = [
  'new',
  'in_progress',
  'quote_sent',
  'accepted',
  'declined',
  'expired',
  'confirmed',
] as const;

export const ADMIN_REQUEST_SOURCE_TYPES = ['reservation', 'event_request'] as const;

export type AdminRequestStatus = (typeof ADMIN_REQUEST_STATUSES)[number];
export type AdminRequestSourceType = (typeof ADMIN_REQUEST_SOURCE_TYPES)[number];

/** Display labels shared by every admin surface that renders a status. */
export const ADMIN_REQUEST_STATUS_LABELS: Record<AdminRequestStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  quote_sent: 'Quote sent',
  accepted: 'Accepted',
  declined: 'Declined',
  expired: 'Expired',
  confirmed: 'Confirmed',
};

export interface AdminRequestSourceInput {
  sourceType: AdminRequestSourceType;
  sourceId: string;
}

export interface AdminRequestStatusInput extends AdminRequestSourceInput {
  status: AdminRequestStatus;
  note?: string;
}
