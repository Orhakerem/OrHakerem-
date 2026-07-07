'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

import { getAdminSession } from '@/lib/admin-session';
import {
  saveAdminRequestStatus,
  type AdminRequestStatusInput,
} from '@/lib/admin-requests';

type AdminRequestActionResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: string;
    };

function getActionErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function revalidateAdminRequests() {
  revalidatePath('/admin');
  revalidatePath('/admin/requests');
  revalidatePath('/admin/devis');
}

export async function updateAdminRequestStatus(
  input: AdminRequestStatusInput,
): Promise<AdminRequestActionResult> {
  if (!getAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await saveAdminRequestStatus(input);
    revalidateAdminRequests();

    return {
      success: true,
      message: 'Request status saved.',
    };
  } catch (error) {
    console.error('Admin request status save failed:', error);

    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save request status'),
    };
  }
}
