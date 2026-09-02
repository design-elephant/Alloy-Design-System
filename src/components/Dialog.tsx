import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cx } from "../utils/cx";
import { getFocusable, lockScroll, trapFocus } from "../utils/focusTrap";
import { currentThemeAttr } from "../utils/portalTheme";
import { IconButton } from "./IconButton";
import { CloseGlyph } from "./glyphs";
import "./Dialog.css";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Footer actions row. */
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  /** Allow closing via backdrop click / Escape. Default true. */
  dismissible?: boolean;
  /** Hide the top-right close button. */
  hideCloseButton?: boolean;
  /** Center vertically (default) or dock to the top. */
  placement?: "center" | "top";
  className?: string;
}

const CloseIcon = <CloseGlyph />;

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  dismissible = true,
  hideCloseButton = false,
  placement = "center",
  className,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  const finishClose = useCallback(() => {
    setMounted(false);
    setClosing(false);
  }, []);

  // open/close lifecycle
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const t = setTimeout(finishClose, 180);
      return () => clearTimeout(t);
    }
  }, [open, mounted, finishClose]);

  // focus management + scroll lock + esc + trap, while mounted & open
  useEffect(() => {
    if (!mounted || !open) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    const unlock = lockScroll();
    const panel = panelRef.current!;
    const untrap = trapFocus(panel);

    const focusables = getFocusable(panel);
    (focusables[0] ?? panel).focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissible) {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("keydown", onKey, true);
      untrap();
      unlock();
      returnFocusRef.current?.focus?.();
    };
  }, [mounted, open, dismissible, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cx(
        "alloy-root",
        "alloy-dialog-layer",
        `alloy-dialog-layer--${placement}`,
        closing && "is-closing",
      )}
      data-alloy-theme={currentThemeAttr()}
    >
      <div
        className="alloy-dialog__scrim"
        onClick={dismissible ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx("alloy-dialog", `alloy-dialog--${size}`, className)}
      >
        {(title || !hideCloseButton) && (
          <header className="alloy-dialog__header">
            {title ? (
              <h2 id={titleId} className="alloy-dialog__title">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {!hideCloseButton && (
              <IconButton
                aria-label="Close dialog"
                icon={CloseIcon}
                size="sm"
                onClick={onClose}
                className="alloy-dialog__close"
              />
            )}
          </header>
        )}
        {description && (
          <p id={descId} className="alloy-dialog__description">
            {description}
          </p>
        )}
        {children != null && <div className="alloy-dialog__body">{children}</div>}
        {footer && <footer className="alloy-dialog__footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
