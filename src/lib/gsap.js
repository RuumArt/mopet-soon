import { gsap } from 'gsap';

import { CustomEase } from 'gsap/dist/CustomEase';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { Observer } from 'gsap/dist/Observer';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { isElement } from 'utils/isElement';

gsap.registerPlugin(CustomEase, ScrollToPlugin, ScrollTrigger, Observer);

gsap.ticker.fps(60);
gsap.ticker.lagSmoothing(0);

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const RECIPROCAL_GR = 1 / GOLDEN_RATIO;
const DURATION = RECIPROCAL_GR * 0.8;

const ease = CustomEase.create('custom', 'M0,0 C0.30,0.35 0.40,1 1,1');

CustomEase.create('quartIn', '0.5, 0, 0.75, 0');
CustomEase.create('quartOut', '0.25, 1, 0.5, 1');
CustomEase.create('quartInOut', '0.75, 0, 0.25, 1');
CustomEase.create('in1', '0.33, 0, 0.68, 0');
CustomEase.create('out1', '0.33, 1, 0.68, 1');
CustomEase.create('inOut1', '0.65, 0, 0.35, 1');
CustomEase.create('in2', '0.8, 0, 0.6, 0.6');
CustomEase.create('out2', '0.4, 0.4, 0.1, 1');
CustomEase.create('inOut2', '0.8, 0, 0.2, 1');

gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

gsap.defaults({
  ease,
  duration: DURATION,
});

/* Example REGISTER EFFECT */

gsap.registerEffect({
  name: 'fadeIn',
  extendTimeline: true,
  defaults: {
    delay: 0,
    duration: DURATION,
    scale: 1,
    stagger: DURATION / 8,
    y: 30,
  },
  effect: (targets, config) => {
    const tl = gsap.timeline();
    tl.from(targets, {
      autoAlpha: 0,
      delay: config.delay,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scale: config.scale,
      y: config.y,
    });
    return tl;
  },
});

/* Gsap utils */

const isLegible = target => isElement(target);

const clearProps = (target, props = 'all') => {
  let filteredTargets;

  if (Array.isArray(target)) {
    filteredTargets = target.filter(isLegible);
  } else {
    filteredTargets = target;
  }

  return gsap.set(filteredTargets, {
    clearProps: props,
  });
};

export {
  clearProps,
  DURATION,
  GOLDEN_RATIO,
  gsap,
  ScrollTrigger,
  Observer,
  CustomEase,
};
