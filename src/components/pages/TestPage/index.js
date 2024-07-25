'use client';

import clsx from 'clsx';

import { Image } from 'components/Image';
import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import s from './TestPage.module.scss';

export const TestPage = ({ className }) => {
  const [ease, setEase] = useState('elastic.out(1, 0.4)');
  const planetRef = useRef(null);

  const handleAnimate = useCallback(() => {
    console.log(ease);
    gsap.killTweensOf(planetRef.current);

    gsap.from(planetRef.current, {
      yPercent: -150,
      rotation: 45,
      skewY: '10deg',
      skewX: '20deg',
      duration: 2,
      ease,
    });
  }, [ease]);

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.page}>
        <div className={s.form}>
          <input
            type="text"
            onChange={e => {
              setEase(e.target.value);
            }}
            placeholder="elastic.out(1, 0.4)"
            value={ease}
          />
          <button
            className={s.btn}
            onClick={handleAnimate}
          >
            Анимировать
          </button>
        </div>
        <div
          className={clsx(s.planet)}
          ref={planetRef}
        >
          <Image src="/images/scene/earth-blue.png" />
        </div>
      </div>
    </div>
  );
};
