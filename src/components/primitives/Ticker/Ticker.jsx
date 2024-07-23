import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useIntersectionObserver } from 'hooks/use-intersection-observer';

import useWheel from 'hooks/use-wheel';
import useTouch from 'hooks/use-touch';
import useTicker from 'components/Ticker/useTicker';

import s from './Ticker.module.scss';

const getRepeatArray = count => {
  return new Array(Math.max(1, count)).fill(0).map((el, i) => {
    return { id: `item_${i + 1}`, el: i };
  });
};

const Ticker = ({
  className,
  repeat = 5,
  speed = 5,
  children,
  isScroll,
  autoFill,
}) => {
  const [repeatArr, setRepeatArr] = useState(
    autoFill ? [] : getRepeatArray(repeat)
  );

  const [ref, inView] = useIntersectionObserver({
    triggerOnce: false,
  });

  const [refRail, vars] = useTicker(inView && repeatArr.length > 0, speed);

  const [touchRef] = useTouch({
    onMove: data => {
      vars.delta += data.delta.x;
    },
  });

  useWheel(
    data => {
      vars.delta += data.y;
    },
    isScroll && inView,
    0.5
  );

  const resizeAutofill = () => {
    const railItem = refRail.current.children[0];

    if (railItem) {
      const bounds = railItem.getBoundingClientRect();
      const count = Math.ceil(window.innerWidth / bounds.width) + 1 || 1;
      const repeatArray = getRepeatArray(count === 1 ? repeat : count);
      setRepeatArr(repeatArray);
    }
  };

  useEffect(() => {
    if (autoFill) {
      resizeAutofill();

      window.addEventListener('resize', resizeAutofill);

      return () => {
        window.removeEventListener('resize', resizeAutofill);
      };
    }
  }, [autoFill]);

  return (
    <div
      className={clsx(s.root, className)}
      ref={ref}
    >
      <div
        className={s.rail}
        ref={r => {
          refRail.current = r;
          touchRef.current = r;
        }}
      >
        {repeatArr.length > 0
          ? repeatArr.map((item, i) => (
              <div
                key={item.id}
                className={s.item}
                aria-hidden={i !== 0 ?? undefined}
                data-nosnippet={i !== 0 ? '' : undefined}
              >
                {children}
              </div>
            ))
          : children}
      </div>
    </div>
  );
};

Ticker.propTypes = {
  className: PropTypes.string,
  isScroll: PropTypes.bool,
  autoFill: PropTypes.bool,
};

Ticker.defaultProps = {};

export default Ticker;
