import { forwardRef, type TableHTMLAttributes } from "react";
import { cx } from "../utils/cx";
import "./Table.css";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  density?: "comfortable" | "compact";
  striped?: boolean;
  /** Row hover highlight (use only when rows are interactive). */
  hoverable?: boolean;
  /** Keep the header visible while the body scrolls. Needs a bounded height on the wrapper. */
  stickyHeader?: boolean;
  /** Vertical column rules. */
  columnBorders?: boolean;
  /** className/style for the scroll container that wraps the table. */
  wrapperClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  {
    density = "comfortable",
    striped = false,
    hoverable = false,
    stickyHeader = false,
    columnBorders = false,
    wrapperClassName,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div className={cx("alloy-table-wrap", wrapperClassName)} role="region" tabIndex={0}>
      <table
        ref={ref}
        className={cx(
          "alloy-table",
          `alloy-table--${density}`,
          striped && "alloy-table--striped",
          hoverable && "alloy-table--hoverable",
          stickyHeader && "alloy-table--sticky",
          columnBorders && "alloy-table--col-borders",
          className,
        )}
        {...rest}
      />
    </div>
  );
});
