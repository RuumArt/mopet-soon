import React, { forwardRef, useEffect, useId, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { gsap } from 'lib/gsap';

import { Slot } from 'components/Slot';
import useValueUpdate from 'hooks/use-value-update';

import { useIntersectionObserver } from 'hooks/use-intersection-observer';
import { composeRefs } from 'utils/composeRefs';
import { ANIMATES } from './animates';

export const Animate = forwardRef(
  (
    {
      isVisible,
      isClearProps = true,
      data = {
        set: {
          opacity: 0,
        },
        in: {
          opacity: 1,
        },
        out: {
          opacity: 0,
        },
      },
      delay = 0,
      duration = 1,
      children,
      onComplete,
      onStart,
      animateOnMount,
    },
    ref
  ) => {
    const id = useId();
    const rootRef = useRef(null);
    const tween = useRef(null);

    const animate = useMemo(() => {
      return typeof data === 'string' ? ANIMATES[data] : data;
    }, [data]);

    const doAnimate = (isAnimate, animate) => {
      const dir = isAnimate ? 'in' : 'out';

      const animateProps = {
        ...animate[dir],
      };

      tween.current = gsap.to(rootRef.current, {
        id,
        ...animateProps,
        delay,
        duration,
        overwrite: 'auto',
        onStart,
        onComplete: () => {
          if (onComplete) onComplete(rootRef.current);

          if (isClearProps) {
            gsap.set(rootRef.current, {
              clearProps: 'all',
            });
          }
        },
      });
    };

    useValueUpdate(() => {
      doAnimate(isVisible, animate);
    }, isVisible);

    useEffect(() => {
      const animated = animateOnMount || isVisible;

      if (animated) {
        doAnimate(animated, animate);
      }

      return () => {
        gsap.getById(id)?.revert();
      };
    }, []);

    return (
      <Slot
        ref={composeRefs(ref, rootRef)}
        style={{
          ...animate.set,
        }}
      >
        {children}
      </Slot>
    );
  }
);

Animate.propTypes = {
  children: PropTypes.any,
  isVisible: PropTypes.bool,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      in: PropTypes.object.isRequired,
      out: PropTypes.object.isRequired,
    }),
  ]),
  isClearProps: PropTypes.bool,
  animateOnMount: PropTypes.bool,
  onComplete: PropTypes.func,
  onStart: PropTypes.func,
};

export const AnimateInView = ({ children, threshold = 0, ...props }) => {
  const [ref, inView] = useIntersectionObserver({
    triggerOnce: true,
    threshold,
  });

  return (
    <Animate
      ref={ref}
      isVisible={inView}
      {...props}
    >
      {children}
    </Animate>
  );
};
