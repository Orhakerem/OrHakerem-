import type { Locale } from '@/i18n/config';

const en = {
  hero: {
    titles: ['Or Hakerem', 'Luxury Short-Term Stays in Tel Aviv'] as [string, string],
    viewProperties: 'View Properties',
  },
  welcome: {
    heading: 'Welcome',
    introMobile:
      'Premium apartments for short-term stays in the heart of Tel Aviv — Kerem HaTeimanim, near Carmel Market and the beach. Carefully designed, comfortable spaces for a flexible, elevated stay.',
    p1Desktop:
      'Or Hakerem is a unique building offering premium apartments for short-term stays in the heart of Tel Aviv.',
    p2Desktop:
      'Located in Kerem HaTeimanim, near Carmel Market and within walking distance to the beach, the property places you right in the center of it all — just moments from Banana Beach, Nachalat Binyamin, and the vibrant energy of the city.',
    p3Desktop:
      'Each apartment comes in a different format, designed to suit everything from short city stays to family trips, private gatherings, and special events. What they all share is the same standard: carefully designed spaces, comfort, and a location that makes everything feel easy.',
    p4Desktop:
      'Whether you’re coming for a few days by the sea or planning a more private moment, Or Hakerem offers a flexible and elevated way to experience Tel Aviv.',
    imageAlt: 'Or Hakerem apartment',
  },
  location: {
    kicker: 'Our Location',
    heading: 'At the Heart of Tel Aviv',
    beforeAddress: 'Our building is located at ',
    address: '35 Hakovshim Street',
    afterAddress:
      ', in Kerem HaTeimanim, just steps from the beach and near Carmel Market for guests who want a central, walkable stay in Tel Aviv.',
    openMaps: 'Open in Google Maps',
  },
  contact: {
    heading: 'Contact Us',
    description: 'Have questions about our properties, events, or concierge services?',
    emailLabel: 'Email',
    phoneLabel: 'Phone & WhatsApp',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
  },
  form: {
    nameLabel: 'Your Name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Write your message here...',
    send: 'Send Message',
    sending: 'Sending...',
    helper: "We'll get back to you within 24 hours",
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
  },
  testimonials: {
    heading: 'What Our Guests Say',
    subheading: 'Discover why our guests choose Or Hakerem for their luxury stays in Tel Aviv',
    reviewedOn: 'Reviewed on',
    viewReviewsAria: (platform: string) => `View ${platform} reviews`,
    reviewsAlt: (platform: string) => `${platform} reviews`,
  },
  faqHome: {
    heading: 'Fast answers before you book',
    body: 'The key details guests usually check first. The full FAQ keeps every policy and service answer in one place.',
    viewAll: 'View all questions',
  },
  map: {
    iframeTitle: 'Or Hakerem Location - 35 Hakovshim Street, Tel Aviv',
    loadAria: 'Load map of 35 Hakovshim Street, Tel Aviv',
    view: 'Click to display the map',
  },
};

export type HomeMessages = typeof en;

const fr: HomeMessages = {
  hero: {
    titles: ['Or Hakerem', 'Séjours de luxe courte durée à Tel Aviv'],
    viewProperties: 'Voir les appartements',
  },
  welcome: {
    heading: 'Bienvenue',
    introMobile:
      'Appartements haut de gamme pour séjours courte durée au cœur de Tel Aviv — Kerem HaTeimanim, près du marché du Carmel et de la plage. Des espaces soignés et confortables pour un séjour flexible et raffiné.',
    p1Desktop:
      'Or Hakerem est un immeuble unique proposant des appartements haut de gamme pour des séjours courte durée au cœur de Tel Aviv.',
    p2Desktop:
      "Situé à Kerem HaTeimanim, près du marché du Carmel et à quelques minutes à pied de la plage, l'immeuble vous place au centre de tout — à deux pas de Banana Beach, de Nachalat Binyamin et de l'énergie vibrante de la ville.",
    p3Desktop:
      'Chaque appartement a son propre format, pensé aussi bien pour les courts séjours urbains que pour les voyages en famille, les réunions privées et les événements spéciaux. Tous partagent le même standard : des espaces soignés, du confort et un emplacement qui rend tout facile.',
    p4Desktop:
      'Que vous veniez quelques jours au bord de la mer ou que vous prépariez un moment plus intime, Or Hakerem offre une façon flexible et raffinée de vivre Tel Aviv.',
    imageAlt: 'Appartement Or Hakerem',
  },
  location: {
    kicker: 'Notre emplacement',
    heading: 'Au cœur de Tel Aviv',
    beforeAddress: 'Notre immeuble est situé au ',
    address: '35 rue Hakovshim',
    afterAddress:
      ', à Kerem HaTeimanim, à quelques pas de la plage et près du marché du Carmel — idéal pour un séjour central où tout se fait à pied à Tel Aviv.',
    openMaps: 'Ouvrir dans Google Maps',
  },
  contact: {
    heading: 'Contactez-nous',
    description: 'Des questions sur nos appartements, nos événements ou nos services de conciergerie ?',
    emailLabel: 'E-mail',
    phoneLabel: 'Téléphone & WhatsApp',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
  },
  form: {
    nameLabel: 'Votre nom',
    namePlaceholder: 'Entrez votre nom',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'votre@email.com',
    messageLabel: 'Votre message',
    messagePlaceholder: 'Écrivez votre message ici...',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    helper: 'Nous vous répondrons sous 24 heures',
    success: 'Message envoyé !',
    error: "Échec de l'envoi du message. Veuillez réessayer.",
  },
  testimonials: {
    heading: 'Ce qu’en disent nos voyageurs',
    subheading:
      'Découvrez pourquoi nos voyageurs choisissent Or Hakerem pour leurs séjours de luxe à Tel Aviv',
    reviewedOn: 'Avis publiés sur',
    viewReviewsAria: (platform: string) => `Voir les avis ${platform}`,
    reviewsAlt: (platform: string) => `Avis ${platform}`,
  },
  faqHome: {
    heading: 'Réponses rapides avant de réserver',
    body: 'Les informations clés que les voyageurs vérifient en premier. La FAQ complète réunit toutes les réponses sur nos politiques et services.',
    viewAll: 'Voir toutes les questions',
  },
  map: {
    iframeTitle: 'Emplacement Or Hakerem - 35 rue Hakovshim, Tel Aviv',
    loadAria: 'Charger la carte du 35 rue Hakovshim, Tel Aviv',
    view: 'Cliquez pour afficher la carte',
  },
};

const he: HomeMessages = {
  hero: {
    titles: ['אור הכרם', 'אירוח יוקרתי לטווח קצר בתל אביב'],
    viewProperties: 'לצפייה בדירות',
  },
  welcome: {
    heading: 'ברוכים הבאים',
    introMobile:
      'דירות פרימיום לשהייה קצרה בלב תל אביב — כרם התימנים, ליד שוק הכרמל והים. חללים מעוצבים ונוחים לשהות גמישה ומוקפדת.',
    p1Desktop: 'אור הכרם הוא בניין ייחודי המציע דירות פרימיום לשהייה קצרה בלב תל אביב.',
    p2Desktop:
      'הבניין ממוקם בכרם התימנים, ליד שוק הכרמל ובמרחק הליכה מהים — רגעים ספורים מחוף בננה ביץ׳, מנחלת בנימין ומהאנרגיה התוססת של העיר.',
    p3Desktop:
      'כל דירה בפורמט שונה, שמתאים לחופשות עירוניות קצרות, לטיולים משפחתיים, למפגשים פרטיים ולאירועים מיוחדים. המשותף לכולן הוא אותו סטנדרט: חללים מעוצבים בקפידה, נוחות ומיקום שהופך הכול לקל.',
    p4Desktop:
      'בין אם אתם מגיעים לכמה ימים ליד הים ובין אם אתם מתכננים רגע פרטי יותר, אור הכרם מציע דרך גמישה ומוקפדת לחוות את תל אביב.',
    imageAlt: 'דירה באור הכרם',
  },
  location: {
    kicker: 'המיקום שלנו',
    heading: 'בלב תל אביב',
    beforeAddress: 'הבניין שלנו נמצא ב',
    address: 'רחוב הכובשים 35',
    afterAddress:
      ', בכרם התימנים, צעדים ספורים מהים וליד שוק הכרמל — מושלם לשהות מרכזית שהכול בה במרחק הליכה.',
    openMaps: 'פתיחה ב-Google Maps',
  },
  contact: {
    heading: 'צרו קשר',
    description: 'יש לכם שאלות על הדירות, האירועים או שירותי הקונסיירז׳ שלנו?',
    emailLabel: 'אימייל',
    phoneLabel: 'טלפון ווטסאפ',
    instagramLabel: 'אינסטגרם',
    facebookLabel: 'פייסבוק',
  },
  form: {
    nameLabel: 'השם שלכם',
    namePlaceholder: 'הכניסו את שמכם',
    emailLabel: 'כתובת אימייל',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'ההודעה שלכם',
    messagePlaceholder: 'כתבו כאן את הודעתכם...',
    send: 'שליחת הודעה',
    sending: 'שולח...',
    helper: 'נחזור אליכם תוך 24 שעות',
    success: 'ההודעה נשלחה בהצלחה!',
    error: 'שליחת ההודעה נכשלה. אנא נסו שוב.',
  },
  testimonials: {
    heading: 'מה האורחים שלנו מספרים',
    subheading: 'גלו למה אורחים בוחרים באור הכרם לשהות יוקרתית בתל אביב',
    reviewedOn: 'ביקורות באתרים',
    viewReviewsAria: (platform: string) => `לצפייה בביקורות ${platform}`,
    reviewsAlt: (platform: string) => `ביקורות ${platform}`,
  },
  faqHome: {
    heading: 'תשובות מהירות לפני שמזמינים',
    body: 'הפרטים החשובים שאורחים בודקים קודם. בעמוד השאלות המלא תמצאו את כל התשובות על מדיניות ושירותים.',
    viewAll: 'לכל השאלות',
  },
  map: {
    iframeTitle: 'מיקום אור הכרם - רחוב הכובשים 35, תל אביב',
    loadAria: 'טעינת מפה של רחוב הכובשים 35, תל אביב',
    view: 'לחצו להצגת המפה',
  },
};

export const homeMessages: Record<Locale, HomeMessages> = { en, fr, he };
