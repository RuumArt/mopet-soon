import { RAD2DEG } from './constants.js';
import { clamp } from './clamp.js';
import { map } from './map.js';

export function geocentricToPolar({ x, y, z }) {
  const radius = Math.sqrt(x * x + y * y + z * z);
  let theta = 0;
  let phi = 0;

  if (radius !== 0) {
    theta = Math.atan2(x, z);
    phi = Math.acos(clamp(y / radius, -1, 1));
  }

  let longitude = theta * RAD2DEG - 90;

  if (longitude < -180) {
    longitude = 180 - (Math.abs(longitude) - 180);
  }

  const latitude = map(phi * RAD2DEG, 0, 180, 90, -90);

  return { latitude, longitude };
}
