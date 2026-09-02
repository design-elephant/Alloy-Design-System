import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../utils/cx";
import "./Divider.css";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Inset the line from the leading edge (list dividers). */
  inset?: boolean;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = "horizontal", inset = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cx(
        "alloy-divider",
        `alloy-divider--${orientation}`,
        inset && "alloy-divider--inset",
        className,
      )}
      {...rest}
    />
  );
});
