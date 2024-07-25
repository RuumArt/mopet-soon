'use client';

import React, { useRef, useEffect, useState } from 'react';
import { object, string } from 'prop-types';
import clsx from 'clsx';

import gsap from 'gsap';

import { PageLayout } from 'components/PageLayout';

import { Scene } from 'pages/Home/Scene';

import s from './Home.module.scss';

export const Home = ({ className, data }) => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
      },
    });

    const logo = document.querySelector('.site-logo');

    const top = gsap.getProperty(logo, '--offset-top', 'vw');
    const left = gsap.getProperty(logo, '--offset-left', 'vw');

    const firstLetter = logo.querySelector('.letter:first-child svg');
    const letters = logo.querySelectorAll('.letter:not(:first-child)');

    const switcher = document.querySelector('.switcher');
    const pluses = document.querySelector('.pluses');
    const bg = pluses.parentNode;

    const bottomBg = document.querySelector('.bottom-bg');
    const cat = document.querySelector('.cat');
    const camera = document.querySelector('.camera');
    const plane = document.querySelector('.plane');
    const flag = document.querySelector('.flag');
    const planet = document.querySelector('.planet');

    const title = document.querySelector('.title');
    const text = document.querySelector('.text');

    const boom = document.querySelector('.boom');
    const boomShadow = document.querySelector('.boom-shadow');

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
        top,
        yPercent: 0,
        scale: 1,
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
        left,
        xPercent: 0,
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

    tl.from(
      bottomBg,
      {
        opacity: 0,
        yPercent: 90,
        ease: 'circ.inOut',
      },
      '<'
    );

    tl.from(
      cat,
      {
        scale: 1.5,
        opacity: 0,
        xPercent: -150,
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
      rotation: -5,
      ease: 'circ.inOut',
    });

    tl.from(planet, {
      yPercent: -150,
      rotation: 45,
      skewY: '10deg',
      skewX: '20deg',
      duration: 2,
      ease: 'elastic.out(1, 0.4)',
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

    tl.from(
      boom,
      {
        xPercent: -100,
        yPercent: 10,
        rotation: -10,
        duration: 2,
        ease: 'circ.out',
      },
      '-=0.5'
    );

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
        isActive={isComplete}
      />
      <div className={s.copy}>© 2024 Monpet</div>
    </PageLayout>
  );
};

Home.propTypes = {
  className: string,
  data: object,
};
