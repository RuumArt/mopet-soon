'use client';

import clsx from 'clsx';

import { Slot } from 'components/Slot';
import { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import { gsap } from 'lib/gsap';
import { useCursor } from 'components/Cursor';
import useVariables from 'hooks/use-variables';

import s from './Magnetic.module.scss';

export const Magnetic = ({ className, children }) => {
  const rootRef = useRef(null);
  const isEnter = useRef(null);

  const { addCallback, removeCallback } = useCursor();

  const vars = useVariables({
    size: {
      w: 0,
      h: 0,
    },
  });

  const onEnterEvent = () => {
    isEnter.current = true;
  };

  const onLeaveEvent = () => {
    if (isEnter.current) {
      isEnter.current = false;

      gsap.to(rootRef.current, {
        x: 0,
        y: 0,
        overwrite: 'auto',
      });
    }
  };

  useEffect(() => {
    const move = data => {
      if (isEnter.current) {
        const { w, h, left, top } = vars.size;

        const dx = (data.x - left) / w - 0.5;
        const dy = (data.y - top) / h - 0.5;

        gsap.to(rootRef.current, {
          x: dx * w * 0.4,
          y: dy * h * 0.4,
        });
      }
    };

    const resize = () => {
      vars.size.w = rootRef.current.clientWidth;
      vars.size.h = rootRef.current.clientHeight;
      vars.size.left = rootRef.current.offsetLeft;
      vars.size.top = rootRef.current.offsetTop;
    };

    resize();

    addCallback(move);
    window.addEventListener('resize', resize);

    return () => {
      removeCallback(move);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <Slot
      ref={rootRef}
      className={clsx(s.root, className)}
      onMouseEnter={onEnterEvent}
      onMouseLeave={onLeaveEvent}
    >
      {children}
    </Slot>
  );
};

Magnetic.propTypes = {
  className: PropTypes.string,
};
