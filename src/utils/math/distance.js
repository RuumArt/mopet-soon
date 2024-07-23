export function squaredDistance(a, b) {
  if (a.length === b.length && a.length === 2) return squaredDistance2D(a, b);
  if (a.length === b.length && a.length === 3) return squaredDistance3D(a, b);
}

export function squaredDistance2D([ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;

  return dx * dx + dy * dy;
}

export function squaredDistance3D([ax, ay, az], [bx, by, bz]) {
  const dx = bx - ax;
  const dy = by - ay;
  const dz = bz - az;

  return dx * dx + dy * dy + dz * dz;
}

export function distance(a, b) {
  if (a.length === b.length && a.length === 2) return distance2D(a, b);
  if (a.length === b.length && a.length === 3) return distance3D(a, b);
}

export function distance2D(a, b) {
  return Math.sqrt(squaredDistance2D(a, b));
}

export function distance3D(a, b) {
  return Math.sqrt(squaredDistance3D(a, b));
}
