import { useEffect } from 'react';
import normalizeWheel from 'normalize-wheel';

export default (cb = () => {}, enable = false, mouseScrollMultiplier = 1) => {
  const onWheel = event => {
    const { pixelY, pixelX } = normalizeWheel(event);

    cb({
      x: pixelX,
      y: pixelY,
      delta: {
        x: pixelX * mouseScrollMultiplier,
        y: -pixelY * mouseScrollMultiplier,
      },
      type: 'wheel',
    });
  };

  useEffect(() => {
    if (enable) {
      window.addEventListener('wheel', onWheel);

      return () => {
        window.removeEventListener('wheel', onWheel);
      };
    }
  }, [enable]);
};
