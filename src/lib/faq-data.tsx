import type { ReactNode } from 'react';
import Link from 'next/link';

export interface FAQEntry {
  question: string;
  answer: ReactNode;
}

export const faqEntries: FAQEntry[] = [
  {
    question: 'Where are the apartments located in Tel Aviv?',
    answer:
      'Or HaKerem apartments are located in the historic Kerem HaTeimanim neighborhood at Hakovshim Street 35, within walking distance of Carmel Market, Banana Beach, and Nachalat Binyamin.',
  },
  {
    question: 'How far is the beach from Or HaKerem?',
    answer:
      'The beach is just a few minutes away, with Banana Beach located approximately 600 meters from the property.',
  },
  {
    question: 'Is Or HaKerem close to Carmel Market?',
    answer:
      'Yes, Carmel Market is located about 400 meters from the apartments, making it easily accessible by foot.',
  },
  {
    question: 'What makes Or HaKerem unique in Tel Aviv?',
    answer:
      'Or HaKerem offers a unique combination of boutique luxury, Shabbat-friendly accommodations, and proximity to key landmarks in central Tel Aviv.',
  },
  {
    question: 'Are the apartments located in central Tel Aviv?',
    answer:
      'Yes, Or HaKerem is located in central Tel Aviv, in the vibrant Kerem HaTeimanim neighborhood.',
  },
  {
    question: 'What are the check-in and check-out times?',
    answer:
      'Check-in is available from 3:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request.',
  },
  {
    question: 'Do you offer Shabbat-friendly accommodations?',
    answer:
      'Yes, we provide full Shabbat support including Shabbat keys, hot plates, timers, and can arrange kosher meals upon request.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes, we provide a parking spot with additional payment of 70₪ per day.',
  },
  {
    question: 'What amenities are included?',
    answer:
      'All apartments include fully equipped kitchens, high-speed WiFi, smart TVs, luxury linens, and premium toiletries. Additional amenities vary by apartment.',
  },
  {
    question: 'Do you offer airport transfers?',
    answer:
      'Yes, we can arrange private airport transfers for our guests. Please request this service at least 48 hours before your arrival.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: (
      <>
        You can review our cancellation terms in our{' '}
        <Link href="/terms" className="font-medium text-primary underline underline-offset-4">
          Terms &amp; Conditions page
        </Link>
        .
      </>
    ),
  },
  {
    question: 'Are pets allowed?',
    answer:
      'Unfortunately, we do not allow pets in our properties to ensure the comfort of all our guests.',
  },
  {
    question: 'Is there a minimum stay requirement?',
    answer:
      'There is no minimum stay. You can make a one-night reservation or stay for a few weeks. You can also rent our places for a few hours for events.',
  },
  {
    question: 'Do you provide cleaning services?',
    answer:
      'Yes, we offer regular cleaning services during your stay. Additional cleaning can be arranged upon request for an extra fee.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, Bit, and cash.',
  },
  {
    question: "What's the difference with direct booking and Airbnb?",
    answer:
      'Booking directly with us can get you better rates, personalized service, and more payment flexibility compared to booking through a third-party platform.',
  },
  {
    question: 'Can I get a weekly or monthly discount for long stays?',
    answer:
      'Of course! We offer reduced rates and special discounts for guests looking to stay for longer periods of time.',
  },
];

const homeFaqQuestions = new Set([
  'Where are the apartments located in Tel Aviv?',
  'Is parking available?',
  'What is your cancellation policy?',
  'Is there a minimum stay requirement?',
  'What payment methods do you accept?',
  "What's the difference with direct booking and Airbnb?",
  'Can I get a weekly or monthly discount for long stays?',
]);

export const homeFaqEntries = faqEntries.filter((faq) => homeFaqQuestions.has(faq.question));
