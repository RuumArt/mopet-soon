'use client';

import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';

import { gsap } from 'lib/gsap';
import { useIsomorphicLayoutEffect } from 'hooks/use-isomorphic-layout-effect';
import { SplitText } from 'components/SplitText';
import clsx from 'clsx';

import { useIntersectionObserver } from 'hooks/use-intersection-observer';
import { composeRefs } from 'utils/composeRefs';

import s from './split-text.module.scss';

export const SplitTextAnimate = forwardRef(
  (
    {
      className,
      children,
      isVisible,
      stagger = 0.02,
      duration = 1,
      delay = 0,
      as: As = 'div',
      type = 'char',
    },
    ref
  ) => {
    const rootRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
      const q = gsap.utils.selector(rootRef.current);
      const letters = q(`.${type}`);

      const yFrom = isVisible ? 101 : 0;
      const yTo = isVisible ? 0 : -101;

      const tween = gsap.fromTo(
        letters,
        {
          yPercent: yFrom,
        },
        {
          yPercent: yTo,
          ease: 'quartInOut',
          stagger,
          duration,
          delay,
          overwrite: 'auto',
        }
      );

      return () => {
        tween.revert();
      };
    }, [isVisible, delay, stagger, duration]);

    return (
      <As
        ref={composeRefs(ref, rootRef)}
        className={clsx(s.root, className)}
      >
        <SplitText type={type}>{children}</SplitText>
      </As>
    );
  }
);

SplitTextAnimate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  isVisible: PropTypes.bool,
  stagger: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'p', 'span', 'div']),
  type: PropTypes.oneOf(['char', 'word']),
};

export const SplitTextAnimateInView = ({ children, ...props }) => {
  const [ref, inView] = useIntersectionObserver();

  return (
    <SplitTextAnimate
      isVisible={inView}
      ref={ref}
      {...props}
    >
      {children}
    </SplitTextAnimate>
  );
};

SplitTextAnimateInView.propTypes = {
  children: PropTypes.any,
};
