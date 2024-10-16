import dayjs from 'dayjs'
import axios from '@/configs/axios'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, Select, MenuItem, useTheme, FormControl } from '@mui/material'

import { Typography } from '@e201/ui'

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

export default function TotalCompany() {
  const { t } = useTranslate('dashboard')
  const [data, setData] = useState<IDashboardPaymentResponse[]>([])
  const [dailyData, setDailyData] = useState<IDashboardPaymentDailyResponse[]>([])
  const [viewType, setViewType] = useState<'month' | 'day'>('day')
  const [categories, setCategories] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year())
  const [selectedMonth, setSelectedMonth] = useState<number>(dayjs().month() + 1)

  const theme = useTheme()

  const endDate = dayjs().format('YYYY-MM-DDTHH:mm:ss')
  const startDate = dayjs().subtract(6, 'month').startOf('month').format('YYYY-MM-DDTHH:mm:ss')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (viewType === 'month') {
      fetchData()
    }
  }, [startDate, endDate, viewType])

  useEffect(() => {
    const fetchDailyData = async () => {
      setLoading(true)
      const dailyStartDate = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
        .startOf('month')
        .format('YYYY-MM-DDTHH:mm:ss')
      const dailyEndDate = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
        .endOf('month')
        .format('YYYY-MM-DDTHH:mm:ss')

      try {
        const response = await axios.get<IDashboardPaymentDailyResponse[]>(
          '/companies/dashboards/years/days',
          {
            params: {
              startDate: dailyStartDate,
              endDate: dailyEndDate,
            },
          }
        )
        setDailyData(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (viewType === 'day') {
      fetchDailyData()
    }
  }, [selectedYear, selectedMonth, viewType])

  useEffect(() => {
    if (viewType === 'month') {
      const newCategories = data.map(
        (item) => `${item.year}-${String(item.month).padStart(2, '0')}`
      )
      const newSeriesData = data.map((item) => item.totalAmount)

      setCategories(newCategories)
      setSeriesData(newSeriesData)
    }

    if (viewType === 'day') {
      const newCategories = dailyData.map(
        (item) =>
          `${item.year}-${String(item.month).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`
      )
      const newSeriesData = dailyData.map((item) => item.totalAmount)

      setCategories(newCategories)
      setSeriesData(newSeriesData)
    }
  }, [data, dailyData, viewType])

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

        <Box height={150}>
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
        </Box>
      </Stack>
    </Card>
  )
}
