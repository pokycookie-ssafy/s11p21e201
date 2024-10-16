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

import { Iconify, SelectDate, Typography } from '@e201/ui'

export default function PaymentsView() {
  const { t } = useTranslate('payment')

  const { user } = useAuthStore()

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)

  const { start, end } = getMonthRange(selectedYear, selectedMonth - 1)

  const { data: payments, isPending } = useQuery({
    queryKey: [api.payments, user?.employeeId, start, end],
    queryFn: async () => {
      const response = await axios.get<IPayment[]>(api.paymentWith(start, end))
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
        <Stack justifyContent="center" alignItems="center" width={1} height={200}>
          <CircularProgress />
        </Stack>
      )
    }
    if (!payments || payments.length === 0) {
      return (
        <Stack
          justifyContent="center"
          alignItems="center"
          width={1}
          height={200}
          color="text.secondary"
          spacing={2}
        >
          <Iconify icon="fa-regular:sad-tear" width={40} />
          <Typography variant="subtitle2">{t('info.no_rows')}</Typography>
        </Stack>
      )
    }
    return payments.map((payment) => <PaymentList key={payment.id} payment={payment} />)
  }, [isPending, payments, t])

  return (
    <Box px={1} py={2}>
      <Stack direction="row" mb={2}>
        <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={dateChangeHandler} />
      </Stack>
      <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />}>{listRender}</Stack>
    </Box>
  )
}
