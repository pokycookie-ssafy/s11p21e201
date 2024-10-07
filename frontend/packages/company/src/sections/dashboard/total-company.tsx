import axios from 'axios'
import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useState, useEffect } from 'react'

import { Box, Card, Stack, Select, MenuItem, useTheme, FormControl } from '@mui/material'

import { Typography } from '@e201/ui'

interface IDashboardPaymentResponse {
  year: number
  month: number
  totalAmount: number
}

export default function TotalCompany() {
  const [data, setData] = useState<IDashboardPaymentResponse[]>([])
  const [viewType, setViewType] = useState<'월별' | '일별'>('월별')
  const [categories, setCategories] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const theme = useTheme()

  const endDate = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DDTHH:mm:ss') // 저번달 마지막 날
  const startDate = dayjs().subtract(7, 'month').startOf('month').format('YYYY-MM-DDTHH:mm:ss') // 저번달로부터 6개월 전 첫날

  // 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IDashboardPaymentResponse[]>(
          '/companies/dashboards/years/months',
          {
            params: {
              startDate,
              endDate,
            },
          }
        )
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [startDate, endDate])

  useEffect(() => {
    if (data.length > 0) {
      if (viewType === '월별') {
        const newCategories = data.map(
          (item) => `${item.year}-${String(item.month).padStart(2, '0')}`
        )
        const newSeriesData = data.map((item) => item.totalAmount)

        setCategories(newCategories)
        setSeriesData(newSeriesData)
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
      labels: {
        formatter(value: string) {
          return value.replace('-', '/')
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
      name: 'Total Amount',
    },
  ]

  return (
    <Card>
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{viewType === '월별' ? '월별 총액' : '일별 총액'}</Typography>
          <FormControl variant="outlined" size="small">
            <Select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as '월별' | '일별')}
            >
              <MenuItem value="월별">월별</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Chart options={chartOptions} series={chartSeries} type="line" height={200} />
      </Stack>
    </Card>
  )
}
