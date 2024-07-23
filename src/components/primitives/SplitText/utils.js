import { each } from 'utils/arrays';

const regexList = {
  word: /\s+/,
  char: '',
};

export const splitter = (children, key = 'word') => {
  if (typeof children !== 'string') return [];

  children.normalize();

  const elements = [];

  each(children.split(regexList[key]), function (splitText, i) {
    elements.push(splitText);
  });

  return elements;
};

export const getWordsArray = (
  children,
  key = 'word',
  preserveWhitespace = true
) => {
  const elements = [];
  const startElements = splitter(children, 'word');

  if (key === 'word') {
    return startElements;
  }

  each(startElements, function (word, i) {
    const chars = splitter(word, 'char', false);

    if (startElements.length - 1 !== i && preserveWhitespace) {
      chars.push(' ');
    }

    elements.push(chars);
  });

  return elements;
};
