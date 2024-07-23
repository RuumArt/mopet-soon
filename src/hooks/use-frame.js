import React from 'react';

import RafControl from 'utils/rafControl';

export const useFrame = (callback, priority = 0) => {
  React.useEffect(() => {
    if (callback) {
      RafControl?.add(callback, priority);

      return () => RafControl?.remove(callback);
    }
  }, [callback, priority]);
};
