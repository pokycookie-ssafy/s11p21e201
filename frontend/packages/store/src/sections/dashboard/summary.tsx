import type { IDashboardMenu, IDashboardPayment } from '@/types/dashboard'

import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

import { Card, Stack, Typography } from '@mui/material'

interface DashboardSummaryProps {
  data: IDashboardPayment[]
}

export default function RestaurantDashboardSummary({ data }: DashboardSummaryProps) {
  const [todayTotal, setTodayTotal] = useState(0)
  const [monthTotal, setMonthTotal] = useState(0)
  const [averagePerTransaction, setAveragePerTransaction] = useState(0)
  const [yesterdayChange, setYesterdayChange] = useState(0)
  const [lastMonthChange, setLastMonthChange] = useState(0)

  useEffect(() => {
    const now = dayjs()
    const today = now.format('YYYY-MM-DD')
    const yesterday = now.subtract(1, 'day').format('YYYY-MM-DD')
    const currentMonth = now.format('YYYY-MM')
    const lastMonth = now.subtract(1, 'month').format('YYYY-MM')

    // 오늘의 매출 금액
    const todayData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM-DD') === today
    )
    const todayTotalAmount = todayData.reduce(
      (total, payment) => total + payment.menus.reduce((sum, menu) => sum + menu.price, 0),
      0
    )
    setTodayTotal(todayTotalAmount)

    // 이번 달의 매출 금액
    const monthData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM') === currentMonth
    )
    const monthTotalAmount = monthData.reduce(
      (total, payment) => total + payment.menus.reduce((sum, menu) => sum + menu.price, 0),
      0
    )
    setMonthTotal(monthTotalAmount)

    // 이번 달 평균 결제 금액 (총 매출 금액 / 결제 횟수)
    const transactionCount = monthData.length
    const average = transactionCount > 0 ? Math.round(monthTotalAmount / transactionCount) : 0
    setAveragePerTransaction(average)

    // 어제의 매출 금액 계산
    const yesterdayData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM-DD') === yesterday
    )
    const yesterdayTotalAmount = yesterdayData.reduce(
      (total, payment) => total + payment.menus.reduce((sum, menu) => sum + menu.price, 0),
      0
    )

    // 어제와 오늘의 변화율 계산
    const yesterdayPercentageChange =
      yesterdayTotalAmount > 0
        ? ((todayTotalAmount - yesterdayTotalAmount) / yesterdayTotalAmount) * 100
        : 0
    setYesterdayChange(yesterdayPercentageChange)

    // 저번 달의 매출 금액 계산
    const lastMonthData = data.filter(
      (payment) => dayjs(payment.createdAt).format('YYYY-MM') === lastMonth
    )
    const lastMonthTotalAmount = lastMonthData.reduce(
      (total, payment) => total + payment.menus.reduce((sum, menu) => sum + menu.price, 0),
      0
    )

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
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            이번 달 매출 총액
          </Typography>
          <Typography variant="h3">{monthTotal.toLocaleString()}원</Typography>
          <Typography variant="body2" color={lastMonthChange >= 0 ? 'green' : 'red'}>
            {lastMonthChange >= 0
              ? `▲ ${lastMonthChange.toFixed(2)}% 증가`
              : `▼ ${lastMonthChange.toFixed(2)}% 감소`}
          </Typography>
        </Stack>
      </Card>

      <Card
        sx={{
          width: '32%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            오늘 매출 총액
          </Typography>
          <Typography variant="h3">{todayTotal.toLocaleString()}원</Typography>
          <Typography variant="body2" color={yesterdayChange >= 0 ? 'green' : 'red'}>
            {yesterdayChange >= 0
              ? `▲ ${yesterdayChange.toFixed(2)}% 증가`
              : `▼ ${yesterdayChange.toFixed(2)}% 감소`}
          </Typography>
        </Stack>
      </Card>

      <Card
        sx={{
          width: '32%',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          height: '130px',
          p: 2,
        }}
      >
        <Stack>
          <Typography variant="h6" pb={1}>
            이번 달 평균 결제 금액
          </Typography>
          <Typography variant="h3">{averagePerTransaction.toLocaleString()}원</Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
