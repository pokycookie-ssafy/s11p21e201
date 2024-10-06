import type { ISelectOption } from '@e201/ui'
import type { GridColDef } from '@mui/x-data-grid'
import type { ISettlement } from '@/types/settlement'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { fNumber } from '@/utils/number-format'
import { useBoolean } from '@/hooks/use-boolean'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Button,
  Dialog,
  Tooltip,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

import { Label, Select, Iconify, Breadcrumbs } from '@e201/ui'

type StatusType = 'settled' | 'partial' | 'unsettled' | 'upload'

const fetchSettlements = async () => {
  const settlements = await axios.get<ISettlement[]>('/settlement')
  return settlements.data
}

export default function SettlementStoreView() {
  const { t } = useTranslate('settlement')

  const invoiceDialog = useBoolean()

  const [selectedStore, setSelectedStore] = useState<ISelectOption | null>(null)
  const [tab, setTab] = useState<StatusType | null>(null)

  const TABS = [
    { label: t('all'), value: null },
    { label: t('settled'), value: 'settled' },
    { label: t('partial'), value: 'partial' },
    { label: t('unsettled'), value: 'unsettled' },
  ]

  const { data: settlements, isPending } = useQuery({
    queryKey: ['settlements'],
    queryFn: fetchSettlements,
  })

  const stores = useMemo(() => {
    if (!settlements) {
      return []
    }

    const storeSet = new Set<string>()
    const storeList: ISelectOption[] = []
    settlements.forEach((settlement) => {
      if (!storeSet.has(settlement.storeId)) {
        storeList.push({ label: settlement.storeName, value: settlement.storeId })
      }
      storeSet.add(settlement.storeId)
    })
    return storeList
  }, [settlements])

  const statusProvider = (row: ISettlement) => {
    if (row.settledAmount === 0) {
      return <Label status="error">{t('unsettled')}</Label>
    }
    if (row.settledAmount < row.settlementAmount) {
      return <Label status="warning">{t('partial')}</Label>
    }
    return <Label status="success">{t('settled')}</Label>
  }

  const filteredData = useMemo(() => {
    if (!settlements) {
      return []
    }

    let filtered = [...settlements]
    if (selectedStore !== null) {
      filtered = filtered.filter((e) => e.storeId === selectedStore.value)
    }
    if (tab === 'unsettled') {
      filtered = filtered.filter((e) => e.settledAmount === 0)
    } else if (tab === 'partial') {
      filtered = filtered.filter((e) => e.settledAmount < e.settlementAmount && e.settledAmount > 0)
    } else if (tab === 'settled') {
      filtered = filtered.filter((e) => e.settledAmount >= e.settlementAmount)
    }

    return filtered
  }, [selectedStore, settlements, tab])

  const columns: GridColDef<ISettlement>[] = [
    {
      field: 'storeName',
      headerName: t('restaurant_name'),
      flex: 1,
      minWidth: 150,
      renderHeader: () => (
        <Typography pl={1} fontSize={14} fontWeight={500}>
          {t('field.store_name')}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack height={1} pl={1} justifyContent="center">
          <Typography fontSize={14} fontWeight={500}>
            {params.row.storeName}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'settledDate',
      type: 'date',
      headerName: t('settled_date'),
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'settlementDate',
      headerName: t('settlement_date'),
      width: 120,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD'),
    },
    {
      field: 'settledAmount',
      headerName: t('settled_amount'),
      width: 130,
      valueFormatter: (params) => `${fNumber(params)} 원`,
    },
    {
      field: 'settlementAmount',
      headerName: t('settlement_amount'),
      width: 130,
      valueFormatter: (params) => `${fNumber(params)} 원`,
    },
    {
      field: 'status',
      headerName: t('status'),
      headerAlign: 'center',
      width: 120,
      renderCell: (params) => (
        <Stack height={1} justifyContent="center" alignItems="center">
          {statusProvider(params.row)}
        </Stack>
      ),
    },
    {
      field: 'taxInvoice',
      type: 'boolean',
      headerName: t('invoice'),
      width: 90,
      renderCell: (params) => (
        <Stack justifyContent="center" alignItems="center">
          {params.row.taxInvoice ? (
            <Tooltip title={t('tooltip.check_tax')} disableInteractive>
              <IconButton sx={{ color: (theme) => theme.palette.success.main }}>
                <Iconify icon="solar:check-circle-linear" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title={t('tooltip.no_tax')} disableInteractive>
              <IconButton sx={{ color: (theme) => theme.palette.error.main }}>
                <Iconify icon="solar:minus-circle-linear" />
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
        title={t('breadcrumbs.management_store')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.settlement.root },
          { title: t('breadcrumbs.management_payment'), path: paths.management.settlement.root },
          { title: t('breadcrumbs.management_store') },
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
            value={selectedStore}
            onChange={setSelectedStore}
            options={stores}
            size="small"
            label={t('label.store_name')}
          />
        </Stack>

        <DataGrid
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row.id}
          hideFooter
          loading={isPending}
          sx={{ height: 500 }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'settledDate', sort: 'desc' }], // 정산일 기준으로 내림차순 정렬
            },
          }}
        />
      </Card>

      <Dialog open={invoiceDialog.value} onClose={invoiceDialog.onFalse} maxWidth="sm" fullWidth>
        <DialogTitle>{t('invoice')}</DialogTitle>
        <DialogContent dividers>
          <Typography>{t('invoice')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={invoiceDialog.onFalse} variant="contained">
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
