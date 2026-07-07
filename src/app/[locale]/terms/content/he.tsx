import Link from 'next/link';
import { BulletList } from '@/components/legal/LegalPageShell';

const paymentSchedule = [
  'מקדמה של 30% בעת ההזמנה',
  '20% נגבים 15 יום לפני ההגעה',
  '50% נגבים 7 ימים לפני ההגעה',
  'אישור פיקדון ביטחון נלקח יום לפני ההגעה, ומשוחרר 5 ימים לאחר הצ׳ק-אאוט',
];

const guestResponsibilities = [
  'להציג דרכון בתוקף ואשרת כניסה בעת הצ׳ק-אין',
  'לשאת באחריות מלאה לכל נזק שייגרם במהלך השהות',
  'לכבות את כל התאורה, המזגן והמכשירים בעת העזיבה',
  'להימנע מעישון, מארגון אירועים או מהבאת בעלי חיים',
  'להשתמש בדירה בכבוד ובאחריות',
  'לפעול לפי תקנות הרעש המקומיות ולהתחשב בשכנים',
  'לדווח מיידית על כל נזק, תקלה או בעיה',
];

const companyResponsibilities = [
  'הבטחת ניקיון מקצועי של הדירה לפני ההגעה',
  'אספקת מצעים ומגבות בהתאם למספר האורחים הרשומים',
  'מענה לתקלות תחזוקה תוך זמן סביר',
  'העברת האורח לדירה דומה או טובה יותר, או הצעת החזר כספי, אם הדירה הופכת לבלתי ראויה למגורים',
  'ביטול הזמנה במקרים בהם התנהגות האורח או יתרות שלא שולמו עלולות לסכן את הדירה או את החברה',
];

const companyLimitations = [
  'גניבה או נזק לחפצים אישיים',
  'רעש או הפרעות מהבניין או מהסביבה',
  'חרקים, מזיקים או הפרעות סביבתיות',
  'אירועים שאינם בשליטתה (כוח עליון או הפרעות מצד שלישי)',
  'ביטול או שינוי של אירועי צד שלישי שהיוו את הסיבה לשהות',
];

const insuranceCoverage = [
  'ביטול נסיעה',
  'מקרי חירום רפואיים',
  'שיבושי טיסות',
  'כוח עליון וסיכונים גיאופוליטיים',
];

export default function TermsContentHe({ cancellationHref }: { cancellationHref: string }) {
  return (
    <>
      <section className="mb-10" data-animate="fade-up" data-delay="1">
        <h2 className="font-head text-3xl font-bold text-black">1. מדיניות ביטולים והחזרים</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            אור הכרם מיישם מדיניות ביטולים והחזרים מדורגת בהתאם לזמן שנותר עד הביטול, לצד מקרים
            מוגדרים ללא החזר ומדיניות שוברים עבור שיבושי נסיעה שהוכרזו רשמית.
          </p>
          <Link
            href={cancellationHref}
            className="mt-5 inline-flex items-center font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-light"
          >
            לצפייה במדיניות הביטולים וההחזרים המלאה
          </Link>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="2">
        <h2 className="font-head text-3xl font-bold text-black">2. לוח תשלומים</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="rounded-2xl border border-secondary/20 bg-cream p-6">
            <h3 className="font-head text-2xl font-semibold text-black">לוח תשלומים (הזמנות ישירות)</h3>
            <div className="mt-5">
              <BulletList items={paymentSchedule} />
            </div>
          </div>

          <p className="mt-6 text-black/80 leading-relaxed">
            החברה שומרת לעצמה את הזכות לבטל או להעביר הזמנות שלא שולמו במלואן לפני ההגעה.
          </p>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="3">
        <h2 className="font-head text-3xl font-bold text-black">3. אחריות האורח</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <BulletList items={guestResponsibilities} />
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">4. אחריות אור הכרם</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">אור הכרם מתחייב ל</h3>
            <div className="mt-5">
              <BulletList items={companyResponsibilities} />
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">אור הכרם אינו אחראי ל</h3>
            <div className="mt-5">
              <BulletList items={companyLimitations} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">5. ביטוח נסיעות והבהרה גיאופוליטית</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            מומלץ מאוד לאורחים לרכוש ביטוח נסיעות המכסה:
          </p>
          <div className="mt-5">
            <BulletList items={insuranceCoverage} />
          </div>

          <div className="mt-6 space-y-4 text-black/80 leading-relaxed">
            <p>
              מתיחות גיאופוליטית או מצב ביטחוני בישראל אינם נחשבים כוח עליון אלא אם הוכרזו רשמית
              על ידי הרשויות (למשל: סגירת שדה תעופה או איסור טיסה).
            </p>
            <p>במקרים אלה, האורחים יקבלו שובר זיכוי כמפורט בסעיף 1.3.</p>
            <p>
              אור הכרם אינו אחראי לביטולים המבוססים על חששות אישיים, אלא אם חלות הגבלות רשמיות.
            </p>
          </div>
        </div>
      </section>

      <section data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">6. סיום, קנסות ושהייה מעבר לזמן</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="space-y-4 text-black/80 leading-relaxed">
            <p>
              תקופת השכירות מסתיימת אוטומטית בתאריך הצ׳ק-אאוט המוסכם, ללא הודעה מוקדמת.
            </p>
            <p>
              אי-פינוי הדירה בזמן יגרור קנס בגובה פי 2 מהתעריף היומי עבור כל יום נוסף, עד לפינוי
              מלא של הדירה והחזרת המפתחות.
            </p>
            <p>
              כל הפרה של תנאי השימוש מזכה את אור הכרם בזכות לסיים את השהות באופן מיידי, ללא החזר
              או פיצוי.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
