import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";
import { currentThemeAttr } from "../utils/portalTheme";
import { trapFocus } from "../utils/focusTrap";
import "./Popover.css";

export type PopoverPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "right";

export interface PopoverProps {
  children: ReactElement;
  content: ReactNode;
  placement?: PopoverPlacement;
  /** px gap between anchor and panel. */
  offset?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trap Tab focus inside the panel while open (use for menus / rich content). */
  trapFocus?: boolean;
  /** Render an arrow pointing at the anchor. */
  arrow?: boolean;
  className?: string;
  role?: "dialog" | "menu" | "listbox" | "tooltip";
}

interface Pos {
  top: number;
  left: number;
  placement: PopoverPlacement;
}

function compute(
  anchor: DOMRect,
  panel: { width: number; height: number },
  placement: PopoverPlacement,
  offset: number,
): Pos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const [side, align] = placement.split("-") as [string, string | undefined];

  let resolvedSide = side;
  // vertical flip
  if (side === "bottom" && anchor.bottom + offset + panel.height > vh && anchor.top - offset - panel.height > 0)
    resolvedSide = "top";
  if (side === "top" && anchor.top - offset - panel.height < 0 && anchor.bottom + offset + panel.height < vh)
    resolvedSide = "bottom";

  let top = 0;
  let left = 0;
  if (resolvedSide === "bottom") top = anchor.bottom + offset;
  else if (resolvedSide === "top") top = anchor.top - offset - panel.height;
  else if (resolvedSide === "left") left = anchor.left - offset - panel.width;
  else if (resolvedSide === "right") left = anchor.right + offset;

  if (resolvedSide === "top" || resolvedSide === "bottom") {
    if (align === "start") left = anchor.left;
    else if (align === "end") left = anchor.right - panel.width;
    else left = anchor.left + anchor.width / 2 - panel.width / 2;
  } else {
    top = anchor.top + anchor.height / 2 - panel.height / 2;
  }

  // clamp to viewport with an 8px margin
  left = Math.min(Math.max(8, left), vw - panel.width - 8);
  top = Math.min(Math.max(8, top), vh - panel.height - 8);

  return {
    top,
    left,
    placement: (align ? `${resolvedSide}-${align}` : resolvedSide) as PopoverPlacement,
  };
}

export function Popover({
  children,
  content,
  placement = "bottom-start",
  offset = 8,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trapFocus: trap = false,
  arrow = false,
  className,
  role = "dialog",
}: PopoverProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolled;
  const anchorRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const panelId = useId();

  const setOpen = useCallback(
    (v: boolean) => {
      if (controlledOpen == null) setUncontrolled(v);
      onOpenChange?.(v);
    },
    [controlledOpen, onOpenChange],
  );

  const reposition = useCallback(() => {
    const a = anchorRef.current;
    const p = panelRef.current;
    if (!a || !p) return;
    const rect = a.getBoundingClientRect();
    setPos(compute(rect, { width: p.offsetWidth, height: p.offsetHeight }, placement, offset));
  }, [placement, offset]);

  useLayoutEffect(() => {
    if (open) reposition();
  }, [open, reposition, content]);

  useEffect(() => {
    if (!open) return;
    const onScrollResize = () => reposition();
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);

    const onDocDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || anchorRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        anchorRef.current?.focus?.();
      }
    };
    document.addEventListener("mousedown", onDocDown, true);
    document.addEventListener("keydown", onKey, true);

    let untrap: (() => void) | undefined;
    if (trap && panelRef.current) untrap = trapFocus(panelRef.current);

    return () => {
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      document.removeEventListener("mousedown", onDocDown, true);
      document.removeEventListener("keydown", onKey, true);
      untrap?.();
    };
  }, [open, reposition, setOpen, trap]);

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        ref: (node: HTMLElement | null) => {
          anchorRef.current = node;
        },
        "aria-haspopup": role === "tooltip" ? undefined : role,
        "aria-expanded": open,
        "aria-controls": open ? panelId : undefined,
        onClick: (e: unknown) => {
          (children.props as { onClick?: (e: unknown) => void }).onClick?.(e);
          setOpen(!open);
        },
      })
    : children;

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            className={cx("alloy-root", "alloy-popover-layer")}
            data-alloy-theme={currentThemeAttr()}
          >
            <div
              ref={panelRef}
              id={panelId}
              role={role}
              className={cx(
                "alloy-popover",
                pos && `alloy-popover--${pos.placement}`,
                arrow && "alloy-popover--arrow",
                className,
              )}
              style={
                pos
                  ? { top: pos.top, left: pos.left, visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {arrow && <span className="alloy-popover__arrow" aria-hidden="true" />}
              {content}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
