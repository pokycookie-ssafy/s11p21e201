import type { ISelectOption } from '@e201/ui'
import type { GridColDef } from '@mui/x-data-grid'
import type { IPagination } from '@/types/pagination'
import type { IPayment, IPaymentDetail, IPaymentEmployee } from '@/types/payment'

import dayjs from 'dayjs'
import api from '@/configs/api'
import axios from '@/configs/axios'
import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { getMonthRange } from '@/utils/date'
import isBetween from 'dayjs/plugin/isBetween'
import { fNumber } from '@/utils/number-format'
import { useQuery } from '@tanstack/react-query'

import { DataGrid } from '@mui/x-data-grid'
import { Box, Card, Stack } from '@mui/material'

import { Select, SelectDate, Typography, Breadcrumbs } from '@e201/ui'

dayjs.extend(isBetween)

export default function PaymentListView() {
  const { t } = useTranslate('payment')

  const { user, isCompany } = useAuthStore()

  const [selectedDepartment, setSelectedDepartment] = useState<ISelectOption | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<ISelectOption | null>(null)

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)

  const { start, end } = getMonthRange(year, month - 1)

  const dateChangeHandler = (dateYear: number, dateMonth: number) => {
    setYear(dateYear)
    setMonth(dateMonth)
  }

  const { data: departmentPayments, isPending: departmentPaymentIsPending } = useQuery({
    queryKey: [api.payment.department, start, end, selectedDepartment?.value],
    queryFn: async () => {
      const response = await axios.get<IPagination<IPayment[]>>(
        api.payment.departmentWith(start, end, selectedDepartment?.value)
      )
      return response.data
    },
    enabled: selectedEmployee === null,
  })

  const { data: employeePayments, isPending: employeePaymentIsPending } = useQuery({
    queryKey: [api.payment.employee, start, end, selectedEmployee?.value],
    queryFn: async () => {
      const response = await axios.get<IPaymentEmployee>(
        api.payment.employeeWith(start, end, selectedEmployee?.value)
      )
      return response.data
    },
    enabled: selectedEmployee !== null,
  })

  const departmentOptions = useMemo<ISelectOption[]>(() => {
    if (!isCompany && user && user.departmentId && user.departmentName) {
      setSelectedDepartment({ label: user.departmentName, value: user.departmentId })
      return [{ label: user.departmentName, value: user.departmentId }]
    }
    if (!departmentPayments) {
      return []
    }

    const departmentSet = new Set<string>()
    const departmentList: ISelectOption[] = []

    departmentPayments.content.forEach((e) => {
      if (!departmentSet.has(e.departmentId)) {
        departmentList.push({ label: e.departmentName, value: e.departmentId })
      }
      departmentSet.add(e.departmentId)
    })
    return departmentList
  }, [departmentPayments, isCompany, user])

  const employeeOptions = useMemo<ISelectOption[]>(() => {
    if (!selectedDepartment) {
      return []
    }
    if (!departmentPayments) {
      return []
    }

    const employeeSet = new Set<string>()
    const employeeList: ISelectOption[] = []

    departmentPayments.content.forEach((e) => {
      if (!employeeSet.has(e.employeeId)) {
        employeeList.push({ label: e.employeeName, value: e.employeeId })
      }
      employeeSet.add(e.employeeId)
    })
    return employeeList
  }, [departmentPayments, selectedDepartment])

  const dapartmentPaymentColumns: GridColDef<IPayment>[] = [
    {
      field: 'departmentName',
      headerName: t('field.department_name'),
      flex: 1,
      minWidth: 150,
      renderHeader: () => (
        <Typography pl={1} fontSize={14} fontWeight={500}>
          {t('field.department_name')}
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
    { field: 'employeeName', headerName: t('field.employee_name'), width: 120 },
    { field: 'employeeCode', headerName: t('field.employee_code'), width: 150 },
    {
      field: 'spentAmount',
      headerName: t('field.spent_amount'),
      type: 'number',
      width: 120,
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
    },
    {
      field: 'supportAmount',
      headerName: t('field.support_amount'),
      type: 'number',
      width: 120,
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
    },
  ]

  const employeePaymentColumns: GridColDef<IPaymentDetail>[] = [
    {
      field: 'departmentName',
      headerName: t('field.department_name'),
      flex: 1,
      minWidth: 150,
      renderHeader: () => (
        <Typography pl={1} fontSize={14} fontWeight={500}>
          {t('field.department_name')}
        </Typography>
      ),
      renderCell: () => (
        <Stack height={1} pl={1} justifyContent="center">
          <Typography fontSize={14} fontWeight={500}>
            {employeePayments?.departmentName}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'employeeName',
      headerName: t('field.employee_name'),
      width: 120,
      valueGetter: () => employeePayments?.employeeName,
    },
    {
      field: 'employeeCode',
      headerName: t('field.employee_code'),
      width: 150,
      valueGetter: () => employeePayments?.employeeCode,
    },
    {
      field: 'storeName',
      headerName: t('field.store_name'),
      width: 150,
    },
    {
      field: 'spentAmount',
      headerName: t('field.payment_amount'),
      type: 'number',
      width: 120,
      valueFormatter: (value: number) => `${fNumber(value)} ${t('unit.won')}`,
    },
    {
      field: 'createdAt',
      headerName: t('field.payment_date'),
      type: 'dateTime',
      width: 150,
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
            options={departmentOptions}
            placeholder={t('label.select_department')}
            size="small"
            disabled={!isCompany}
          />
          <Select
            value={selectedEmployee}
            onChange={setSelectedEmployee}
            options={employeeOptions}
            placeholder={t('label.select_employee')}
            size="small"
          />
        </Stack>

        {selectedEmployee ? (
          <DataGrid
            columns={employeePaymentColumns}
            rows={employeePayments?.payments.content ?? []}
            hideFooter
            loading={selectedEmployee ? departmentPaymentIsPending : employeePaymentIsPending}
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
        ) : (
          <DataGrid
            columns={dapartmentPaymentColumns}
            rows={departmentPayments?.content ?? []}
            getRowId={(row) => row.employeeId}
            hideFooter
            loading={selectedEmployee ? departmentPaymentIsPending : employeePaymentIsPending}
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
        )}
      </Card>
    </Box>
  )
}
