import { useEffect } from 'react';

export const useToggleBodyScroll = ({ toggle = false }) => {
  useEffect(() => {
    if (toggle) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
    return () => {
      !toggle && document.body.classList.remove('overflow-y-hidden');
    };
  }, [toggle]);
};
