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

interface RestaurantCompanyProps {
  data: IDashboardPayment[]
}

export default function RestaurantCompany({ data }: RestaurantCompanyProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [restaurants, setRestaurants] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  useEffect(() => {
    // 선택한 연도와 월에 해당하는 데이터 필터링
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.paidAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    // 식당별 식대 합계 계산
    const restaurantTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      const { restaurantName, price } = payment
      restaurantTotals[restaurantName] = (restaurantTotals[restaurantName] || 0) + price
    })

    // 식당 이름과 총액으로 배열 구성
    const sortedRestaurants = Object.entries(restaurantTotals).sort(
      ([, totalA], [, totalB]) => totalB - totalA
    ) // 총액이 높은 순으로 정렬

    setRestaurants(sortedRestaurants.map(([name]) => name))
    setSeriesData(sortedRestaurants.map(([, total]) => total))
  }, [data, selectedYear, selectedMonth])

  // 연도 및 월 선택 처리
  const handleYearChange = (e: SelectChangeEvent<number>) => {
    setSelectedYear(Number(e.target.value))
  }

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    setSelectedMonth(Number(e.target.value))
  }

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    labels: restaurants,
    dataLabels: {
      enabled: false, // 원그래프 조각 위의 라벨 비활성화
    },
    tooltip: {
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}원`
        },
      },
    },
  }

  return (
    <Card>
      <Stack p={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" align="left" sx={{ flex: 1 }}>
            식당별 식대 사용 총액
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

        <Chart options={chartOptions} series={seriesData} type="pie" height={200} />
      </Stack>
    </Card>
  )
}
