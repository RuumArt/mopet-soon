export const debounce = (fn, wait, callFirst = false) => {
  let timeout = null;
  let debouncedFn = null;

  const clear = function () {
    if (timeout) {
      clearTimeout(timeout);

      debouncedFn = null;
      timeout = null;
    }
  };

  const flush = function () {
    const call = debouncedFn;
    clear();

    if (call) {
      call();
    }
  };

  const debounceWrapper = function () {
    if (!wait) {
      // eslint-disable-next-line prefer-rest-params
      return fn.apply(this, arguments);
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const callNow = callFirst && !timeout;
    clear();

    debouncedFn = function () {
      fn.apply(context, args);
    };

    timeout = setTimeout(function () {
      timeout = null;

      if (!callNow) {
        const call = debouncedFn;
        debouncedFn = null;

        return call();
      }
    }, wait);

    if (callNow) {
      return debouncedFn();
    }
  };

  debounceWrapper.cancel = clear;
  debounceWrapper.flush = flush;

  return debounceWrapper;
};
