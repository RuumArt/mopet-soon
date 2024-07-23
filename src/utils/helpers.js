import { isClient } from 'constants/vars';

export const is = {
  arr: Array.isArray,
  obj: a => !!a && a.constructor.name === 'Object',
  fun: a => typeof a === 'function',
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === undefined,
};

export const toArray = a => (is.und(a) ? [] : is.arr(a) ? a : [a]);

export const isSSR = () =>
  typeof window === 'undefined' ||
  !window.navigator ||
  /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);

export const getModClasses = (s, mods) => {
  return Object.keys(mods).map(key => {
    const value = mods[key];
    return s[`${key}-${value}`];
  });
};

export const isApiSupported = api => isClient && api in window;
