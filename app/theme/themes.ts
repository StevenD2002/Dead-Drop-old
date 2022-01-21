import { themeLight, spacing, themeDark, typography, breakpoints } from "."

const theme = { color: themeLight, spacing, typography, breakpoints, radius: spacing[1] }

export type Theme = typeof theme

export const themes = {
  light: { ...theme },
  dark: { ...theme, color: themeDark },
}
