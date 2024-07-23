'use client';

import clsx from 'clsx';

import PropTypes from 'prop-types';
import { useScrollControl } from 'components/ScrollControl';

import gsap from 'gsap';

import useVariables from 'hooks/use-variables';
import { useEffect, useRef } from 'react';
import { lerp, getInfinityPosition } from 'utils/math';

import nextFrame from 'utils/nextFrame';
import s from './Body.module.scss';

export const setTransform = (el, x, y) => {
  gsap.set(el, {
    x,
    y,
  });
};

export const Body = ({ className, items }) => {
  const slidesArr = useRef([]);

  const { addCallback, removeCallback } = useScrollControl();

  const vars = useVariables({
    bounds: items.map(() => {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      };
    }),
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
    railSize: 0,
    viewSize: 0,
  });

  const update = data => {
    if (vars.railSize <= vars.viewSize) return;

    const dt = 1.0 - (1.0 - 0.1) ** gsap.ticker.deltaRatio();

    vars.percents.target.x += data.delta.x;

    vars.percents.current.x = lerp(
      vars.percents.current.x,
      vars.percents.target.x,
      dt * 0.5
    );
  };

  const updatePosition = () => {
    slidesArr.current.forEach((slide, idx) => {
      const { width, x } = vars.bounds[idx];
      const startPosition = x - vars.percents.current.x;

      const currentX = getInfinityPosition(startPosition, vars.railSize, width);

      setTransform(slide, currentX - x, 0);
    });
  };

  const tick = data => {
    update(data);
    updatePosition(data);
  };

  const resize = () => {
    slidesArr.current.forEach((slide, idx) => {
      setTransform(slide, 0, 0);

      const { width, height, x, y } = slide.getBoundingClientRect();

      vars.bounds[idx] = {
        ...vars.bounds[idx],
        width,
        height,
        x,
        y,
      };
    });

    vars.railSize = vars.bounds.reduce((a, b) => {
      return a + b.width;
    }, 0);

    vars.viewSize = window.innerWidth;
  };

  useEffect(() => {
    nextFrame(() => {
      resize();
    });

    addCallback(tick);
    window.addEventListener('resize', resize);

    return () => {
      removeCallback(tick);
      window.removeEventListener('resize', resize);
    };
  });

  return (
    <div className={clsx(s.root, className)}>
      {items.map((item, idx) => (
        <div
          className={s.item}
          key={item.id}
          ref={r => {
            slidesArr.current[idx] = r;
          }}
        >
          <div>{idx}</div>
        </div>
      ))}
    </div>
  );
};

Body.propTypes = {
  className: PropTypes.string,
};
