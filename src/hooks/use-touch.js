import { useEffect, useRef } from 'react';
import useVariables from 'hooks/use-variables';

export default (
  handlers = {},
  touchSwipeMultiplier = 2.4,
  mouseSwipeMultiplier = 1.8,
  momentumCarry = 0.2
) => {
  const touchRef = useRef();
  const vars = useVariables({
    isTouching: false,
    lastTouch: {
      x: 0,
      y: 0,
    },
    touchMomentum: {
      x: 0,
      y: 0,
    },
    delta: {
      x: 0,
      y: 0,
    },
  });

  const onTouchDown = event => {
    const isTouch = 'touches' in event;

    vars.isTouching = true;

    vars.lastTouch.x = isTouch ? event.touches[0].clientX : event.clientX;
    vars.lastTouch.y = isTouch ? event.touches[0].clientY : event.clientY;

    if (handlers.onDown) handlers.onDown({ ...vars });
  };

  const onTouchUp = () => {
    vars.isTouching = false;

    if (handlers.onUp) handlers.onUp();
  };

  const onTouchMove = event => {
    if (!vars.isTouching) {
      return;
    }

    const isTouch = 'touches' in event;

    const touchX = isTouch ? event.touches[0].clientX : event.clientX;
    const touchY = isTouch ? event.touches[0].clientY : event.clientY;

    const deltaX =
      (touchX - vars.lastTouch.x) *
      (isTouch ? touchSwipeMultiplier : mouseSwipeMultiplier);
    const deltaY =
      (touchY - vars.lastTouch.y) *
      (isTouch ? touchSwipeMultiplier : mouseSwipeMultiplier);

    vars.lastTouch.x = touchX;
    vars.lastTouch.y = touchY;

    vars.touchMomentum.x *= momentumCarry;
    vars.touchMomentum.y *= momentumCarry;

    vars.touchMomentum.y += deltaY;
    vars.touchMomentum.x += deltaX;

    vars.delta.x = deltaX;
    vars.delta.y = deltaY;

    if (handlers.onMove) handlers.onMove({ ...vars, type: 'touch' });
  };

  useEffect(() => {
    const element = touchRef.current ? touchRef.current : window;

    element.addEventListener('mousedown', onTouchDown);
    element.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchUp);

    element.addEventListener('touchstart', onTouchDown);
    element.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);

    return () => {
      element.removeEventListener('mousedown', onTouchDown);
      element.removeEventListener('mousemove', onTouchMove);
      window.removeEventListener('mouseup', onTouchUp);

      element.removeEventListener('touchstart', onTouchDown);
      element.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchUp);
    };
  }, []);

  return [touchRef];
};
