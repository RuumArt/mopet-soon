'use client';

import PropTypes from 'prop-types';
import React, {
  useMemo,
  useRef,
  useCallback,
  createContext,
  useEffect,
} from 'react';

export const ResizeContext = createContext({
  addCallback: () => {},
  removeCallback: () => {},
});

const useCurrentResize = () => {
  const context = React.useContext(ResizeContext);

  if (context === undefined) {
    throw new Error('useResize must be used within a ScrollProvider');
  }

  return context;
};

export const useResize = (callback = null, deps = [], priority = 0) => {
  const { addCallback, removeCallback } = useCurrentResize();

  React.useEffect(() => {
    if (!callback || !addCallback || !removeCallback) return;

    addCallback(callback, priority);

    return () => {
      removeCallback(callback);
    };
  }, [addCallback, removeCallback, priority, ...deps]);
};

export const ResizeProvider = ({ children }) => {
  const callbacksRefs = useRef([]);

  const addCallback = useCallback((callback, priority) => {
    callbacksRefs.current.push({ callback, priority });
    callbacksRefs.current.sort((a, b) => a.priority - b.priority);
  }, []);

  const removeCallback = useCallback(callback => {
    callbacksRefs.current = callbacksRefs.current.filter(
      cb => cb.callback !== callback
    );
  }, []);

  const onResize = e => {
    for (let i = 0; i < callbacksRefs.current.length; i += 1) {
      callbacksRefs.current[i].callback(e);
    }
  };

  useEffect(() => {
    onResize(window);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const value = useMemo(() => {
    return {
      addCallback,
      removeCallback,
    };
  }, [addCallback, removeCallback]);

  return (
    <ResizeContext.Provider value={value}>{children}</ResizeContext.Provider>
  );
};

ResizeProvider.propTypes = {
  children: PropTypes.any,
};
