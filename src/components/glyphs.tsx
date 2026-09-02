/**
 * Internal structural glyphs — chevron, close, external-link.
 *
 * These are baked into components (Breadcrumbs, Chip, Dialog, Link) and MUST
 * render even when the consumer has not loaded the Material Symbols font, so
 * they are inline SVG rather than <Icon>. Geometry follows Material Symbols
 * Rounded (24px grid, rounded caps). For any user-facing icon, use <Icon>.
 */
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const ChevronRightGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const CloseGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const OpenInNewGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" />
  </svg>
);
