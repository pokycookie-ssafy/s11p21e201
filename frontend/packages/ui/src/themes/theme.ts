import type { ThemeOptions } from '@mui/material'

import { components } from './components'
import { typography } from './typography'
import { darkPalette, lightPalette } from './palette'

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  typography,
  components,
}

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  typography,
  components,
}
