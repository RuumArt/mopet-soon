import * as React from 'react';

export const useIntersectionObserver = options => {
  const ref = React.useRef();
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const elementToObserve = ref.current;
    if (!elementToObserve) return;
    const handleObserve = ([element]) => {
      if (element) {
        setInView(p => {
          if (options && options.triggerOnce && p === true) return p;
          return element.isIntersecting;
        });
      }
    };

    const observer = new IntersectionObserver(handleObserve, options);

    observer.observe(elementToObserve);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, inView];
};
