import { alpha, type TypeAction, type PaletteOptions } from '@mui/material'

import type { IColor } from '../configs/color'

export const baseAction = (color: IColor): Partial<TypeAction> => ({
  hover: alpha(color.grey[500], 0.08),
  selected: alpha(color.grey[500], 0.16),
  focus: alpha(color.grey[500], 0.24),
  disabled: alpha(color.grey[500], 0.24),
  disabledBackground: alpha(color.grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
})

export const basePalette = (color: IColor): PaletteOptions => ({
  primary: { ...color.primary },
  secondary: { ...color.secondary },
  success: { ...color.success },
  info: { ...color.info },
  warning: { ...color.warning },
  error: { ...color.error },
  grey: { ...color.grey },
  common: { ...color.common },
  divider: color.grey[500],
})

export const lightPalette = (color: IColor): PaletteOptions => ({
  ...basePalette(color),
  text: {
    primary: color.grey[800],
    secondary: color.grey[600],
    disabled: color.grey[500],
  },
  background: {
    paper: color.grey[200],
    default: '#FFFFFF',
  },
  divider: color.grey[300],
  action: {
    ...baseAction(color),
    active: color.grey[600],
  },
})

export const darkPalette = (color: IColor): PaletteOptions => ({
  ...basePalette(color),
  text: {
    primary: '#FFFFFF',
    secondary: color.grey[500],
    disabled: color.grey[600],
  },
  background: {
    paper: color.grey[700],
    default: color.grey[900],
  },
  divider: color.grey[700],
  action: {
    ...baseAction(color),
    active: color.grey[500],
  },
})
