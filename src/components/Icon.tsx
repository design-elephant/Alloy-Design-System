import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../utils/cx";
import "./Icon.css";

/**
 * Alloy renders icons with **Material Symbols** (Google's icon set).
 *
 * Load the font once at the app root (see README) — the demo loads the
 * "Rounded" cut:
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200" rel="stylesheet" />
 *
 * `name` is any Material Symbols token, e.g. "search", "favorite", "add",
 * "chevron_right", "close", "open_in_new".
 * Browse: https://fonts.google.com/icons
 */
export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  name: string;
  /** Pixel size (also drives the optical-size axis). Default 20. */
  size?: number;
  /** Weight axis (100–700). Default 400. */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Fill axis — solid vs outline. Default false (outline). */
  fill?: boolean;
  /** Grade axis (-25 to 200) — subtle emphasis. Default 0. */
  grade?: number;
  /** Which Material Symbols cut to use. Default "rounded" (matches Alloy's shapes). */
  variant?: "rounded" | "outlined" | "sharp";
  /** Colour — a token or CSS colour. Default: inherits `currentColor`. */
  color?: string;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  {
    name,
    size = 20,
    weight = 400,
    fill = false,
    grade = 0,
    variant = "rounded",
    color,
    className,
    style,
    "aria-hidden": ariaHidden = true,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden={ariaHidden}
      translate="no"
      className={cx("alloy-icon", `material-symbols-${variant}`, className)}
      style={{
        fontSize: size,
        width: size,
        height: size,
        color,
        // Material Symbols variable-font axes
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${Math.min(48, Math.max(20, size))}`,
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  );
});
