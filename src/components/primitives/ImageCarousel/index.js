'use client';

import clsx from 'clsx';

import PropTypes from 'prop-types';
import { ScrollControl } from 'components/ScrollControl';
import { Body } from 'components/ImageCarousel/Body';

import s from './ImageCarousel.module.scss';

export const ImageCarousel = ({ className, items }) => {
  return (
    <ScrollControl>
      <div className={clsx(s.root, className)}>
        <Body items={items} />
      </div>
    </ScrollControl>
  );
};

ImageCarousel.propTypes = {
  className: PropTypes.string,
};
