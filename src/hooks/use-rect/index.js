import { useEffect, useCallback, useRef, useState } from 'react';

import { debounce } from 'utils/debounce';

import emitter from './emitter';

import {
  addParentSticky,
  offsetLeft,
  offsetTop,
  removeParentSticky,
  scrollLeft,
  scrollTop,
} from './utils';

export function useRect({
  ignoreTransform = false,
  ignoreSticky = true,
  debounce: debounceDelay = 0,
  lazy = false,
  callback,
} = {}) {
  const [element, setElement] = useState();
  const rectRef = useRef({});
  const [rect, setRectState] = useState({});

  const setRect = useCallback(
    ({ top, left, width, height, element }) => {
      top = top ?? rectRef.current.top;
      left = left ?? rectRef.current.left;
      width = width ?? rectRef.current.width;
      height = height ?? rectRef.current.height;
      element = element ?? rectRef.current.element;

      if (
        top === rectRef.current.top &&
        left === rectRef.current.left &&
        width === rectRef.current.width &&
        height === rectRef.current.height &&
        element === rectRef.current.element
      )
        return;

      rectRef.current.top = top;
      rectRef.current.y = top;
      rectRef.current.width = width;
      rectRef.current.height = height;
      rectRef.current.left = left;
      rectRef.current.x = left;
      rectRef.current.bottom = top + height;
      rectRef.current.right = left + width;
      rectRef.current.element = element;

      callback?.(rectRef.current);

      if (!lazy) {
        setRectState({ ...rectRef.current });
      }
    },
    [lazy]
  );

  useEffect(() => {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const { width } = rect;
    const { height } = rect;
    setRect({ width, height });

    const onResize = debounce(([entry]) => {
      const width = entry.borderBoxSize[0].inlineSize;
      const height = entry.borderBoxSize[0].blockSize;

      setRect({ width, height });
    }, debounceDelay);

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      onResize.cancel();
    };
  }, [element, debounceDelay, setRect]);

  const [wrapperElement, setWrapperElementRef] = useState();

  const onWrapperResize = useCallback(() => {
    if (!element) return;

    let top;
    let left;

    if (ignoreSticky) removeParentSticky(element);
    if (ignoreTransform) {
      top = offsetTop(element);
      left = offsetLeft(element);
    } else {
      const rect = element.getBoundingClientRect();
      top = rect.top + scrollTop(element);
      left = rect.left + scrollLeft(element);
    }
    if (ignoreSticky) addParentSticky(element);

    setRect({ top, left, element });
  }, [ignoreTransform, ignoreSticky, element, setRect]);

  // resize if body height changes
  useEffect(() => {
    onWrapperResize();
    const debouncedOnWrapperResize = debounce(onWrapperResize, debounceDelay);

    const resizeObserver = new ResizeObserver(debouncedOnWrapperResize);
    resizeObserver.observe(wrapperElement ?? document.body);

    return () => {
      resizeObserver.disconnect();
      debouncedOnWrapperResize.cancel();
    };
  }, [wrapperElement, debounceDelay, onWrapperResize]);

  const onResize = useCallback(() => {
    if (!element) return;
    const elementRect = element.getBoundingClientRect();

    const { width } = elementRect;
    const { height } = elementRect;

    setRect({ width, height });

    onWrapperResize();
  }, [element, onWrapperResize, setRect]);

  useEffect(() => {
    rectRef.current.resize = onResize;

    if (!lazy) {
      setRectState({ ...rectRef.current });
    }

    emitter.on('resize', onResize);

    return () => {
      emitter.off('resize', onResize);
    };
  }, [onResize, lazy]);

  const getRect = useCallback(() => rectRef.current, []);

  return [setElement, lazy ? getRect : rect, setWrapperElementRef];
}

useRect.resize = () => {
  emitter.send('resize');
};
