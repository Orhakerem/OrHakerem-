import type { Locale } from '@/i18n/config';

const en = {
  calendar: {
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    stay: 'Stay',
    addDate: 'Add date',
    nightsCount: (n: number) => `${n} night${n === 1 ? '' : 's'}`,
    availabilityError: 'Airbnb availability is temporarily unavailable. Refresh before submitting your stay.',
    availabilityStale: 'Availability may be a few minutes out of date. Refresh before submitting your stay.',
    blockedBoundaryNote: 'Airbnb-blocked nights stay unavailable. You can still check out on the first blocked day.',
    pickCheckIn: 'Pick your check-in date',
    pickCheckOut: 'Pick your check-out date',
    prevMonthAria: 'Show previous month',
    nextMonthAria: 'Show next month',
    clearDates: 'Clear dates',
  },
  singleDate: {
    heading: 'Choose your event date',
    subheading: 'Select the date of your event directly from the calendar below.',
    selectedDate: 'Selected date',
    noDateSelected: 'No date selected',
    pickADay: 'Pick a day below',
    clear: 'Clear',
    availabilityError: 'Airbnb availability is temporarily unavailable. Refresh before submitting your event.',
    availabilityStale: 'Availability may be a few minutes out of date. Refresh before submitting your event.',
  },
  price: {
    nights: 'Nights',
    calculating: 'Calculating price...',
    nightTotal: 'Night total',
    cleaningFee: 'Cleaning fee',
    finalTotal: 'Final total',
  },
  validation: {
    chooseBoth: 'Please choose both check-in and check-out dates.',
    chooseValid: 'Please choose valid check-in and check-out dates.',
    chooseFuture: 'Please choose a current or future check-in date.',
    checkoutAfter: 'Check-out must be after check-in.',
    datesUnavailable: 'Those dates are unavailable on Airbnb. Please choose different dates.',
  },
};

export type BookingMessages = typeof en;

const fr: BookingMessages = {
  calendar: {
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    stay: 'Séjour',
    addDate: 'Choisir une date',
    nightsCount: (n: number) => `${n} nuit${n === 1 ? '' : 's'}`,
    availabilityError:
      'Les disponibilités Airbnb sont temporairement indisponibles. Actualisez avant d’envoyer votre demande.',
    availabilityStale:
      'Les disponibilités datent peut-être de quelques minutes. Actualisez avant d’envoyer votre demande.',
    blockedBoundaryNote:
      'Les nuits bloquées sur Airbnb restent indisponibles. Vous pouvez toutefois partir le premier jour bloqué.',
    pickCheckIn: "Choisissez votre date d'arrivée",
    pickCheckOut: 'Choisissez votre date de départ',
    prevMonthAria: 'Mois précédent',
    nextMonthAria: 'Mois suivant',
    clearDates: 'Effacer les dates',
  },
  singleDate: {
    heading: "Choisissez la date de votre événement",
    subheading: "Sélectionnez la date de votre événement directement sur le calendrier ci-dessous.",
    selectedDate: 'Date sélectionnée',
    noDateSelected: 'Aucune date sélectionnée',
    pickADay: 'Choisissez un jour ci-dessous',
    clear: 'Effacer',
    availabilityError:
      'Les disponibilités Airbnb sont temporairement indisponibles. Actualisez avant d’envoyer votre demande.',
    availabilityStale:
      'Les disponibilités datent peut-être de quelques minutes. Actualisez avant d’envoyer votre demande.',
  },
  price: {
    nights: 'Nuits',
    calculating: 'Calcul du prix...',
    nightTotal: 'Total des nuits',
    cleaningFee: 'Frais de ménage',
    finalTotal: 'Total final',
  },
  validation: {
    chooseBoth: "Veuillez choisir une date d'arrivée et une date de départ.",
    chooseValid: "Veuillez choisir des dates d'arrivée et de départ valides.",
    chooseFuture: "Veuillez choisir une date d'arrivée à partir d'aujourd'hui.",
    checkoutAfter: "Le départ doit être postérieur à l'arrivée.",
    datesUnavailable: 'Ces dates sont indisponibles sur Airbnb. Veuillez en choisir d’autres.',
  },
};

const he: BookingMessages = {
  calendar: {
    checkIn: 'צ׳ק-אין',
    checkOut: 'צ׳ק-אאוט',
    stay: 'שהות',
    addDate: 'בחרו תאריך',
    nightsCount: (n: number) => (n === 1 ? 'לילה אחד' : `${n} לילות`),
    availabilityError: 'זמינות Airbnb אינה זמינה כרגע. רעננו את העמוד לפני שליחת הבקשה.',
    availabilityStale: 'ייתכן שהזמינות מעודכנת בכמה דקות. רעננו את העמוד לפני שליחת הבקשה.',
    blockedBoundaryNote:
      'לילות חסומים ב-Airbnb נשארים לא זמינים. עדיין אפשר לבצע צ׳ק-אאוט ביום החסום הראשון.',
    pickCheckIn: 'בחרו את תאריך הצ׳ק-אין',
    pickCheckOut: 'בחרו את תאריך הצ׳ק-אאוט',
    prevMonthAria: 'חודש קודם',
    nextMonthAria: 'חודש הבא',
    clearDates: 'ניקוי תאריכים',
  },
  singleDate: {
    heading: 'בחרו את תאריך האירוע',
    subheading: 'בחרו את תאריך האירוע ישירות מהלוח שנה שלמטה.',
    selectedDate: 'התאריך שנבחר',
    noDateSelected: 'לא נבחר תאריך',
    pickADay: 'בחרו יום למטה',
    clear: 'ניקוי',
    availabilityError: 'זמינות Airbnb אינה זמינה כרגע. רעננו את העמוד לפני שליחת הבקשה.',
    availabilityStale: 'ייתכן שהזמינות מעודכנת בכמה דקות. רעננו את העמוד לפני שליחת הבקשה.',
  },
  price: {
    nights: 'לילות',
    calculating: 'מחשב מחיר...',
    nightTotal: 'סה״כ לילות',
    cleaningFee: 'דמי ניקיון',
    finalTotal: 'סה״כ לתשלום',
  },
  validation: {
    chooseBoth: 'אנא בחרו תאריך צ׳ק-אין ותאריך צ׳ק-אאוט.',
    chooseValid: 'אנא בחרו תאריכי צ׳ק-אין וצ׳ק-אאוט תקינים.',
    chooseFuture: 'אנא בחרו תאריך צ׳ק-אין מהיום והלאה.',
    checkoutAfter: 'הצ׳ק-אאוט חייב להיות אחרי הצ׳ק-אין.',
    datesUnavailable: 'התאריכים האלה אינם זמינים ב-Airbnb. אנא בחרו תאריכים אחרים.',
  },
};

export const bookingMessages: Record<Locale, BookingMessages> = { en, fr, he };

/**
 * Locale tags for date/number display (Intl and formatIsoDate).
 */
export const DISPLAY_LOCALE: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  he: 'he-IL',
};

/**
 * Maps the English validation messages produced by src/lib/booking-dates.ts
 * (protected booking logic — not modified) to the visitor's language.
 * Unknown messages fall through in English.
 */
export function localizeBookingValidationMessage(locale: Locale, message: string): string {
  const t = bookingMessages[locale].validation;
  const enV = bookingMessages.en.validation;
  switch (message) {
    case enV.chooseBoth:
      return t.chooseBoth;
    case enV.chooseValid:
      return t.chooseValid;
    case enV.chooseFuture:
      return t.chooseFuture;
    case enV.checkoutAfter:
      return t.checkoutAfter;
    case enV.datesUnavailable:
      return t.datesUnavailable;
    default:
      return message;
  }
}
