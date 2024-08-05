'use client';

import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { object, string } from 'prop-types';
import clsx from 'clsx';

import gsap from 'gsap';

import { PageLayout } from 'components/PageLayout';

import { Scene } from 'pages/Home/Scene';

import { getDD } from 'hooks/use-device-detect';

import { useAppStore } from 'context/use-app-store';
import s from './Home.module.scss';

/* TODO: Clear animations */

export const Home = ({ className, data }) => {
  const sceneRef = useRef(null);

  const [maskStart, setMaskStart] = useState(false);

  const { setSiteLoad } = useAppStore();

  useLayoutEffect(() => {
    setSiteLoad(false);
    const dd = getDD();

    const logo = document.querySelector('.site-logo');
    const logoWrap = document.querySelector('.logo-wrap');

    const firstLetter = logo.querySelector('.letter:first-child svg');
    const letters = logo.querySelectorAll('.letter:not(:first-child)');

    const switcher = document.querySelector('.switcher');
    const pluses = document.querySelector('.pluses');
    const bg = pluses.parentNode;

    const bottomBg = document.querySelector('.bottom-bg');
    const cat = document.querySelector('.cat');
    const camera = document.querySelector('.camera');
    const plane = document.querySelector('.plane');
    const flag = document.querySelectorAll('.flag');
    const planet = document.querySelector('.planet');

    const title = document.querySelector('.title');
    const text = document.querySelector('.text');

    const boom = document.querySelector('.boom');
    // const boomShadow = document.querySelector('.boom-shadow');

    const tl = gsap.timeline({
      onComplete: () => {
        setSiteLoad(true);

        gsap.set(logo, {
          clearProps: 'all',
        });

        gsap.set(bottomBg, {
          clearProps: 'all',
        });
      },
    });

    tl.to(firstLetter, {
      x: 0,
      scale: 1,
      ease: 'circ.inOut',
    });

    tl.to(
      letters,
      {
        opacity: 1,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      letters,
      {
        x: '5vw',
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.to(
      logo,
      {
        top: () => {
          const { y, height } = logoWrap.getBoundingClientRect();
          return y + height / 2;
        },
        scale: () => {
          const currentScale = gsap.getProperty(logo, '--scale');
          return 1 / currentScale;
        },
        ease: 'circ.inOut',
      },
      '+=0.2'
    );

    tl.fromTo(
      pluses,
      {
        scale: 2,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
      },
      '<'
    );

    tl.to(
      logo,
      {
        left: () => {
          const { x, width } = logoWrap.getBoundingClientRect();
          return x + width / 2;
        },
        ease: 'circ.inOut',
      },
      '+=0.2'
    );

    tl.to(
      pluses,
      {
        xPercent: -23,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.to(
      bg,
      {
        '--offset': '0%',
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      switcher,
      {
        xPercent: 300,
        ease: 'circ.inOut',
      },
      '-=0.5'
    ).to(
      switcher,
      {
        opacity: 1,
        ease: 'circ.inOut',
      },
      '<'
    );

    /* Scene */

    tl.to(
      pluses,
      {
        '--progress-bg': 1,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      bottomBg,
      {
        opacity: 0,
        yPercent: 90,
        ease: 'circ.inOut',
      },
      '<'
    );

    const catInner = cat.querySelector('img');
    const matrixCat = new DOMMatrixReadOnly(
      window.getComputedStyle(catInner).getPropertyValue('transform')
    );

    tl.from(
      cat,
      {
        scale: 1.5,
        xPercent: -150 * matrixCat.a,
        yPercent: 130,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      camera,
      {
        scale: 1.57,
        opacity: 0,
        xPercent: -40,
        yPercent: 80,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      plane,
      {
        scale: 1.57,
        opacity: 0,
        xPercent: 50,
        yPercent: 50,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.to(flag, {
      rotation: -1,
      ease: 'circ.inOut',
    });

    tl.from(planet, {
      yPercent: -200,
      xPercent: -40,
      rotation: 20,
      skewY: 4,
      skewX: 5,
      duration: 1.9,
      ease: 'elastic.out(1, 0.6)',
    });

    tl.from(
      title,
      {
        opacity: 0,
        xPercent: 10,
        ease: 'circ.inOut',
      },
      '-=1'
    );

    tl.from(
      text,
      {
        opacity: 0,
        yPercent: 10,
        ease: 'circ.inOut',
      },
      '<'
    );

    if (dd.isTouch) {
      tl.to(
        sceneRef.current,
        {
          '--mask-size': '100%',
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {
            setMaskStart(true);
          },
        },
        '<+=2'
      );
    }

    tl.from(boom, {
      xPercent: -100,
      yPercent: 10,
      rotation: -10,
      duration: 2,
      ease: 'circ.out',
    });

    // tl.from(
    //   boomShadow,
    //   {
    //     xPercent: -100,
    //     yPercent: 10,
    //     duration: 2,
    //     ease: 'circ.inOut',
    //   },
    //   '<'
    // );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <PageLayout className={clsx(s.root, className)}>
      <Scene
        data={data}
        isActive
        ref={sceneRef}
        isStartMobileAnimation={maskStart}
      />
      <div className={s.copy}>© 2024 Monpet</div>
    </PageLayout>
  );
};

Home.propTypes = {
  className: string,
  data: object,
};
