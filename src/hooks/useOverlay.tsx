import { useEffect } from 'react';

const useOverlay = (preventBodyScroll: boolean) => {
  // Prevent body scroll
  useEffect(() => {
    if (preventBodyScroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [preventBodyScroll]);
};

export default useOverlay;
