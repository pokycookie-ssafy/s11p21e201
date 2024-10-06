import type { IPayment } from '@/types/payment'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import { useMemo, useState } from 'react'
import { getMonthRange } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import PaymentList from '@/sections/payment/payment-list'

import { Box, Stack, Divider, CircularProgress } from '@mui/material'

import { SelectDate } from '@e201/ui'

export default function PaymentsView() {
  const { t } = useTranslate('payment')

  const { user } = useAuthStore()

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  const { start, end } = getMonthRange(selectedYear, selectedMonth)

  const { data: payments, isPending } = useQuery({
    queryKey: [api.payments, user?.employeeId, start, end],
    queryFn: async () => {
      const response = await axios.get<IPayment[]>(api.payments)
      return response.data
    },
  })

  const dateChangeHandler = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  const listRender = useMemo(() => {
    if (isPending) {
      return (
        <Box>
          <CircularProgress />
        </Box>
      )
    }
    if (!payments) {
      return <Box>no rows</Box>
    }
    return payments.map((payment) => <PaymentList key={payment.id} payment={payment} />)
  }, [isPending, payments])

  return (
    <Box px={1} py={2}>
      <Stack direction="row" mb={2}>
        <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={dateChangeHandler} />
      </Stack>
      <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />}>{listRender}</Stack>
    </Box>
  )
}
