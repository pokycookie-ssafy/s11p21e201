import type { IDashboardPayment } from '@/types/dashboard-payment'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import React, { useState, useEffect } from 'react'

import {
  Box,
  Card,
  Stack,
  Select,
  MenuItem,
  useTheme,
  Typography,
  FormControl,
} from '@mui/material'

interface TotalCompanyProps {
  data: IDashboardPayment[]
}

export default function TotalCompany({ data }: TotalCompanyProps) {
  const [viewType, setViewType] = useState<'월별' | '일별'>('월별')
  const [categories, setCategories] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [xaxisRange, setXaxisRange] = useState<{ min?: number; max?: number }>({})

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

        // 처음에는 마지막 30일만 보여주기
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
      min: xaxisRange.min, // 최소 범위 (시작)
      max: xaxisRange.max, // 최대 범위 (끝)
    },
    yaxis: {
      min: 0,
      labels: {
        formatter(value: number) {
          return `${value.toLocaleString()}`
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
          return `${value.toLocaleString()}원`
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
    <Card>
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ flex: 1, textAlign: 'center' }}>
            {viewType} 총 결제액
          </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              labelId="view-type-select-label"
              value={viewType}
              onChange={(e) => setViewType(e.target.value as '월별' | '일별')}
            >
              <MenuItem value="월별">월별</MenuItem>
              <MenuItem value="일별">일별</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Chart options={chartOptions} series={chartSeries} type="line" height={200} />
      </Stack>
    </Card>
  )
}
