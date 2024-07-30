'use client';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Image } from 'components/Image';
import { useCursor } from 'components/Cursor';
import { forwardRef, useCallback, useEffect, useRef } from 'react';
import useVariables from 'hooks/use-variables';

import { gsap } from 'lib/gsap';

import { clamp } from 'utils/math';

import { useDeviceDetect } from 'hooks/use-device-detect';
import { composeRefs } from 'utils/composeRefs';
import s from './Scene.module.scss';

export const Scene = forwardRef(
  ({ className, data, isActive = false }, ref) => {
    const dd = useDeviceDetect();

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

    const handleEnter = useCallback(() => {
      if (!isActive || dd.isTouch) return;

      gsap.to(rootRef.current, {
        '--mask-size': '100%',
        duration: 1,
        ease: 'power4.inOut',
      });
    }, [isActive, dd]);

    // const handleLeave = useCallback(() => {
    //   if (!isActive || dd.isTouch) return;
    //
    //   gsap.to(rootRef.current, {
    //     '--mask-size': '0%',
    //     duration: 1,
    //     ease: 'power4.inOut',
    //   });
    // }, [isActive, dd]);

    useEffect(() => {
      if (isActive) {
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
      }
    }, [isActive]);

    return (
      <div
        className={clsx(s.root, className)}
        ref={composeRefs(rootRef, ref)}
      >
        <div className={s.bg}>
          <div className={clsx(s.pluses, 'pluses')} />
        </div>
        <div className={s.content}>
          <div className={clsx(s.title, 'title')}>{data.title}</div>
          <div className={clsx(s.text, 'text')}>{data.text}</div>
        </div>
        <div className={s.main}>
          <div
            className={clsx(s.cat, s.el, 'cat')}
            ref={catRef}
          >
            <Image src="/images/scene/x4/cat.webp" />
          </div>
          <div className={clsx(s.camera, s.el, 'camera')}>
            <Image src="/images/scene/x4/camera.webp" />
          </div>

          <div
            className={clsx(s.el, s.planeGroup, 'plane')}
            onMouseEnter={handleEnter}
            // onMouseLeave={handleLeave}
          >
            <div className={s.planeGroupInner}>
              <div className={clsx(s.plane, s.el, 'plane')}>
                <Image src="/images/scene/x4/plane.webp" />
              </div>
              <div className={clsx(s.dog, s.el, 'dog')}>
                <Image src="/images/scene/x4/dog.webp" />
              </div>
              <div className={clsx(s.flag, s.el, 'flag')}>
                <Image src="/images/scene/x4/flag.webp" />
              </div>
            </div>

            <div className={clsx(s.planet, s.el, 'planet')}>
              <Image src="/images/scene/x4/planet.webp" />
            </div>

            <div className={s.sceneAlt}>
              <div className={s.space}>
                <Image src="/images/scene/x4/space.webp" />
              </div>

              <div className={clsx(s.earth, s.el)}>
                <Image src="/images/scene/x4/earth.webp" />
              </div>

              <div className={s.moonGroup}>
                <div className={clsx(s.moon, s.el)}>
                  <Image src="/images/scene/x4/moon.webp" />
                </div>
                <div className={clsx(s.dog, s.dogAlt, s.el)}>
                  <Image src="/images/scene/x4/dog.webp" />
                </div>
                <div className={clsx(s.shadow, s.el)}>
                  <Image src="/images/scene/x4/shadow.webp" />
                </div>
                <div className={clsx(s.flag, s.flagAlt, s.el, 'flag')}>
                  <Image src="/images/scene/x4/flag.webp" />
                </div>
              </div>
              <div className={clsx(s.stars, s.el)}>
                <Image src="/images/scene/x4/stars.webp" />
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(s.boomWrap, 'boom')}>
          <div className={clsx(s.boom, s.el)}>
            <Image src="/images/scene/x4/boom.webp" />
          </div>
          <div className={clsx(s.boomShadow, s.el)}>
            <Image src="/images/scene/x4/boom-shadow.webp" />
          </div>
        </div>

        <div className={clsx(s.bottomBg, s.el, 'bottom-bg')} />
      </div>
    );
  }
);

Scene.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};
