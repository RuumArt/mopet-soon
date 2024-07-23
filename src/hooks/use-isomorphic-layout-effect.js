import { useEffect, useLayoutEffect } from 'react';

import { isClient } from 'constants/vars';

export const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;
