import type { GridColDef } from '@mui/x-data-grid'
import type { ISelectOption } from '@/components/select'
import type { ISettlementResponse } from '@/types/settlement'

import dayjs from 'dayjs'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useMemo, useState } from 'react'
import { Label } from '@/components/label'
import { Select } from '@/components/select'
import { useQuery } from '@tanstack/react-query'
import { fNumber, useBoolean } from '@e201/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import TaxInvoiceUploadModal from '@/sections/settlement-management/tax-invoice-upload-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Tooltip, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

type StatusType = 'settled' | 'partial' | 'unsettled'

export default function SettlementCompanyView() {
  const invoiceModal = useBoolean()

  const [selectedCompany, setSelectedCompany] = useState<ISelectOption | null>(null)
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

  const companies = useMemo(() => {
    if (!data) {
      return []
    }
    const companySet = new Set<string>()
    const companyList: ISelectOption[] = []
    data.forEach((e) => {
      if (!companySet.has(e.companyId)) {
        companyList.push({ label: e.companyName, value: e.companyId })
      }
      companySet.add(e.companyId)
    })
    return companyList
  }, [data])

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
    { field: 'companyName', headerName: '회사명', flex: 1, minWidth: 100 },
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
              <IconButton
                sx={{ color: (theme) => theme.palette.error.main }}
                onClick={invoiceModal.onTrue}
              >
                <Iconify icon="solar:upload-square-linear" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ]

  return (
    <>
      <Box>
        <Breadcrumbs
          title="정산 관리"
          routes={[
            { title: '관리', path: paths.management.menu },
            { title: '정산 관리', path: paths.management.settlement.date },
            { title: '회사별 관리' },
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
            p={2}
            spacing={1}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Select
              value={selectedCompany}
              onChange={(v) => setSelectedCompany(v)}
              options={companies}
              size="small"
              label="회사명"
            />
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
      <TaxInvoiceUploadModal open={invoiceModal.value} onClose={invoiceModal.onFalse} />
    </>
  )
}
