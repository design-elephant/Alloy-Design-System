/**
 * Alloy tokens — typed accessors for the CSS custom properties in tokens.css.
 * Use these in TS/JS (inline styles, JS animation) instead of hardcoding strings.
 */

const cssVar = (name: string) => `var(--alloy-${name})`;

export const color = {
  primary: cssVar("sys-primary"),
  primaryBright: cssVar("sys-primary-bright"),
  onPrimary: cssVar("sys-on-primary"),
  primaryContainer: cssVar("sys-primary-container"),
  onPrimaryContainer: cssVar("sys-on-primary-container"),
  link: cssVar("sys-link"),
  linkVisited: cssVar("sys-link-visited"),
  secondary: cssVar("sys-secondary"),
  secondaryBright: cssVar("sys-secondary-bright"),
  onSecondary: cssVar("sys-on-secondary"),
  secondaryContainer: cssVar("sys-secondary-container"),
  onSecondaryContainer: cssVar("sys-on-secondary-container"),
  error: cssVar("sys-error"),
  onError: cssVar("sys-on-error"),
  errorContainer: cssVar("sys-error-container"),
  onErrorContainer: cssVar("sys-on-error-container"),
  success: cssVar("sys-success"),
  warning: cssVar("sys-warning"),
  background: cssVar("sys-background"),
  onBackground: cssVar("sys-on-background"),
  surface: cssVar("sys-surface"),
  onSurface: cssVar("sys-on-surface"),
  onSurfaceVariant: cssVar("sys-on-surface-variant"),
  surfaceContainerLowest: cssVar("sys-surface-container-lowest"),
  surfaceContainerLow: cssVar("sys-surface-container-low"),
  surfaceContainer: cssVar("sys-surface-container"),
  surfaceContainerHigh: cssVar("sys-surface-container-high"),
  surfaceContainerHighest: cssVar("sys-surface-container-highest"),
  outline: cssVar("sys-outline"),
  outlineVariant: cssVar("sys-outline-variant"),
  inverseSurface: cssVar("sys-inverse-surface"),
  inverseOnSurface: cssVar("sys-inverse-on-surface"),
  scrim: cssVar("sys-scrim"),
} as const;

/** Brand gradients — pink ↔ orange, for depth on hero / brand surfaces. */
export const gradient = {
  /** semantic: pink → orange */
  brand: cssVar("sys-gradient"),
  /** semantic: orange → pink */
  brandReverse: cssVar("sys-gradient-reverse"),
  onBrand: cssVar("sys-on-gradient"),
  warm: cssVar("gradient-warm"),
  warmReverse: cssVar("gradient-warm-reverse"),
  warmSoft: cssVar("gradient-warm-soft"),
  warmVivid: cssVar("gradient-warm-vivid"),
  /** ambient wash for large backgrounds */
  depth: cssVar("gradient-depth"),
} as const;

/** Numeric 4px-grid steps (`space[0]`…`space[12]`). */
export const space = Object.fromEntries(
  Array.from({ length: 13 }, (_, i) => [i, cssVar(`space-${i}`)]),
) as Record<number, string>;

/** T-shirt spacing aliases + component padding pairs (mirrors Figma `spacing/*`). */
export const spacing = {
  none: cssVar("space-none"),
  "4xs": cssVar("space-4xs"),
  "3xs": cssVar("space-3xs"),
  "2xs": cssVar("space-2xs"),
  xs: cssVar("space-xs"),
  sm: cssVar("space-sm"),
  md: cssVar("space-md"),
  lg: cssVar("space-lg"),
  xl: cssVar("space-xl"),
  "2xl": cssVar("space-2xl"),
  "3xl": cssVar("space-3xl"),
  "4xl": cssVar("space-4xl"),
  "5xl": cssVar("space-5xl"),
  inputPaddingX: cssVar("space-input-padding-x"),
  inputPaddingY: cssVar("space-input-padding-y"),
  buttonPaddingX: cssVar("space-button-padding-x"),
  buttonPaddingY: cssVar("space-button-padding-y"),
} as const;

export const radius = {
  none: cssVar("radius-none"),
  xs: cssVar("radius-xs"),
  sm: cssVar("radius-sm"),
  md: cssVar("radius-md"),
  lg: cssVar("radius-lg"),
  xl: cssVar("radius-xl"),
  "2xl": cssVar("radius-2xl"),
  full: cssVar("radius-full"),
} as const;

export const elevation = {
  0: cssVar("elevation-0"),
  1: cssVar("elevation-1"),
  2: cssVar("elevation-2"),
  3: cssVar("elevation-3"),
  4: cssVar("elevation-4"),
  5: cssVar("elevation-5"),
} as const;

export const aspect = {
  square: cssVar("aspect-square"),
  video: cssVar("aspect-video"),
  photo: cssVar("aspect-photo"),
  portrait: cssVar("aspect-portrait"),
  wide: cssVar("aspect-wide"),
  golden: cssVar("aspect-golden"),
} as const;

export const grid = {
  columns: cssVar("grid-columns"),
  gutter: cssVar("grid-gutter"),
  containerMax: cssVar("container-max"),
  containerPad: cssVar("container-pad"),
} as const;

export const typography = {
  displayXl: cssVar("type-display-xl"),
  displayLg: cssVar("type-display-lg"),
  displayMd: cssVar("type-display-md"),
  displaySm: cssVar("type-display-sm"),
  headingXl: cssVar("type-heading-xl"),
  headingLg: cssVar("type-heading-lg"),
  headingMd: cssVar("type-heading-md"),
  headingSm: cssVar("type-heading-sm"),
  headingXs: cssVar("type-heading-xs"),
  /** @deprecated aliases of heading-* — kept for back-compat */
  headlineLg: cssVar("type-headline-lg"),
  headlineMd: cssVar("type-headline-md"),
  headlineSm: cssVar("type-headline-sm"),
  titleLg: cssVar("type-title-lg"),
  titleMd: cssVar("type-title-md"),
  titleSm: cssVar("type-title-sm"),
  bodyXl: cssVar("type-body-xl"),
  bodyLg: cssVar("type-body-lg"),
  bodyMd: cssVar("type-body-md"),
  bodySm: cssVar("type-body-sm"),
  labelLg: cssVar("type-label-lg"),
  labelMd: cssVar("type-label-md"),
  labelSm: cssVar("type-label-sm"),
  captionLg: cssVar("type-caption-lg"),
  captionMd: cssVar("type-caption-md"),
  captionSm: cssVar("type-caption-sm"),
  overline: cssVar("type-overline"),
} as const;

export const motion = {
  easeStandard: cssVar("ease-standard"),
  easeDecelerate: cssVar("ease-decelerate"),
  easeAccelerate: cssVar("ease-accelerate"),
  easeEmphasized: cssVar("ease-emphasized"),
  duration1: cssVar("duration-1"),
  duration2: cssVar("duration-2"),
  duration3: cssVar("duration-3"),
  duration4: cssVar("duration-4"),
  duration5: cssVar("duration-5"),
} as const;

export const state = {
  hover: 0.08,
  focus: 0.1,
  pressed: 0.1,
  dragged: 0.16,
  disabledContent: 0.38,
  disabledContainer: 0.12,
} as const;

export const tokens = {
  color,
  gradient,
  space,
  spacing,
  radius,
  elevation,
  aspect,
  grid,
  typography,
  motion,
  state,
};
export default tokens;
