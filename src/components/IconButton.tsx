import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import "./IconButton.css";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Accessible name — required, since there is no visible label. */
  "aria-label": string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Toggle appearance for a pressed/selected state. */
  selected?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      variant = "standard",
      size = "md",
      selected,
      className,
      type = "button",
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected != null ? selected : undefined}
        className={cx(
          "alloy-iconbtn",
          "alloy-focusable",
          `alloy-iconbtn--${variant}`,
          `alloy-iconbtn--${size}`,
          selected && "alloy-iconbtn--selected",
          className,
        )}
        {...rest}
      >
        <span className="alloy-state-layer" aria-hidden="true" />
        <span className="alloy-iconbtn__icon" aria-hidden="true">
          {icon}
        </span>
      </button>
    );
  },
);
