import { Observer } from 'lib/gsap';
import { useEffect, useRef, useState } from 'react';

export default (
  targetRef,
  handlers = {},
  options = {
    type: 'touch, pointer',
    tolerance: 10,
  },
  deps = []
) => {
  const observerRef = useRef(null);
  const [isDisable, setDisable] = useState(true);

  const handleSetDisable = data => {
    setDisable(data);
  };

  useEffect(() => {
    observerRef.current = Observer.create({
      target: targetRef.current,
      ...options,
      ...handlers,
    });

    return () => {
      observerRef.current.kill();
    };
  }, []);

  useEffect(() => {
    observerRef.current.enable();

    return () => {
      observerRef.current.disable();
    };
  }, deps);

  return { isDisable, handleSetDisable };
};
