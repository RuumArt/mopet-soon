export const VIEWPORTS = {
  DESKTOP: 1025,
  TABLET: 1024,
  MOBILE: 480,
};

export const MEDIA_QUERY = {
  DESKTOP: `(min-width: ${VIEWPORTS.DESKTOP}px)`,
  TABLET: `(max-width: ${VIEWPORTS.TABLET}px) and (min-width: ${VIEWPORTS.MOBILE}px)`,
  MOBILE: `(max-width: ${VIEWPORTS.MOBILE}px)`,
};
