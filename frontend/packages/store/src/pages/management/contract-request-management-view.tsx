import type { IContract } from '@/types/contract'
import type { GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
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
  Button,
  Tooltip,
  Collapse,
  TextField,
  IconButton,
} from '@mui/material'

import { Iconify, Typography } from '@e201/ui'

type TabType = 'received' | 'send'

export default function ContractRequestManagementView() {
  const [tab, setTab] = useState<TabType>('received')
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const TABS = [
    { label: '받은 요청', value: 'received' },
    { label: '보낸 요청', value: 'send' },
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
    tab === 'received'
      ? {
          field: 'action',
          type: 'actions',
          headerName: '처리',
          align: 'left',
          resizable: false,
          getActions: (params: GridRowParams) => [
            <Tooltip title="수락" arrow disableInteractive>
              <IconButton color="success">
                <Iconify icon="iconamoon:check-bold" />
              </IconButton>
            </Tooltip>,
            <Tooltip title="거절" arrow disableInteractive>
              <IconButton color="error">
                <Iconify icon="gravity-ui:xmark" />
              </IconButton>
            </Tooltip>,
          ],
        }
      : {
          field: 'status',
          headerName: '상태',
          headerAlign: 'center',
          resizable: false,
          renderCell: () => (
            <Stack width={1} height={1} justifyContent="center" alignItems="center">
              <Label status="success">요청 처리 중</Label>
            </Stack>
          ),
        },
  ]

  return (
    <Box>
      <Breadcrumbs
        title="계약 요청"
        routes={[
          { title: '관리', path: paths.management.menu },
          { title: '계약 관리', path: paths.management.contract.root },
          { title: '계약 요청' },
        ]}
        action={
          <Button>
            <Iconify icon="ic:round-plus" />
            <Typography variant="subtitle2" pl={0.5}>
              계약 추가
            </Typography>
          </Button>
        }
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
              <Tooltip title="일괄 수락" arrow disableInteractive>
                <IconButton color="success">
                  <Iconify icon="iconamoon:check-bold" />
                </IconButton>
              </Tooltip>
              <Tooltip title="일괄 거절" arrow disableInteractive>
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
