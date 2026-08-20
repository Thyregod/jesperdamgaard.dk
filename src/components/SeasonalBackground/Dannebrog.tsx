import type React from 'react';

/**
 * Dannebrog, drawn rather than taken from the 🇩🇰 emoji: Windows ships no country-flag
 * glyphs, so the emoji renders there as the letters "DK".
 *
 * Official proportions — the flag is 37 wide by 28 tall, the cross bands are 4 thick,
 * and the vertical band sits 12 from the hoist.
 */
export function Dannebrog(): React.JSX.Element {
  return (
    <svg viewBox="0 0 37 28" width="1em" height="0.76em" aria-hidden="true" focusable="false">
      <rect width="37" height="28" fill="#c8102e" />
      <rect y="12" width="37" height="4" fill="#ffffff" />
      <rect x="12" width="4" height="28" fill="#ffffff" />
    </svg>
  );
}
