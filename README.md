# Alloy

A React design system built from scratch, tuned for creative-portfolio work.
**Material 3 semantics** — color roles, state layers, elevation, motion — on an
**Orange / warm Grey / Deep Red** palette:

- **Orange** (`primary`) does the accent work — buttons, links, active states, focus rings.
- **Deep red** (`secondary`) is reserved and grounded — "serious" secondary CTAs, emphasis
  text, tags. Never mid-tone bright; never next to primary at equal saturation.
- **True red** (`error`) is a deliberately different hue/saturation than the deep red, so
  validation and destructive actions read as *breaking* the pattern, not part of it.
- **Warm grey + white** (`neutral`) carries the scannability.

Generous rounding, brisk motion. Structured like a standard system.

Zero runtime dependencies. Plain CSS custom properties for theming, plain CSS per
component, typed token accessors for JS.

---

## Install

```bash
npm install @alloy/react
```

```tsx
import { ThemeProvider, Button, TextField } from "@alloy/react";
import "@alloy/react/styles.css"; // ships all component CSS + tokens

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Button variant="filled">Get started</Button>
    </ThemeProvider>
  );
}
```

`ThemeProvider` also imports the base stylesheet, so `styles.css` is optional if
you always render inside a provider.

---

## Design direction

| Concern       | From Material 3                              | How Alloy tunes it                            |
| ------------- | ------------------------------------------- | --------------------------------------------- |
| Color         | Semantic role tokens, tonal palettes, light/dark | Orange `primary`, deep-red `secondary` (reserved/grounded), true-red `error` (distinct hue from secondary), warm grey neutrals. No third brand hue. `success`/`warning` are functional-only |
| Surface       | Surface-container levels, elevation tint     | Flat warm-grey container ramp — the greys carry scanning; no primary tint |
| Shape         | Shape scale (none → full)                   | Generous: `sm` 6 · `md` 10 · `lg` 14 · `xl` 20. Buttons round to `lg`, chips are full pills |
| Elevation     | 6 levels, shadow model                      | Soft, warm, low-alpha shadows; cards default to level 1 |
| Typography    | display / headline / title / body / label roles | One family (Inter); comfortable body leading (14/22, 16/26) for scannability; bold display & headline |
| Interaction   | State-layer overlays (hover .08 / focus .10 / press .10) | Kept — but the layer sits **behind** content (z-index 0) so hover/press tint never lowers foreground contrast. Interactive cards also get a perceptible 1.5px ring, not shadow alone |
| Motion        | Standard / emphasized easing curves         | Brisk durations (80–340ms); springy `emphasized` easing |
| Spacing       | —                                          | 4px grid (2 4 8 12 16 20 24 32 40 48 64 80) |

### Accessibility notes on the current palette

- **`--alloy-sys-primary` is `primary-50` (#E5651B).** White text on it is **3.38:1** —
  below WCAG AA for normal text (ok for large text / non-text UI). Filled orange
  buttons and orange link text are the affected cases. One-line fix if you want AA
  everywhere: point `--alloy-sys-primary` at `--alloy-ref-primary-40` (#C24A0E →
  4.91:1). Dark mode is fine (6.1:1).
- **Dark-mode `--alloy-sys-secondary` is `secondary-60`** (kept deliberately grounded).
  Solid deep-red elements in dark mode land at ~2.9:1 with their on-color — fine for
  the intended uses (emphasis text sitting on a surface, tags, borders) but not for
  filled deep-red buttons in dark mode. Bump to `secondary-70` there if you need it.
- Everything else (neutrals, error, outline, success) passes AA / non-text minimums
  in both themes.

---

## Token architecture

Three layers, all CSS custom properties (see `src/tokens/tokens.css`):

1. **Reference** `--alloy-ref-*` — raw tonal palette values. Never consumed by
   components directly.
2. **System** `--alloy-sys-*` — semantic roles (`primary`, `on-surface`,
   `surface-container-high`, `outline`…). This is what components read. Re-mapped
   per theme.
3. **Scales** `--alloy-space-*`, `--alloy-radius-*`, `--alloy-type-*`,
   `--alloy-elevation-*`, `--alloy-ease-*`, `--alloy-duration-*` — mode
   independent.

### Theming

```html
<div data-alloy-theme="dark">…</div>
```

`data-alloy-theme="light" | "dark"` on any ancestor switches the system layer.
With no attribute set, `prefers-color-scheme` decides. `<ThemeProvider>` manages
this for you and exposes `useTheme()` → `{ mode, resolved, setMode, toggle }`.

### Retheme (brand color)

Override the reference ramp or the system roles at `:root`:

```css
:root {
  --alloy-ref-primary-40: #7c3aed;
  --alloy-ref-primary-80: #d0bcff;
  /* …or go straight for the roles */
  --alloy-sys-primary: #7c3aed;
}
```

### Custom font

```css
:root { --alloy-font-sans: "Uber Move Text", Inter, sans-serif; }
```

### Tokens in JS

```ts
import { color, space, radius, elevation } from "@alloy/react";
// color.primary === "var(--alloy-sys-primary)"
<div style={{ padding: space[5], borderRadius: radius.md }} />
```

---

## Components

| Component      | Key props |
| -------------- | --------- |
| `Button`       | `variant` filled·tonal·outlined·text·elevated·danger · `size` sm·md·lg · `startIcon` · `endIcon` · `loading` · `fullWidth` |
| `IconButton`   | `variant` standard·filled·tonal·outlined · `size` · `selected` (toggle) · `aria-label` (required) |
| `TextField`    | `variant` outlined·filled · `label` · `helperText` · `error` · `startAdornment` · `endAdornment` · `fullWidth` |
| `Checkbox`     | `label` · `indeterminate` + all native `<input>` props |
| `Radio`        | `label` + native props |
| `Switch`       | `label` · `labelPosition` start·end |
| `Chip`         | `variant` assist·filter·input·suggestion · `selected` · `startIcon` · `onRemove` |
| `Card`         | `variant` elevated·filled·outlined · `interactive` · `padding` · `media` (full-bleed slot) · `mediaPosition` |
| `Divider`      | `orientation` · `inset` |
| `Text`         | `role` (15 type roles) · `as` · `color` default·muted·primary·error·inverse |
| `Link`         | `variant` inline·standalone·subtle·quiet · `external` (safe rel + ↗) · `startIcon` · `endIcon` |
| `Breadcrumbs`  | `items` (`{label, href, icon}[]`) · `separator` · `maxItems` (collapse middle) |
| `Table`        | `density` comfortable·compact · `striped` · `hoverable` · `stickyHeader` · `columnBorders`; cells take `data-align="end\|center"` |
| `AspectRatio`  | `ratio` square·video·photo·portrait·wide·golden·number·`"w/h"` — stretches its first child |
| `Image`        | `ratio` · `fit` cover·contain · `radius` · `caption` (→ `<figure>`) · `fallback` · lazy + load shimmer |
| `Container`    | `size` sm·md·lg·xl·full · `gutter` · `as` |
| `Grid`/`GridItem` | `columns` (def 12) · `gap` (step or `[row,col]`) · `collapse` · `minColumnWidth` (auto-fit); item `span` (n or `"full"`) · `start` |
| `Tabs`         | `Tabs` + `Tabs.List` / `Tabs.Tab` / `Tabs.Panel` · `variant` underline·pill · controlled or `defaultValue` · roving tabindex, arrow keys |
| `Dialog`       | `open` · `onClose` · `title` · `description` · `footer` · `size` · `dismissible` · `placement`; focus trap, scroll lock, focus restore, portalled |
| `Popover`      | wraps a trigger element · `content` · `placement` (8, auto-flips) · `offset` · `arrow` · `trapFocus` · `role`; dismiss on outside-click / Esc, portalled |

Portalled surfaces (`Dialog`, `Popover`) render into `<body>` and re-declare the
active theme by reading the first `[data-alloy-theme]` in the document, so tokens
and font carry across the portal.

All interactive components:

- forward refs to the underlying element
- render a keyboard-only focus ring (`:focus-visible`)
- use the Material state-layer model for hover / focus / press — the layer sits
  **behind** content, so hover/press tint never lowers foreground contrast
- respect `prefers-reduced-motion`

### Layout & media tokens

```
--alloy-aspect-{square|video|photo|portrait|wide|golden}
--alloy-grid-columns (12) · --alloy-grid-gutter
--alloy-container-max (1200px) · --alloy-container-pad
```

### Elevation

Levels 1–2 are neutral warm-grey (resting UI: inputs, cards). Levels 3–5 cast a
warm **orange-brown** shadow (lifted UI: menus, dialogs, popovers) so raised
surfaces read as coming from the brand.

---

## Scripts

```bash
npm run dev        # demo / showcase at localhost:5173
npm run build      # dist/index.js (ESM) + dist/style.css + dist/**/*.d.ts
npm run typecheck
```

## Layout

```
src/
  tokens/       tokens.css (the system) + tokens.ts (typed accessors)
  styles/       base.css — reset, focus ring, state-layer helper, type utilities
  components/   one .tsx + one .css per component
  index.ts      barrel
demo/           the showcase app (not published)
```

## Roadmap

Not yet built: `Menu`, `Select`, `Snackbar`, `Tooltip`, `Slider`, `Badge`,
`Progress`, `AppBar`, `Accordion`, `List`. The token layer and interaction
primitives are designed to carry them without change.
