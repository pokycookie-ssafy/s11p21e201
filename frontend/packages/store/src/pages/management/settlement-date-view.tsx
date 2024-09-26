import type { GridColDef } from '@mui/x-data-grid'
import type { ISettlementResponse } from '@/types/settlement'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { fNumber } from '@e201/utils'
import { Label } from '@/components/label'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SelectYear, SelectMonth } from '@/components/select'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Tooltip, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

type StatusType = 'settled' | 'partial' | 'unsettled'

export default function SettlementDateView() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [tab, setTab] = useState<StatusType | null>(null)

  const TABS = [
    { label: '전체', value: null },
    { label: '정산 완료', value: 'settled' },
    { label: '부분 정산', value: 'partial' },
    { label: '미정산', value: 'unsettled' },
  ]

  const queryFn = async () => {
    const response = await axios.get<ISettlementResponse[]>(api.settlement.list)
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.settlement.list], queryFn })

  const statusProvider = (row: ISettlementResponse) => {
    if (row.settledAmount === 0) {
      return <Label status="error">미정산</Label>
    }
    if (row.settledAmount < row.settlementAmount) {
      return <Label status="warning">부분 정산</Label>
    }
    return <Label status="success">정산 완료</Label>
  }

  const columns: GridColDef<ISettlementResponse>[] = [
    { field: 'companyName', headerName: '회사명', flex: 1, minWidth: 100, resizable: true },
    {
      field: 'settledDate',
      type: 'date',
      headerName: '정산일',
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'settlementDate',
      type: 'date',
      headerName: '정산 예정일',
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'settledAmount',
      type: 'number',
      headerName: '정산 완료 금액',
      width: 130,
      resizable: false,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },

    {
      field: 'outstandingAmount',
      type: 'number',
      headerName: '미납 금액',
      width: 120,
      resizable: false,
      valueGetter: (_, row) => row.settlementAmount - row.settledAmount,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },
    {
      field: 'settlementAmount',
      type: 'number',
      headerName: '정산 예정 금액',
      width: 120,
      resizable: false,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },
    {
      field: 'status',
      headerName: '상태',
      headerAlign: 'center',
      width: 120,
      resizable: false,
      renderCell: (params) => (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
          {statusProvider(params.row)}
        </Stack>
      ),
    },
    {
      field: 'taxInvoice',
      type: 'boolean',
      headerName: '세금계산서',
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
          {params.row.taxInvoice ? (
            <Tooltip title="업로드 완료" disableInteractive>
              <IconButton sx={{ color: (theme) => theme.palette.success.main }}>
                <Iconify icon="solar:check-circle-linear" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="업로드" disableInteractive>
              <IconButton sx={{ color: (theme) => theme.palette.error.main }}>
                <Iconify icon="solar:upload-square-linear" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ]

  return (
    <Box>
      <Breadcrumbs
        title="정산 관리"
        routes={[
          { title: '관리', path: paths.management.menu },
          { title: '정산 관리', path: paths.management.settlement.root },
          { title: '날짜별 관리' },
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
          alignItems="center"
          p={1}
          px={2}
          spacing={1}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <SelectYear year={year} onChange={setYear} />
          <SelectMonth month={month} onChange={setMonth} />
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
