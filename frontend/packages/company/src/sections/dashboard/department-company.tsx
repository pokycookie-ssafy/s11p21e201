import type { SelectChangeEvent } from '@mui/material/Select'
import type { IDashboardPayment } from '@/types/dashboard-payment'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
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

interface DepartmentCompanyProps {
  data: IDashboardPayment[]
}

export default function DepartmentCompany({ data }: DepartmentCompanyProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [departments, setDepartments] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const theme = useTheme()

  useEffect(() => {
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.paidAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    const departmentTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      const { departmentName, price } = payment
      departmentTotals[departmentName] = (departmentTotals[departmentName] || 0) + price
    })

    const sortedDepartments = Object.entries(departmentTotals).sort(
      ([, totalA], [, totalB]) => totalB - totalA
    )

    setDepartments(sortedDepartments.map(([name]) => name))
    setSeriesData(sortedDepartments.map(([, total]) => total))
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
      categories: departments,
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
          return `${value.toLocaleString()}원`
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
    <Card>
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="left" sx={{ flex: 1 }} pl={1}>
            부서별 식대 사용액
          </Typography>

          <Box display="flex" justifyContent="flex-end">
            <FormControl variant="outlined" size="small">
              <InputLabel id="year-select-label">연도</InputLabel>
              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={handleYearChange}
                label="연도"
              >
                {[2022, 2023, 2024].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="month-select-label">월</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="월"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}월
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Chart options={chartOptions} series={chartSeries} type="bar" height={200} />
      </Stack>
    </Card>
  )
}
