'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { getModClasses } from 'utils/helpers';
import Link from 'next/link';

import s from './Button.module.scss';

export const Button = forwardRef(
  (
    {
      color = 'none',
      size = 'none',
      hover = 'default',
      display = 'inline-block',
      className,
      children,
      href = null,
      onClick,
      data = '',
      locale,
      target,
      isActive,
      preventClick,
      ...props
    },
    ref
  ) => {
    const Element = href ? Link : 'button';

    const mods = getModClasses(s, {
      color,
      size,
      hover,
      display,
    });

    const handleClick = e => {
      if (preventClick) e.preventDefault();
      if (onClick) onClick(data);
    };

    return (
      <Element
        className={clsx(s.root, className, mods)}
        href={href}
        onClick={handleClick}
        locale={locale}
        target={target}
        ref={ref}
        {...props}
      >
        {children}
      </Element>
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'sm', 'md', 'md-alt', 'none']),
  color: PropTypes.oneOf(['primary', 'secondary', 'light', 'none']),
  hover: PropTypes.oneOf(['default', 'underline', 'underline-out']),
  display: PropTypes.oneOf(['block', 'inline-block', 'flex']),
  children: PropTypes.any,
  href: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.any,
  locale: PropTypes.string,
  target: PropTypes.string,
  isActive: PropTypes.bool,
};
