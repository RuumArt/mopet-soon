import { useIsomorphicLayoutEffect } from 'hooks/use-isomorphic-layout-effect';
import { useState } from 'react';

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(null);

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion)');

    const handleMediaChange = e => {
      setReducedMotion(e.matches);
    };

    handleMediaChange(mql);

    mql.addEventListener('change', handleMediaChange);

    return () => {
      mql.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return reducedMotion;
};
