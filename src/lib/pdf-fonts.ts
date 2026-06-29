import 'server-only';

import path from 'node:path';

import { Font } from '@react-pdf/renderer';

/**
 * Registers the typefaces used by the estimate PDF. The files live in
 * `public/fonts/` so they ship with the standalone build (prepare-standalone
 * copies `public/` into the deploy artifact) — registration is by absolute
 * filesystem path, so no network fetch happens at render time.
 *
 * Cormorant Garamond ships only as a variable font upstream; react-pdf renders
 * its default (regular) master, which is the weight the estimate leans on. Body
 * copy uses react-pdf's built-in Helvetica, so it needs no registration.
 */
const FONT_DIR = path.join(process.cwd(), 'public', 'fonts');

let registered = false;

export function registerPdfFonts(): void {
  if (registered) {
    return;
  }

  Font.register({
    family: 'Cormorant Garamond',
    fonts: [
      { src: path.join(FONT_DIR, 'CormorantGaramond-Variable.ttf') },
      {
        src: path.join(FONT_DIR, 'CormorantGaramond-Italic-Variable.ttf'),
        fontStyle: 'italic',
      },
    ],
  });

  Font.register({
    family: 'DM Mono',
    fonts: [
      { src: path.join(FONT_DIR, 'DMMono-Regular.ttf'), fontWeight: 400 },
      { src: path.join(FONT_DIR, 'DMMono-Medium.ttf'), fontWeight: 500 },
    ],
  });

  // Body face. Heebo is registered as a variable font (react-pdf renders its
  // default master) and, unlike the built-in Helvetica, carries the shekel
  // glyph (₪) the invoice amounts depend on.
  Font.register({
    family: 'Heebo',
    fonts: [{ src: path.join(FONT_DIR, 'Heebo-Variable.ttf') }],
  });

  // Keep mono labels and serif numerals on one line — never hyphenate them.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}
