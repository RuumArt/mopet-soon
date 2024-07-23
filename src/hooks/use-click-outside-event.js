import { useCallback, useEffect } from 'react';

export const useOutsideClickEvent = (ref, callback) => {
  const handleClickOutside = useCallback(
    event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    if (ref.current) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [handleClickOutside, ref]);
};
