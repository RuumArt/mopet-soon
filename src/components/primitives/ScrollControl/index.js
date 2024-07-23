import React, { useEffect, useMemo, useRef } from 'react';

import PropTypes from 'prop-types';

import useWheel from 'hooks/use-wheel';
import useTouch from 'hooks/use-touch';

import { mix } from 'utils/math';
import gsap from 'gsap';

import { Slot } from 'components/Slot';
import { useIntersectionObserver } from 'hooks/use-intersection-observer';
import { composeRefs } from 'utils/compose-refs';

const SCROLL_SPEED = 5;
const LERP_EASE = 0.1;

const ScrollControlContext = React.createContext(null);

export const useScrollControl = () => {
  const context = React.useContext(ScrollControlContext);

  if (context === undefined) {
    throw new Error(
      'useScrollControl must be used within a ScrollControlProvider'
    );
  }
  return context;
};

export const ScrollControl = ({
  children,
  autoPlay,
  lerpEase = LERP_EASE,
  speed = SCROLL_SPEED,
  disabled,
  isWheel = true,
}) => {
  const rootRef = useRef(null);
  const callbackRef = useRef([]);
  const linksRef = useRef([]);

  const [viewRef, inView] = useIntersectionObserver();

  const panTween = useRef(null);
  const panObj = useRef({ progress: 0 });

  const addCallback = func => {
    callbackRef.current.push(func);
  };

  const removeCallback = func => {
    callbackRef.current = callbackRef.current.filter(cb => cb !== func);
  };

  const globalState = useMemo(() => {
    const data = {
      indexes: [0, 0],
      progress: 1,
      percents: {
        target: {
          x: 0,
          y: 0,
        },
        current: {
          x: 0,
          y: 0,
        },
      },
    };

    return data;
  }, []);

  const state = useMemo(() => {
    const data = {
      isAutoplay: autoPlay,
      panMultiplier: 0,
      isSwiping: false,
      direction: {
        x: 'left',
        y: 'down',
      },
      target: {
        x: 0,
        y: 0,
      },
      current: {
        x: 0,
        y: 0,
      },
      last: {
        x: 0,
        y: 0,
      },
      strength: {
        target: 0,
        current: 0,
      },
      scrollSpeed: {
        x: 0,
        y: 0,
      },
      delta: {
        x: 0,
        y: 0,
      },
      percents: {
        target: {
          x: 0,
          y: 0,
        },
        current: {
          x: 0,
          y: 0,
        },
      },
    };

    return data;
  }, [autoPlay]);

  const handleScroll = e => {
    const dir = e.isTouching ? 1 : -1;

    state.target.x -= e.delta.x * dir;
    state.target.y += e.delta.y;
  };

  useWheel(handleScroll, inView && !disabled && isWheel, 0.5);

  const [touchRef] = useTouch(
    {
      onMove: e => {
        if (linksRef.current.length > 0) {
          gsap.set(linksRef.current, {
            pointerEvents: 'none',
          });
        }

        handleScroll(e);
      },
      onDown: () => {
        state.isSwiping = true;
        panTween.current = gsap.to(panObj.current, {
          progress: 0.6,
          onUpdate: () => {
            state.panMultiplier = panObj.current.progress;
          },
        });
      },
      onUp: () => {
        if (linksRef.current.length > 0) {
          gsap.set(linksRef.current, {
            pointerEvents: '',
          });
        }

        state.isSwiping = false;
        panTween.current = gsap.to(panObj.current, {
          progress: 0,
          onUpdate: () => {
            state.panMultiplier = panObj.current.progress;
          },
        });
      },
    },
    inView && !disabled
  );

  useEffect(() => {
    const updateScrollValues = () => {
      if (state.isAutoplay) {
        state.target.y += state.scrollSpeed.y;
        state.target.x += state.scrollSpeed.x;

        if (state.current.x > state.last.x) {
          state.direction.x = 'left';
          state.scrollSpeed.x = speed;
        } else {
          state.direction.x = 'right';
          state.scrollSpeed.x = -speed;
        }

        if (state.current.y > state.last.y) {
          state.direction.y = 'up';
          state.scrollSpeed.y = speed;
        } else {
          state.direction.y = 'down';
          state.scrollSpeed.y = -speed;
        }
      }

      state.delta.x = state.current.x - state.last.x;
      state.delta.y = state.current.y - state.last.y;

      state.strength.target = Math.sqrt(
        state.delta.x * state.delta.x + state.delta.y * state.delta.y
      );

      state.strength.current = mix(
        state.strength.current,
        state.strength.target,
        lerpEase
      );

      state.last.x = state.current.x;
      state.last.y = state.current.y;

      state.current.x = mix(state.current.x, state.target.x, 1);
      state.current.y = mix(state.current.y, state.target.y, 1);

      callbackRef.current.forEach(cb => {
        cb({ ...state, globalState });
      });
    };

    const update = () => {
      updateScrollValues();
    };

    const resize = () => {
      if (rootRef.current) {
        linksRef.current = rootRef.current.querySelectorAll('a, button');
      }
    };

    resize();

    window.addEventListener('resize', resize);
    gsap.ticker.add(update);

    return () => {
      window.removeEventListener('resize', resize);
      gsap.ticker.remove(update);
    };
  }, []);

  const values = useMemo(() => {
    return {
      addCallback,
      removeCallback,
      ...state,
      globalState,
      disabled,
    };
  }, [addCallback, removeCallback, state, disabled, globalState]);

  return (
    <ScrollControlContext.Provider value={values}>
      <Slot ref={composeRefs(rootRef, touchRef, viewRef)}>{children}</Slot>
    </ScrollControlContext.Provider>
  );
};

ScrollControl.propTypes = {
  children: PropTypes.any,
  autoPlay: PropTypes.bool,
};
