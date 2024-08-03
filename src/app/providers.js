'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { Cursor } from 'components/Cursor';
import { RealViewportProvider } from 'components/RealViewport';
import { ViewportProvider } from 'components/Viewport';
import { TransitionLayout } from 'components/TransitionLayout';
import { ResizeProvider } from 'providers/Resize';

export const Providers = ({ children }) => {
  return (
    <ViewportProvider>
      <ResizeProvider>
        <RealViewportProvider>
          <Cursor>
            <TransitionLayout>{children}</TransitionLayout>
          </Cursor>
        </RealViewportProvider>
      </ResizeProvider>
    </ViewportProvider>
  );
};

Providers.propTypes = {
  children: PropTypes.any,
};
