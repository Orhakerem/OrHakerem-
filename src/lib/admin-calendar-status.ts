import { z } from 'zod';

import {
  BOOKABLE_PROPERTY_IDS,
  type BookablePropertyId,
} from './bookable-properties';

export type PropertyOperationalStatus = 'clean' | 'dirty' | 'occupied';

export interface AdminPropertyStatus {
  propertyId: BookablePropertyId;
  status: PropertyOperationalStatus;
  note: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

const PROPERTY_OPERATIONAL_STATUSES = ['clean', 'dirty', 'occupied'] as const;

const bookablePropertyIdSchema = z.enum(
  BOOKABLE_PROPERTY_IDS as [BookablePropertyId, ...BookablePropertyId[]],
);

export const adminPropertyStatusInputSchema = z.object({
  propertyId: bookablePropertyIdSchema,
  status: z.enum(PROPERTY_OPERATIONAL_STATUSES),
  note: z.string().trim().optional().default(''),
});

export type AdminPropertyStatusInput = z.input<typeof adminPropertyStatusInputSchema>;

export function isPropertyOperationalStatus(
  value: string | null,
): value is PropertyOperationalStatus {
  return PROPERTY_OPERATIONAL_STATUSES.includes(value as never);
}

export function buildPropertyStatusRow(
  input: AdminPropertyStatusInput,
  updatedBy: string | null,
) {
  const parsed = adminPropertyStatusInputSchema.parse(input);

  return {
    property_id: parsed.propertyId,
    status: parsed.status,
    note: parsed.note,
    updated_by: updatedBy,
  };
}
