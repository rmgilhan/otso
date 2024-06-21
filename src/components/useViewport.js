import { useState, useEffect } from 'react';

const useViewport = () => {
  const [viewport, setViewport] = useState('unknown');

  useEffect(() => {
    const updateViewport = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setViewport('xs');
      } else if (window.matchMedia("(min-width: 768px) and (max-width: 991px)").matches) {
        setViewport('md');
      } else {
        setViewport('other');
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
};

export default useViewport;
