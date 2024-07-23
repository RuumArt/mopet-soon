import { length2D, length3D, length4D } from './length.js';

export function normalize(a) {
  if (a.length === 2) return normalize2D(a);
  if (a.length === 3) return normalize3D(a);
  if (a.length === 4) return normalize4D(a);
}

export function normalize2D(a) {
  const len = length2D(a);

  return [a[0] * len, a[1] * len];
}

export function normalize3D(a) {
  const len = length3D(a);

  return [a[0] * len, a[1] * len, a[2] * len];
}

export function normalize4D(a) {
  const len = length4D(a);

  return [a[0] * len, a[1] * len, a[2] * len, a[3] * len];
}
