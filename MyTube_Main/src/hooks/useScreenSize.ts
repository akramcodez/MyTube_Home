// useScreenSize.ts
import { useState, useEffect } from 'react';

const useScreenSize = (breakpoint: number) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(
    window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isSmallScreen;
};

export default useScreenSize;
