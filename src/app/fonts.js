// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts

import clsx from 'clsx';

import { Montserrat } from 'next/font/google';

const MontserratFont = Montserrat({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--primary-font',
});

export const fonts = { className: clsx(MontserratFont.variable) };
