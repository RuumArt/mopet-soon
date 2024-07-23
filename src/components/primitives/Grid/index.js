'use client';

import clsx from 'clsx';
import * as React from 'react';

import PropTypes from 'prop-types';

import { getClassByKey } from './utils';

import s from './Grid.module.scss';

export const Grid = ({
  className,
  children,
  count = { lg: 12, md: 6, sm: 6 },
}) => {
  const [countClasses] = [getClassByKey(count, 'count')];

  return (
    <div className={clsx(s.root, className, countClasses)}>{children}</div>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  count: PropTypes.object,
};

Grid.displayName = 'Grid';

const GridItem = ({ children, className, column, start, end, order }) => {
  const [startClasses, columnClasses, endClasses, orderClasses] = [
    getClassByKey(start, 'start'),
    getClassByKey(column, 'column'),
    getClassByKey(end, 'end'),
    getClassByKey(order, 'order'),
  ];

  const classes = [
    ...endClasses,
    ...orderClasses,
    ...columnClasses,
    ...startClasses,
  ];

  return <div className={clsx(s.item, className, classes)}>{children}</div>;
};

GridItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  column: PropTypes.object,
};

GridItem.displayName = 'GridItem';

const root = Grid;
const item = GridItem;

export { root, item };
