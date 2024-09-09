import { alpha, type TypeAction, type PaletteOptions } from '@mui/material'

import { color } from '../configs/color'

export const baseAction: Partial<TypeAction> = {
  hover: alpha(color.grey[500], 0.08),
  selected: alpha(color.grey[500], 0.16),
  focus: alpha(color.grey[500], 0.24),
  disabled: alpha(color.grey[500], 0.24),
  disabledBackground: alpha(color.grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
}

export const basePalette: PaletteOptions = {
  primary: { ...color.primary },
  secondary: { ...color.secondary },
  success: { ...color.success },
  info: { ...color.info },
  warning: { ...color.warning },
  error: { ...color.error },
  grey: { ...color.grey },
  common: { ...color.common },
  divider: color.grey[500],
}

export const lightPalette: PaletteOptions = {
  ...basePalette,
  text: {
    primary: color.grey[800],
    secondary: color.grey[600],
    disabled: color.grey[500],
  },
  background: {
    paper: '#FFFFFF',
    default: '#FFFFFF',
  },
  action: {
    ...baseAction,
    active: color.grey[600],
  },
}

export const darkPalette: PaletteOptions = {
  ...basePalette,
  text: {
    primary: '#FFFFFF',
    secondary: color.grey[500],
    disabled: color.grey[600],
  },
  background: {
    paper: color.grey[800],
    default: color.grey[900],
  },
  action: {
    ...baseAction,
    active: color.grey[500],
  },
}
