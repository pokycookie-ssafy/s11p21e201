import type { GridColDef, GridRowParams } from '@mui/x-data-grid'

import { Label } from '@/components/label'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

const rows = [
  { id: '1', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '2', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '3', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '4', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '5', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '6', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '7', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '8', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '9', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '10', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '11', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '12', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '13', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '14', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '15', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '16', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '17', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
  { id: '18', name: '낭만뚜쵸', category: '과자', price: 2500, status: 'SOLDOUT' },
]

export default function MenuManagementView() {
  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'category', headerName: '분류' },
    { field: 'price', headerName: '가격' },
    {
      field: 'status',
      headerName: '상태',
      renderCell: (e) => (
        <Stack direction="row" alignItems="center" height={1}>
          <Label>{e.value}</Label>
        </Stack>
      ),
    },
    {
      field: 'action',
      type: 'actions',
      align: 'left',
      getActions: (params: GridRowParams) => [
        <IconButton>
          <Iconify icon="solar:pen-linear" />
        </IconButton>,
        <IconButton>
          <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
        </IconButton>,
      ],
    },
  ]

  return (
    <Box>
      <Card>
        <DataGrid
          columns={columns}
          rows={rows}
          checkboxSelection
          hideFooter
          hideFooterPagination
          disableColumnResize
          disableColumnSorting
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          sx={{
            height: 500,
            '& .MuiDataGrid-columnSeparator': {
              color: 'transparent',
              ':hover': {
                color: (theme) => theme.palette.divider,
              },
            },
            '& .MuiDataGrid-cell:focus-within': { outline: 'none' },
            '& .MuiDataGrid-columnHeader:focus-within': { outline: 'none' },
            '.MuiDataGrid-columnHeaders': {
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        />
      </Card>
    </Box>
  )
}
