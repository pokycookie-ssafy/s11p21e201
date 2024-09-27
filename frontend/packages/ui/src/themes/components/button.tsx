import type { Theme, Components } from '@mui/material'

const MuiButtonBase: Components<Theme>['MuiButtonBase'] = {
  styleOverrides: { root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }) },
}

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    variant: 'contained',
  },
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
    }),
    contained: ({ theme, ownerState }) => {
      const styled = {
        inheritColor: {
          ...(ownerState.color === 'inherit' &&
            !ownerState.disabled &&
            (theme.palette.mode === 'light'
              ? {
                  color: theme.palette.common.white,
                  backgroundColor: theme.palette.grey[800],
                  '&:hover': { backgroundColor: theme.palette.grey[700] },
                }
              : {
                  color: theme.palette.grey[800],
                  backgroundColor: theme.palette.common.white,
                  '&:hover': { backgroundColor: theme.palette.grey[400] },
                })),
        },
      }
      return { ...styled.inheritColor }
    },
  },
}

export const button = { MuiButtonBase, MuiButton }
