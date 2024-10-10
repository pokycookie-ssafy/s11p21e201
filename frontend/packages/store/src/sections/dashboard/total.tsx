import type { IDashboardPayment } from '@/types/dashboard'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, Select, MenuItem, useTheme, FormControl } from '@mui/material'

import { Typography } from '@e201/ui'

interface TotalCompanyProps {
  data: IDashboardPayment[]
}

export default function TotalRestaurant({ data }: TotalCompanyProps) {
  const [viewType, setViewType] = useState<'month' | 'day'>('day')
  const [categories, setCategories] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year())
  const [selectedMonth, setSelectedMonth] = useState<number>(4)

  const { t } = useTranslate('dashboard')
  const theme = useTheme()

  useEffect(() => {
    if (data.length > 0) {
      if (viewType === 'month') {
        const monthlyTotals: { [key: string]: number } = {}

        data.forEach((payment) => {
          const month = dayjs(payment.createdAt).format('YYYY-MM')
          const totalPrice = payment.menus.reduce((total, menu) => total + menu.price, 0)

          if (monthlyTotals[month]) {
            monthlyTotals[month] += totalPrice
          } else {
            monthlyTotals[month] = totalPrice
          }
        })

        const newCategories = Object.keys(monthlyTotals).sort()
        const newSeriesData = newCategories.map((month) => monthlyTotals[month])

        setCategories(newCategories)
        setSeriesData(newSeriesData)
      } else {
        const dailyTotals: { [key: string]: number } = {}

        data.forEach((payment) => {
          const day = dayjs(payment.createdAt).format('YYYY-MM-DD')
          const totalPrice = payment.menus.reduce((total, menu) => total + menu.price, 0)

          if (
            dayjs(payment.createdAt).year() === selectedYear &&
            dayjs(payment.createdAt).month() + 1 === selectedMonth
          ) {
            if (dailyTotals[day]) {
              dailyTotals[day] += totalPrice
            } else {
              dailyTotals[day] = totalPrice
            }
          }
        })

        const newCategories = Object.keys(dailyTotals).sort()
        const newSeriesData = newCategories.map((day) => dailyTotals[day])

        setCategories(newCategories)
        setSeriesData(newSeriesData)
      }
    }
  }, [data, viewType, selectedYear, selectedMonth])

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories,
      labels: {
        // show: false,
        formatter(value: string) {
          if (viewType === 'day') {
            return dayjs(value).format('D')
          }
          return dayjs(value).format('YYYY/MM')
        },
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
      // axisBorder: {
      //   show: false,
      // },
      // axisTicks: {
      //   show: false,
      // },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter(value: number) {
          return value === 0 ? '' : `${value.toLocaleString()}`
        },
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    grid: {
      strokeDashArray: 3,
    },
    tooltip: {
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
      x: {
        show: false,
      },
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}${t('won')}`
        },
      },
    },
  }

  const chartSeries = [
    {
      data: seriesData,
      name: '',
    },
  ]
  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
  }

  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        height: '280px',
      }}
    >
      <Stack p={1} sx={{ position: 'relative' }} spacing={1}>
        <Box display="flex" alignItems="center" sx={{ position: 'relative' }}>
          {viewType === 'day' && (
            <Box sx={{ position: 'absolute', left: 2, top: 2 }}>
              <SelectDate
                year={selectedYear}
                month={selectedMonth}
                t={t}
                onChange={handleDateChange}
              />
            </Box>
          )}

          <Typography variant="h6" sx={{ margin: '0 auto', textAlign: 'center', pt: 1 }}>
            {viewType === 'month' ? t('total_month') : t('total_day')}
          </Typography>

          <FormControl
            variant="outlined"
            size="small"
            sx={{ position: 'absolute', right: 2, minWidth: 120, top: 2 }}
          >
            <Select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as 'month' | 'day')}
            >
              <MenuItem value="month">{t('monthly')}</MenuItem>
              <MenuItem value="day">{t('daily')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack height={150}>
          {seriesData.length > 0 ? (
            <Chart options={chartOptions} series={chartSeries} type="line" height={200} />
          ) : (
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                color: theme.palette.grey[500],
              }}
            >
              {t('no_data')}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}
