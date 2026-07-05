import type { ReactNode } from 'react';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { localizePath } from '@/i18n/config';

export type FAQCategory = 'location' | 'stay' | 'booking' | 'services';

export interface FAQEntry {
  id: string;
  question: string;
  /** Rich answer rendered in the accordions (may contain links). */
  answer: ReactNode;
  /** Plain-text answer used for the FAQPage JSON-LD. */
  plainAnswer: string;
  category: FAQCategory;
}

export const faqCategories: readonly FAQCategory[] = ['location', 'stay', 'booking', 'services'];

type EntrySeed = Omit<FAQEntry, 'answer'> & { answer?: ReactNode };

function withAnswers(seeds: EntrySeed[]): FAQEntry[] {
  return seeds.map(seed => ({ ...seed, answer: seed.answer ?? seed.plainAnswer }));
}

function cancellationLink(locale: Locale, label: string, before: string, after: string): ReactNode {
  return (
    <>
      {before}
      <Link
        href={localizePath(locale, '/cancellation')}
        className="font-medium text-black underline underline-offset-4"
      >
        {label}
      </Link>
      {after}
    </>
  );
}

const en: FAQEntry[] = withAnswers([
  {
    id: 'where-located',
    question: 'Where are the apartments located in Tel Aviv?',
    category: 'location',
    plainAnswer:
      'Or HaKerem apartments are located in the historic Kerem HaTeimanim neighborhood at Hakovshim Street 35, within walking distance of Carmel Market, Banana Beach, and Nachalat Binyamin.',
  },
  {
    id: 'beach-distance',
    question: 'How far is the beach from Or HaKerem?',
    category: 'location',
    plainAnswer:
      'The beach is just a few minutes away, with Banana Beach located approximately 600 meters from the property.',
  },
  {
    id: 'carmel-market',
    question: 'Is Or HaKerem close to Carmel Market?',
    category: 'location',
    plainAnswer:
      'Yes, Carmel Market is located about 400 meters from the apartments, making it easily accessible by foot.',
  },
  {
    id: 'what-unique',
    question: 'What makes Or HaKerem unique in Tel Aviv?',
    category: 'stay',
    plainAnswer:
      'Or HaKerem offers a unique combination of boutique luxury, Shabbat-friendly accommodations, and proximity to key landmarks in central Tel Aviv.',
  },
  {
    id: 'central-tlv',
    question: 'Are the apartments located in central Tel Aviv?',
    category: 'location',
    plainAnswer:
      'Yes, Or HaKerem is located in central Tel Aviv, in the vibrant Kerem HaTeimanim neighborhood.',
  },
  {
    id: 'checkin-times',
    question: 'What are the check-in and check-out times?',
    category: 'booking',
    plainAnswer:
      'Check-in is available from 3:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request.',
  },
  {
    id: 'shabbat',
    question: 'Do you offer Shabbat-friendly accommodations?',
    category: 'services',
    plainAnswer:
      'Yes, we provide full Shabbat support including Shabbat keys, hot plates, timers, and can arrange kosher meals upon request.',
  },
  {
    id: 'parking',
    question: 'Is parking available?',
    category: 'stay',
    plainAnswer: 'Yes, we provide a parking spot with additional payment of 70₪ per day.',
  },
  {
    id: 'amenities',
    question: 'What amenities are included?',
    category: 'stay',
    plainAnswer:
      'All apartments include fully equipped kitchens, high-speed WiFi, smart TVs, luxury linens, and premium toiletries. Additional amenities vary by apartment.',
  },
  {
    id: 'airport-transfers',
    question: 'Do you offer airport transfers?',
    category: 'services',
    plainAnswer:
      'Yes, we can arrange private airport transfers for our guests. Please request this service at least 48 hours before your arrival.',
  },
  {
    id: 'cancellation-policy',
    question: 'What is your cancellation policy?',
    category: 'booking',
    plainAnswer:
      'You can review our full cancellation terms on our Cancellation & Refund Policy page at orhakerem.com/cancellation.',
    answer: cancellationLink('en', 'Cancellation & Refund Policy page', 'You can review our cancellation terms on our ', '.'),
  },
  {
    id: 'pets',
    question: 'Are pets allowed?',
    category: 'stay',
    plainAnswer:
      'Unfortunately, we do not allow pets in our properties to ensure the comfort of all our guests.',
  },
  {
    id: 'minimum-stay',
    question: 'Is there a minimum stay requirement?',
    category: 'booking',
    plainAnswer:
      'There is no minimum stay. You can make a one-night reservation or stay for a few weeks. You can also rent our places for a few hours for events.',
  },
  {
    id: 'cleaning',
    question: 'Do you provide cleaning services?',
    category: 'services',
    plainAnswer:
      'Yes, we offer regular cleaning services during your stay. Additional cleaning can be arranged upon request for an extra fee.',
  },
  {
    id: 'payment-methods',
    question: 'What payment methods do you accept?',
    category: 'booking',
    plainAnswer: 'We accept bank transfers, Bit, and cash.',
  },
  {
    id: 'direct-vs-airbnb',
    question: "What's the difference with direct booking and Airbnb?",
    category: 'booking',
    plainAnswer:
      'Booking directly with us can get you better rates, personalized service, and more payment flexibility compared to booking through a third-party platform.',
  },
  {
    id: 'long-stay-discount',
    question: 'Can I get a weekly or monthly discount for long stays?',
    category: 'booking',
    plainAnswer:
      'Of course! We offer reduced rates and special discounts for guests looking to stay for longer periods of time.',
  },
  {
    id: 'early-checkin',
    question: 'Is early check-in possible?',
    category: 'booking',
    plainAnswer:
      'Early check-in may be possible, but it cannot be guaranteed as it depends on the previous booking and cleaning schedule. We will keep you updated closer to your arrival and notify you as soon as the apartment is ready.',
  },
  {
    id: 'safe-room',
    question: 'Is there a safe room (mamad) in the apartment?',
    category: 'stay',
    plainAnswer:
      'There is no mamad (safe room) inside the apartment, but there is a public shelter nearby. We share a video with every guest showing exactly how to reach it in case of an alarm.',
  },
  {
    id: 'music-gatherings',
    question: 'Can we play music or have gatherings?',
    category: 'stay',
    plainAnswer:
      'Music and gatherings are welcome. We simply ask that guests respect quiet hours and be considerate of neighbors.',
  },
  {
    id: 'sleeping',
    question: 'What are the sleeping arrangements?',
    category: 'stay',
    plainAnswer: 'The apartments feature a wide double bed and a convertible sofa bed.',
  },
]);

const fr: FAQEntry[] = withAnswers([
  {
    id: 'where-located',
    question: 'Où se trouvent les appartements à Tel Aviv ?',
    category: 'location',
    plainAnswer:
      'Les appartements Or HaKerem se situent dans le quartier historique de Kerem HaTeimanim, au 35 rue Hakovshim, à quelques pas du marché du Carmel, de Banana Beach et de Nachalat Binyamin.',
  },
  {
    id: 'beach-distance',
    question: "À quelle distance se trouve la plage d'Or HaKerem ?",
    category: 'location',
    plainAnswer:
      "La plage est à quelques minutes à peine : Banana Beach se trouve à environ 600 mètres de l'immeuble.",
  },
  {
    id: 'carmel-market',
    question: 'Or HaKerem est-il proche du marché du Carmel ?',
    category: 'location',
    plainAnswer:
      'Oui, le marché du Carmel est à environ 400 mètres des appartements, facilement accessible à pied.',
  },
  {
    id: 'what-unique',
    question: "Qu'est-ce qui rend Or HaKerem unique à Tel Aviv ?",
    category: 'stay',
    plainAnswer:
      'Or HaKerem combine luxe boutique, hébergements adaptés au Shabbat et proximité des principaux points d’intérêt du centre de Tel Aviv.',
  },
  {
    id: 'central-tlv',
    question: 'Les appartements sont-ils au centre de Tel Aviv ?',
    category: 'location',
    plainAnswer:
      'Oui, Or HaKerem se trouve au centre de Tel Aviv, dans le quartier animé de Kerem HaTeimanim.',
  },
  {
    id: 'checkin-times',
    question: "Quels sont les horaires d'arrivée et de départ ?",
    category: 'booking',
    plainAnswer:
      "L'arrivée est possible à partir de 15 h et le départ jusqu'à 11 h. Une arrivée anticipée ou un départ tardif peuvent être possibles sur demande.",
  },
  {
    id: 'shabbat',
    question: 'Proposez-vous des hébergements adaptés au Shabbat ?',
    category: 'services',
    plainAnswer:
      'Oui, nous offrons un accompagnement Shabbat complet : clés Shabbat, plaques chauffantes, minuteries, et repas casher sur demande.',
  },
  {
    id: 'parking',
    question: 'Un parking est-il disponible ?',
    category: 'stay',
    plainAnswer:
      'Oui, nous proposons une place de parking moyennant un supplément de 70 ₪ par jour.',
  },
  {
    id: 'amenities',
    question: 'Quels équipements sont inclus ?',
    category: 'stay',
    plainAnswer:
      "Tous les appartements comprennent une cuisine entièrement équipée, le WiFi haut débit, des Smart TV, du linge de maison haut de gamme et des produits d'accueil premium. Les équipements complémentaires varient selon l'appartement.",
  },
  {
    id: 'airport-transfers',
    question: 'Proposez-vous des transferts aéroport ?',
    category: 'services',
    plainAnswer:
      "Oui, nous pouvons organiser des transferts privés depuis et vers l'aéroport. Merci de demander ce service au moins 48 heures avant votre arrivée.",
  },
  {
    id: 'cancellation-policy',
    question: "Quelle est votre politique d'annulation ?",
    category: 'booking',
    plainAnswer:
      "Vous pouvez consulter nos conditions d'annulation complètes sur notre page Annulation & Remboursement : orhakerem.com/fr/cancellation.",
    answer: cancellationLink('fr', 'page Annulation & Remboursement', "Vous pouvez consulter nos conditions d'annulation sur notre ", '.'),
  },
  {
    id: 'pets',
    question: 'Les animaux sont-ils acceptés ?',
    category: 'stay',
    plainAnswer:
      "Malheureusement, nous n'acceptons pas les animaux afin de garantir le confort de tous nos voyageurs.",
  },
  {
    id: 'minimum-stay',
    question: 'Y a-t-il une durée minimale de séjour ?',
    category: 'booking',
    plainAnswer:
      "Il n'y a pas de durée minimale. Vous pouvez réserver une seule nuit ou rester plusieurs semaines. Nos espaces se louent aussi à l'heure pour des événements.",
  },
  {
    id: 'cleaning',
    question: 'Proposez-vous un service de ménage ?',
    category: 'services',
    plainAnswer:
      'Oui, un ménage régulier est assuré pendant votre séjour. Un ménage supplémentaire peut être organisé sur demande, moyennant un supplément.',
  },
  {
    id: 'payment-methods',
    question: 'Quels moyens de paiement acceptez-vous ?',
    category: 'booking',
    plainAnswer: 'Nous acceptons les virements bancaires, Bit et les espèces.',
  },
  {
    id: 'direct-vs-airbnb',
    question: 'Quelle différence entre réserver en direct et via Airbnb ?',
    category: 'booking',
    plainAnswer:
      'Réserver directement auprès de nous vous garantit de meilleurs tarifs, un service personnalisé et plus de flexibilité de paiement qu’une plateforme tierce.',
  },
  {
    id: 'long-stay-discount',
    question: 'Existe-t-il des réductions à la semaine ou au mois ?',
    category: 'booking',
    plainAnswer:
      'Bien sûr ! Nous proposons des tarifs réduits et des remises spéciales pour les longs séjours.',
  },
  {
    id: 'early-checkin',
    question: 'Une arrivée anticipée est-elle possible ?',
    category: 'booking',
    plainAnswer:
      "Une arrivée anticipée peut être possible, sans garantie : cela dépend de la réservation précédente et du planning de ménage. Nous vous tiendrons informés à l'approche de votre arrivée et vous préviendrons dès que l'appartement est prêt.",
  },
  {
    id: 'safe-room',
    question: "Y a-t-il une pièce sécurisée (mamad) dans l'appartement ?",
    category: 'stay',
    plainAnswer:
      "Il n'y a pas de mamad dans l'appartement, mais un abri public se trouve à proximité. Nous partageons avec chaque voyageur une vidéo montrant exactement comment s'y rendre en cas d'alerte.",
  },
  {
    id: 'music-gatherings',
    question: 'Peut-on mettre de la musique ou organiser des réunions ?',
    category: 'stay',
    plainAnswer:
      'La musique et les réunions sont les bienvenues. Nous demandons simplement de respecter les heures de calme et le voisinage.',
  },
  {
    id: 'sleeping',
    question: 'Quels sont les couchages ?',
    category: 'stay',
    plainAnswer:
      "Les appartements disposent d'un grand lit double et d'un canapé-lit convertible.",
  },
]);

const he: FAQEntry[] = withAnswers([
  {
    id: 'where-located',
    question: 'איפה נמצאות הדירות בתל אביב?',
    category: 'location',
    plainAnswer:
      'דירות אור הכרם נמצאות בשכונת כרם התימנים ההיסטורית, ברחוב הכובשים 35, במרחק הליכה משוק הכרמל, מחוף בננה ביץ׳ ומנחלת בנימין.',
  },
  {
    id: 'beach-distance',
    question: 'כמה רחוק הים מאור הכרם?',
    category: 'location',
    plainAnswer: 'הים במרחק דקות ספורות — חוף בננה ביץ׳ נמצא כ-600 מטר מהבניין.',
  },
  {
    id: 'carmel-market',
    question: 'האם אור הכרם קרוב לשוק הכרמל?',
    category: 'location',
    plainAnswer: 'כן, שוק הכרמל נמצא כ-400 מטר מהדירות, במרחק הליכה נוח.',
  },
  {
    id: 'what-unique',
    question: 'מה מייחד את אור הכרם בתל אביב?',
    category: 'stay',
    plainAnswer:
      'אור הכרם משלב יוקרה בוטיקית, אירוח ידידותי לשומרי שבת וקרבה לנקודות המרכזיות של מרכז תל אביב.',
  },
  {
    id: 'central-tlv',
    question: 'האם הדירות במרכז תל אביב?',
    category: 'location',
    plainAnswer: 'כן, אור הכרם נמצא במרכז תל אביב, בשכונת כרם התימנים התוססת.',
  },
  {
    id: 'checkin-times',
    question: 'מהן שעות הצ׳ק-אין והצ׳ק-אאוט?',
    category: 'booking',
    plainAnswer:
      'צ׳ק-אין החל מ-15:00, וצ׳ק-אאוט עד 11:00. צ׳ק-אין מוקדם או צ׳ק-אאוט מאוחר אפשריים לפי בקשה.',
  },
  {
    id: 'shabbat',
    question: 'האם יש אירוח ידידותי לשומרי שבת?',
    category: 'services',
    plainAnswer:
      'כן, אנחנו מספקים היערכות מלאה לשבת: מפתחות שבת, פלטה, שעוני שבת, ואפשרות לארוחות כשרות בתיאום מראש.',
  },
  {
    id: 'parking',
    question: 'האם יש חניה?',
    category: 'stay',
    plainAnswer: 'כן, אנחנו מציעים מקום חניה בתוספת תשלום של 70 ₪ ליום.',
  },
  {
    id: 'amenities',
    question: 'אילו מתקנים כלולים?',
    category: 'stay',
    plainAnswer:
      'בכל הדירות מטבח מאובזר במלואו, WiFi מהיר, טלוויזיות חכמות, מצעים איכותיים ומוצרי טיפוח פרימיום. מתקנים נוספים משתנים בין הדירות.',
  },
  {
    id: 'airport-transfers',
    question: 'האם אתם מציעים הסעות משדה התעופה?',
    category: 'services',
    plainAnswer:
      'כן, נשמח לארגן הסעה פרטית משדה התעופה ואליו. יש לבקש את השירות לפחות 48 שעות לפני ההגעה.',
  },
  {
    id: 'cancellation-policy',
    question: 'מהי מדיניות הביטולים?',
    category: 'booking',
    plainAnswer:
      'את תנאי הביטול המלאים אפשר לקרוא בעמוד מדיניות ביטולים והחזרים: orhakerem.com/he/cancellation.',
    answer: cancellationLink('he', 'עמוד מדיניות ביטולים והחזרים', 'את תנאי הביטול המלאים אפשר לקרוא ב', '.'),
  },
  {
    id: 'pets',
    question: 'האם מותר להביא בעלי חיים?',
    category: 'stay',
    plainAnswer: 'לצערנו לא ניתן להביא בעלי חיים, כדי לשמור על נוחות כל האורחים שלנו.',
  },
  {
    id: 'minimum-stay',
    question: 'האם יש מינימום לילות?',
    category: 'booking',
    plainAnswer:
      'אין מינימום לילות. אפשר להזמין לילה אחד או להישאר כמה שבועות, ואפשר גם לשכור את המקומות לכמה שעות לאירועים.',
  },
  {
    id: 'cleaning',
    question: 'האם יש שירותי ניקיון?',
    category: 'services',
    plainAnswer:
      'כן, אנחנו מציעים ניקיון שוטף במהלך השהות. ניקיון נוסף אפשרי לפי בקשה בתוספת תשלום.',
  },
  {
    id: 'payment-methods',
    question: 'אילו אמצעי תשלום אתם מקבלים?',
    category: 'booking',
    plainAnswer: 'אנחנו מקבלים העברה בנקאית, ביט ומזומן.',
  },
  {
    id: 'direct-vs-airbnb',
    question: 'מה ההבדל בין הזמנה ישירה ל-Airbnb?',
    category: 'booking',
    plainAnswer:
      'הזמנה ישירה אצלנו מקנה מחירים טובים יותר, שירות אישי וגמישות רבה יותר בתשלום, לעומת הזמנה דרך פלטפורמת צד שלישי.',
  },
  {
    id: 'long-stay-discount',
    question: 'האם יש הנחה לשהייה שבועית או חודשית?',
    category: 'booking',
    plainAnswer: 'בוודאי! אנחנו מציעים מחירים מוזלים והנחות מיוחדות לשהיות ארוכות.',
  },
  {
    id: 'early-checkin',
    question: 'האם אפשר צ׳ק-אין מוקדם?',
    category: 'booking',
    plainAnswer:
      'צ׳ק-אין מוקדם אפשרי לעיתים, אך אינו מובטח — הוא תלוי בהזמנה הקודמת ובלוח הניקיון. נעדכן אתכם לקראת ההגעה, וברגע שהדירה מוכנה.',
  },
  {
    id: 'safe-room',
    question: 'האם יש ממ״ד בדירה?',
    category: 'stay',
    plainAnswer:
      'אין ממ״ד בתוך הדירה, אך יש מקלט ציבורי בקרבת מקום. אנחנו משתפים כל אורח בסרטון שמראה בדיוק איך להגיע אליו במקרה של אזעקה.',
  },
  {
    id: 'music-gatherings',
    question: 'אפשר לשמוע מוזיקה או לארח מפגשים?',
    category: 'stay',
    plainAnswer:
      'מוזיקה ומפגשים יתקבלו בברכה. אנחנו רק מבקשים לכבד את שעות השקט ולהתחשב בשכנים.',
  },
  {
    id: 'sleeping',
    question: 'מהם סידורי השינה?',
    category: 'stay',
    plainAnswer: 'בדירות מיטה זוגית רחבה וספה נפתחת למיטה.',
  },
]);

export const faqData: Record<Locale, FAQEntry[]> = { en, fr, he };

const HOME_FAQ_IDS = new Set([
  'where-located',
  'parking',
  'cancellation-policy',
  'direct-vs-airbnb',
]);

export function getHomeFaqEntries(locale: Locale): FAQEntry[] {
  return faqData[locale].filter(faq => HOME_FAQ_IDS.has(faq.id));
}
