'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Logo } from 'components/Logo';

import { LangSwitcher } from 'components/LangSwitcher';
import s from './Header.module.scss';

export const Header = ({ className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <Logo />
      <LangSwitcher currentLang="Ru" />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};
