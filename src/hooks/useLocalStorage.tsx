import React, { useEffect, useState } from 'react';

const PREFIX = 'ywk-';

const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(prefixedKey);
    if (item === null) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } else {
      return JSON.parse(item);
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
