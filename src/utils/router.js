import { APP_INFO } from 'constants/vars';

/**
 * Checks is link is external or not.
 */

export const checkIsExternal = href => {
  if (!href.startsWith('http://') && !href.startsWith('https://')) return false;
  const url = new URL(href);
  return url.hostname !== APP_INFO.APP_BASE_URL.hostname;
};
