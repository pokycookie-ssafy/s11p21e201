import type { ThemeOptions } from '@mui/material'

import { components } from './components'
import { darkPalette, lightPalette } from './palette'

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  components,
}

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  components,
}
