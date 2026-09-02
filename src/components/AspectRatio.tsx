import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../utils/cx";
import "./AspectRatio.css";

export type Ratio =
  | "square"
  | "video"
  | "photo"
  | "portrait"
  | "wide"
  | "golden"
  | number
  | `${number}/${number}`;

function toCss(ratio: Ratio): string {
  if (typeof ratio === "number") return String(ratio);
  if (typeof ratio === "string" && ratio.includes("/")) return ratio.replace("/", " / ");
  return `var(--alloy-aspect-${ratio})`;
}

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: Ratio;
}

/** Locks its content to a fixed aspect ratio. The first child is stretched to fill. */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = "video", className, style, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cx("alloy-aspect", className)}
        style={{ ...style, ["--_ratio" as string]: toCss(ratio) }}
        {...rest}
      />
    );
  },
);
