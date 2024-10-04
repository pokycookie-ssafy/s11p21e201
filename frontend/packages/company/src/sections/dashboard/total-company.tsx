import type { IDashboardPayment } from '@/types/dashboard-payment'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'

import { Box, Card, Stack, Select, MenuItem, useTheme, FormControl } from '@mui/material'

import { Typography } from '@e201/ui'

interface TotalCompanyProps {
  data: IDashboardPayment[]
}

export default function TotalCompany({ data }: TotalCompanyProps) {
  const [viewType, setViewType] = useState<'월별' | '일별'>('월별')
  const [categories, setCategories] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [xaxisRange, setXaxisRange] = useState<{ min?: number; max?: number }>({})

  const { t } = useTranslate('dashboard')
  const theme = useTheme()

  useEffect(() => {
    if (data.length > 0) {
      if (viewType === '월별') {
        const monthlyTotals: { [key: string]: number } = {}

        data.forEach((payment) => {
          const month = dayjs(payment.paidAt).format('YYYY-MM')
          if (monthlyTotals[month]) {
            monthlyTotals[month] += payment.price
          } else {
            monthlyTotals[month] = payment.price
          }
        })

        const newCategories = Object.keys(monthlyTotals).sort()
        const newSeriesData = newCategories.map((month) => monthlyTotals[month])

        setCategories(newCategories)
        setSeriesData(newSeriesData)
        setXaxisRange({})
      } else {
        const dailyTotals: { [key: string]: number } = {}

        data.forEach((payment) => {
          const day = dayjs(payment.paidAt).format('YYYY-MM-DD')
          if (dailyTotals[day]) {
            dailyTotals[day] += payment.price
          } else {
            dailyTotals[day] = payment.price
          }
        })

        const newCategories = Object.keys(dailyTotals).sort()
        const newSeriesData = newCategories.map((day) => dailyTotals[day])

        setCategories(newCategories)
        setSeriesData(newSeriesData)

        const last30DaysIndex = newCategories.length > 15 ? newCategories.length - 15 : 0
        setXaxisRange({ min: last30DaysIndex, max: newCategories.length - 1 })
      }
    }
  }, [data, viewType])

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
      min: xaxisRange.min,
      max: xaxisRange.max,
      labels: {
        formatter(value: string) {
          if (viewType === '일별') {
            return dayjs(value).format('MM/DD')
          }
          return dayjs(value).format('YYYY/MM')
        },
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
    },
    yaxis: {
      min: 0,

      labels: {
        formatter(value: number) {
          if (value === 0) {
            return ''
          }
          return `${value.toLocaleString()}`
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

  return (
    <Card
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
            {viewType === '월별' ? t('total_month') : t('total_day')}
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ pr: 1 }}>
            <Select
              labelId="view-type-select-label"
              value={viewType}
              onChange={(e) => setViewType(e.target.value as '월별' | '일별')}
            >
              <MenuItem value="월별">{t('monthly')}</MenuItem>
              <MenuItem value="일별">{t('daily')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Chart options={chartOptions} series={chartSeries} type="line" height={200} />
      </Stack>
    </Card>
  )
}
