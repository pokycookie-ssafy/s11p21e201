import type { Theme, Components } from '@mui/material'
import type {} from '@mui/x-data-grid/themeAugmentation'

const MuiDataGrid: Components<Theme>['MuiDataGrid'] = {
  defaultProps: {
    disableColumnSorting: true,
    disableColumnFilter: true,
    disableColumnMenu: true,
    disableRowSelectionOnClick: true,
  },

  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      '& .MuiDataGrid-columnSeparator': {
        color: 'transparent',
        ':hover': {
          color: theme.palette.divider,
        },
      },
      '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
      '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
      '.MuiDataGrid-columnHeaders': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    }),
  },
}

export const dataGrid = { MuiDataGrid }
