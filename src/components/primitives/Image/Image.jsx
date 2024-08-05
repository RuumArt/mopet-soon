import NextImage from 'next/image';

import React, { useMemo } from 'react';

const IMAGE_SIZES = '(max-width: 1024px) 100vw, 75vw';

import { getModClasses } from 'utils/helpers';

import clsx from 'clsx';

import s from './Image.module.scss';

const imageLoader = ({ src, width }) => {
  switch (width) {
    case 1920:
      return src;
    default:
      const newSrc = src.replace('x4', 'x2');
      return newSrc;
  }
};

export const Image = ({
  className,
  src,
  alt,
  fit = 'cover',
  sizes = IMAGE_SIZES,
  priority = true,
  quality = 100,
  onLoad = () => {},
}) => {
  const mods = getModClasses(s, { fit });

  const widthProps = useMemo(() => {
    if (fit === 'none') {
      return {
        width: 100,
        height: 100,
      };
    }

    return {};
  }, [fit]);

  return (
    <NextImage
      className={clsx(s.root, className, mods)}
      src={src}
      sizes={sizes}
      fill={fit !== 'none'}
      alt={alt || 'alt text not exist'}
      priority={priority}
      quality={quality}
      onLoad={onLoad}
      loader={imageLoader}
      // unoptimized
      {...widthProps}
    />
  );
};
