import type { SelectChangeEvent } from '@mui/material/Select'
import type { IDashboardMenu, IDashboardPayment } from '@/types/dashboard'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'

import {
  Box,
  Card,
  Stack,
  Select,
  MenuItem,
  useTheme,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material'

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

  const handleYearChange = (e: SelectChangeEvent<number>) => {
    setSelectedYear(Number(e.target.value))
  }

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    setSelectedMonth(Number(e.target.value))
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
      categories: companies, // 기업 이름을 카테고리로 사용
    },
    yaxis: {
      labels: {
        formatter(value: number) {
          return `${value.toLocaleString()}`
        },
      },
    },
    grid: {
      strokeDashArray: 3,
    },
    tooltip: {
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
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        height: '300px',
      }}
    >
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" pt={1}>
          <Typography variant="h6" align="left" sx={{ flex: 1 }} pl={1}>
            {t('company_sales')}
          </Typography>

          <Box display="flex" justifyContent="flex-end" gap={1}>
            <FormControl variant="outlined" size="small">
              <InputLabel id="year-select-label">{t('year')}</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={handleYearChange}
                label={t('year')}
              >
                {[2022, 2023, 2024].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small">
              <InputLabel id="month-select-label">{t('month')}</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label={t('month')}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Chart options={chartOptions} series={chartSeries} type="bar" height={230} />
      </Stack>
    </Card>
  )
}
