import type { GridColDef } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
// import { Label } from '@/components/label'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, TextField } from '@mui/material'

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
  status: StatusType
}

export default function ContractHistoryManagementView() {
  const { t } = useTranslate('contract')

  const [tab, setTab] = useState<StatusType | null>(null)
  const [storeSearch, setStoreSearch] = useState<string>('')
  const [userCond, setUserCond] = useState<UserCondType | 'all'>('all') // userCond 필터 추가

  const queryFn = async () => {
    const response = await axios.get<IContractHistory[]>('/contract', {
      params: {
        userCond,
        status: tab || 'all',
      },
    })
    return response.data
  }

  const { data, isPending } = useQuery({
    queryKey: ['contract', userCond, tab],
    queryFn,
  })

  const TABS = [
    { label: '전체', value: null },
    { label: '진행중', value: 'in' },
    { label: '완료', value: 'complete' },
    { label: '거절', value: 'reject' },
    { label: '취소 및 만료', value: 'canceled' },
  ]

  // const statusProvider = (row: IContractHistory) => {
  //   if (row.status === 'complete') {
  //     return <Label status="success">{t('label.complete')}</Label>
  //   }
  //   if (row.status === 'in') {
  //     return <Label status="warning">{t('label.in_progress')}</Label>
  //   }
  //   if (row.status === 'reject') {
  //     return <Label status="error">{t('label.reject')}</Label>
  //   }
  //   if (row.status === 'canceled') {
  //     return <Label status="error">{t('label.canceled')}</Label>
  //   }
  //   return <Label status="error">ERROR</Label>
  // }

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (storeSearch.trim() !== '') {
      filtered = filtered.filter((contract) => contract.storeName.includes(storeSearch.trim()))
    }
    return filtered
  }, [storeSearch, data])

  const columns: GridColDef[] = [
    {
      field: 'storeName',
      headerName: '식당명',
      flex: 1,
      minWidth: 150,
    },
    { field: 'phone', headerName: '대표번호', width: 150, resizable: false },
    {
      field: 'contractDate',
      headerName: '날짜',
      type: 'date',
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },

    {
      field: 'status',
      headerName: '상태',
      headerAlign: 'center',
      resizable: false,
      // renderCell: (params) => (
      //   <Stack width={1} height={1} justifyContent="center" alignItems="center">
      //     {statusProvider(params.row)}
      //   </Stack>
      // ),
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
