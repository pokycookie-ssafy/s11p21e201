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
  const [yesterdayChange, setYesterdayChange] = useState(0)
  const [lastMonthChange, setLastMonthChange] = useState(0)
  const [loading, setLoading] = useState(true)

  const { t } = useTranslate('dashboard')
  useEffect(() => {
    const fetchData = async () => {
      const now = dayjs()
      const today = now.format('YYYY-MM-DD')
      const yesterday = now.subtract(1, 'day').format('YYYY-MM-DD')
      const startOfCurrentMonth = now.startOf('month').format('YYYY-MM-DDTHH:mm:ss')
      const endOfCurrentMonth = now.endOf('month').format('YYYY-MM-DDTHH:mm:ss')
      const startOfLastMonth = now
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DDTHH:mm:ss')
      const endOfLastMonth = now.subtract(1, 'month').endOf('month').format('YYYY-MM-DDTHH:mm:ss')

      // 오늘과 어제 데이터
      const startOfToday = dayjs(today).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
      const endOfToday = dayjs(today).endOf('day').format('YYYY-MM-DDTHH:mm:ss')
      const startOfYesterday = dayjs(yesterday).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
      const endOfYesterday = dayjs(yesterday).endOf('day').format('YYYY-MM-DDTHH:mm:ss')

      try {
        // 이번 달 총액과 저번 달 총액 가져오기
        const monthResponse = await axios.get<IDashboardPaymentResponse[]>(
          '/companies/dashboards/years/months',
          {
            params: {
              startDate: startOfLastMonth,
              endDate: endOfCurrentMonth,
            },
          }
        )

        // 이번 달 총액
        const currentMonthData = monthResponse.data.find(
          (item) => item.year === now.year() && item.month === now.month() + 1
        )
        const currentMonthTotal = currentMonthData ? currentMonthData.totalAmount : 0
        setMonthTotal(currentMonthTotal)

        // 저번 달 총액
        const lastMonthData = monthResponse.data.find(
          (item) =>
            item.year === now.subtract(1, 'month').year() &&
            item.month === now.subtract(1, 'month').month() + 1
        )
        const lastMonthTotal = lastMonthData ? lastMonthData.totalAmount : 0

        // 저번 달과 이번 달의 변화율 계산
        const lastMonthPercentageChange =
          lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0
        setLastMonthChange(lastMonthPercentageChange)

        // 오늘과 어제 총액 가져오기
        const dayResponse = await axios.get<IDashboardPaymentDailyResponse[]>(
          '/companies/dashboards/years/days',
          {
            params: {
              startDate: startOfYesterday,
              endDate: endOfToday,
            },
          }
        )

        // 오늘 총액
        const todayData = dayResponse.data.find(
          (item) => dayjs(`${item.year}-${item.month}-${item.day}`).format('YYYY-MM-DD') === today
        )
        const todayTotalAmount = todayData ? todayData.totalAmount : 0
        setTodayTotal(todayTotalAmount)

        // 어제 총액
        const yesterdayData = dayResponse.data.find(
          (item) =>
            dayjs(`${item.year}-${item.month}-${item.day}`).format('YYYY-MM-DD') === yesterday
        )
        const yesterdayTotalAmount = yesterdayData ? yesterdayData.totalAmount : 0

        // 어제와 오늘의 변화율 계산
        const yesterdayPercentageChange =
          yesterdayTotalAmount > 0
            ? ((todayTotalAmount - yesterdayTotalAmount) / yesterdayTotalAmount) * 100
            : 0
        setYesterdayChange(yesterdayPercentageChange)
      } catch (error) {
        console.error('Error fetching data:', error)
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
        {/* <Stack>
          <Typography variant="h6" pb={1}>
            {t('this_month_average')}
          </Typography>
          <Typography variant="h3">
            {averagePerTransaction.toLocaleString()}
            {t('won')}
          </Typography>
        </Stack> */}
      </Card>
    </Stack>
  )
}
