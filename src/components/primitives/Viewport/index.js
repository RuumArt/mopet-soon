'use client';

import * as React from 'react';

import PropTypes from 'prop-types';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { isApiSupported } from 'utils/helpers';
import { MEDIA_QUERY, VIEWPORTS } from 'components/Viewport/constants';

const getShortKey = v => {
  return `is${v[0].toUpperCase() + v.slice(1).toLowerCase()}`;
};

const VIEWPORTS_INITIAL = Object.keys(VIEWPORTS).reduce((a, v) => {
  return { ...a, [getShortKey(v)]: false };
}, {});

const ViewportContext = createContext(undefined);

export const ViewportProvider = ({ children }) => {
  const [viewport, setViewport] = useState(VIEWPORTS_INITIAL);

  useEffect(() => {
    if (!isApiSupported('matchMedia')) {
      console.warn('matchMedia is not supported by your current browser');
      return;
    }

    const changeHandler = () => {
      const viewports = VIEWPORTS_INITIAL;

      Object.keys(VIEWPORTS).forEach(viewport => {
        const mediaQueryList = window.matchMedia(MEDIA_QUERY[viewport]);
        viewports[getShortKey(viewport)] = !!mediaQueryList.matches;
      });

      setViewport({ ...viewports });
    };

    changeHandler();

    window.addEventListener('resize', changeHandler);

    return () => {
      window.removeEventListener('resize', changeHandler);
    };
  }, []);

  const providerValue = useMemo(() => {
    return { ...viewport };
  }, [viewport]);

  return (
    <ViewportContext.Provider value={providerValue}>
      {children}
    </ViewportContext.Provider>
  );
};

ViewportProvider.propTypes = {
  children: PropTypes.any,
};

export const useViewport = () => {
  const context = useContext(ViewportContext);

  if (context === undefined) {
    throw new Error('useViewport must be used below a <ViewportProvider>');
  }
  return context;
};
