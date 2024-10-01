import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import isBetween from 'dayjs/plugin/isBetween'
import { fNumber } from '@/utils/number-format'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState, useEffect } from 'react'

import { DataGrid } from '@mui/x-data-grid'
import {
  Box,
  Card,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material'

import { SelectDate, Breadcrumbs } from '@e201/ui'

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
  const contract_store = await axios.get<IContractStore[]>('/companies/stores')
  return contract_store.data
}

const fetchManagers = async () => {
  const manager = await axios.get<IManager[]>('/companies/managers')
  return manager.data
}

const fetchPayments = async () => {
  const payment = await axios.get<IPayment[]>('/companies/payment')
  return payment.data
}

export default function PaymentManagementView() {
  const { t } = useTranslate('payment')

  const { data: contractStores } = useQuery({
    queryKey: ['contractstores'],
    queryFn: fetchContractStores,
  })

  const { data: managerRes } = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  })

  const { data: paymentRes, isPending: paymentIsPending } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  })

  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [restaurantFilter, setRestaurantFilter] = useState<string | null>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const dateChangeHandler = (dateYear: number, dateMonth: number) => {
    setYear(dateYear)
    setMonth(dateMonth)
  }

  useEffect(() => {
    console.log(paymentRes)
  }, [paymentRes])

  const departments = useMemo(() => {
    if (!managerRes) {
      return []
    }
    return managerRes.map((manager) => manager.departmentName)
  }, [managerRes])

  const filteredRows = useMemo(() => {
    if (!paymentRes) return []

    const filterDate = dayjs()
      .year(year)
      .month(month - 1)
    const startDate = filterDate.startOf('month')
    const endDate = filterDate.endOf('month')

    return paymentRes
      ?.filter((row: IPayment) => {
        const departmentMatch = !departmentFilter || row.departmentId === departmentFilter
        const restaurantMatch = !restaurantFilter || row.restaurantId === restaurantFilter

        const dateMatch = dayjs(row.paidAt).isBetween(startDate, endDate, 'day', '[]')

        return departmentMatch && restaurantMatch && dateMatch
      })
      .sort(
        (a: IPayment, b: IPayment) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
      )
  }, [paymentRes, departmentFilter, restaurantFilter, year, month])

  const columns: GridColDef[] = [
    {
      field: 'paidAt',
      headerName: t('paid_at'),
      flex: 1,
      minWidth: 200,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD A hh:mm'),
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

  return (
    <Box>
      <Breadcrumbs
        title={t('breadcrumbs.title')}
        routes={[
          { title: t('breadcrumbs.management'), path: paths.management.payment },
          { title: t('breadcrumbs.title') },
        ]}
      />

      {/* <Stack direction="row" justifyContent="space-between">
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
      </Stack> */}

      <Card>
        <Stack
          direction="row"
          px={2}
          py={1}
          spacing={1}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <SelectDate year={year} month={month} t={t} onChange={dateChangeHandler} />
        </Stack>

        <DataGrid
          columns={columns}
          rows={filteredRows}
          rowSelectionModel={selected}
          onRowSelectionModelChange={setSelected}
          checkboxSelection
          hideFooter
          loading={paymentIsPending}
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
