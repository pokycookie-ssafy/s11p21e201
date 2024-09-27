import type { IContract } from '@/types/contract'
import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

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
import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Tooltip,
  Collapse,
  TextField,
  IconButton,
} from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

type TabType = 'received' | 'send'

export default function ContractRequestManagementView() {
  const { t } = useTranslate('contract-management')

  const [tab, setTab] = useState<TabType>('received')
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const TABS = [
    { label: t('tab.received'), value: 'received' },
    { label: t('tab.send'), value: 'send' },
  ]

  const requestQueryFn = async () => {
    const response = await axios.get<IContract[]>(api.contract.request)
    return response.data
  }

  const responseQueryFn = async () => {
    const response = await axios.get<IContract[]>(api.contract.response)
    return response.data
  }

  const { data: receivedData, isPending: receivedIsPending } = useQuery({
    queryKey: [api.contract.request, tab],
    queryFn: requestQueryFn,
  })

  const { data: sendData, isPending: sendIsPending } = useQuery({
    queryKey: [api.contract.response, tab],
    queryFn: responseQueryFn,
  })

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
      type: 'date',
      headerName: t('field.application_date'),
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    tab === 'received'
      ? {
          field: 'action',
          type: 'actions',
          headerName: t('field.action'),
          align: 'left',
          resizable: false,
          getActions: (params: GridRowParams) => [
            <Tooltip title={t('tooltip.accept')} arrow disableInteractive>
              <IconButton color="success">
                <Iconify icon="iconamoon:check-bold" />
              </IconButton>
            </Tooltip>,
            <Tooltip title={t('tooltip.reject')} arrow disableInteractive>
              <IconButton color="error">
                <Iconify icon="gravity-ui:xmark" />
              </IconButton>
            </Tooltip>,
          ],
        }
      : {
          field: 'status',
          headerName: t('field.status'),
          headerAlign: 'center',
          resizable: false,
          renderCell: () => (
            <Stack width={1} height={1} justifyContent="center" alignItems="center">
              <Label status="success">{t('field.in_progress')}</Label>
            </Stack>
          ),
        },
  ]

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.contract_request')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.menu },
          { title: t('breadcrumbs.contract_management'), path: paths.management.contract.now },
          { title: t('breadcrumbs.contract_request') },
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

        <Collapse in={selected.length > 0}>
          <Stack
            width={1}
            height={57}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            zIndex={1}
            bgcolor="background.paper"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Typography variant="subtitle1">{selected.length} selected</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={t('tooltip.accpet_all')} arrow disableInteractive>
                <IconButton color="success">
                  <Iconify icon="iconamoon:check-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('tooltip.reject_all')} arrow disableInteractive>
                <IconButton color="error">
                  <Iconify icon="gravity-ui:xmark" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Collapse>

        <DataGrid
          columns={columns}
          rows={tab === 'received' ? receivedData : sendData}
          rowSelectionModel={selected}
          onRowSelectionModelChange={setSelected}
          checkboxSelection
          hideFooter
          hideFooterPagination
          disableColumnSorting
          disableColumnFilter
          disableColumnMenu
          disableRowSelectionOnClick
          loading={receivedIsPending}
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
