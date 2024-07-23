'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Button } from 'components/Button';
import s from './LangSwitcher.module.scss';

export const LangSwitcher = ({ className, currentLang = 'en' }) => {
  return (
    <Button
      className={clsx(s.root, className)}
      size="md"
      color="primary"
    >
      <span>{currentLang}</span>

      <svg
        viewBox="0 0 58 47"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_b_373_6381)">
          <path
            d="M9.42183 43.5661C6.6639 42.1609 4.42162 39.9186 3.01638 37.1607C-0.517092 30.2258 -0.519873 16.4929 3.01638 9.55266C4.42162 6.79472 6.66389 4.55244 9.42183 3.1472C17.844 -1.14409 40.535 -0.951776 48.5797 3.1472C51.3377 4.55244 53.5799 6.79472 54.9852 9.55266C58.5214 16.4929 58.5187 30.2258 54.9852 37.1607C53.5799 39.9186 51.3377 42.1609 48.5797 43.5661C40.1576 47.8574 17.4665 47.6651 9.42183 43.5661Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_b_373_6381"
            x="-99.6348"
            y="-100"
            width="257.271"
            height="246.713"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            />
            <feGaussianBlur
              in="BackgroundImageFix"
              stdDeviation="50"
            />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_373_6381"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_373_6381"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Button>
  );
};

LangSwitcher.propTypes = {
  className: PropTypes.string,
};
