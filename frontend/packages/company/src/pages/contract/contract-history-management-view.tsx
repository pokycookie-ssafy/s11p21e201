import type { GridColDef, GridSortModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, TextField } from '@mui/material'

import { Label, Breadcrumbs } from '@e201/ui'

type StatusType = 'in' | 'complete' | 'reject' | 'canceled'
type UserCondType = 'receiver' | 'sender'

interface IContractHistory {
  contractDate: Date
  settlementDate: Number
  contractId: string
  storeId: string
  companyId: string
  storeName: string
  companyName: string
  phone: string
  address: string
  userCond: UserCondType
  status: StatusType
}

export default function ContractHistoryManagementView() {
  const { t } = useTranslate('contract')

  const [tab, setTab] = useState<StatusType | null>(null)
  const [storeSearch, setStoreSearch] = useState<string>('')

  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'contractDate', sort: 'desc' }, // 초기 정렬
  ])

  const queryFn = async () => {
    const response = await axios.get<IContractHistory[]>('/contract/temp', {})
    return response.data
  }

  const { data, isPending } = useQuery({
    queryKey: ['contractHistory'],
    queryFn,
  })

  console.log(data)

  const TABS = [
    { label: t('all'), value: null },
    { label: t('in'), value: 'in' },
    { label: t('complete'), value: 'complete' },
    { label: t('reject'), value: 'reject' },
    { label: t('canceled'), value: 'canceled' },
  ]

  const statusProvider = (row: IContractHistory) => {
    if (row.status === 'complete') {
      return <Label status="success">{t('complete')}</Label>
    }
    if (row.status === 'in') {
      return <Label status="warning">{t('in')}</Label>
    }
    if (row.status === 'reject') {
      return <Label status="error">{t('reject')}</Label>
    }
    if (row.status === 'canceled') {
      return <Label status="error">{t('canceled')}</Label>
    }
    return <Label status="error">ERROR</Label>
  }

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]

    if (tab !== null) {
      filtered = filtered.filter((contract) => contract.status === tab)
    }
    if (storeSearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.storeName.includes(storeSearch.trim()))
    }
    return filtered
  }, [storeSearch, data, tab])

  const columns: GridColDef[] = [
    {
      field: 'storeName',
      headerName: t('restaurant_name'),
      flex: 1,
      minWidth: 150,
    },
    { field: 'phone', headerName: t('phone_number'), width: 150, resizable: false },
    {
      field: 'contractDate',
      headerName: t('date'),
      type: 'date',
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },

    {
      field: 'status',
      headerName: t('status'),
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
        title={t('contract_log')}
        routes={[
          { title: t('contract_management'), path: paths.management.contract.now },
          { title: t('request_contract'), path: paths.management.contract.request },
          { title: t('contract_log') },
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
            value={storeSearch}
            onChange={(e) => setStoreSearch(e.target.value)}
            size="small"
            label="search"
            fullWidth
          />
        </Stack>

        <DataGrid
          columns={columns}
          getRowId={(row) => row.contractId}
          rows={filteredData}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
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
