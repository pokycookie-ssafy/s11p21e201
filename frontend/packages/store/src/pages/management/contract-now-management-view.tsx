import type { IContract } from '@/types/contract'
import type { GridColDef } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack, Button, TextField } from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

export default function ContractNowManagementView() {
  const { t } = useTranslate('contract-management')

  const queryFn = async () => {
    const response = await axios.get<IContract[]>(api.contract.list)
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.contract.list], queryFn })

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('field.company_name'), flex: 1, minWidth: 100 },
    { field: 'email', headerName: t('field.email'), width: 200 },
    { field: 'phone', headerName: t('field.phone'), width: 150, resizable: false },
    {
      field: 'createdAt',
      type: 'date',
      headerName: t('field.contract_date'),
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_management')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_management') },
        ]}
        action={
          <Button>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              {t('button.create_contract')}
            </Typography>
          </Button>
        }
      />

      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Stack width={1} direction="row" alignItems="center" spacing={1}>
            <TextField size="small" label="search" fullWidth />
          </Stack>
        </Stack>
        <DataGrid
          columns={columns}
          rows={data}
          checkboxSelection
          hideFooter
          hideFooterPagination
          disableColumnSorting
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isPending}
          slotProps={{
            noRowsOverlay: {},
            noResultsOverlay: {},
          }}
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
