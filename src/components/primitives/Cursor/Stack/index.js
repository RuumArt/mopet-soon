'use client';

import clsx from 'clsx';

import PropTypes from 'prop-types';

import { Slot } from 'components/Slot';
import s from './Stack.module.scss';

export const Stack = ({ className }) => {
  return <Slot className={clsx(s.root, className)} />;
};

Stack.propTypes = {
  className: PropTypes.string,
};
