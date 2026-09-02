/**
 * Portalled surfaces (Dialog, Popover, …) render into <body>, outside the
 * ThemeProvider wrapper. This reads the active theme so the portal root can
 * re-declare it and keep the Alloy tokens + font.
 */
export function currentThemeAttr(): "light" | "dark" | undefined {
  if (typeof document === "undefined") return undefined;
  const el = document.querySelector("[data-alloy-theme]");
  const v = el?.getAttribute("data-alloy-theme");
  return v === "light" || v === "dark" ? v : undefined;
}
