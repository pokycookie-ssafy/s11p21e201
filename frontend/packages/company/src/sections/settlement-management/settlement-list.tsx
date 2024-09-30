import type { GridColDef } from '@mui/x-data-grid'
import type { SelectChangeEvent } from '@mui/material/Select'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { Label } from '@/components/label'
import { fNumber } from '@/utils/number-format'
import { useBoolean } from '@/hooks/use-boolean'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState, useEffect } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'

import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Tab,
  Card,
  Tabs,
  Stack,
  Select,
  Button,
  Dialog,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  DialogTitle,
  OutlinedInput,
  DialogContent,
  DialogActions,
} from '@mui/material'

type StatusType = 'settled' | 'partial' | 'unsettled' | 'upload'

interface ISettlement {
  id: string
  storeId: string
  storeName: string
  settlementDate: Date
  settledDate: Date
  settlementAmount: number
  settledAmount: number
  taxInvoice: boolean
}

interface IStore {
  id: string
  name: string
  phone: string
  address: string
  createdAt: Date
}

const fetchStores = async () => {
  const stores = await axios.get('/companies/stores')
  return stores.data
}

const fetchSettlements = async () => {
  const settlements = await axios.get('/settlement')
  return settlements.data
}

export default function SettlementList() {
  const invoiceDialog = useBoolean()
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('')
  const [tab, setTab] = useState<StatusType | null>(null)
  const { t } = useTranslate('settlement')

  const TABS = [
    { label: t('all'), value: null },
    { label: t('settled'), value: 'settled' },
    { label: t('partial'), value: 'partial' },
    { label: t('unsettled'), value: 'unsettled' },
    { label: t('upload'), value: 'upload' },
  ]

  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  })

  const { data: settlements = [] } = useQuery({
    queryKey: ['settlements'],
    queryFn: fetchSettlements,
  })

  useEffect(() => {
    if (stores.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(stores[0].name)
    }
  }, [stores, selectedRestaurant])

  // const selectedStoreData = useMemo(
  //   () => stores.find((store: IStore) => store.name === selectedRestaurant),
  //   [stores, selectedRestaurant]
  // )

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedRestaurant(event.target.value)
  }

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
    if (!settlements) return []
    let filtered = [...settlements]

    if (selectedRestaurant) {
      filtered = filtered.filter((e) => e.storeName === selectedRestaurant)
    }

    if (tab === 'unsettled') {
      filtered = filtered.filter((e) => e.settledAmount === 0)
    } else if (tab === 'partial') {
      filtered = filtered.filter((e) => e.settledAmount < e.settlementAmount)
    } else if (tab === 'settled') {
      filtered = filtered.filter((e) => e.settledAmount >= e.settlementAmount)
    } else if (tab === 'upload') {
      filtered = filtered.filter((e) => !e.taxInvoice)
    }

    return filtered
  }, [settlements, tab, selectedRestaurant])

  const columns: GridColDef<ISettlement>[] = [
    { field: 'storeName', headerName: t('restaurant_name'), flex: 1, minWidth: 150 },
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
        <Stack justifyContent="center" alignItems="center">
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
            <Button color="success" size="small">
              <Typography>{t('view')}</Typography>
            </Button>
          ) : (
            <Button color="error" size="small" onClick={invoiceDialog.onTrue}>
              <Typography>{t('view')}</Typography>
            </Button>
          )}
        </Stack>
      ),
    },
  ]

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs title={t('settlement')} routes={[{ title: t('settlement') }]} />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>{t('restaurant_name')}</InputLabel>
          <Select
            value={selectedRestaurant}
            onChange={handleChange}
            input={<OutlinedInput label={t('restaurant_name')} />}
          >
            {stores.map((store: IStore) => (
              <MenuItem key={store.id} value={store.name}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* <Stack spacing={1} pb={2}>
        <Typography textAlign="center" variant="h5">
          {selectedRestaurant}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('total_amount_due')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '500,000' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              =
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('current_amount_due')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '500,000' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
              +
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Stack alignItems="center">
              <Typography>{t('overdue_amount')}</Typography>
              <Typography variant="h5">
                {selectedStoreData ? '0' : '0'}
                {t('won')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Stack> */}

      <Card>
        <Box px={2} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
            {TABS.map((e, i) => (
              <Tab label={e.label} value={e.value} key={i} />
            ))}
          </Tabs>
        </Box>

        <Stack direction="row" alignItems="center" />

        <DataGrid
          columns={columns}
          rows={filteredData}
          getRowId={(row) => row.id}
          hideFooter
          loading={!settlements.length}
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
    </Stack>
  )
}
