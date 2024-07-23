import { Scroll } from 'components/Scroll';
import clsx from 'clsx';

import s from './wrapper.module.scss';

export const Wrapper = ({ children, scrollOptions = {}, className }) => {
  /* TODO: isCustomScroll, выводить или не выводить скролл */
  return (
    <Scroll
      root
      options={scrollOptions}
    >
      <div className={clsx(s.root, className)}>
        <main
          role="main"
          className={s.main}
        >
          {children}
        </main>
      </div>
    </Scroll>
  );
};
