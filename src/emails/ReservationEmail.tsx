// @jsxRuntime automatic
// (Pragma for the tsx/esbuild test runner, whose tsconfig `jsx: preserve`
// otherwise falls back to the classic runtime and needs React in scope. Next's
// compiler already uses the automatic runtime, so this is a no-op there.)
import {
  Body,
  Container,
  Head,
  Html,
  Text,
} from '@react-email/components';

/**
 * Minimal cover email for the attached invoice PDF.
 */
const C = {
  bg: '#d6cebc',
  paper: '#efe7d7',
  inkSoft: '#3a3733',
};

const SANS = 'Manrope, -apple-system, Segoe UI, Helvetica, Arial, sans-serif';
const BODY_TEXT = 'Your invoice PDF is attached.';

export function ReservationEmail() {
  return (
    <Html lang="en">
      <Head />
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <Text style={bodyTextStyle}>{BODY_TEXT}</Text>
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

const bodyTextStyle = {
  margin: 0,
  fontFamily: SANS,
  fontSize: '14px',
  lineHeight: '1.65',
  color: C.inkSoft,
};

export default ReservationEmail;
