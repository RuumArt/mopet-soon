'use client';

import * as React from 'react';

import { isApiSupported } from 'utils';

export const useMedia = (mediaQuery, initialValue) => {
  const [isVerified, setIsVerified] = React.useState(initialValue);

  React.useEffect(() => {
    if (!isApiSupported('matchMedia')) {
      console.warn('matchMedia is not supported by your current browser');
      return;
    }

    const mediaQueryList = window.matchMedia(mediaQuery);
    const changeHandler = () => setIsVerified(!!mediaQueryList.matches);

    changeHandler();
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', changeHandler);
      return () => {
        mediaQueryList.removeEventListener('change', changeHandler);
      };
    }
  }, [mediaQuery]);

  return isVerified;
};
