import { createElement, forwardRef, type HTMLAttributes } from "react";
import { cx } from "../utils/cx";

export type TextRole =
  | "display-lg" | "display-md" | "display-sm"
  | "headline-lg" | "headline-md" | "headline-sm"
  | "title-lg" | "title-md" | "title-sm"
  | "body-lg" | "body-md" | "body-sm"
  | "label-lg" | "label-md" | "label-sm";

const defaultTag: Record<TextRole, string> = {
  "display-lg": "h1", "display-md": "h1", "display-sm": "h2",
  "headline-lg": "h2", "headline-md": "h3", "headline-sm": "h4",
  "title-lg": "h5", "title-md": "h6", "title-sm": "p",
  "body-lg": "p", "body-md": "p", "body-sm": "p",
  "label-lg": "span", "label-md": "span", "label-sm": "span",
};

export interface TextProps extends HTMLAttributes<HTMLElement> {
  role?: TextRole;
  as?: keyof JSX.IntrinsicElements;
  /** Semantic colour role. */
  color?: "default" | "muted" | "primary" | "error" | "inverse";
}

const colorClass: Record<NonNullable<TextProps["color"]>, string> = {
  default: "",
  muted: "alloy-text--muted",
  primary: "alloy-text--primary",
  error: "alloy-text--error",
  inverse: "alloy-text--inverse",
};

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { role = "body-md", as, color = "default", className, ...rest },
  ref,
) {
  const tag = as ?? (defaultTag[role] as keyof JSX.IntrinsicElements);
  return createElement(tag, {
    ref,
    className: cx(`alloy-${role}`, colorClass[color], "alloy-text", className),
    ...rest,
  });
});
