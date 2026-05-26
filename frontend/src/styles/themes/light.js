// light.ts
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

export const lightTheme = {
  // surfaces
  "color-bg": neutral[50],
  "color-bg-alt": neutral[100],

  "color-surface": neutral[0],
  "color-surface-hover": neutral[100],
  "color-elevated": neutral[200],

  // text
  "color-text": neutral[900],
  "color-text-muted": neutral[600],
  "color-text-subtle": neutral[400],

  // borders
  "color-border": neutral[900],
  "color-border-muted": neutral[300],

  // brand
  "color-primary": emerald[700],
  "color-primary-hover": emerald[600],
  "color-primary-active": emerald[800],

  // semantic
  "color-success": emerald[700],
  "color-info": cyan[600],
  "color-warning": amber[600],
  "color-danger": red[600],

  // special accents
  "color-experimental": violet[600],
  "color-highlight": lime[500],

  // states
  "color-focus-ring": emerald[500],
  "color-selection": emerald[200],

  // shadows
  "color-shadow": neutral[900],

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