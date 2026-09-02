import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import "./Card.css";

export type CardVariant = "elevated" | "filled" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Adds hover/press feedback and pointer affordance. */
  interactive?: boolean;
  /** Interior padding step from the spacing scale (default 5 = 16px). */
  padding?: 0 | 3 | 4 | 5 | 6 | 7;
  /**
   * Full-bleed media (typically an <Image> or <AspectRatio>) rendered flush to
   * the card edges, above the content.
   */
  media?: ReactNode;
  /** Where the media sits relative to the content. */
  mediaPosition?: "top" | "bottom";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "elevated",
    interactive = false,
    padding = 5,
    media,
    mediaPosition = "top",
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const mediaNode = media && (
    <div
      className={cx("alloy-card__media", `alloy-card__media--${mediaPosition}`)}
    >
      {media}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cx(
        "alloy-card",
        `alloy-card--${variant}`,
        interactive && "alloy-card--interactive",
        interactive && "alloy-focusable",
        media != null && media !== false && "alloy-card--has-media",
        className,
      )}
      tabIndex={interactive ? 0 : undefined}
      style={{ ...style, ["--_pad" as string]: `var(--alloy-space-${padding})` }}
      {...rest}
    >
      {interactive && <span className="alloy-state-layer" aria-hidden="true" />}
      {mediaPosition === "top" && mediaNode}
      {children != null && <div className="alloy-card__content">{children}</div>}
      {mediaPosition === "bottom" && mediaNode}
    </div>
  );
});
