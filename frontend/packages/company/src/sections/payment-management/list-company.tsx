import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import isBetween from 'dayjs/plugin/isBetween'
import { fNumber } from '@/utils/number-format'
import { useQuery } from '@tanstack/react-query'
import { SelectYear } from '@/sections/payment-management/select-year'
import { SelectMonth } from '@/sections/payment-management/select-month'

import { DataGrid } from '@mui/x-data-grid'
import { Card, Stack, Select, MenuItem, InputLabel, Typography, FormControl } from '@mui/material'

dayjs.extend(isBetween)

interface IContractStore {
  id: string
  name: string
  phone: string
  address: string
  createdAt: Date
}

interface IManager {
  id: string
  departmentId: string
  departmentName: string
  supportAmount: number
  spentAmount: number
  createdAt: Date
}

interface IPayment {
  id: string
  employeeId: string
  employeeName: string
  price: number
  paidAt: Date
  departmentId: string
  departmentName: string
  restaurantId: string
  restaurantName: string
}

const fetchContractStores = async () => {
  const contract_store = await axios.get('/companies/stores')
  return contract_store.data
}

const fetchManagers = async () => {
  const manager = await axios.get('/companies/managers')
  return manager.data
}

const fetchPayments = async () => {
  const payment = await axios.get('/companies/payment')
  return payment.data
}

export default function PaymentManagementView() {
  const { t } = useTranslate('payment')

  const { data: contractStores } = useQuery({
    queryKey: ['contractstores'],
    queryFn: fetchContractStores,
  })

  const { data: managers } = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  })

  const { data: payments, isPending } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  })

  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [restaurantFilter, setRestaurantFilter] = useState<string | null>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const columns: GridColDef[] = [
    {
      field: 'paidAt',
      headerName: t('paid_at'),
      flex: 1,
      minWidth: 200,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD  A hh:mm'),
    },
    { field: 'departmentName', headerName: t('department_name'), width: 150 },
    { field: 'employeeName', headerName: t('employee_name'), width: 100 },
    { field: 'restaurantName', headerName: t('restaurant_name'), width: 150 },
    {
      field: 'price',
      headerName: t('price'),
      width: 150,
      renderCell: (params) => fNumber(params.value),
    },
  ]
  const filteredRows = useMemo(() => {
    if (!payments) return []

    const filterDate = dayjs()
      .year(year)
      .month(month - 1)
    const startDate = filterDate.startOf('month')
    const endDate = filterDate.endOf('month')

    return payments
      ?.filter((row: IPayment) => {
        const departmentMatch = !departmentFilter || row.departmentId === departmentFilter
        const restaurantMatch = !restaurantFilter || row.restaurantId === restaurantFilter

        const dateMatch = dayjs(row.paidAt).isBetween(startDate, endDate, 'day', '[]')

        return departmentMatch && restaurantMatch && dateMatch
      })
      .sort(
        (a: IPayment, b: IPayment) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
      )
  }, [payments, departmentFilter, restaurantFilter, year, month])

  return (
    <Stack gap={3}>
      <Typography variant="h3" fontWeight={800}>
        {t('payment')}
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" p={2} spacing={1}>
          <SelectYear year={year} onChange={setYear} />
          <SelectMonth month={month} onChange={setMonth} />
        </Stack>
        <Stack direction="row" p={2} spacing={1}>
          <FormControl fullWidth>
            <InputLabel>{t('department')}</InputLabel>
            <Select
              value={departmentFilter || ''}
              onChange={(e) => setDepartmentFilter(e.target.value || null)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">{t('all')}</MenuItem>
              {managers?.map((manager: IManager) => (
                <MenuItem key={manager.departmentId} value={manager.departmentId}>
                  {manager.departmentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>{t('restaurant')}</InputLabel>
            <Select
              value={restaurantFilter || ''}
              onChange={(e) => setRestaurantFilter(e.target.value || null)}
            >
              <MenuItem value="">{t('all')}</MenuItem>
              {contractStores?.map((store: IContractStore) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Card>
        <DataGrid
          columns={columns}
          rows={filteredRows}
          rowSelectionModel={selected}
          onRowSelectionModelChange={setSelected}
          checkboxSelection
          hideFooter
          hideFooterPagination
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
    </Stack>
  )
}
