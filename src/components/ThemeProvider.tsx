import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import "../styles/base.css";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  mode: ThemeMode;
  /** Resolved theme after applying "system". */
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

function systemPrefersDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
  /** When set, writes `data-alloy-theme` onto this element instead of a wrapper div. */
  scope?: "root" | "wrapper";
  className?: string;
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  scope = "wrapper",
  className,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: "light" | "dark" =
    mode === "system" ? (systemDark ? "dark" : "light") : mode;

  useEffect(() => {
    if (scope !== "root") return;
    const el = document.documentElement;
    el.setAttribute("data-alloy-theme", resolved);
    return () => el.removeAttribute("data-alloy-theme");
  }, [scope, resolved]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolved,
      setMode,
      toggle: () => setMode(resolved === "dark" ? "light" : "dark"),
    }),
    [mode, resolved],
  );

  return (
    <ThemeContext.Provider value={value}>
      {scope === "wrapper" ? (
        <div
          className={className ? `alloy-root ${className}` : "alloy-root"}
          data-alloy-theme={resolved}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}
