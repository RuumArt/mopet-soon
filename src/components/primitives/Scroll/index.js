'use client';

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export const ScrollContext = React.createContext({
  scroll: null,
  removeCallback: null,
  addCallback: null,
});

const useCurrentScroll = () => {
  const context = React.useContext(ScrollContext);

  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }

  return context;
};

export const useScroll = (callback = null, deps = [], priority = 0) => {
  const { scroll, addCallback, removeCallback } = useCurrentScroll();

  React.useEffect(() => {
    if (!callback || !addCallback || !removeCallback || !scroll) return;

    addCallback(callback, priority);
    callback(scroll);

    return () => {
      removeCallback(callback);
    };
  }, [scroll, addCallback, removeCallback, priority, ...deps]);

  return scroll;
};

export const Scroll = ({ children, root = true, options = {} }) => {
  const [scroll, setScroll] = React.useState(null);
  const pathname = usePathname();

  const callbacksRefs = React.useRef([]);

  const addCallback = React.useCallback((callback, priority) => {
    callbacksRefs.current.push({ callback, priority });
    callbacksRefs.current.sort((a, b) => a.priority - b.priority);
  }, []);

  const removeCallback = React.useCallback(callback => {
    callbacksRefs.current = callbacksRefs.current.filter(
      cb => cb.callback !== callback
    );
  }, []);

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    setScroll(lenis);

    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    ScrollTrigger.refresh();

    const update = time => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  const onScroll = React.useCallback(e => {
    for (let i = 0; i < callbacksRefs.current.length; i += 1) {
      callbacksRefs.current[i].callback(e);
    }
  }, []);

  React.useEffect(() => {
    scroll?.on('scroll', onScroll);

    return () => {
      scroll?.off('scroll', onScroll);
    };
  }, [scroll, onScroll]);

  React.useEffect(() => {
    scroll?.scrollTo(0, { immediate: true });
  }, [pathname]);

  const value = useMemo(() => {
    return {
      scroll,
      addCallback,
      removeCallback,
    };
  }, [scroll, addCallback, removeCallback]);

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};
