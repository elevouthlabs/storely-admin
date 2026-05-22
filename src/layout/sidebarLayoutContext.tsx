import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const DESKTOP_BREAKPOINT = 1024;

type SidebarLayoutContextValue = {
  isOpen: boolean;
  isMobile: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | null>(null);

const getIsMobile = () =>
  typeof window !== "undefined" && window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`).matches;

export const SidebarLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [isOpen, setIsOpen] = useState(() => !getIsMobile());

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${DESKTOP_BREAKPOINT - 1}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      const mobile = event.matches;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const value = useMemo(
    () => ({ isOpen, isMobile, toggle, open, close }),
    [isOpen, isMobile, toggle, open, close],
  );

  return <SidebarLayoutContext.Provider value={value}>{children}</SidebarLayoutContext.Provider>;
};

export const useSidebarLayout = () => {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error("useSidebarLayout must be used within SidebarLayoutProvider");
  }
  return context;
};

/** Optional hook for TopNavbar when rendered outside the provider (should not happen in dashboard). */
export const useSidebarLayoutOptional = () => useContext(SidebarLayoutContext);
