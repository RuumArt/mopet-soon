'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import { Logo } from 'components/Logo';

import { useRouter } from 'next/navigation';

import { LangSwitcher } from 'components/LangSwitcher';
import s from './Header.module.scss';

export const Header = ({ className, lang }) => {
  const router = useRouter();

  const handleSwitchLang = data => {
    console.log(data);
    router.push(`/${data}`);
  };
  return (
    <div className={clsx(s.root, className)}>
      <Logo />
      <LangSwitcher
        currentLang={lang}
        onClick={handleSwitchLang}
      />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string,
};
