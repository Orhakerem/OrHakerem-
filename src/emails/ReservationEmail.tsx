// @jsxRuntime automatic
// (Pragma for the tsx/esbuild test runner, whose tsconfig `jsx: preserve`
// otherwise falls back to the classic runtime and needs React in scope. Next's
// compiler already uses the automatic runtime, so this is a no-op there.)
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from '@react-email/components';

import { SITE_URL } from '@/app/seo';
import type { ReservationQuoteData } from '@/lib/reservation-quote';

/**
 * Short, branded cover email that accompanies the estimate PDF. The full
 * reservation/invoice lives in the attachment — this message just greets the
 * guest, names the reservation, and points to the PDF. Styling stays email-safe
 * (tables + inline styles); the Cormorant webfont degrades to Georgia where
 * clients strip <Font>.
 */
const C = {
  bg: '#d6cebc',
  paper: '#efe7d7',
  ink: '#1a1a1a',
  inkSoft: '#3a3733',
  inkMute: '#6b6660',
  rule: '#d6cdb9',
};

const SERIF = 'Cormorant Garamond, Georgia, "Times New Roman", serif';
const SANS = 'Manrope, -apple-system, Segoe UI, Helvetica, Arial, sans-serif';
const MONO = '"DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export function ReservationEmail({ data }: { data: ReservationQuoteData }) {
  const greetingName = data.guestName.trim() || 'guest';

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Cormorant Garamond"
          fallbackFontFamily="Georgia"
          webFont={{
            url: 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{`Your Or Hakerem reservation ${data.reservationNumber} — estimate attached`}</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <Section>
            <Img
              src={`${SITE_URL}/logo/Logo_rouge.png`}
              width="54"
              alt="Or Hakerem"
              style={{ display: 'block', marginBottom: '22px' }}
            />
            <Text style={eyebrowStyle}>Booking confirmation</Text>
            <Heading as="h1" style={headingStyle}>
              Your reservation
              <br />
              is confirmed.
            </Heading>
          </Section>

          <Text style={bodyTextStyle}>
            {`Dear ${greetingName},`} thank you for choosing Or Hakerem. Your reservation
            and invoice are attached as a PDF estimate — please keep it for your records.
          </Text>

          <Section style={detailBoxStyle}>
            <Row>
              <Column style={detailCellStyle}>
                <Text style={detailLabelStyle}>Reservation</Text>
                <Text style={detailValueStyle}>{data.reservationNumber || '—'}</Text>
              </Column>
              <Column style={detailCellStyle}>
                <Text style={detailLabelStyle}>Apartment</Text>
                <Text style={detailValueStyle}>{data.apartment || '—'}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={detailCellStyle}>
                <Text style={detailLabelStyle}>Check-in</Text>
                <Text style={detailValueStyle}>{data.checkInDate || '—'}</Text>
              </Column>
              <Column style={detailCellStyle}>
                <Text style={detailLabelStyle}>Check-out</Text>
                <Text style={detailValueStyle}>{data.checkOutDate || '—'}</Text>
              </Column>
            </Row>
          </Section>

          <Text style={totalLineStyle}>{`Total ${data.total}`}</Text>

          <Text style={noteStyle}>
            The detailed terms and conditions of your stay are provided in a separate
            document. By completing the payment, you acknowledge and accept them.
          </Text>

          <Hr style={hrStyle} />

          <Row>
            <Column>
              <Text style={footerStyle}>Or Hakerem · Tel Aviv</Text>
            </Column>
            <Column style={{ textAlign: 'right' }}>
              <Text style={footerStyle}>orhakerem.com</Text>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  margin: 0,
  backgroundColor: C.bg,
  fontFamily: SANS,
  padding: '32px 0',
};

const cardStyle = {
  width: '480px',
  maxWidth: '100%',
  margin: '0 auto',
  backgroundColor: C.paper,
  padding: '36px 40px 30px',
};

const eyebrowStyle = {
  margin: '0 0 8px',
  fontFamily: MONO,
  fontSize: '10px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: C.inkMute,
};

const headingStyle = {
  margin: '0 0 4px',
  fontFamily: SERIF,
  fontWeight: 400,
  fontSize: '38px',
  lineHeight: '1.0',
  letterSpacing: '-0.01em',
  color: C.ink,
};

const bodyTextStyle = {
  margin: '24px 0',
  fontFamily: SANS,
  fontSize: '14px',
  lineHeight: '1.65',
  color: C.inkSoft,
};

const detailBoxStyle = {
  borderTop: `1px solid ${C.rule}`,
  borderBottom: `1px solid ${C.rule}`,
  padding: '4px 0',
};

const detailCellStyle = {
  width: '50%',
  padding: '12px 0',
  verticalAlign: 'top' as const,
};

const detailLabelStyle = {
  margin: '0 0 4px',
  fontFamily: MONO,
  fontSize: '9px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  color: C.inkMute,
};

const detailValueStyle = {
  margin: 0,
  fontFamily: SANS,
  fontSize: '14px',
  fontWeight: 600,
  color: C.ink,
};

const totalLineStyle = {
  margin: '18px 0 0',
  fontFamily: SERIF,
  fontSize: '22px',
  fontWeight: 400,
  color: C.ink,
  textAlign: 'right' as const,
};

const noteStyle = {
  margin: '24px 0',
  fontFamily: SANS,
  fontSize: '12px',
  lineHeight: '1.6',
  color: C.inkMute,
};

const hrStyle = {
  borderColor: C.rule,
  margin: '8px 0 16px',
};

const footerStyle = {
  margin: 0,
  fontFamily: MONO,
  fontSize: '9px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: C.inkMute,
};

export default ReservationEmail;
