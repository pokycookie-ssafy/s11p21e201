import dayjs from 'dayjs'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'

import { Card, Stack, Typography } from '@mui/material'

interface IDashboardPaymentResponse {
  year: number
  month: number
  totalAmount: number
}

interface IDashboardPaymentDailyResponse {
  year: number
  month: number
  day: number
  totalAmount: number
}

export default function DashboardSummary() {
  const [todayTotal, setTodayTotal] = useState(0)
  const [monthTotal, setMonthTotal] = useState(0)
  const [lastMonthTotal, setLastMonthTotal] = useState(0)

  const [yesterdayChange, setYesterdayChange] = useState(0)
  const [lastMonthChange, setLastMonthChange] = useState(0)
  const [loading, setLoading] = useState(true)

  const { t } = useTranslate('dashboard')

  useEffect(() => {
    const fetchData = async () => {
      const now = dayjs()

      const startOfCurrentMonth = now.startOf('month').format('YYYY-MM-DDTHH:mm:ss')
      const endOfToday = now.format('YYYY-MM-DDTHH:mm:ss')

      const startOfLastMonth = now
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DDTHH:mm:ss')
      const endOfSameDayLastMonth = now
        .subtract(1, 'month')
        .date(now.date())
        .endOf('day')
        .format('YYYY-MM-DDTHH:mm:ss')

      const startOfToday = now.startOf('day').format('YYYY-MM-DDTHH:mm:ss')
      const nowFormatted = now.format('YYYY-MM-DDTHH:mm:ss')

      const startOfYesterday = now.subtract(1, 'day').startOf('day').format('YYYY-MM-DDTHH:mm:ss')
      const endOfYesterday = now
        .subtract(1, 'day')
        .set('hour', now.hour())
        .set('minute', now.minute())
        .set('second', now.second())
        .format('YYYY-MM-DDTHH:mm:ss')

      try {
        const currentMonthResponse = await axios.get<IDashboardPaymentResponse[]>(
          '/companies/dashboards/years/months',
          {
            params: {
              startDate: startOfCurrentMonth,
              endDate: endOfToday,
            },
          }
        )
        const currentMonthTotal = currentMonthResponse.data[0]?.totalAmount || 0
        setMonthTotal(currentMonthTotal)

        const lastMonthResponse = await axios.get<IDashboardPaymentResponse[]>(
          '/companies/dashboards/years/months',
          {
            params: {
              startDate: startOfLastMonth,
              endDate: endOfSameDayLastMonth,
            },
          }
        )
        const lastMonthTotalAmount = lastMonthResponse.data[0]?.totalAmount || 0
        setLastMonthTotal(lastMonthTotalAmount)

        const lastMonthPercentageChange =
          lastMonthTotalAmount > 0
            ? ((currentMonthTotal - lastMonthTotalAmount) / lastMonthTotalAmount) * 100
            : 0
        setLastMonthChange(lastMonthPercentageChange)

        const todayResponse = await axios.get<IDashboardPaymentDailyResponse[]>(
          '/companies/dashboards/years/days',
          {
            params: {
              startDate: startOfToday,
              endDate: nowFormatted,
            },
          }
        )
        const todayTotalAmount = todayResponse.data[0]?.totalAmount || 0
        setTodayTotal(todayTotalAmount)

        const yesterdayResponse = await axios.get<IDashboardPaymentDailyResponse[]>(
          '/companies/dashboards/years/days',
          {
            params: {
              startDate: startOfYesterday,
              endDate: endOfYesterday,
            },
          }
        )
        const yesterdayTotalAmount = yesterdayResponse.data[0]?.totalAmount || 0

        const yesterdayPercentageChange =
          yesterdayTotalAmount > 0
            ? ((todayTotalAmount - yesterdayTotalAmount) / yesterdayTotalAmount) * 100
            : 0
        setYesterdayChange(yesterdayPercentageChange)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
              ? `${t('last_month_increase', { change: lastMonthChange.toFixed(2) })}`
              : `${t('last_month_decrease', { change: lastMonthChange.toFixed(2) })}`}
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
              ? `${t('yesterday_increase', { change: yesterdayChange.toFixed(2) })}`
              : `${t('yesterday_decrease', { change: yesterdayChange.toFixed(2) })}`}
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
            {t('this_month_payment')}{' '}
          </Typography>
          <Typography variant="h3">
            {lastMonthTotal.toLocaleString()}
            {t('won')}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  )
}
