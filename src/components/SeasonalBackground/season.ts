export type Season = 'christmas' | 'birthday';

/**
 * Christmas runs 1 November through 31 December; the rest of the year is birthday.
 *
 * The date is passed in rather than read from the clock so the rule stays a pure
 * function of its input. `Date.prototype.getMonth()` is zero-indexed, so November
 * is 10 and December is 11 — not 11 and 12.
 */
export function resolveSeason(date: Date): Season {
  const month = date.getMonth();
  return month === 10 || month === 11 ? 'christmas' : 'birthday';
}
