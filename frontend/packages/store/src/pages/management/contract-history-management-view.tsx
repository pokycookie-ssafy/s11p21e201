import type { GridColDef } from '@mui/x-data-grid'
import type { IContractHistory } from '@/types/contract'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { Label } from '@/components/label'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, TextField } from '@mui/material'

type StatusType = 'in' | 'success' | 'reject'

export default function ContractHistoryManagementView() {
  const { t } = useTranslate('contract-management')

  const [tab, setTab] = useState<StatusType | null>(null)

  const queryFn = async () => {
    const response = await axios.get<IContractHistory[]>(api.contract.history)
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.contract.history], queryFn })

  const TABS = [
    { label: t('tab.all'), value: null },
    { label: t('tab.in_progress'), value: 'in' },
    { label: t('tab.success'), value: 'success' },
    { label: t('tab.reject'), value: 'reject' },
  ]

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('field.company_name'),
      flex: 1,
      minWidth: 150,
    },
    { field: 'email', headerName: t('field.email'), width: 200 },
    { field: 'phone', headerName: t('field.phone'), width: 150, resizable: false },
    {
      field: 'createdAt',
      headerName: t('field.application_date'),
      type: 'date',
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'status',
      headerName: t('field.status'),
      headerAlign: 'center',
      resizable: false,
      renderCell: (params) => (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
          <Label status="success">{params.value}</Label>
        </Stack>
      ),
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_history')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_history') },
        ]}
      />

      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          {TABS.map((e, i) => (
            <Tab label={e.label} value={e.value} key={i} />
          ))}
        </Tabs>

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
