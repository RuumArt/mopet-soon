import PropTypes from 'prop-types';

import clsx from 'clsx';
import s from './PageLayout.module.scss';

export const metadata = {
  title: 'home',
};

export const PageLayout = ({ children, className }) => {
  return <div className={clsx(s.root, className)}>{children}</div>;
};

PageLayout.propTypes = {
  children: PropTypes.any,
};
