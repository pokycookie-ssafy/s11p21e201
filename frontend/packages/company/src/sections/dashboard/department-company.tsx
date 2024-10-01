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

  useEffect(() => {
    // 선택한 연도와 월에 해당하는 데이터 필터링
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.paidAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    // 부서별 식대 합계 계산
    const departmentTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      const { departmentName, price } = payment
      departmentTotals[departmentName] = (departmentTotals[departmentName] || 0) + price
    })

    // 상위 7개 부서만 표시
    const sortedDepartments = Object.entries(departmentTotals)
      .sort(([, totalA], [, totalB]) => totalB - totalA) // 총액이 높은 순으로 정렬
      .slice(0, 5) // 상위 7개 부서 선택

    setDepartments(sortedDepartments.map(([name]) => name))
    setSeriesData(sortedDepartments.map(([, total]) => total))
  }, [data, selectedYear, selectedMonth])

  // 연도 및 월 선택 처리
  const handleYearChange = (e: SelectChangeEvent<number>) => {
    setSelectedYear(Number(e.target.value)) // SelectChangeEvent는 string 타입이므로 변환 필요
  }

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    setSelectedMonth(Number(e.target.value)) // SelectChangeEvent는 string 타입이므로 변환 필요
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
    xaxis: {
      categories: departments,
    },
    yaxis: {
      title: {
        text: '식대 사용액 합계 (원)',
      },
      labels: {
        formatter(value: number) {
          return `${value.toLocaleString()}원`
        },
      },
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
      name: '식대 사용액',
      data: seriesData,
    },
  ]

  return (
    <Card>
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="left" sx={{ flex: 1 }}>
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
