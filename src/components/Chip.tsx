import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { CloseGlyph } from "./glyphs";
import "./Chip.css";

export type ChipVariant = "assist" | "filter" | "input" | "suggestion";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ChipVariant;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  /** Renders a trailing remove affordance and calls this when activated. */
  onRemove?: () => void;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    variant = "assist",
    selected = false,
    disabled = false,
    startIcon,
    onRemove,
    className,
    children,
    onClick,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const interactive = Boolean(onClick) || variant === "filter";
  return (
    <div
      ref={ref}
      role={variant === "filter" ? "button" : undefined}
      aria-pressed={variant === "filter" ? selected : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive && !disabled ? 0 : undefined}
      className={cx(
        "alloy-chip",
        "alloy-focusable",
        `alloy-chip--${variant}`,
        selected && "alloy-chip--selected",
        disabled && "alloy-chip--disabled",
        interactive && "alloy-chip--interactive",
        className,
      )}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (interactive && !disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
        onKeyDown?.(e);
      }}
      {...rest}
    >
      {interactive && <span className="alloy-state-layer" aria-hidden="true" />}
      {selected && variant === "filter" ? (
        <span className="alloy-chip__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
      ) : (
        startIcon && (
          <span className="alloy-chip__icon" aria-hidden="true">
            {startIcon}
          </span>
        )
      )}
      <span className="alloy-chip__label">{children}</span>
      {onRemove && (
        <button
          type="button"
          className="alloy-chip__remove alloy-focusable"
          aria-label="Remove"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <CloseGlyph />
        </button>
      )}
    </div>
  );
});
