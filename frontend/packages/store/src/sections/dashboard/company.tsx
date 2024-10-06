import type { IDashboardMenu, IDashboardPayment } from '@/types/dashboard'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, useTheme, Typography } from '@mui/material'

interface CompanySalesProps {
  data: IDashboardPayment[]
}

export default function CompanySales({ data }: CompanySalesProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [companies, setCompanies] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const theme = useTheme()
  const { t } = useTranslate('dashboard')

  useEffect(() => {
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.createdAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    const companyTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      const { companyName, menus } = payment
      const totalMenuPrice = menus.reduce((sum, menu) => sum + menu.price, 0)

      companyTotals[companyName] = (companyTotals[companyName] || 0) + totalMenuPrice
    })

    const sortedCompanies = Object.entries(companyTotals).sort(
      ([, totalA], [, totalB]) => totalB - totalA
    )

    setCompanies(sortedCompanies.map(([name]) => name))
    setSeriesData(sortedCompanies.map(([, total]) => total))
  }, [data, selectedYear, selectedMonth])

  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [theme.palette.primary.light],
    xaxis: {
      categories: companies,
      labels: {
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
    },
    yaxis: {
      labels: {
        formatter(value: number) {
          return `${value.toLocaleString()}`
        },
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
    },
    grid: {
      strokeDashArray: 3,
    },
    tooltip: {
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}${t('won')}`
        },
      },
    },
  }

  const chartSeries = [
    {
      name: t('total_sales'),
      data: seriesData,
    },
  ]

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
            {t('company_sales')}
          </Typography>

          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>

        <Chart options={chartOptions} series={chartSeries} type="bar" height={230} />
      </Stack>
    </Card>
  )
}
