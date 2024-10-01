import type { ISelectOption } from '@e201/ui'
import type { GridColDef } from '@mui/x-data-grid'
import type { IPaymentResponse } from '@/types/payment'

import dayjs from 'dayjs'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import isBetween from 'dayjs/plugin/isBetween'
import { fNumber } from '@/utils/number-format'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack } from '@mui/material'

import { Select, SelectDate, Typography, Breadcrumbs } from '@e201/ui'

dayjs.extend(isBetween)

const fetchPayments = async () => {
  const payment = await axios.get<IPaymentResponse[]>('/companies/payment')
  return payment.data
}

export default function PaymentManagementView() {
  const { t } = useTranslate('payment')

  const { data: payments, isPending: paymentIsPending } = useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  })

  const [selectedDepartment, setSelectedDepartment] = useState<ISelectOption | null>(null)
  const [selectedStore, setSelectedStore] = useState<ISelectOption | null>(null)

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)

  const dateChangeHandler = (dateYear: number, dateMonth: number) => {
    setYear(dateYear)
    setMonth(dateMonth)
  }

  const departments = useMemo(() => {
    if (!payments) {
      return []
    }

    const departmentSet = new Set<string>()
    const departmentList: ISelectOption[] = []
    payments.forEach((e) => {
      if (!departmentSet.has(e.departmentId)) {
        departmentList.push({ label: e.departmentName, value: e.departmentId })
      }
      departmentSet.add(e.departmentId)
    })
    return departmentList
  }, [payments])

  const stores = useMemo(() => {
    if (!payments) {
      return []
    }

    const storeSet = new Set<string>()
    const storeList: ISelectOption[] = []
    payments.forEach((e) => {
      if (!storeSet.has(e.storeId)) {
        storeList.push({ label: e.storeName, value: e.storeId })
      }
      storeSet.add(e.storeId)
    })
    return storeList
  }, [payments])

  const filteredRows = useMemo(() => {
    if (!payments) {
      return []
    }

    const filterDate = dayjs()
      .year(year)
      .month(month - 1)
    const startDate = filterDate.startOf('month')
    const endDate = filterDate.endOf('month')

    let filtered = [...payments]

    filtered = filtered.filter((payment) =>
      dayjs(payment.paidAt).isBetween(startDate, endDate, 'date', '[]')
    )
    if (selectedDepartment) {
      filtered = filtered.filter((payment) => payment.departmentId === selectedDepartment.value)
    }
    if (selectedStore) {
      filtered = filtered.filter((payment) => payment.storeId === selectedStore.value)
    }
    return filtered
  }, [payments, year, month, selectedDepartment, selectedStore])

  const columns: GridColDef<IPaymentResponse>[] = [
    {
      field: 'departmentName',
      headerName: t('department_name'),
      flex: 1,
      minWidth: 150,
      renderHeader: () => (
        <Typography pl={1} fontSize={14} fontWeight={500}>
          {t('department_name')}
        </Typography>
      ),
      renderCell: (params) => (
        <Stack height={1} pl={1} justifyContent="center">
          <Typography fontSize={14} fontWeight={500}>
            {params.row.departmentName}
          </Typography>
        </Stack>
      ),
    },
    { field: 'employeeName', headerName: t('employee_name'), width: 120 },
    { field: 'employeeId', headerName: t('field.employee_no'), width: 150 },
    { field: 'storeName', headerName: t('store_name'), width: 200 },
    {
      field: 'price',
      headerName: t('price'),
      type: 'number',
      width: 100,
      renderCell: (params) => `${fNumber(params.value)} ${t('unit.won')}`,
    },

    {
      field: 'paidAt',
      headerName: t('paid_at'),
      width: 160,
      resizable: false,
      valueFormatter: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm'),
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

      <Card>
        <Stack
          direction="row"
          px={2}
          py={1}
          spacing={1}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <SelectDate year={year} month={month} t={t} onChange={dateChangeHandler} />
          <Select
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            options={departments}
            placeholder={t('label.select_department')}
            size="small"
          />
          <Select
            value={selectedStore}
            onChange={setSelectedStore}
            options={stores}
            placeholder={t('label.select_store')}
            size="small"
          />
        </Stack>

        <DataGrid
          columns={columns}
          rows={filteredRows}
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
