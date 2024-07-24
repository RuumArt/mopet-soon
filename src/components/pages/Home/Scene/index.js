'use client';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Image } from 'components/Image';
import { useCursor } from 'components/Cursor';
import { useEffect, useRef } from 'react';
import useVariables from 'hooks/use-variables';
import { clamp } from 'utils/math';

import { gsap } from 'lib/gsap';

import s from './Scene.module.scss';

export const Scene = ({ className, data }) => {
  const rootRef = useRef(null);
  const [catRef] = [useRef(null)];
  const { addCallback, removeCallback } = useCursor();

  const handleCursorUpdate = e => {
    const { x, y } = e;

    const xProgress = clamp(x / (windowSize.w / 2) - 1, -1, 1);
    const yProgress = clamp(y / (windowSize.h / 2) - 1, -1, 1);

    gsap.set(rootRef.current, {
      '--parallax-x': xProgress * 0.5,
      '--parallax-y': yProgress * 0.5,
    });
  };

  const windowSize = useVariables({
    w: 0,
    h: 0,
  });

  const init = () => {
    gsap.to(rootRef.current, {
      '--mask-size': '100%',
      duration: 1,
      ease: 'power4.inOut',
    });
  };

  useEffect(() => {
    init();

    const resize = () => {
      windowSize.h = window.innerHeight;
      windowSize.w = window.innerWidth;
    };

    resize();

    addCallback(handleCursorUpdate);
    window.addEventListener('resize', resize);

    return () => {
      removeCallback(handleCursorUpdate);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={clsx(s.root, className)}
      ref={rootRef}
    >
      <div className={s.bg} />
      <div className={s.content}>
        <div className={s.title}>{data.title}</div>
        <div className={s.text}>{data.text}</div>
      </div>
      <div className={s.main}>
        <div
          className={clsx(s.cat, s.el)}
          ref={catRef}
        >
          <Image src="/images/scene/cat.png" />
        </div>
        <div className={clsx(s.camera, s.el)}>
          <Image src="/images/scene/camera.png" />
        </div>
        <div className={clsx(s.plane, s.el)}>
          <Image src="/images/scene/plane.png" />
        </div>
        <div className={clsx(s.dog, s.el)}>
          <Image src="/images/scene/dog.png" />
        </div>
        <div className={clsx(s.flag, s.el)}>
          <Image src="/images/scene/flag.png" />
        </div>

        <div className={clsx(s.boom, s.el)}>
          <Image src="/images/scene/boom.png" />
        </div>
        <div className={clsx(s.boomShadow, s.el)}>
          <Image src="/images/scene/boom-shadow.png" />
        </div>

        <div className={clsx(s.planet, s.el)}>
          <Image src="/images/scene/earth-blue.png" />
        </div>

        <div className={clsx(s.bottomBg, s.el)} />

        <div className={s.sceneAlt}>
          <div className={s.space}>
            <Image src="/images/scene/space.jpg" />
          </div>
          <div className={clsx(s.moon, s.el)}>
            <Image src="/images/scene/moon.png" />
          </div>
          <div className={clsx(s.earth, s.el)}>
            <Image src="/images/scene/earth.png" />
          </div>

          <div className={clsx(s.shadow, s.el)}>
            <Image src="/images/scene/shadow.png" />
          </div>
          <div className={clsx(s.stars, s.el)}>
            <Image src="/images/scene/stars.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

Scene.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};
