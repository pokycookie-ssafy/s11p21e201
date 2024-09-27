import type { Theme, Components } from '@mui/material/styles'

const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      '& .MuiTabs-indicator': {
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.common.white,
      },
      '& .MuiTab-root.Mui-selected': {
        color: theme.palette.text.primary,
        fontWeight: 600,
      },
    }),
  },
}

export const tabs = { MuiTabs }
