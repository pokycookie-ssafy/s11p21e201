import type { IDashboardPaymentCompany } from '@/types/dashboard-payment-company'

import dayjs from 'dayjs'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'

import { Card, Stack, Typography } from '@mui/material'

interface DashboardSummaryProps {
  data: IDashboardPaymentCompany[]
}

export default function DashboardSummary({ data }: DashboardSummaryProps) {
  const [todayTotal, setTodayTotal] = useState(0)
  const [monthTotal, setMonthTotal] = useState(0)
  const [averagePerTransaction, setAveragePerTransaction] = useState(0)
  const [yesterdayChange, setYesterdayChange] = useState(0)
  const [lastMonthChange, setLastMonthChange] = useState(0)

  const { t } = useTranslate('dashboard')
  useEffect(() => {
    const now = dayjs()
    const today = now.format('YYYY-MM-DD')
    const yesterday = now.subtract(1, 'day').format('YYYY-MM-DD')
    const currentMonth = now.format('YYYY-MM')
    const lastMonth = now.subtract(1, 'month').format('YYYY-MM')

    // 오늘의 결제 금액
    const todayData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM-DD') === today
    )
    const todayTotalAmount = todayData.reduce((total, payment) => total + payment.price, 0)
    setTodayTotal(todayTotalAmount)

    // 이번 달의 결제 금액
    const monthData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM') === currentMonth
    )
    const monthTotalAmount = monthData.reduce((total, payment) => total + payment.price, 0)
    setMonthTotal(monthTotalAmount)

    // 이번 달 평균 결제 금액 (총 결제 금액 / 결제 횟수)
    const transactionCount = monthData.length
    const average = transactionCount > 0 ? Math.round(monthTotalAmount / transactionCount) : 0
    setAveragePerTransaction(average)

    // 어제의 결제 금액 계산
    const yesterdayData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM-DD') === yesterday
    )
    const yesterdayTotalAmount = yesterdayData.reduce((total, payment) => total + payment.price, 0)

    // 어제와 오늘의 변화율 계산
    const yesterdayPercentageChange =
      yesterdayTotalAmount > 0
        ? ((todayTotalAmount - yesterdayTotalAmount) / yesterdayTotalAmount) * 100
        : 0
    setYesterdayChange(yesterdayPercentageChange)

    // 저번 달의 결제 금액 계산
    const lastMonthData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM') === lastMonth
    )
    const lastMonthTotalAmount = lastMonthData.reduce((total, payment) => total + payment.price, 0)

    // 저번 달과 이번 달의 변화율 계산
    const lastMonthPercentageChange =
      lastMonthTotalAmount > 0
        ? ((monthTotalAmount - lastMonthTotalAmount) / lastMonthTotalAmount) * 100
        : 0
    setLastMonthChange(lastMonthPercentageChange)
  }, [data])

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
      <Card
        sx={{
          width: '32%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            {t('this_month_total')}
          </Typography>
          <Typography variant="h3">
            {monthTotal.toLocaleString()}
            {t('won')}
          </Typography>
          <Typography variant="body2" color={lastMonthChange >= 0 ? 'green' : 'red'}>
            {lastMonthChange >= 0
              ? `▲ ${lastMonthChange.toFixed(2)}% ${t('increase')}`
              : `▼ ${lastMonthChange.toFixed(2)}% ${t('decrease')}`}
          </Typography>
        </Stack>
      </Card>

      <Card
        sx={{
          width: '32%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            {t('today_total')}
          </Typography>
          <Typography variant="h3">
            {todayTotal.toLocaleString()}
            {t('won')}
          </Typography>
          <Typography variant="body2" color={yesterdayChange >= 0 ? 'green' : 'red'}>
            {yesterdayChange >= 0
              ? `▲ ${yesterdayChange.toFixed(2)}% ${t('increase')}`
              : `▼ ${yesterdayChange.toFixed(2)}% ${t('decrease')}`}
          </Typography>
        </Stack>
      </Card>

      <Card
        sx={{
          width: '32%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            {t('this_month_average')}
          </Typography>
          <Typography variant="h3">
            {averagePerTransaction.toLocaleString()}
            {t('won')}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
