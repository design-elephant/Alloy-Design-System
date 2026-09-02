import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx } from "../utils/cx";
import "./Tabs.css";

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
  variant: "underline" | "pill";
  register: (v: string, el: HTMLButtonElement | null) => void;
  focusNext: (from: string, dir: 1 | -1) => void;
}
const Ctx = createContext<TabsCtx | null>(null);
const useTabs = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("Tabs.* must be used inside <Tabs>");
  return c;
};

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "underline" | "pill";
  children: ReactNode;
}

export function Tabs({
  value: controlled,
  defaultValue,
  onChange,
  variant = "underline",
  className,
  children,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const value = controlled ?? uncontrolled;
  const order = useRef<string[]>([]);
  const els = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setValue = useCallback(
    (v: string) => {
      if (controlled == null) setUncontrolled(v);
      onChange?.(v);
    },
    [controlled, onChange],
  );

  const register = useCallback((v: string, el: HTMLButtonElement | null) => {
    if (el) {
      els.current.set(v, el);
      if (!order.current.includes(v)) order.current.push(v);
    } else {
      els.current.delete(v);
      order.current = order.current.filter((x) => x !== v);
    }
  }, []);

  const focusNext = useCallback((from: string, dir: 1 | -1) => {
    const list = order.current;
    const i = list.indexOf(from);
    if (i === -1) return;
    const next = list[(i + dir + list.length) % list.length];
    els.current.get(next)?.focus();
  }, []);

  const ctx = useMemo<TabsCtx>(
    () => ({ value, setValue, baseId, variant, register, focusNext }),
    [value, setValue, baseId, variant, register, focusNext],
  );

  return (
    <Ctx.Provider value={ctx}>
      <div className={cx("alloy-tabs", `alloy-tabs--${variant}`, className)} {...rest}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  "aria-label": string;
}

export function TabList({ className, children, ...rest }: TabListProps) {
  return (
    <div role="tablist" className={cx("alloy-tabs__list", className)} {...rest}>
      {children}
    </div>
  );
}

export interface TabProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "id"> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export function Tab({ value, disabled, icon, className, children, ...rest }: TabProps) {
  const { value: active, setValue, baseId, register, focusNext } = useTabs();
  const selected = active === value;
  const ref = useRef<HTMLButtonElement | null>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusNext(value, 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusNext(value, -1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusNext(value, -1);
    }
    rest.onKeyDown?.(e);
  };

  return (
    <button
      ref={(el) => {
        ref.current = el;
        register(value, el);
      }}
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={cx("alloy-tabs__tab", "alloy-focusable", selected && "is-selected", className)}
      onClick={() => setValue(value)}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <span className="alloy-state-layer" aria-hidden="true" />
      {icon && (
        <span className="alloy-tabs__tab-icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="alloy-tabs__tab-label">{children}</span>
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep mounted (and hidden) when inactive. Default unmounts. */
  keepMounted?: boolean;
}

export function TabPanel({
  value,
  keepMounted = false,
  className,
  children,
  ...rest
}: TabPanelProps) {
  const { value: active, baseId } = useTabs();
  const selected = active === value;
  if (!selected && !keepMounted) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!selected}
      tabIndex={0}
      className={cx("alloy-tabs__panel", "alloy-focusable", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
