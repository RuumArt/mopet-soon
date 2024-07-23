import * as React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

const Portal = ({ className, id = 'snp-portal', onMount, children }) => {
  const ref = React.useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    let portal;

    const existingPortal = document.getElementById(id);

    if (existingPortal) {
      portal = existingPortal;
    } else {
      portal = document.createElement('div');
      portal.id = id;
      document.body.appendChild(portal);
    }

    portal.className = className ?? '';
    ref.current = portal;
    setIsMounted(true);
  }, [className, id]);

  React.useEffect(() => {
    if (isMounted && onMount) onMount();
  }, [isMounted, onMount]);

  return isMounted && ref.current ? createPortal(children, ref.current) : null;
};

Portal.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onMount: PropTypes.func,
  children: PropTypes.any,
};

Portal.defaultProps = {};

export default Portal;
