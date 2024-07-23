import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import s from './Play.module.scss';

const Play = ({ className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <span>Play Reel</span>
      <svg
        viewBox="0 0 21 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.147 10.3468L8.31478 16.2349C8.12332 16.3625 7.86462 16.3108 7.73697 16.1194C7.69134 16.0509 7.66699 15.9705 7.66699 15.8882V4.11198C7.66699 3.88185 7.85354 3.69531 8.08366 3.69531C8.16592 3.69531 8.24634 3.71966 8.31478 3.76529L17.147 9.65337C17.3384 9.78104 17.3902 10.0398 17.2625 10.2312C17.232 10.277 17.1927 10.3163 17.147 10.3468Z"
          fill="#FDCE25"
        />
      </svg>
    </div>
  );
};

Play.propTypes = {
  className: PropTypes.string,
};

export default Play;
