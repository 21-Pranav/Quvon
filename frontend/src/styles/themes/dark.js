import { spacing } from "../tokens/spacing";
import { typography } from "../tokens/typography";
import { radius } from "../tokens/radius";
import { borders } from "../tokens/borders";
import { shadow } from "../tokens/shadows";
import { motion, easing } from "../tokens/motion";
import { layout } from "../tokens/layout";

import {
  neutral,
  emerald,
  cyan,
  violet,
  amber,
  red,
  lime,
} from "../tokens/colors";

export const darkTheme = {
  // surfaces
  "color-bg": neutral[900],
  "color-bg-alt": neutral[950],

  "color-surface": neutral[800],
  "color-surface-hover": neutral[700],
  "color-elevated": neutral[700],

  // text
  "color-text": neutral[50],
  "color-text-muted": neutral[300],
  "color-text-subtle": neutral[500],

  // borders
  "color-border": neutral[50],
  "color-border-muted": neutral[600],

  // brand
  "color-primary": emerald[500],
  "color-primary-hover": emerald[400],
  "color-primary-active": emerald[600],

  // semantic
  "color-success": emerald[500],
  "color-info": cyan[400],
  "color-warning": amber[400],
  "color-danger": red[400],

  // special accents
  "color-experimental": violet[400],
  "color-highlight": lime[400],

  // states
  "color-focus-ring": emerald[300],
  "color-selection": emerald[700],

  // shadows
  "color-shadow": "#000000",

  // tokens
  ...spacing,
  ...typography,
  ...radius,
  ...borders,
  ...shadow,
  ...motion,
  ...easing,
  ...layout,
};