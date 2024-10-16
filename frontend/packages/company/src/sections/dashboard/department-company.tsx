import dayjs from 'dayjs'
import axios from '@/configs/axios'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, useTheme, Typography } from '@mui/material'

interface DepartmentData {
  departmentId: string
  departmentName: string
  amount: number
}

export default function DepartmentCompany() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [departments, setDepartments] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const theme = useTheme()
  const { t } = useTranslate('dashboard')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get<DepartmentData[]>(
          '/companies/dashboards/months/departments',
          {
            params: {
              startDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
                .startOf('month')
                .format('YYYY-MM-DDTHH:mm:ss'),
              endDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
                .endOf('month')
                .format('YYYY-MM-DDTHH:mm:ss'),
            },
          }
        )
        const sortedDepartments = response.data.sort((a, b) => b.amount - a.amount)

        setDepartments(sortedDepartments.map((item) => item.departmentName))
        setSeriesData(sortedDepartments.map((item) => item.amount))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedYear, selectedMonth])

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
      categories: departments,
      labels: {
        formatter(value: string) {
          return value.length > 4 ? `${value.substring(0, 3)}...` : value
        },
        style: {
          colors:
            theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
        },
      },
    },
    yaxis: {
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
    grid: {
      strokeDashArray: 3,
    },
    tooltip: {
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
      x: {
        formatter(val: number, opts) {
          return departments[opts.dataPointIndex]
        },
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
      name: '',
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
            {t('deparment_amount')}
          </Typography>

          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>
        <Box height={200}>
          {seriesData.length > 0 ? (
            <Chart options={chartOptions} series={chartSeries} type="bar" height={230} />
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
