import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// import { Observer } from 'gsap/dist/Observer';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { isElement } from 'utils/isElement';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, MorphSVGPlugin);

gsap.ticker.fps(60);
gsap.ticker.lagSmoothing(0);

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const RECIPROCAL_GR = 1 / GOLDEN_RATIO;
const DURATION = RECIPROCAL_GR * 0.8;

gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

gsap.defaults({
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

export { clearProps, DURATION, GOLDEN_RATIO, gsap, ScrollTrigger };
