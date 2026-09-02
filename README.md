# Alloy

A React design system built from scratch, tuned for creative-portfolio work.
**Material 3 semantics** — color roles, state layers, elevation, motion — with
**hot accents on a neutral grey field**:

- **Orange** (`primary`, `#FF540D`) leads — buttons, links, active states, focus rings,
  the first stop of every gradient. `primary/40` for text (AA); the brand hue for chrome.
- **Pink** (`secondary`, `#E80C7A`) is a full peer accent — alternate CTAs, highlights,
  the pink end of the gradient.
- **Pure red** (`error`, `#FF0000`) is the one hot hue kept *out* of the decorative
  palette, so validation and destructive actions read as breaking the pattern.
- **True grey + white** (`neutral`) carries all the structure.
- **Gradients** (`--alloy-gradient-*`) — orange↔pink, for depth on hero / brand
  surfaces. Depth is a gradient job now, not a tinted-shadow job.

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

### Fonts

Alloy uses **Inter** for text and **Material Symbols** for icons. Load both at
the document head (the demo loads the "Rounded" cut of Material Symbols):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=block" rel="stylesheet" />
```

Swap Inter via `--alloy-font-sans`. Icons: `<Icon name="search" />` — any
[Material Symbols](https://fonts.google.com/icons) name, with `size` / `weight` /
`fill` / `grade` axes. Internal structural glyphs (chevron, close, external-link)
are inline SVG so components render even without the icon font loaded.

---

## Design direction

| Concern       | From Material 3                              | How Alloy tunes it                            |
| ------------- | ------------------------------------------- | --------------------------------------------- |
| Color         | Semantic role tokens, tonal palettes, light/dark | Orange `primary` + Pink `secondary` as **peer** accents; pure-red `error` reserved (never decorative); true-grey neutrals. `success`/`warning` functional-only |
| Depth         | Surface tint / elevation tint               | **Gradient tokens** — orange↔pink — do the brand depth; the container ramp and shadows stay pure neutral grey |
| Shape         | Shape scale (none → full)                   | Generous: `sm` 6 · `md` 10 · `lg` 14 · `xl` 20. Buttons round to `lg`, chips are full pills |
| Elevation     | 6 levels, shadow model                      | Clean neutral-grey shadows, 5 levels; cards default to level 1 |
| Typography    | display / headline / title / body / label roles | One family (Inter); comfortable body leading (14/22, 16/26); bold display & headline |
| Interaction   | State-layer overlays (hover .08 / focus .10 / press .10) | Kept — layer sits **behind** content (z-index 0) so hover/press tint never lowers contrast. Interactive cards get a perceptible 1.5px ring, not shadow alone |
| Motion        | Standard / emphasized easing curves         | Brisk durations (80–340ms); springy `emphasized` easing |
| Spacing       | —                                          | 4px grid (2 4 8 12 16 20 24 32 40 48 64 80) |

### Gradients

```
--alloy-gradient-warm          orange → pink   (--alloy-sys-gradient)
--alloy-gradient-warm-reverse  pink → orange   (--alloy-sys-gradient-reverse)
--alloy-gradient-warm-soft     lighter, calmer
--alloy-gradient-warm-vivid    orange · red · pink
--alloy-gradient-depth         ambient two-corner wash for large backgrounds
```

Utilities: `.alloy-gradient`, `.alloy-gradient--reverse/-soft/-vivid/-depth`,
`.alloy-gradient-text` (clips to glyphs). `<Button variant="gradient">` is the
highest-emphasis button.

### Accessibility notes on the current palette

- **`--alloy-sys-primary` (light) is `primary/40` (#B74107)** — white text **5.6:1**, AA ✓.
  The brand orange `#FF540D` (3.2:1 on white) is `primary-bright`, for large-text / chrome only.
- **`--alloy-sys-secondary` (light) is `secondary/40` (#B80063)** — white text **6.5:1**, AA ✓.
  Brand pink `#E80C7A` is `secondary-bright`.
- **Gradient buttons** carry white on a `#FF540D → #E80C7A` field (3.2–4.4:1) — a
  large-text / hero-CTA treatment, below AA for small labels. Use `filled` when the
  label is small.
- Everything else — neutrals, `error`, `link`, `outline`, all filled buttons in both
  themes — passes AA (text) or ≥3:1 (non-text).

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
| `TextField`    | `variant` outlined·filled · `shape` rounded·**pill** (999px; auto for `type="search"`) · `label` · `helperText` · `error` · `startAdornment` · `endAdornment` · `fullWidth` |
| `Icon`         | `name` (Material Symbols) · `size` · `weight` · `fill` · `grade` · `variant` rounded·outlined·sharp · `color` |
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
