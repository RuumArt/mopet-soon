'use client';

import React, { useEffect } from 'react';

import { useAppStore } from 'context/use-app-store';
import { useFoucFix } from 'hooks/use-fouc-fix';
import { gaTrackingId } from 'constants/vars';
import { GAScripts, useAppGA } from 'hooks/use-app-ga';

export const AppHooks = () => {
  if (gaTrackingId) useAppGA();

  useFontsLoaded();
  useFoucFix();

  return gaTrackingId && <GAScripts />;
};

/* APP HOOKS */

const useFontsLoaded = () => {
  useEffect(() => {
    const maxWaitTime = 1500; // tweak this as needed.

    const timeout = window.setTimeout(() => {
      onReady();
    }, maxWaitTime);

    function onReady() {
      window.clearTimeout(timeout);
      useAppStore.setState({ fontsLoaded: true });
      document.documentElement.classList.add('fonts-loaded');
    }

    try {
      document.fonts.ready
        .then(() => {
          onReady();
        })
        .catch(error => {
          console.error(error);
          onReady();
        });
    } catch (error) {
      console.error(error);
      onReady();
    }
  }, []);
};
