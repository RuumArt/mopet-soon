'use client';

import React from 'react';
import { string } from 'prop-types';
import clsx from 'clsx';

import { PageLayout } from 'components/PageLayout';

import { Scene } from 'pages/Home/Scene';

import s from './Home.module.scss';

export const Home = ({ className }) => {
  return (
    <PageLayout className={clsx(s.root, className)}>
      <Scene />
      <div className={s.copy}>© 2024 Monpet</div>
    </PageLayout>
  );
};

Home.propTypes = {
  className: string,
};
