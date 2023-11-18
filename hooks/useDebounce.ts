import { useState, useEffect } from 'react';

export const useDebounce = ({ query = '', delay = 1000 }) => {
  const [debouncedValue, setDebouncedValue] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);

  return debouncedValue;
};