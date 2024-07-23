import * as ReactDeviceDetect from 'react-device-detect';

import { useIsHydrated } from './use-is-hydrated';

function getDD() {
  const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0;

  const isIpadPro =
    ReactDeviceDetect.isDesktop && ReactDeviceDetect.isSafari && isTouchDevice;

  const reduceMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );
  const isReducedMotion = reduceMotionQuery.matches;

  return {
    isDesktop: ReactDeviceDetect.isDesktop && !isIpadPro,
    isMobile: ReactDeviceDetect.isMobile || isIpadPro,
    isMobileOnly: ReactDeviceDetect.isMobileOnly,
    isMobileSafari: ReactDeviceDetect.isMobileSafari,
    isTablet: ReactDeviceDetect.isTablet || isIpadPro,
    isChrome: ReactDeviceDetect.isChrome,
    isFirefox: ReactDeviceDetect.isFirefox,
    isSafari: ReactDeviceDetect.isSafari,
    isMacOs: ReactDeviceDetect.isMacOs,
    isWindows: ReactDeviceDetect.isWindows,
    isIOS: ReactDeviceDetect.isIOS,
    isAndroid: ReactDeviceDetect.isAndroid,
    isBrowser: ReactDeviceDetect.isBrowser,
    isTouch: isTouchDevice,
    isWebGL: ReactDeviceDetect.isDesktop && !isReducedMotion,
  };
}

export const useDeviceDetect = () => {
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return {};
  }

  return getDD();
};
