import type { Locale } from '@/i18n/config';

const en = {
  backToHome: 'Back to Home',
  heading: 'Contact Or HaKerem',
  body: 'Or HaKerem is located in the heart of Tel Aviv, in the vibrant Kerem HaTeimanim neighborhood, within walking distance of Carmel Market and the beach. If you are looking for a luxury apartment in Tel Aviv or planning a boutique event, our team is here to assist you. Our team responds quickly to all inquiries and is available to help you plan your stay or event.',
  otherWays: {
    heading: 'Other Ways to Reach Us',
    subheading: 'Choose the method that works best for you',
    emailTitle: 'Email',
    phoneTitle: 'Phone & WhatsApp',
    whatsappCta: 'WhatsApp: +972 58 577 8891',
    socialTitle: 'Social Media',
  },
};

export type ContactMessages = typeof en;

const fr: ContactMessages = {
  backToHome: "Retour à l'accueil",
  heading: 'Contacter Or HaKerem',
  body: "Or HaKerem se trouve au cœur de Tel Aviv, dans le quartier animé de Kerem HaTeimanim, à quelques pas du marché du Carmel et de la plage. Que vous cherchiez un appartement de luxe à Tel Aviv ou que vous prépariez un événement boutique, notre équipe est là pour vous accompagner. Nous répondons rapidement à toutes les demandes et sommes disponibles pour vous aider à organiser votre séjour ou votre événement.",
  otherWays: {
    heading: 'Autres moyens de nous contacter',
    subheading: 'Choisissez le moyen qui vous convient le mieux',
    emailTitle: 'E-mail',
    phoneTitle: 'Téléphone & WhatsApp',
    whatsappCta: 'WhatsApp : +972 58 577 8891',
    socialTitle: 'Réseaux sociaux',
  },
};

const he: ContactMessages = {
  backToHome: 'חזרה לדף הבית',
  heading: 'צרו קשר עם אור הכרם',
  body: 'אור הכרם ממוקם בלב תל אביב, בשכונת כרם התימנים התוססת, במרחק הליכה משוק הכרמל ומהים. אם אתם מחפשים דירת יוקרה בתל אביב או מתכננים אירוע בוטיקי, הצוות שלנו כאן לעזור לכם. אנחנו עונים במהירות לכל פנייה וזמינים לסייע בתכנון השהות או האירוע שלכם.',
  otherWays: {
    heading: 'דרכים נוספות ליצור קשר',
    subheading: 'בחרו את הדרך הנוחה לכם ביותר',
    emailTitle: 'אימייל',
    phoneTitle: 'טלפון ווטסאפ',
    whatsappCta: 'וואטסאפ: 972585778891+',
    socialTitle: 'רשתות חברתיות',
  },
};

export const contactMessages: Record<Locale, ContactMessages> = { en, fr, he };
