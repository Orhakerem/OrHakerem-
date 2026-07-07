import { BulletList } from '@/components/legal/LegalPageShell';

const standardCancellationPolicy = [
  {
    title: 'יותר מ-30 יום לפני הצ׳ק-אין',
    body: 'ייגבה מקדמה של 30%.',
  },
  {
    title: '30-15 יום לפני הצ׳ק-אין',
    body: 'ייגבו 30% מסך ההזמנה, ללא החזר.',
  },
  {
    title: '15-7 יום לפני הצ׳ק-אין',
    body: 'ייגבו 50% מסך ההזמנה, ללא החזר.',
  },
  {
    title: 'פחות מ-7 ימים לפני הצ׳ק-אין, אי-הגעה, או עזיבה מוקדמת',
    body: 'ייגבו 100% מסכום ההזמנה, ללא החזר.',
  },
];

const nonRefundableSituations = [
  'גניבה או אובדן של חפצים אישיים',
  'רעש משכנים, שיפוצים או עבודות בנייה',
  'תחזוקה או ניקיון של שטחים משותפים בבניין',
  'חרקים, מזיקים או מפגעים טבעיים',
  'תקלות אינטרנט שאינן קשורות לניהול כושל מצדנו',
  'ביטול או דחייה של אירוע',
  'ביטולי טיסות או חוסר יציבות גיאופוליטית כללית ללא הגבלות רשמיות',
];

const voucherPolicy = [
  'האורחים יקבלו שובר שאינו ניתן להחזר או להעברה, בשווי הסכום ששולם',
  'השובר תקף ל-12 חודשים ממועד הצ׳ק-אין המקורי',
  'לא יינתן החזר כספי בתנאים אלה',
];

const paymentSchedule = [
  'מקדמה של 30% בעת ההזמנה',
  '20% נגבים 15 יום לפני ההגעה',
  '50% נגבים 7 ימים לפני ההגעה',
  'אישור פיקדון ביטחון נלקח יום לפני ההגעה, ומשוחרר 5 ימים לאחר הצ׳ק-אאוט',
];

export default function CancellationContentHe() {
  return (
    <>
      <section className="mb-10" data-animate="fade-up" data-delay="1">
        <h2 className="font-head text-3xl font-bold text-black">מדיניות ביטולים סטנדרטית</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-cream/50 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            {standardCancellationPolicy.map((item) => (
              <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5">
                <h3 className="font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-black/75 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="2">
        <h2 className="font-head text-3xl font-bold text-black">מקרים ללא החזר כספי</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/75 leading-relaxed">
            לא יינתן החזר כספי עבור אירועים שאינם בשליטת החברה, לרבות (רשימה חלקית):
          </p>
          <div className="mt-5">
            <BulletList items={nonRefundableSituations} />
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="3">
        <h2 className="font-head text-3xl font-bold text-black">
          אירועים גיאופוליטיים ושיבושי טיסות – מדיניות שוברים
        </h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/75 leading-relaxed">
            במקרים של איסורי טיסה רשמיים, סגירת שדות תעופה או השעיית טיסות שהוכרזו על ידי הרשויות:
          </p>
          <div className="mt-5">
            <BulletList items={voucherPolicy} />
          </div>
        </div>
      </section>

      <section data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">לוח תשלומים</h2>
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
    </>
  );
}
