import type { GridColDef } from '@mui/x-data-grid'
import type { ISettlementResponse } from '@/types/settlement'

import dayjs from 'dayjs'
import api from '@/configs/api'
import { useState } from 'react'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { Label } from '@/components/label'
import { useQuery } from '@tanstack/react-query'
import { fNumber, useBoolean } from '@e201/utils'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SelectYear, SelectMonth } from '@/components/select'
import TaxInvoiceUploadModal from '@/sections/settlement-management/tax-invoice-upload-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Tooltip, IconButton } from '@mui/material'

import { Iconify } from '@e201/ui'

type StatusType = 'settled' | 'partial' | 'unsettled'

export default function SettlementDateView() {
  const { t } = useTranslate('settlement-management')

  const invoiceModal = useBoolean()

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [tab, setTab] = useState<StatusType | null>(null)

  const TABS = [
    { label: t('tab.all'), value: null },
    { label: t('tab.settled'), value: 'settled' },
    { label: t('tab.partial'), value: 'partial' },
    { label: t('tab.unsettled'), value: 'unsettled' },
  ]

  const queryFn = async () => {
    const response = await axios.get<ISettlementResponse[]>(api.settlement.list)
    return response.data
  }

  const { data, isPending } = useQuery({ queryKey: [api.settlement.list], queryFn })

  const statusProvider = (row: ISettlementResponse) => {
    if (row.settledAmount === 0) {
      return <Label status="error">{t('label.unsettled')}</Label>
    }
    if (row.settledAmount < row.settlementAmount) {
      return <Label status="warning">{t('label.partial')}</Label>
    }
    return <Label status="success">{t('label.settled')}</Label>
  }

  const columns: GridColDef<ISettlementResponse>[] = [
    { field: 'companyName', headerName: t('field.company_name'), flex: 1, minWidth: 100 },
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
      headerName: t('field.settlement_date'),
      width: 120,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'settledAmount',
      type: 'number',
      headerName: t('field.settled_amount'),
      width: 130,
      resizable: false,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },

    {
      field: 'outstandingAmount',
      type: 'number',
      headerName: t('field.outstanding_amount'),
      width: 120,
      resizable: false,
      valueGetter: (_, row) => row.settlementAmount - row.settledAmount,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },
    {
      field: 'settlementAmount',
      type: 'number',
      headerName: t('field.settlement_amount'),
      width: 120,
      resizable: false,
      valueFormatter: (value: number) => `${fNumber(value)} 원`,
    },
    {
      field: 'status',
      headerName: t('field.status'),
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
      headerName: t('field.tax_invoice'),
      width: 90,
      resizable: false,
      renderCell: (params) => (
        <Stack width={1} height={1} justifyContent="center" alignItems="center">
          {params.row.taxInvoice ? (
            <Tooltip title={t('tooltip.upload_done')} disableInteractive>
              <IconButton sx={{ color: (theme) => theme.palette.success.main }}>
                <Iconify icon="solar:check-circle-linear" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t('tooltip.upload')} disableInteractive>
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
          title={t('breadcrumbs.settlement_management')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.menu },
            {
              title: t('breadcrumbs.settlement_management'),
              path: paths.management.settlement.company,
            },
            { title: t('breadcrumbs.date_management') },
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
      <TaxInvoiceUploadModal open={invoiceModal.value} onClose={invoiceModal.onFalse} />
    </>
  )
}
