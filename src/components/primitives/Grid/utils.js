import s from 'components/Grid/Grid.module.scss';

export const getClassByKey = (obj, variable = '') => {
  return obj
    ? Object.keys(obj).map(key => {
        return s[`${variable}-${key}-${obj[key]}`];
      })
    : [];
};
