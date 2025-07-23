// Pre-compute the seconds per year constant
const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60; // .25 accounting for leap years

export function secondsInYears(years: number): bigint {
  return BigInt(Math.round(years * SECONDS_PER_YEAR));
}
