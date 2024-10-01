import type { SyntheticEvent } from 'react'
import type { IContractResponse } from '@/types/contract'
import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { m } from '@e201/utils'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

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

import { Label, Iconify, Typography, Breadcrumbs } from '@e201/ui'

type TabType = 'received' | 'send'

export default function ContractRequestManagementView() {
  const { t } = useTranslate('contract-management')

  const [tab, setTab] = useState<TabType>('received')
  const [selected, setSelected] = useState<GridRowSelectionModel>([])
  const [companySearch, setCompanySearch] = useState<string>('')

  const TABS = [
    { label: t('tab.received'), value: 'received' },
    { label: t('tab.send'), value: 'send' },
  ]

  const receivedQueryFn = async () => {
    const response = await axios.get<IContractResponse[]>(api.contract.received)
    return response.data
  }

  const sendQueryFn = async () => {
    const response = await axios.get<IContractResponse[]>(api.contract.send)
    return response.data
  }

  const { data: receivedData, isPending: receivedIsPending } = useQuery({
    queryKey: [api.contract.received],
    queryFn: receivedQueryFn,
  })

  const { data: sendData, isPending: sendIsPending } = useQuery({
    queryKey: [api.contract.send],
    queryFn: sendQueryFn,
  })

  const filteredReceivedData = useMemo(() => {
    if (!receivedData) {
      return []
    }

    let filtered = [...receivedData]
    if (companySearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.companyName.includes(companySearch.trim()))
    }
    return filtered
  }, [receivedData, companySearch])

  const filteredSendData = useMemo(() => {
    if (!sendData) {
      return []
    }

    let filtered = [...sendData]
    if (companySearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.companyName.includes(companySearch.trim()))
    }
    return filtered
  }, [sendData, companySearch])

  const tabChangeHandler = (e: SyntheticEvent, value: any) => {
    setTab(value)
    setSelected([])
  }

  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: t('field.company_name'),
      flex: 1,
      minWidth: 150,
    },
    { field: 'companyEmail', headerName: t('field.email'), width: 200 },
    { field: 'companyPhone', headerName: t('field.phone'), width: 150, resizable: false },
    {
      field: 'settlementDate',
      headerName: t('field.settlement_date'),
      width: 100,
      valueFormatter: (value: number) => m(t('row.settlement_date'), [value]),
    },
    {
      field: 'contractDate',
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
        <Box px={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tab} onChange={tabChangeHandler} variant="scrollable">
            {TABS.map((e, i) => (
              <Tab label={e.label} value={e.value} key={i} />
            ))}
          </Tabs>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <TextField
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            size="small"
            label={t('label.company_search')}
            fullWidth
          />
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
            <Typography variant="subtitle2">{m(t('label.selected'), [selected.length])}</Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={t('tooltip.accept_all')} arrow disableInteractive>
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
          getRowId={(row) => row.contractId}
          rows={tab === 'received' ? filteredReceivedData : filteredSendData}
          rowSelectionModel={selected}
          onRowSelectionModelChange={setSelected}
          checkboxSelection={tab === 'received'}
          hideFooter
          loading={tab === 'received' ? receivedIsPending : sendIsPending}
          slotProps={{
            noRowsOverlay: {},
            noResultsOverlay: {},
          }}
          sx={{ height: 500 }}
        />
      </Card>
    </Box>
  )
}
