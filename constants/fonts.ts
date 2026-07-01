import type { CSSProperties } from 'react';

// Typography scale — Baloo 2 (rounded display) + Nunito (friendly body).
// On web each token is a style object (family + weight); spread it into an
// inline style, e.g. style={{ ...Fonts.display, fontSize: 20 }}.

type FontToken = Pick<CSSProperties, 'fontFamily' | 'fontWeight'>;

const baloo = 'var(--font-baloo), system-ui, sans-serif';
const nunito = 'var(--font-nunito), system-ui, sans-serif';

export const Fonts = {
  /** Headings, numbers, titles */
  display: { fontFamily: baloo, fontWeight: 700 },
  displayHeavy: { fontFamily: baloo, fontWeight: 800 },
  displayMedium: { fontFamily: baloo, fontWeight: 600 },

  /** Body copy, labels, captions */
  body: { fontFamily: nunito, fontWeight: 500 },
  bodySemiBold: { fontFamily: nunito, fontWeight: 600 },
  bodyBold: { fontFamily: nunito, fontWeight: 700 },
  bodyHeavy: { fontFamily: nunito, fontWeight: 800 },
} satisfies Record<string, FontToken>;
