import { forwardRef, useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { AspectRatio, type Ratio } from "./AspectRatio";
import "./Image.css";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Lock the frame to a ratio. Omit to let the image use its intrinsic size. */
  ratio?: Ratio;
  fit?: "cover" | "contain";
  /** Corner rounding token. */
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Wrap in <figure> and render this as <figcaption>. */
  caption?: ReactNode;
  /** Shown if the image fails to load. */
  fallback?: ReactNode;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    ratio,
    fit = "cover",
    radius = "md",
    caption,
    fallback,
    className,
    loading = "lazy",
    decoding = "async",
    alt = "",
    onError,
    onLoad,
    style,
    ...rest
  },
  ref,
) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  const img = (
    <img
      ref={ref}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className="alloy-image__img"
      style={{ objectFit: fit }}
      data-state={state}
      onLoad={(e) => {
        setState("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setState("error");
        onError?.(e);
      }}
      {...rest}
    />
  );

  const frame = (
    <div
      className={cx(
        "alloy-image",
        `alloy-image--radius-${radius}`,
        state === "loading" && "alloy-image--loading",
        !caption && className,
      )}
      style={!caption ? style : undefined}
    >
      {ratio ? <AspectRatio ratio={ratio}>{img}</AspectRatio> : img}
      {state === "error" && (
        <div className="alloy-image__fallback" role="img" aria-label={alt || "Image failed to load"}>
          {fallback ?? (
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 16l5-4 4 3 4-5 5 6" />
            </svg>
          )}
        </div>
      )}
    </div>
  );

  if (!caption) return frame;
  return (
    <figure className={cx("alloy-image-figure", className)} style={style}>
      {frame}
      <figcaption className="alloy-image__caption">{caption}</figcaption>
    </figure>
  );
});
