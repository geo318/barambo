import { useCallback, useEffect, useRef } from 'react';

export const useClickOutSide = <T extends HTMLElement>({ cb }: { cb: () => void }) => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent | TouchEvent): void => {
      if (!ref.current?.contains(e.target as Node)) cb();
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return ref;
};
