import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import "./Button.css";

export type ButtonVariant =
  | "filled"
  | "tonal"
  | "outlined"
  | "text"
  | "elevated"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Leading icon element (e.g. an SVG). */
  startIcon?: ReactNode;
  /** Trailing icon element. */
  endIcon?: ReactNode;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "filled",
    size = "md",
    startIcon,
    endIcon,
    fullWidth = false,
    loading = false,
    disabled,
    className,
    children,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        "alloy-btn",
        "alloy-focusable",
        `alloy-btn--${variant}`,
        `alloy-btn--${size}`,
        fullWidth && "alloy-btn--full",
        loading && "alloy-btn--loading",
        className,
      )}
      {...rest}
    >
      <span className="alloy-state-layer" aria-hidden="true" />
      {loading && <span className="alloy-btn__spinner" aria-hidden="true" />}
      {startIcon && (
        <span className="alloy-btn__icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      {children != null && <span className="alloy-btn__label">{children}</span>}
      {endIcon && (
        <span className="alloy-btn__icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
});
