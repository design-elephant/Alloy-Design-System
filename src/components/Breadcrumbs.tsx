import { Fragment, forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Link } from "./Link";
import { ChevronRightGlyph } from "./glyphs";
import "./Breadcrumbs.css";

export interface Crumb {
  label: ReactNode;
  href?: string;
  /** Optional leading icon for this crumb. */
  icon?: ReactNode;
}

export interface BreadcrumbsProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: Crumb[];
  /** Separator between crumbs. Default: a chevron. */
  separator?: ReactNode;
  /** Collapse the middle when there are more than this many crumbs (0 = never). */
  maxItems?: number;
  "aria-label"?: string;
}

const Chevron = <ChevronRightGlyph width={14} height={14} />;

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  function Breadcrumbs(
    {
      items,
      separator = Chevron,
      maxItems = 0,
      className,
      "aria-label": ariaLabel = "Breadcrumb",
      ...rest
    },
    ref,
  ) {
    let display: (Crumb | "ellipsis")[] = items;
    if (maxItems > 0 && items.length > maxItems) {
      display = [items[0], "ellipsis", ...items.slice(-(maxItems - 1))];
    }

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cx("alloy-breadcrumbs", className)}
        {...rest}
      >
        <ol className="alloy-breadcrumbs__list">
          {display.map((crumb, i) => {
            const isLast = i === display.length - 1;
            return (
              <Fragment key={i}>
                <li className="alloy-breadcrumbs__item">
                  {crumb === "ellipsis" ? (
                    <span className="alloy-breadcrumbs__ellipsis" aria-hidden="true">
                      …
                    </span>
                  ) : isLast || !crumb.href ? (
                    <span
                      className="alloy-breadcrumbs__current"
                      aria-current={isLast ? "page" : undefined}
                    >
                      {crumb.icon && (
                        <span className="alloy-breadcrumbs__icon">{crumb.icon}</span>
                      )}
                      {crumb.label}
                    </span>
                  ) : (
                    <Link variant="subtle" href={crumb.href} className="alloy-breadcrumbs__link">
                      {crumb.icon && (
                        <span className="alloy-breadcrumbs__icon">{crumb.icon}</span>
                      )}
                      {crumb.label}
                    </Link>
                  )}
                </li>
                {!isLast && (
                  <li className="alloy-breadcrumbs__sep" aria-hidden="true">
                    {separator}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
    );
  },
);
