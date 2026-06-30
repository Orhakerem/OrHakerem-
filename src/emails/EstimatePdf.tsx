import 'server-only';

import path from 'node:path';

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import type { ReservationLineItem, ReservationQuoteData } from '@/lib/reservation-quote';
import { registerPdfFonts } from '@/lib/pdf-fonts';

registerPdfFonts();

const LOGO_PATH = path.join(process.cwd(), 'public', 'logo', 'Logo_rouge.png');

const C = {
  bg: '#efe7d7',
  paper: '#f8f3e8',
  ink: '#1a1a1a',
  inkSoft: '#3a3733',
  inkMute: '#6b6660',
  rule: '#d6cdb9',
  sun: '#e8d8a8',
} as const;

const SERIF = 'Cormorant Garamond';
const MONO = 'DM Mono';
const SANS = 'Heebo';

const s = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    color: C.ink,
    fontFamily: SANS,
    fontSize: 8.5,
    lineHeight: 1.45,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 46,
    position: 'relative',
  },

  // Decorative marks
  cornerL: { position: 'absolute', top: 18, left: 18, width: 6, height: 6, backgroundColor: C.ink },
  cornerR: { position: 'absolute', top: 18, right: 18, width: 6, height: 6, backgroundColor: C.ink },
  sun: {
    position: 'absolute',
    top: -34,
    right: -34,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: C.sun,
    opacity: 0.5,
  },

  headerRule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerRuleText: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: C.inkMute,
    textTransform: 'uppercase',
  },

  // Document header
  docHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 9,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
    marginBottom: 10,
  },
  logo: { width: 50, marginBottom: 6 },
  kicker: {
    fontFamily: MONO,
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: C.inkMute,
    marginBottom: 4,
  },
  h1: { fontFamily: SERIF, fontSize: 28, lineHeight: 1.04, color: C.ink },
  h1i: { fontFamily: SERIF, fontSize: 28, lineHeight: 1.04, fontStyle: 'italic', color: C.ink },
  docNumWrap: { alignItems: 'flex-end' },
  docNumLabel: {
    fontFamily: MONO,
    fontSize: 7,
    letterSpacing: 1.2,
    color: C.inkMute,
    textTransform: 'uppercase',
  },
  docNum: { fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, lineHeight: 1.1, color: C.ink, marginTop: 2 },
  docNumSm: { fontFamily: SERIF, fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.1, color: C.ink, marginTop: 2 },

  // Section heading
  sectionKicker: {
    fontFamily: MONO,
    fontSize: 7,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: C.inkMute,
    marginBottom: 4,
  },
  h2: { fontFamily: SERIF, fontSize: 18, lineHeight: 1.12, color: C.ink, marginBottom: 7 },

  // Reservation grid
  resGrid: { flexDirection: 'row', borderTopWidth: 0.75, borderTopColor: C.rule },
  resCol: { flexGrow: 1, flexBasis: 0 },
  resColLeft: { marginRight: 26 },
  resRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
  },
  resLabel: {
    width: 88,
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.inkMute,
  },
  resVal: { flexGrow: 1, flexBasis: 0, fontFamily: SANS, fontSize: 8.5, color: C.ink },

  // Check-in strip
  checkinStrip: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 0.75,
    borderColor: C.rule,
  },
  checkinCell: { flexGrow: 1, flexBasis: 0, padding: 8 },
  checkinDivider: { borderLeftWidth: 0.75, borderLeftColor: C.rule },
  checkinLabel: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: C.inkMute,
    marginBottom: 6,
  },
  checkinValue: { fontFamily: SERIF, fontSize: 15, lineHeight: 1, color: C.ink, marginBottom: 6 },
  checkinSub: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    color: C.inkMute,
    textTransform: 'uppercase',
  },

  // Invoice
  invoice: { marginTop: 11 },
  invoiceHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 6,
  },
  invoiceH3: { fontFamily: SERIF, fontSize: 15, lineHeight: 1.1, color: C.ink },
  pill: {
    // Heebo (not DM Mono) because the currency value may carry the shekel
    // glyph, which DM Mono lacks. Letter-spacing keeps the mono-label feel.
    fontFamily: SANS,
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: C.inkMute,
    textTransform: 'uppercase',
  },
  tableHead: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.ink,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
    paddingVertical: 5,
  },
  th: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.inkMute,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
    borderBottomStyle: 'dashed',
  },
  tableRowLast: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: C.ink,
  },
  colDesc: { flexGrow: 1, flexBasis: 0, fontFamily: SANS, fontSize: 8.5, color: C.ink },
  colUnit: { width: 80, textAlign: 'right', fontFamily: SANS, fontSize: 8.5, color: C.inkSoft },
  colAmt: { width: 80, textAlign: 'right', fontFamily: SANS, fontSize: 8.5, color: C.ink },

  totals: { marginTop: 6, marginLeft: 'auto', width: 220 },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
    borderBottomStyle: 'dashed',
  },
  totalsLabel: { fontFamily: SANS, fontSize: 8.5, color: C.inkSoft },
  totalsVal: { fontFamily: SANS, fontSize: 8.5, color: C.ink },
  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderTopWidth: 1,
    borderTopColor: C.ink,
    marginTop: 4,
    paddingTop: 7,
  },
  grandLabel: { fontFamily: SERIF, fontSize: 14, color: C.ink },
  grandVal: { fontFamily: SERIF, fontSize: 14, color: C.ink },

  // Payment + balance
  payStatus: { flexDirection: 'row', marginTop: 10 },
  payCard: {
    flexGrow: 1.6,
    flexBasis: 0,
    backgroundColor: C.paper,
    borderWidth: 0.75,
    borderColor: C.rule,
    padding: 9,
    marginRight: 16,
  },
  payLabel: {
    fontFamily: MONO,
    fontSize: 7,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: C.inkMute,
    marginBottom: 6,
  },
  payMethod: { fontFamily: SERIF, fontSize: 14, lineHeight: 1.1, color: C.ink, marginBottom: 5 },
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2.5,
    borderBottomWidth: 0.75,
    borderBottomColor: C.rule,
    borderBottomStyle: 'dashed',
  },
  payRowLast: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2.5 },
  payRowLabel: { fontFamily: SANS, fontSize: 8, color: C.inkSoft },
  payRowVal: { fontFamily: SANS, fontSize: 8, color: C.ink },
  balance: {
    flexGrow: 1,
    flexBasis: 0,
    backgroundColor: C.ink,
    padding: 9,
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontFamily: MONO,
    fontSize: 7,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: C.bg,
    opacity: 0.65,
  },
  balanceAmount: { fontFamily: SERIF, fontSize: 30, lineHeight: 1, color: C.bg, marginVertical: 6 },
  balanceNote: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.bg,
    opacity: 0.65,
  },

  // Closing + footer
  closing: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 0.75,
    borderTopColor: C.rule,
    fontFamily: SANS,
    fontSize: 7.5,
    lineHeight: 1.45,
    color: C.inkSoft,
    maxWidth: 430,
  },
  finePrint: {
    marginTop: 9,
    paddingTop: 7,
    borderTopWidth: 0.75,
    borderTopColor: C.rule,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  finePrintText: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.inkMute,
  },
  finePrintLinks: { flexDirection: 'row' },
  finePrintLink: {
    fontFamily: MONO,
    fontSize: 6.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: C.inkMute,
    marginLeft: 16,
  },
});

/**
 * Renders a currency amount in the serif display face, but draws the shekel
 * glyph (₪) in Heebo — Cormorant Garamond's ₪ is a condensed monogram that
 * reads poorly at large sizes, whereas Heebo's is a clean upright symbol.
 */
function SerifAmount({
  value,
  style,
}: {
  value: string;
  style: (typeof s)[keyof typeof s];
}) {
  const parts = value.split('₪');
  return (
    <Text style={style}>
      {parts.map((part, i) => (
        <Text key={i}>
          {part}
          {i < parts.length - 1 ? <Text style={{ fontFamily: SANS }}>₪</Text> : null}
        </Text>
      ))}
    </Text>
  );
}

function ResRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.resRow}>
      <Text style={s.resLabel}>{label}</Text>
      <Text style={s.resVal}>{value || '—'}</Text>
    </View>
  );
}

function LineItemRow({
  item,
  last,
}: {
  item: ReservationLineItem;
  last: boolean;
}) {
  return (
    <View style={last ? s.tableRowLast : s.tableRow}>
      <Text style={s.colDesc}>{item.description}</Text>
      <Text style={s.colUnit}>{item.unit}</Text>
      <Text style={s.colAmt}>{item.amount}</Text>
    </View>
  );
}

export function EstimatePdf({ data }: { data: ReservationQuoteData }) {
  const leftRows = [
    ['Guest name', data.guestName],
    ['Nationality', data.nationality],
    ['Apartment', data.apartment],
    ['Order date', data.orderDate],
  ];
  const rightRows = [
    ['ID / Passport №', data.idPassport],
    ['Contact', data.contact],
    ['Travellers', data.travellers],
    ['Nights', data.nights],
  ];

  return (
    <Document
      title={`Or Hakerem — Reservation ${data.guestName}`}
      author="Or Hakerem"
      subject={`Reservation ${data.reservationNumber}`}
    >
      <Page size="A4" style={s.page} wrap>
        <View style={s.cornerL} />
        <View style={s.cornerR} />
        <View style={s.sun} />

        <View style={s.headerRule}>
          <Text style={s.headerRuleText}>OR HAKEREM</Text>
          <Text style={s.headerRuleText}>Reservation · Invoice</Text>
        </View>

        {/* Document header */}
        <View style={s.docHeader}>
          <View>
            {/* react-pdf Image has no alt prop; the jsx-a11y rule targets HTML <img>. */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image style={s.logo} src={LOGO_PATH} />
            <Text style={s.kicker}>Booking confirmation</Text>
            <Text style={s.h1}>Reservation</Text>
            <Text style={s.h1i}>&amp; invoice.</Text>
          </View>
          <View style={s.docNumWrap}>
            <Text style={s.docNumLabel}>Reservation №</Text>
            <Text style={s.docNum}>{data.reservationNumber}</Text>
            <Text style={[s.docNumLabel, { marginTop: 12 }]}>Issued on</Text>
            <Text style={s.docNumSm}>{data.issuedOn}</Text>
          </View>
        </View>

        {/* Reservation details */}
        <Text style={s.sectionKicker}>Section i — Traveller &amp; stay</Text>
        <Text style={s.h2}>Reservation details.</Text>

        <View style={s.resGrid}>
          <View style={[s.resCol, s.resColLeft]}>
            {leftRows.map(([label, value]) => (
              <ResRow key={label} label={label} value={value} />
            ))}
          </View>
          <View style={s.resCol}>
            {rightRows.map(([label, value]) => (
              <ResRow key={label} label={label} value={value} />
            ))}
          </View>
        </View>

        {/* Check-in strip */}
        <View style={s.checkinStrip}>
          <View style={s.checkinCell}>
            <Text style={s.checkinLabel}>Check-in</Text>
            <Text style={s.checkinValue}>{data.checkInDate}</Text>
            <Text style={s.checkinSub}>{data.checkInTime}</Text>
          </View>
          <View style={[s.checkinCell, s.checkinDivider]}>
            <Text style={s.checkinLabel}>Check-out</Text>
            <Text style={s.checkinValue}>{data.checkOutDate}</Text>
            <Text style={s.checkinSub}>{data.checkOutTime}</Text>
          </View>
          <View style={[s.checkinCell, s.checkinDivider]}>
            <Text style={s.checkinLabel}>Apartment access</Text>
            <Text style={s.checkinSub}>{data.apartmentAccess}</Text>
          </View>
        </View>

        {/* Invoice */}
        <View style={s.invoice}>
          <View style={s.invoiceHead}>
            <Text style={s.invoiceH3}>Invoice breakdown.</Text>
            <Text style={s.pill}>Currency · {data.currency}</Text>
          </View>

          <View style={s.tableHead}>
            <Text style={[s.th, { flexGrow: 1, flexBasis: 0 }]}>Description</Text>
            <Text style={[s.th, { width: 80, textAlign: 'right' }]}>Unit</Text>
            <Text style={[s.th, { width: 80, textAlign: 'right' }]}>Amount</Text>
          </View>
          {data.lineItems.map((item, i) => (
            <LineItemRow
              key={`${item.description}-${i}`}
              item={item}
              last={i === data.lineItems.length - 1}
            />
          ))}

          <View style={s.totals}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>Subtotal</Text>
              <Text style={s.totalsVal}>{data.subtotal}</Text>
            </View>
            <View style={s.grandRow}>
              <Text style={s.grandLabel}>Total</Text>
              <SerifAmount value={data.total} style={s.grandVal} />
            </View>
          </View>
        </View>

        {/* Payment + balance */}
        <View style={s.payStatus}>
          <View style={s.payCard}>
            <Text style={s.payLabel}>Payment method</Text>
            <Text style={s.payMethod}>{data.paymentMethod}</Text>
            {[
              ['Deposit paid', data.depositPaid],
              ['Paid on', data.paidOn],
              ['Balance due', data.balanceDue],
            ].map(([label, value], i, arr) => (
              <View key={label} style={i === arr.length - 1 ? s.payRowLast : s.payRow}>
                <Text style={s.payRowLabel}>{label}</Text>
                <Text style={s.payRowVal}>{value || '—'}</Text>
              </View>
            ))}
          </View>
          <View style={s.balance}>
            <Text style={s.balanceLabel}>Balance remaining</Text>
            <SerifAmount value={data.balanceRemaining} style={s.balanceAmount} />
            <Text style={s.balanceNote}>Balance remaining · due</Text>
          </View>
        </View>

        <Text style={s.closing}>{data.closingNote}</Text>

        <View style={s.finePrint}>
          <Text style={s.finePrintText}>Or Hakerem · est. Tel Aviv</Text>
          <View style={s.finePrintLinks}>
            <Text style={s.finePrintLink}>orhakerem.com</Text>
            <Text style={s.finePrintLink}>@or_hakerem</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
