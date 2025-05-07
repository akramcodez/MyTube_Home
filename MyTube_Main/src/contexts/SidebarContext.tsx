import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSideBarContext(): SidebarContextType {
  const value = useContext(SidebarContext);
  if (value === null) throw new Error('Cannot use outside of SidebarProvider');
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState<boolean>(true);
  const [isSmallOpen, setIsSmallOpen] = useState<boolean>(false);

  function isScreenSmall(): boolean {
    return window.innerWidth < 1024;
  }

  useEffect(() => {
    console.log('useEffect mounted');
    function handleResize(): void {
      const isSmall = isScreenSmall();
      console.log(
        `Resize: isSmall=${isSmall}, isLargeOpen=${isLargeOpen}, isSmallOpen=${isSmallOpen}`,
      );
      if (isSmall) {
        if (isLargeOpen) {
          console.log('Setting isLargeOpen=false');
          setIsLargeOpen(false);
        }
        if (isSmallOpen) {
          console.log('Setting isSmallOpen=false');
          setIsSmallOpen(false);
        }
      } else {
        if (isSmallOpen) {
          console.log('Setting isSmallOpen=false');
          setIsSmallOpen(false);
        }
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggle(): void {
    if (isScreenSmall()) {
      console.log(`Toggle: Small/Medium screen, isSmallOpen=${!isSmallOpen}`);
      setIsSmallOpen((s) => {
        console.log(`Setting isSmallOpen=${!s}`);
        return !s;
      });
      setIsLargeOpen(false);
    } else {
      console.log(`Toggle: Large screen, isLargeOpen=${!isLargeOpen}`);
      setIsLargeOpen((l) => {
        console.log(`Setting isLargeOpen=${!l}`);
        return !l;
      });
      setIsSmallOpen(false);
    }
  }

  function close(): void {
    console.log('Close: Setting isSmallOpen=false, isLargeOpen=false');
    setIsSmallOpen(false);
    setIsLargeOpen(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
