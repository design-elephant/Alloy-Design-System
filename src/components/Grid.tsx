import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import { cx } from "../utils/cx";
import "./Grid.css";

type SpaceStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
const gapVar = (s: SpaceStep) => `var(--alloy-space-${s})`;

/* ------------------------------- Container ------------------------------- */

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max content width. `full` removes the cap. */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Horizontal padding step (default 7 = 24px). */
  gutter?: SpaceStep;
  /** Vertically pad and center nothing — just constrain width. */
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

const SIZE: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "640px",
  md: "840px",
  lg: "1040px",
  xl: "var(--alloy-container-max)",
  full: "none",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ size = "xl", gutter = 7, as = "div", className, style, ...rest }, ref) {
    const Tag = as;
    return (
      <Tag
        ref={ref as never}
        className={cx("alloy-container", className)}
        style={
          {
            ...style,
            "--_max": SIZE[size],
            "--_gutter": gapVar(gutter),
          } as CSSProperties
        }
        {...rest}
      />
    );
  },
);

/* --------------------------------- Grid --------------------------------- */

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Column count (default 12). */
  columns?: number;
  /** Gap step, or [rowGap, columnGap]. */
  gap?: SpaceStep | [SpaceStep, SpaceStep];
  /** Fold to a single column on narrow viewports (≤600px). */
  collapse?: boolean;
  /** Auto-fit tracks of at least this min width instead of a fixed column count. */
  minColumnWidth?: string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyItems"];
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  {
    columns = 12,
    gap = 6,
    collapse = false,
    minColumnWidth,
    align,
    justify,
    className,
    style,
    ...rest
  },
  ref,
) {
  const [rowGap, colGap] = Array.isArray(gap) ? gap : [gap, gap];
  const template = minColumnWidth
    ? `repeat(auto-fit, minmax(min(${minColumnWidth}, 100%), 1fr))`
    : `repeat(${columns}, minmax(0, 1fr))`;

  return (
    <div
      ref={ref}
      className={cx("alloy-grid", collapse && "alloy-grid--collapsible", className)}
      style={
        {
          ...style,
          "--_cols": String(columns),
          "--_template": template,
          "--_row-gap": gapVar(rowGap),
          "--_col-gap": gapVar(colGap),
          alignItems: align,
          justifyItems: justify,
        } as CSSProperties
      }
      {...rest}
    />
  );
});

/* ------------------------------- GridItem ------------------------------- */

export interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Columns to span (number), or "full". */
  span?: number | "full";
  /** 1-based start line. */
  start?: number;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { span = 1, start, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx("alloy-grid-item", className)}
      style={
        {
          ...style,
          "--_span": span === "full" ? "1 / -1" : `span ${span}`,
          "--_start": start != null ? String(start) : undefined,
        } as CSSProperties
      }
      {...rest}
    />
  );
});
