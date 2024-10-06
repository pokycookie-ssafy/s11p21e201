import type { IDashboardPaymentCompany } from '@/types/dashboard-payment-company'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, useTheme, Typography } from '@mui/material'

interface RestaurantCompanyProps {
  data: IDashboardPaymentCompany[]
}

export default function RestaurantCompany({ data }: RestaurantCompanyProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [restaurants, setRestaurants] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const { t } = useTranslate('dashboard')
  const theme = useTheme()

  useEffect(() => {
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.createdAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    const restaurantTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      const { storeName, price } = payment
      restaurantTotals[storeName] = (restaurantTotals[storeName] || 0) + price
    })

    const sortedRestaurants = Object.entries(restaurantTotals).sort(
      ([, totalA], [, totalB]) => totalB - totalA
    )

    setRestaurants(sortedRestaurants.map(([name]) => name))
    setSeriesData(sortedRestaurants.map(([, total]) => total))
  }, [data, selectedYear, selectedMonth])

  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    theme: {
      palette: 'palette1',
    },
    labels: restaurants,
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}${t('won')}`
        },
      },
    },
    legend: {
      labels: {
        colors: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400], // Set label colors based on theme mode
      },
    },
  }

  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        height: '300px',
      }}
    >
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={1}>
          <Typography variant="h6" align="left" sx={{ flex: 1 }} pl={1}>
            {t('restaurant_amount')}
          </Typography>
          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>

        <Chart options={chartOptions} series={seriesData} type="pie" height={230} />
      </Stack>
    </Card>
  )
}
