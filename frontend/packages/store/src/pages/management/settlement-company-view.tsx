import type { ISelectOption } from '@e201/ui'
import type { GridColDef } from '@mui/x-data-grid'
import type { ISettlementResponse } from '@/types/settlement'

import dayjs from 'dayjs'
import api from '@/configs/api'
import paths from '@/configs/paths'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fNumber, useBoolean } from '@e201/utils'
import TaxInvoiceUploadModal from '@/sections/settlement-management/tax-invoice-upload-modal'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Tab, Card, Tabs, Stack, Tooltip, IconButton } from '@mui/material'

import { Label, Select, Iconify, Typography, Breadcrumbs } from '@e201/ui'

type StatusType = 'settled' | 'partial' | 'unsettled' | 'upload'

export default function SettlementCompanyView() {
  const { t } = useTranslate('settlement-management')

  const invoiceModal = useBoolean()

  const [selectedCompany, setSelectedCompany] = useState<ISelectOption | null>(null)
  const [tab, setTab] = useState<StatusType | null>(null)

  const TABS = [
    { label: t('tab.all'), value: null },
    { label: t('tab.settled'), value: 'settled' },
    { label: t('tab.partial'), value: 'partial' },
    { label: t('tab.unsettled'), value: 'unsettled' },
    { label: t('tab.upload'), value: 'upload' },
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
      return <Label status="error">{t('label.unsettled')}</Label>
    }
    if (row.settledAmount < row.settlementAmount) {
      return <Label status="warning">{t('label.partial')}</Label>
    }
    return <Label status="success">{t('label.settled')}</Label>
  }

  const filteredData = useMemo(() => {
    if (!data) {
      return []
    }

    let filtered = [...data]
    if (selectedCompany !== null) {
      filtered = filtered.filter((e) => e.companyId === selectedCompany.value)
    }
    if (tab === 'unsettled') {
      filtered = filtered.filter((e) => e.settledAmount === 0)
    }
    if (tab === 'partial') {
      filtered = filtered.filter((e) => e.settledAmount < e.settlementAmount && e.settledAmount > 0)
    }
    if (tab === 'settled') {
      filtered = filtered.filter((e) => e.settledAmount >= e.settlementAmount)
    }
    if (tab === 'upload') {
      filtered = filtered.filter((e) => !e.taxInvoice)
    }
    return filtered
  }, [data, selectedCompany, tab])

  const columns: GridColDef<ISettlementResponse>[] = [
    {
      field: 'companyName',
      flex: 1,
      minWidth: 100,
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
    {
      field: 'settledDate',
      type: 'date',
      headerName: t('field.settled_date'),
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
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
    },

    {
      field: 'outstandingAmount',
      type: 'number',
      headerName: t('field.outstanding_amount'),
      width: 120,
      resizable: false,
      valueGetter: (_, row) => row.settlementAmount - row.settledAmount,
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
    },
    {
      field: 'settlementAmount',
      type: 'number',
      headerName: t('field.settlement_amount'),
      width: 120,
      resizable: false,
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
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
              path: paths.management.settlement.date,
            },
            { title: t('breadcrumbs.company_management') },
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
              onChange={setSelectedCompany}
              options={companies}
              size="small"
              label={t('label.company_name')}
            />
          </Stack>

          <DataGrid
            columns={columns}
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
      <TaxInvoiceUploadModal open={invoiceModal.value} onClose={invoiceModal.onFalse} />
    </>
  )
}
