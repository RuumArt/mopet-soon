import { useEffect, useRef } from 'react';

export const usePrev = value => {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = value;
  });

  return prevRef.current;
};
