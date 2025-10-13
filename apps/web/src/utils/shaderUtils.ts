export const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export const valueRemap = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const ruleOfThree = (a: number, b: number, c: number): number => (b * c) / a;

export const degToRad = (angle: number) => (angle * Math.PI) / 180;

export const secToMs = (sec: number) => sec * 1000;

export const msToSec = (ms: number) => ms / 1000;

export const mod = (n: number, m: number) => ((n % m) + m) % m;

export const clamp = (min: number, max: number, value: number) =>
  Math.min(Math.max(value, min), max);

export const round = (value: number, decimals: number) => Number(value.toFixed(decimals));

export const hexToRgb = (hex: string) => {
  const match = hex.replace(/#/, '').match(/.{1,2}/g);
  if (!match) return;
  /* check three components */
  if (!match[0] || !match[1] || !match[2]) {
    throw new Error('Invalid hex color');
  }
  const r = parseInt(match[0], 16);
  const g = parseInt(match[1], 16);
  const b = parseInt(match[2], 16);
  return { r, g, b };
};

export const mix = (a: number, b: number, t: number) => {
  return a * (1 - t) + b * t;
};

/** highp smoothstep */
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const denom = edge1 - edge0;
  if (Math.abs(denom) < 1e-6) return 0.5;

  const t = Math.max(0, Math.min(1, (x - edge0) / denom));
  return t * t * (3 - 2 * t);
};
