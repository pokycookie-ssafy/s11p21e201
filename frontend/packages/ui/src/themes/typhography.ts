import type { Theme } from '@mui/material'
import type { TypographyOptions } from '@mui/material/styles/createTypography'

export const defaultFont = 'suit-variable'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily']
    fontWeightSemiBold: React.CSSProperties['fontWeight']
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily']
    fontWeightSemiBold?: React.CSSProperties['fontWeight']
  }
  interface ThemeVars {
    typography: Theme['typography']
  }
}

export const typography: TypographyOptions = {
  fontFamily: defaultFont,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
}
