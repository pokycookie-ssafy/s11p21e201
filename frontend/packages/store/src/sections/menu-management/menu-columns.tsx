import type { TFunction } from 'i18next'
import type { GridColDef } from '@mui/x-data-grid'

import { fNumber } from '@e201/utils'

import { Tooltip, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

export default function menuColumns(t: TFunction<string, undefined>) {
  const columns: GridColDef[] = [
    { field: 'name', headerName: t('field.name'), flex: 1, minWidth: 100 },
    { field: 'category', headerName: t('field.category'), width: 100 },
    {
      field: 'price',
      headerName: t('field.price'),
      type: 'number',
      valueFormatter: (value: number) => `${fNumber(value)}${t('unit.won')}`,
    },
    {
      field: 'action',
      type: 'actions',
      align: 'left',
      getActions: () => [
        <Tooltip title={t('tooltip.edit')} disableInteractive>
          <IconButton>
            <Iconify icon="solar:pen-linear" />
          </IconButton>
        </Tooltip>,
        <Tooltip title={t('tooltip.delete')} disableInteractive>
          <IconButton color="error">
            <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  return columns
}
