import type { GridColDef } from '@mui/x-data-grid'
import type { IContractHistory } from '@/types/contract'

import dayjs from 'dayjs'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, TextField } from '@mui/material'

import { Label, Typography, Breadcrumbs } from '@e201/ui'

type StatusType = 'in' | 'complete' | 'reject' | 'canceled'

export default function ContractHistoryManagementView() {
  const { t } = useTranslate('contract-management')

  const [tab, setTab] = useState<StatusType | null>(null)
  const [companySearch, setCompanySearch] = useState<string>('')

  const queryFn = async () => {
    const response = await axios.get<IContractHistory[]>(api.contract.list('all', 'all'))
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.contract.list('all', 'all')], queryFn })

  const TABS = [
    { label: t('tab.all'), value: null },
    { label: t('tab.in_progress'), value: 'in' },
    { label: t('tab.complete'), value: 'complete' },
    { label: t('tab.reject'), value: 'reject' },
    { label: t('tab.canceled'), value: 'canceled' },
  ]

  const statusProvider = (row: IContractHistory) => {
    if (row.status === 'complete') {
      return <Label status="success">{t('label.complete')}</Label>
    }
    if (row.status === 'in') {
      return <Label status="warning">{t('label.in_progress')}</Label>
    }
    if (row.status === 'reject') {
      return <Label status="error">{t('label.reject')}</Label>
    }
    if (row.status === 'canceled') {
      return <Label status="error">{t('label.canceled')}</Label>
    }
    return <Label status="error">ERROR</Label>
  }

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (tab !== null) {
      filtered = filtered.filter((e) => e.status === tab)
    }
    if (companySearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.companyName.includes(companySearch.trim()))
    }
    return filtered
  }, [companySearch, data, tab])

  const columns: GridColDef<IContractHistory>[] = [
    {
      field: 'companyName',
      flex: 1,
      minWidth: 150,
      renderHeader: () => (
        <Typography pl={1} fontSize={14} fontWeight={500}>
          {t('field.company_name')}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack height={1} pl={1} justifyContent="center">
          <Typography fontSize={14} fontWeight={500}>
            {params.row.companyName}
          </Typography>
        </Stack>
      ),
    },
    { field: 'companyEmail', headerName: t('field.email'), width: 200 },
    { field: 'companyPhone', headerName: t('field.phone'), width: 150, resizable: false },
    {
      field: 'contractDate',
      headerName: t('field.contract_date'),
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
          {statusProvider(params.row)}
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
        <Box px={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
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

        <DataGrid
          columns={columns}
          getRowId={(row) => row.contractId}
          rows={filteredData}
          hideFooter
          loading={isPending}
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
