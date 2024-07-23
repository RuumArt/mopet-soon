'use client';

import clsx from 'clsx';

import { gsap } from 'lib/gsap';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDeviceDetect } from 'hooks/use-device-detect';
import { getModClasses } from 'utils/helpers';
import { TYPES } from 'components/Cursor/Types';
import { lerp } from 'utils/math';
import { isPointerType, isTextType } from './utils';

import s from './Cursor.module.scss';

export const CursorContext = createContext({
  setType: null,
});

export const Cursor = ({ children, speed = 0.2 }) => {
  const cursorRef = useRef(null);
  const [type, setType] = useState();

  const callbackRef = useRef([]);

  const addCallback = func => {
    callbackRef.current.push(func);
  };

  const removeCallback = func => {
    callbackRef.current = callbackRef.current.filter(cb => cb !== func);
  };

  const mods = getModClasses(s, { type });
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    if (!cursorRef.current) return;

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const xSet = gsap.quickSetter(cursorRef.current, 'x', 'px');
    const ySet = gsap.quickSetter(cursorRef.current, 'y', 'px');

    function handleMouseMove(e) {
      mouse.x = e.x;
      mouse.y = e.y;

      if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
        if (e.target.dataset.cursor) {
          setType(e.target.dataset.cursor);
          return;
        }

        if (isPointerType(e.target)) {
          setType('pointer');
          return;
        }

        if (isTextType(e.target)) {
          setType('text');
          return;
        }
      }

      setType(undefined);
    }

    const render = () => {
      const dt = 1.0 - (1.0 - speed) ** gsap.ticker.deltaRatio();

      // const distY = mouse.y - pos.y;
      // console.log(distX);
      // const dist = distance([mouse.x, mouse.y], [pos.x, pos.y]);
      // const ease = 0.5 * clamp(1 - dist, 0.1, 1);
      // console.log(ease);

      pos.x = lerp(pos.x, mouse.x, dt);
      pos.y = lerp(pos.y, mouse.y, dt);

      // pos.x += (mouse.x - pos.x) * dt;
      // pos.y += (mouse.y - pos.y) * dt;

      xSet(pos.x);
      ySet(pos.y);

      callbackRef.current.forEach(cb => {
        cb({ x: pos.x, y: pos.y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(render);
    };
  }, [isMobile]);

  const value = useMemo(() => {
    return {
      setType,
      addCallback,
      removeCallback,
    };
  }, [setType]);

  return (
    <>
      {isMobile === false && (
        <div
          className={clsx(s.root, mods)}
          ref={cursorRef}
        >
          <div className={s.inner}>
            {TYPES.map(({ component: Component, key }) => (
              <Component
                key={key}
                className={clsx(s.play, s.typeEl, {
                  [s.active]: type === key,
                })}
              />
            ))}
          </div>
        </div>
      )}
      <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
    </>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);

  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
