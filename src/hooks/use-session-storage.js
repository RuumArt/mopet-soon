import { useSyncExternalStore, useEffect, useCallback } from 'react';

function dispatchStorageEvent(key, newValue) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

const setSessionStorageItem = (key, value) => {
  const stringifiedValue = JSON.stringify(value);
  window.sessionStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeSessionStorageItem = key => {
  window.sessionStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getSessionStorageItem = key => {
  return window.sessionStorage.getItem(key);
};

const useSessionStorageSubscribe = callback => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getSessionStorageServerSnapshot = () => {
  throw Error('useSessionStorage is a client-only hook');
};

export const useSessionStorage = (key, initialValue) => {
  const getSnapshot = () => getSessionStorageItem(key);

  const store = useSyncExternalStore(
    useSessionStorageSubscribe,
    getSnapshot,
    getSessionStorageServerSnapshot
  );

  const setState = useCallback(
    v => {
      try {
        const nextState = typeof v === 'function' ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeSessionStorageItem(key);
        } else {
          setSessionStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (
      getSessionStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setSessionStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
};
