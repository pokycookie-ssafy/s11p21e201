import { alpha, type Theme, type Components } from '@mui/material/styles'

import { color } from '../../configs/color'

const MuiCard: Components<Theme>['MuiCard'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      boxShadow: `0 0 2px 0 ${alpha(color.grey[700], 0.2)}, 0 12px 24px -4px ${alpha(color.grey[700], 0.12)}`,
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: theme.palette.background.default,
      zIndex: 0,
    }),
  },
}

const MuiCardHeader: Components<Theme>['MuiCardHeader'] = {
  defaultProps: {
    titleTypographyProps: { variant: 'h6' },
    subheaderTypographyProps: { variant: 'body2', marginTop: '4px' },
  },

  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(3, 3, 0),
    }),
  },
}

const MuiCardContent: Components<Theme>['MuiCardContent'] = {
  styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(3) }) },
}

export const card = { MuiCard, MuiCardHeader, MuiCardContent }
