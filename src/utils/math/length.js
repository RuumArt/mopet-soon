export function squaredLength(a) {
  if (a.length === 2) return squaredLength2D(a);
  if (a.length === 3) return squaredLength3D(a);
  if (a.length === 4) return squaredLength4D(a);
}

export function squaredLength2D([x, y]) {
  return x * x + y * y;
}

export function squaredLength3D([x, y, z]) {
  return x * x + y * y + z * z;
}

export function squaredLength4D([x, y, z, w]) {
  return x * x + y * y + z * z + w * w;
}

export function length(a) {
  if (a.length === 2) return length2D(a);
  if (a.length === 3) return length3D(a);
  if (a.length === 4) return length4D(a);
}

export function length2D(a) {
  return Math.sqrt(squaredLength2D(a));
}

export function length3D(a) {
  return Math.sqrt(squaredLength3D(a));
}

export function length4D(a) {
  return Math.sqrt(squaredLength4D(a));
}
