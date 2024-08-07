import * as React from 'react';

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

function composeRefs(...refs) {
  return node => refs.forEach(ref => setRef(ref, node));
}

function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}

export { composeRefs, useComposedRefs };
