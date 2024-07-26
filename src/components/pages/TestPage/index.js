'use client';

import clsx from 'clsx';

import { Image } from 'components/Image';
import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import s from './TestPage.module.scss';

const SETTINGS = [
  {
    id: 's_1',
    prop: 'yPercent',
    value: 10,
  },
  {
    id: 's_2',
    prop: 'xPercent',
    value: 10,
  },
  {
    id: 's_3',
    prop: 'skewX',
    value: 10,
  },
  {
    id: 's_4',
    prop: 'skewY',
    value: 10,
  },
  {
    id: 's_5',
    prop: 'rotation',
    value: 180,
  },
];

export const TestPage = ({ className }) => {
  const [settings, setSettings] = useState([...SETTINGS]);
  const [animationData, setAnimationData] = useState(
    SETTINGS.reduce(
      (obj, item) => Object.assign(obj, { [item.prop]: item.value }),
      {}
    )
  );

  const [ease, setEase] = useState('elastic.out(1, 0.4)');
  const [duration, setDuration] = useState(1);
  const planetRef = useRef(null);

  const handleAnimate = useCallback(() => {
    gsap.killTweensOf(planetRef.current);

    gsap.from(planetRef.current, {
      ...animationData,
      ease,
      duration,
    });

    // gsap.from(planetRef.current, {
    //   yPercent: -150,
    //   rotation: 45,
    //   skewY: '10deg',
    //   skewX: '20deg',
    //   duration: 2,
    //   ease,
    // });
  }, [animationData, ease, duration]);

  const handleChange = e => {
    const { name, value } = e.target;

    setAnimationData(prevState => {
      return {
        ...prevState,
        [name]: parseInt(value),
      };
    });
  };

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.page}>
        <div className={s.form}>
          {settings.map(item => (
            <div className={s.group}>
              <div className={s.label}>{item.prop}</div>
              <input
                type="text"
                name={item.prop}
                onChange={handleChange}
                placeholder={item.value}
                value={animationData[item.prop]}
              />
            </div>
          ))}
          <div className={s.group}>
            <div className={s.label}>Ease</div>
            <input
              type="text"
              onChange={e => {
                setEase(e.target.value);
              }}
              placeholder="elastic.out(1, 0.4)"
              value={ease}
            />
          </div>
          <div className={s.group}>
            <div className={s.label}>Duration</div>
            <input
              type="text"
              onChange={e => {
                setDuration(e.target.value);
              }}
              placeholder="1"
              value={duration}
            />
          </div>
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
