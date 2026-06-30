export interface ReservationPdfAttachment {
  filename: string;
  content: Buffer;
  contentType: 'application/pdf';
}

export function buildReservationPdfAttachment({
  filename,
  content,
}: {
  filename: string;
  content: Buffer;
}): ReservationPdfAttachment {
  return {
    filename,
    content,
    contentType: 'application/pdf',
  };
}
