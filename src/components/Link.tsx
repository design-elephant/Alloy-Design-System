import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { OpenInNewGlyph } from "./glyphs";
import "./Link.css";

export type LinkVariant = "standalone" | "inline" | "subtle" | "quiet";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * - `inline` — underlined, for links inside a paragraph
   * - `standalone` — no underline until hover, for nav / standalone links
   * - `subtle` — inherits text color, underline on hover (breadcrumbs, footers)
   * - `quiet` — like subtle but no underline ever (use sparingly)
   */
  variant?: LinkVariant;
  /** Renders an ↗ affordance and sets safe rel/target for external links. */
  external?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    variant = "inline",
    external = false,
    startIcon,
    endIcon,
    className,
    children,
    target,
    rel,
    ...rest
  },
  ref,
) {
  return (
    <a
      ref={ref}
      className={cx("alloy-link", "alloy-focusable", `alloy-link--${variant}`, className)}
      target={external ? target ?? "_blank" : target}
      rel={external ? rel ?? "noopener noreferrer" : rel}
      {...rest}
    >
      {startIcon && (
        <span className="alloy-link__icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      <span className="alloy-link__label">{children}</span>
      {endIcon && (
        <span className="alloy-link__icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
      {external && <OpenInNewGlyph className="alloy-link__ext" />}
    </a>
  );
});
