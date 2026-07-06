import type { Locale } from '@/i18n/config';

const en = {
  title: 'Reservation Request',
  intro: 'Your reservation request will be handled by our team. Please provide your contact preferences.',
  propertyLabel: 'Property',
  selectProperty: 'Select a property',
  fullName: 'Full Name',
  emailAddress: 'Email Address',
  phoneNumber: 'Phone Number',
  preferredContact: 'Preferred Contact Method',
  contactEmail: 'Email',
  contactPhone: 'Phone',
  contactWhatsapp: 'WhatsApp',
  sending: 'Sending...',
  send: 'Send Request',
  successTitle: 'Thank you for your reservation request!',
  successBody: "We'll contact you via your chosen method within 24 hours.",
  backToProperties: 'Back to Properties',
  errors: {
    selectPropertyFirst: 'Please select a property before choosing your stay.',
    availabilityUnavailable: 'Airbnb availability is temporarily unavailable. Please try again shortly.',
    selectValidProperty: 'Please select a valid property before sending your request.',
    waitPriceLoading: 'Please wait for the price estimate to finish.',
    waitValidPrice: 'Please wait for the price estimate before sending your request.',
    priceUnavailable: 'Price estimate is temporarily unavailable. Please try again before sending your request.',
    submitFailed: 'Failed to send reservation request',
    submitError: 'Failed to submit reservation. Please try again.',
    successToast: 'Reservation request sent successfully!',
  },
};

export type ReservationMessages = typeof en;

const fr: ReservationMessages = {
  title: 'Demande de réservation',
  intro: 'Votre demande de réservation sera traitée par notre équipe. Merci de préciser vos préférences de contact.',
  propertyLabel: 'Appartement',
  selectProperty: 'Sélectionnez un appartement',
  fullName: 'Nom complet',
  emailAddress: 'Adresse e-mail',
  phoneNumber: 'Numéro de téléphone',
  preferredContact: 'Mode de contact préféré',
  contactEmail: 'E-mail',
  contactPhone: 'Téléphone',
  contactWhatsapp: 'WhatsApp',
  sending: 'Envoi en cours...',
  send: 'Envoyer la demande',
  successTitle: 'Merci pour votre demande de réservation !',
  successBody: 'Nous vous contacterons via le moyen choisi sous 24 heures.',
  backToProperties: 'Retour aux appartements',
  errors: {
    selectPropertyFirst: 'Veuillez sélectionner un appartement avant de choisir vos dates.',
    availabilityUnavailable:
      'Les disponibilités Airbnb sont temporairement indisponibles. Veuillez réessayer sous peu.',
    selectValidProperty: 'Veuillez sélectionner un appartement valide avant d’envoyer votre demande.',
    waitPriceLoading: 'Veuillez attendre la fin de l’estimation du prix.',
    waitValidPrice: 'Veuillez attendre l’estimation du prix avant d’envoyer votre demande.',
    priceUnavailable:
      'L’estimation du prix est temporairement indisponible. Veuillez réessayer avant d’envoyer votre demande.',
    submitFailed: 'Échec de l’envoi de la demande de réservation',
    submitError: 'Échec de l’envoi de la réservation. Veuillez réessayer.',
    successToast: 'Demande de réservation envoyée !',
  },
};

const he: ReservationMessages = {
  title: 'בקשת הזמנה',
  intro: 'בקשת ההזמנה שלכם תטופל על ידי הצוות שלנו. אנא ציינו את דרך ההתקשרות המועדפת עליכם.',
  propertyLabel: 'דירה',
  selectProperty: 'בחרו דירה',
  fullName: 'שם מלא',
  emailAddress: 'כתובת אימייל',
  phoneNumber: 'מספר טלפון',
  preferredContact: 'דרך התקשרות מועדפת',
  contactEmail: 'אימייל',
  contactPhone: 'טלפון',
  contactWhatsapp: 'וואטסאפ',
  sending: 'שולח...',
  send: 'שליחת הבקשה',
  successTitle: 'תודה על בקשת ההזמנה שלכם!',
  successBody: 'ניצור איתכם קשר בדרך שבחרתם תוך 24 שעות.',
  backToProperties: 'חזרה לדירות',
  errors: {
    selectPropertyFirst: 'אנא בחרו דירה לפני בחירת התאריכים.',
    availabilityUnavailable: 'זמינות Airbnb אינה זמינה כרגע. אנא נסו שוב בעוד רגע.',
    selectValidProperty: 'אנא בחרו דירה תקינה לפני שליחת הבקשה.',
    waitPriceLoading: 'אנא המתינו לסיום הערכת המחיר.',
    waitValidPrice: 'אנא המתינו להערכת המחיר לפני שליחת הבקשה.',
    priceUnavailable: 'הערכת המחיר אינה זמינה כרגע. אנא נסו שוב לפני שליחת הבקשה.',
    submitFailed: 'שליחת בקשת ההזמנה נכשלה',
    submitError: 'שליחת ההזמנה נכשלה. אנא נסו שוב.',
    successToast: 'בקשת ההזמנה נשלחה בהצלחה!',
  },
};

export const reservationMessages: Record<Locale, ReservationMessages> = { en, fr, he };
