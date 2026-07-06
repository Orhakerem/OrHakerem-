import type { Locale } from '@/i18n/config';

type PageSeo = {
  title: string;
  description: string;
  keywords?: string;
};

type SeoCatalog = {
  home: PageSeo;
  about: PageSeo;
  properties: PageSeo;
  services: PageSeo;
  events: PageSeo;
  reservation: PageSeo;
  contact: PageSeo;
  faq: PageSeo;
  terms: PageSeo;
  privacy: PageSeo;
  cancellation: PageSeo;
  blog: PageSeo;
};

const en: SeoCatalog = {
  home: {
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description:
      'Premium short-term rental apartments and boutique stays in Tel Aviv. Discover Or Hakerem in Kerem HaTeimanim for luxury accommodations, events, and attentive hosting.',
    keywords:
      'or hakerem, luxury apartments Tel Aviv, short-term rental Tel Aviv, vacation rental Tel Aviv, boutique stays Tel Aviv, luxury apartment in Tel Aviv, apartment Tel Aviv, events Tel Aviv, Kerem HaTeimanim, property management Tel Aviv, Tel Aviv accommodations',
  },
  about: {
    title: 'About Or Hakerem – Luxury Stays in Tel Aviv',
    description:
      'Learn about Or Hakerem, a boutique collection of luxury short-term stays in Tel Aviv offering premium apartments, Shabbat-friendly hospitality, and intimate event experiences in Kerem HaTeimanim.',
    keywords:
      'About Or Hakerem, luxury apartments Tel Aviv, boutique stays Tel Aviv, Kerem HaTeimanim apartments, Shabbat friendly stays Tel Aviv, Tel Aviv luxury stay, boutique event venue Tel Aviv',
  },
  properties: {
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem Properties',
    description:
      'Browse our luxury apartments in Kerem HaTeimanim, Tel Aviv: a penthouse with private jacuzzi and a cozy studio, both steps from the beach and Carmel Market.',
    keywords: 'luxury apartments Tel Aviv, penthouse jacuzzi Tel Aviv, studio apartment Tel Aviv, Kerem HaTeimanim properties',
  },
  services: {
    title: 'Concierge Services in Tel Aviv | Or Hakerem | Groceries, Transfers & More',
    description:
      'Or Hakerem offers premium concierge services in Tel Aviv: grocery delivery, private airport transfers, babysitting, event planning, restaurant reservations, and on-demand cleaning. Included with every stay on request.',
    keywords:
      'concierge services Tel Aviv, concierge Tel Aviv, concierge TLV, airport transfer Tel Aviv, grocery delivery Tel Aviv apartment, babysitting Tel Aviv, restaurant reservation Tel Aviv, event planning Tel Aviv',
  },
  events: {
    title: 'Boutique Events Tel Aviv | Jewish Celebrations & Kosher Services | Or Hakerem',
    description:
      'Or HaKerem hosts boutique events and Jewish celebrations in Tel Aviv, offering an intimate premium venue with optional kosher services and tailored planning.',
    keywords:
      'boutique events Tel Aviv, event space Tel Aviv, luxury venue Israel, luxury event venue Israel, Jewish events Tel Aviv, Jewish celebrations Tel Aviv, kosher services Tel Aviv, intimate events Tel Aviv, private venue Tel Aviv, bar mitzvah venue Tel Aviv, brit mila venue Tel Aviv, Or Hakerem',
  },
  reservation: {
    title: 'Book a Stay in Tel Aviv | Or Hakerem | Direct Reservation',
    description:
      'Book your luxury apartment stay in Tel Aviv directly with Or Hakerem. Direct booking is up to 15% cheaper than Airbnb or Booking.com. Penthouse with jacuzzi or cozy studio in Kerem HaTeimanim.',
    keywords:
      'book luxury apartment Tel Aviv, direct booking Tel Aviv, reserve penthouse Tel Aviv, book studio Tel Aviv, Kerem HaTeimanim reservation, Or Hakerem booking',
  },
  contact: {
    title: 'Contact Or Hakerem | Tel Aviv Luxury Stays',
    description:
      'Get in touch with Or Hakerem. Reach us by phone, WhatsApp, or email to book your stay, ask about our properties in Kerem HaTeimanim, or arrange concierge services in Tel Aviv.',
    keywords: 'contact Or Hakerem, book luxury apartment Tel Aviv, Tel Aviv rental inquiry, Kerem HaTeimanim contact, WhatsApp Or Hakerem',
  },
  faq: {
    title: 'FAQ — Booking, Location & Stay Info | Or Hakerem Tel Aviv',
    description:
      'Answers to the most common questions about Or Hakerem: apartment location in Kerem HaTeimanim, check-in times, Shabbat support, parking, cancellation policy, and how to book directly.',
    keywords:
      'Or Hakerem FAQ, Tel Aviv apartment questions, Kerem HaTeimanim stay, Shabbat friendly FAQ, book direct Tel Aviv, cancellation policy Or Hakerem',
  },
  terms: {
    title: 'Terms & Conditions | Or Hakerem Tel Aviv',
    description:
      'Review the terms and conditions for booking a stay at Or Hakerem in Tel Aviv, including cancellation policy, house rules, payment terms, and guest responsibilities.',
  },
  privacy: {
    title: 'Privacy Policy | Or Hakerem Tel Aviv',
    description:
      'Read the Or Hakerem privacy policy: what personal data we collect, how we use it, the cookies and analytics we rely on, and your rights under GDPR and Israeli law.',
    keywords: 'Or Hakerem privacy policy, Tel Aviv rental privacy, GDPR short-term rental, personal data, cookies, data protection',
  },
  cancellation: {
    title: 'Cancellation & Refund Policy | Or Hakerem Tel Aviv',
    description:
      "Read Or Hakerem's cancellation and refund policy for short-term stays in Tel Aviv, including deposit schedules, non-refundable conditions, and voucher terms.",
    keywords: 'cancellation policy Tel Aviv, refund policy short-term rental, Or Hakerem booking terms, Tel Aviv apartment cancellation',
  },
  blog: {
    title: 'Tel Aviv Travel Blog | Or Hakerem',
    description:
      'Tel Aviv travel guides, Kerem HaTeimanim neighborhood tips, Shabbat-friendly travel advice, and insider insights from Or Hakerem — luxury short-term rentals in the heart of Tel Aviv.',
    keywords: 'Tel Aviv travel blog, Kerem HaTeimanim guide, Tel Aviv neighborhood, Shabbat Tel Aviv, things to do Tel Aviv, luxury stays Tel Aviv, Carmel Market guide',
  },
};

const fr: SeoCatalog = {
  home: {
    title: 'Appartements de luxe à Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description:
      'Appartements de luxe en location courte durée à Tel Aviv. Découvrez Or Hakerem à Kerem HaTeimanim pour un hébergement haut de gamme, des événements et un accueil attentif.',
    keywords:
      'or hakerem, appartements de luxe Tel Aviv, location courte durée Tel Aviv, location vacances Tel Aviv, séjours boutique Tel Aviv, appartement de luxe à Tel Aviv, événements Tel Aviv, Kerem HaTeimanim',
  },
  about: {
    title: 'À propos d’Or Hakerem – Séjours de luxe à Tel Aviv',
    description:
      "Découvrez Or Hakerem, une collection boutique de séjours de luxe courte durée à Tel Aviv, avec appartements haut de gamme, accueil adapté au Shabbat et événements intimistes à Kerem HaTeimanim.",
    keywords:
      'À propos d’Or Hakerem, appartements de luxe Tel Aviv, séjours boutique Tel Aviv, appartements Kerem HaTeimanim, séjours Shabbat friendly Tel Aviv, lieu événementiel boutique Tel Aviv',
  },
  properties: {
    title: 'Appartements de luxe à Tel Aviv | Les biens Or Hakerem',
    description:
      'Découvrez nos appartements de luxe à Kerem HaTeimanim, Tel Aviv : un penthouse avec jacuzzi privé et un studio chaleureux, tous deux à deux pas de la plage et du marché du Carmel.',
    keywords: 'appartements de luxe Tel Aviv, penthouse jacuzzi Tel Aviv, studio Tel Aviv, biens Kerem HaTeimanim',
  },
  services: {
    title: 'Services de conciergerie à Tel Aviv | Or Hakerem | Courses, transferts et plus',
    description:
      'Or Hakerem propose des services de conciergerie haut de gamme à Tel Aviv : livraison de courses, transferts aéroport privés, garde d’enfants, organisation d’événements, réservation de restaurants et ménage à la demande.',
    keywords:
      'conciergerie Tel Aviv, transfert aéroport Tel Aviv, livraison de courses appartement Tel Aviv, garde d’enfants Tel Aviv, réservation restaurant Tel Aviv, organisation d’événements Tel Aviv',
  },
  events: {
    title: 'Lieu événementiel boutique à Tel Aviv | Célébrations juives et services casher | Or Hakerem',
    description:
      'Or HaKerem accueille des événements boutique et des célébrations juives à Tel Aviv, dans un lieu intimiste et haut de gamme avec services casher optionnels et organisation sur mesure.',
    keywords:
      'événements boutique Tel Aviv, lieu événementiel Tel Aviv, lieu de luxe Israël, événements juifs Tel Aviv, services casher Tel Aviv, lieu privé Tel Aviv, Or Hakerem',
  },
  reservation: {
    title: 'Réservez un séjour à Tel Aviv | Or Hakerem | Réservation directe',
    description:
      "Réservez votre appartement de luxe à Tel Aviv directement auprès d'Or Hakerem. La réservation directe coûte jusqu'à 15 % moins cher qu'Airbnb ou Booking.com. Penthouse avec jacuzzi ou studio chaleureux à Kerem HaTeimanim.",
    keywords:
      'réserver appartement de luxe Tel Aviv, réservation directe Tel Aviv, réserver penthouse Tel Aviv, réserver studio Tel Aviv, réservation Kerem HaTeimanim',
  },
  contact: {
    title: 'Contacter Or Hakerem | Séjours de luxe à Tel Aviv',
    description:
      'Contactez Or Hakerem par téléphone, WhatsApp ou e-mail pour réserver votre séjour, poser une question sur nos appartements à Kerem HaTeimanim, ou organiser des services de conciergerie à Tel Aviv.',
    keywords: 'contacter Or Hakerem, réserver appartement de luxe Tel Aviv, demande location Tel Aviv, contact Kerem HaTeimanim, WhatsApp Or Hakerem',
  },
  faq: {
    title: 'FAQ — Réservation, emplacement et séjour | Or Hakerem Tel Aviv',
    description:
      "Réponses aux questions les plus fréquentes sur Or Hakerem : emplacement à Kerem HaTeimanim, horaires d'arrivée, accompagnement Shabbat, parking, politique d'annulation et réservation directe.",
    keywords:
      'FAQ Or Hakerem, questions appartement Tel Aviv, séjour Kerem HaTeimanim, FAQ Shabbat friendly, réserver en direct Tel Aviv, politique d’annulation Or Hakerem',
  },
  terms: {
    title: 'Conditions Générales | Or Hakerem Tel Aviv',
    description:
      "Consultez les conditions générales de réservation d'un séjour chez Or Hakerem à Tel Aviv : politique d'annulation, règlement intérieur, conditions de paiement et responsabilités des voyageurs.",
  },
  privacy: {
    title: 'Politique de confidentialité | Or Hakerem Tel Aviv',
    description:
      "Consultez la politique de confidentialité d'Or Hakerem : quelles données personnelles nous collectons, comment nous les utilisons, les cookies et outils analytiques utilisés, et vos droits selon le RGPD et le droit israélien.",
    keywords: 'politique de confidentialité Or Hakerem, confidentialité location Tel Aviv, RGPD location courte durée, données personnelles, cookies',
  },
  cancellation: {
    title: "Politique d'annulation et de remboursement | Or Hakerem Tel Aviv",
    description:
      "Consultez la politique d'annulation et de remboursement d'Or Hakerem pour les séjours courte durée à Tel Aviv : échéancier des acomptes, situations non remboursables et conditions de bon d'achat.",
    keywords: "politique d'annulation Tel Aviv, politique de remboursement location courte durée, conditions de réservation Or Hakerem, annulation appartement Tel Aviv",
  },
  blog: {
    title: 'Blog voyage Tel Aviv | Or Hakerem',
    description:
      'Guides de voyage à Tel Aviv, conseils sur le quartier de Kerem HaTeimanim, informations Shabbat-friendly et regards d’initiés d’Or Hakerem — locations de luxe courte durée au cœur de Tel Aviv.',
    keywords: 'blog voyage Tel Aviv, guide Kerem HaTeimanim, quartier Tel Aviv, Shabbat Tel Aviv, à faire à Tel Aviv, séjours de luxe Tel Aviv',
  },
};

const he: SeoCatalog = {
  home: {
    title: 'דירות יוקרה בתל אביב | אור הכרם | כרם התימנים',
    description: 'דירות פרימיום להשכרה לטווח קצר ושהיות בוטיקיות בתל אביב. גלו את אור הכרם בכרם התימנים לאירוח יוקרתי, אירועים ואירוח קשוב.',
    keywords: 'אור הכרם, דירות יוקרה תל אביב, השכרה לטווח קצר תל אביב, שהיות בוטיק תל אביב, דירת יוקרה בתל אביב, אירועים תל אביב, כרם התימנים',
  },
  about: {
    title: 'אודות אור הכרם – אירוח יוקרתי בתל אביב',
    description: 'הכירו את אור הכרם, קולקציה בוטיקית של שהיות יוקרה קצרות בתל אביב עם דירות פרימיום, אירוח ידידותי לשבת וחוויות אירועים אינטימיות בכרם התימנים.',
    keywords: 'אודות אור הכרם, דירות יוקרה תל אביב, שהיות בוטיק תל אביב, דירות כרם התימנים, שהיות ידידותיות לשבת תל אביב, מקום אירועים בוטיקי תל אביב',
  },
  properties: {
    title: 'דירות יוקרה בתל אביב | הנכסים של אור הכרם',
    description: 'עיינו בדירות היוקרה שלנו בכרם התימנים, תל אביב: פנטהאוז עם ג׳קוזי פרטי וסטודיו נעים, שניהם צעדים ספורים מהים ומשוק הכרמל.',
    keywords: 'דירות יוקרה תל אביב, פנטהאוז ג׳קוזי תל אביב, סטודיו תל אביב, נכסים כרם התימנים',
  },
  services: {
    title: 'שירותי קונסיירז׳ בתל אביב | אור הכרם | קניות, הסעות ועוד',
    description: 'אור הכרם מציע שירותי קונסיירז׳ פרימיום בתל אביב: משלוח קניות, הסעות פרטיות משדה התעופה, שמרטפות, תכנון אירועים, הזמנת מסעדות וניקיון לפי דרישה.',
    keywords: 'קונסיירז׳ תל אביב, הסעה משדה התעופה תל אביב, משלוח קניות דירה תל אביב, שמרטפות תל אביב, הזמנת מסעדה תל אביב, תכנון אירועים תל אביב',
  },
  events: {
    title: 'מקום אירועים בוטיקי בתל אביב | חגיגות יהודיות ושירותי כשרות | אור הכרם',
    description: 'אור הכרם מארח אירועים בוטיקיים וחגיגות יהודיות בתל אביב, במקום אינטימי ופרימיום עם שירותי כשרות אופציונליים ותכנון מותאם אישית.',
    keywords: 'אירועים בוטיקיים תל אביב, מקום אירועים תל אביב, מקום יוקרה ישראל, אירועים יהודיים תל אביב, שירותי כשרות תל אביב, מקום פרטי תל אביב, אור הכרם',
  },
  reservation: {
    title: 'הזמינו שהות בתל אביב | אור הכרם | הזמנה ישירה',
    description: 'הזמינו את שהות דירת היוקרה שלכם בתל אביב ישירות מול אור הכרם. הזמנה ישירה זולה עד 15% מ-Airbnb או Booking.com. פנטהאוז עם ג׳קוזי או סטודיו נעים בכרם התימנים.',
    keywords: 'הזמנת דירת יוקרה תל אביב, הזמנה ישירה תל אביב, הזמנת פנטהאוז תל אביב, הזמנת סטודיו תל אביב, הזמנה כרם התימנים',
  },
  contact: {
    title: 'צרו קשר עם אור הכרם | שהיות יוקרה בתל אביב',
    description: 'צרו קשר עם אור הכרם בטלפון, בוואטסאפ או באימייל כדי להזמין שהות, לשאול על הדירות שלנו בכרם התימנים או לתאם שירותי קונסיירז׳ בתל אביב.',
    keywords: 'צור קשר אור הכרם, הזמנת דירת יוקרה תל אביב, פנייה להשכרה תל אביב, יצירת קשר כרם התימנים, וואטסאפ אור הכרם',
  },
  faq: {
    title: 'שאלות נפוצות — הזמנה, מיקום ושהות | אור הכרם תל אביב',
    description: 'תשובות לשאלות הנפוצות ביותר על אור הכרם: מיקום הדירה בכרם התימנים, שעות צ׳ק-אין, תמיכה לשבת, חניה, מדיניות ביטולים וכיצד להזמין ישירות.',
    keywords: 'שאלות נפוצות אור הכרם, שאלות דירה תל אביב, שהות כרם התימנים, שאלות ידידותיות לשבת, הזמנה ישירה תל אביב, מדיניות ביטולים אור הכרם',
  },
  terms: {
    title: 'תנאי שימוש | אור הכרם תל אביב',
    description: 'עיינו בתנאי השימוש להזמנת שהות באור הכרם בתל אביב, כולל מדיניות ביטולים, כללי הבית, תנאי תשלום ואחריות האורח.',
  },
  privacy: {
    title: 'מדיניות פרטיות | אור הכרם תל אביב',
    description: 'קראו את מדיניות הפרטיות של אור הכרם: אילו נתונים אישיים אנו אוספים, כיצד אנו משתמשים בהם, העוגיות והאנליטיקה שבהן אנו נעזרים, והזכויות שלכם על פי GDPR והדין הישראלי.',
    keywords: 'מדיניות פרטיות אור הכרם, פרטיות השכרה תל אביב, GDPR השכרה לטווח קצר, נתונים אישיים, עוגיות',
  },
  cancellation: {
    title: 'מדיניות ביטולים והחזרים | אור הכרם תל אביב',
    description: 'קראו את מדיניות הביטולים וההחזרים של אור הכרם לשהיות קצרות בתל אביב, כולל לוח מקדמות, מקרים ללא החזר ותנאי שוברים.',
    keywords: 'מדיניות ביטולים תל אביב, מדיניות החזרים השכרה לטווח קצר, תנאי הזמנה אור הכרם, ביטול דירה תל אביב',
  },
  blog: {
    title: 'בלוג טיולים תל אביב | אור הכרם',
    description: 'מדריכי טיולים לתל אביב, טיפים על שכונת כרם התימנים, ייעוץ ידידותי לשבת ותובנות מאור הכרם — השכרות יוקרה לטווח קצר בלב תל אביב.',
    keywords: 'בלוג טיולים תל אביב, מדריך כרם התימנים, שכונת תל אביב, שבת תל אביב, מה לעשות בתל אביב, שהיות יוקרה תל אביב',
  },
};

export const seoMessages: Record<Locale, SeoCatalog> = { en, fr, he };
