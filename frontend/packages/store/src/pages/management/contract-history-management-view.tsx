import type { GridColDef } from '@mui/x-data-grid'
import type { IContractHistory } from '@/types/contract'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { Label } from '@/components/label'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, TextField } from '@mui/material'

type StatusType = 'in' | 'success' | 'reject'

export default function ContractHistoryManagementView() {
  const [tab, setTab] = useState<StatusType | null>(null)

  const queryFn = async () => {
    const response = await axios.get<IContractHistory[]>(api.contract.history)
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.contract.history], queryFn })

  const TABS = [
    { label: '전체', value: null },
    { label: '승인중', value: 'in' },
    { label: '완료', value: 'success' },
    { label: '거절', value: 'reject' },
  ]

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: '회사명',
      flex: 1,
      minWidth: 150,
    },
    { field: 'email', headerName: '이메일', width: 200 },
    { field: 'phone', headerName: '대표번호', width: 150, resizable: false },
    {
      field: 'createdAt',
      type: 'date',
      headerName: '신청날짜',
      resizable: false,
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'status',
      headerName: '상태',
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
        title="계약 기록"
        routes={[
          { title: '관리', path: paths.management.menu },
          { title: '계약 관리', path: paths.management.contract.root },
          { title: '계약 기록' },
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
