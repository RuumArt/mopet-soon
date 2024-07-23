'use client';

import * as React from 'react';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

import clsx from 'clsx';
import { getWordsArray } from './utils';
import s from './SplitText.module.scss';

export const SplitText = ({ children, type = 'word', tag: Tag = 'span' }) => {
  const wordsArr = useMemo(() => {
    return getWordsArray(children, type);
  }, [children, type]);

  return (
    <>
      {wordsArr.map((word, idx) => (
        <Tag
          className={clsx(s.word, 'word')}
          key={`word_${idx}`}
        >
          {word?.map((letter, lidx) => (
            <Tag
              className={clsx(s.char, 'char')}
              key={`char_${lidx}`}
            >
              {letter}
            </Tag>
          ))}
        </Tag>
      ))}
    </>
  );
};

SplitText.propTypes = {
  children: PropTypes.any,
  type: PropTypes.oneOf(['char', 'word']),
  tag: PropTypes.oneOf(['div', 'span']),
};
