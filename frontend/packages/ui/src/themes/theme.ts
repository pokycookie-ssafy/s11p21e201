import type { ThemeOptions } from '@mui/material'

import { components } from './components'
import { typography } from './typography'
import { darkPalette, lightPalette } from './palette'
import { color, type IColor } from '../configs/color'

export const lightTheme = (customColor: IColor = color): ThemeOptions => ({
  palette: {
    mode: 'light',
    ...lightPalette(customColor),
  },
  typography,
  components,
})

export const darkTheme = (customColor: IColor = color): ThemeOptions => ({
  palette: {
    mode: 'dark',
    ...darkPalette(customColor),
  },
  typography,
  components,
})
