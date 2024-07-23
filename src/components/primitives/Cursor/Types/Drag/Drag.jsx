import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import s from './Drag.module.scss';

const Drag = ({ className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <svg
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.85253 10.3468L12.6847 16.2349C12.8762 16.3625 13.1349 16.3108 13.2626 16.1194C13.3082 16.0509 13.3325 15.9705 13.3325 15.8882V4.11198C13.3325 3.88185 13.146 3.69531 12.9159 3.69531C12.8336 3.69531 12.7532 3.71966 12.6847 3.76529L3.85253 9.65337C3.66111 9.78104 3.60936 10.0398 3.73703 10.2312C3.76753 10.277 3.80678 10.3163 3.85253 10.3468Z"
          fill="#FDCE25"
        />
      </svg>
      <span>Drag</span>
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

Drag.propTypes = {
  className: PropTypes.string,
};

export default Drag;
