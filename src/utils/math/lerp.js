export function lerp(x, y, t) {
  return (1 - t) * x + t * y;
}

export function lerp2D([ax, ay], [bx, by], t) {
  return [lerp(ax, bx, t), lerp(ay, by, t)];
}

export function lerp3D([ax, ay, az], [bx, by, bz], t) {
  return [lerp(ax, bx, t), lerp(ay, by, t), lerp(az, bz, t)];
}

export function lerp4D([ax, ay, az, aw], [bx, by, bz, bw], t) {
  return [lerp(ax, bx, t), lerp(ay, by, t), lerp(az, bz, t), lerp(aw, bw, t)];
}
