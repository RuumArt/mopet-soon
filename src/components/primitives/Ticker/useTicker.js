import { useEffect, useRef } from 'react';
import { getInfinityPosition, lerp } from 'utils/math';
import gsap from 'gsap';
import useVariables from 'hooks/use-variables';

export const setTransform = (el, x, y) => {
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

export default (enable, speed) => {
  const refRail = useRef();

  const vars = useVariables({
    isVisibleArr: [],
    children: [],
    delta: 0,
    prevSwipeDelta: [0, 0],
    reilSize: 0,
    viewSize: 0,
    autoSpeed: speed,
    nextSpeed: speed,
    currentPercent: 0,
    targetPercent: 0,
    speed,
  });

  useEffect(() => {
    vars.nextSpeed = speed;
  }, [speed]);

  const handleResize = () => {
    vars.reilSize = refRail.current.getBoundingClientRect().width;
    vars.viewSize = window.innerWidth;

    vars.children = refRail.current.children.map(el => {
      setTransform(el, 0, 0);
      return {
        el,
        isVisible: true,
        defaultSize: el.getBoundingClientRect(),
      };
    });

    vars.children.forEach(child => {
      const x = getInfinityPosition(
        child.defaultSize.x + vars.currentPercent,
        vars.reilSize,
        child.defaultSize.width
      );

      setTransform(child.el, x - child.defaultSize.x, 0);
    });
  };

  const handleUpdate = () => {
    if (vars.reilSize <= vars.viewSize) return;

    const dt = 1.0 - (1.0 - 0.1) ** gsap.ticker.deltaRatio();

    vars.delta -= vars.autoSpeed;
    vars.delta *= 0.5;
    vars.targetPercent += vars.delta;

    vars.autoSpeed = lerp(vars.autoSpeed, vars.nextSpeed, dt * 0.5);

    vars.currentPercent = lerp(
      vars.currentPercent,
      vars.targetPercent,
      dt * 0.5
    );

    vars.children.forEach((child, idx) => {
      const x = getInfinityPosition(
        child.defaultSize.x + vars.currentPercent,
        vars.reilSize,
        child.defaultSize.width
      );

      if (vars.isVisibleArr[idx]) {
        setTransform(child.el, x - child.defaultSize.x, 0);
      }

      vars.isVisibleArr[idx] =
        x + child.defaultSize.width * 2 > 0 && x < vars.viewSize;
    });

    vars.isResize = false;
  };

  useEffect(() => {
    if (enable) {
      vars.querySelector = gsap.utils.selector(refRail.current);
      gsap.ticker.add(handleUpdate);

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        vars.targetPercent = vars.currentPercent;
        gsap.ticker.remove(handleUpdate);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [enable]);

  return [refRail, vars, handleUpdate, handleResize];
};
