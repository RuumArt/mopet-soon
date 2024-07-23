import { gsap } from 'lib/gsap';
import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export const useGsapFrame = (callback, deps) => {
  const ref = useRef(callback);

  useIsomorphicLayoutEffect(() => (ref.current = callback), [callback]);

  useIsomorphicLayoutEffect(() => {
    gsap.ticker.add(callback);

    return () => gsap.ticker.remove(callback);
  }, deps);

  return null;
};
