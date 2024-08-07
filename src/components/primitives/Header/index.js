'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Logo } from 'components/Logo';

import { useRouter, usePathname } from 'next/navigation';

import { LangSwitcher } from 'components/LangSwitcher';
import { useAppStore } from 'context/use-app-store';
import s from './Header.module.scss';

export const Header = ({ className, lang }) => {
  const { siteLoad } = useAppStore();

  const router = useRouter();

  const handleSwitchLang = data => {
    router.push(`/${data}`);
  };

  const pathName = usePathname();

  return (
    <div
      className={clsx(s.root, className, {
        [s.isOtherPage]: pathName.includes('morph'),
        [s.isLoad]: siteLoad,
      })}
    >
      <div className={clsx(s.logoWrap, 'logo-wrap')}>
        <Logo className={clsx(s.logo, 'site-logo')} />
      </div>
      <LangSwitcher
        currentLang={lang}
        onClick={handleSwitchLang}
        className={clsx(s.switcher, 'switcher')}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string,
};
