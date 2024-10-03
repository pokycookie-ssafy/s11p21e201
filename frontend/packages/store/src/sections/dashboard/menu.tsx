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
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material'

interface MenuSalesProps {
  data: IDashboardPayment[]
}

export default function MenuSales({ data }: MenuSalesProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [menus, setMenus] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const { t } = useTranslate('dashboard')

  useEffect(() => {
    // 선택된 연도와 월에 맞는 데이터 필터링
    const filteredData = data.filter((payment) => {
      const paymentDate = dayjs(payment.createdAt)
      return paymentDate.year() === selectedYear && paymentDate.month() + 1 === selectedMonth
    })

    // 메뉴별 총 매출 계산
    const menuTotals: { [key: string]: number } = {}
    filteredData.forEach((payment) => {
      payment.menus.forEach((menu) => {
        menuTotals[menu.name] = (menuTotals[menu.name] || 0) + menu.price
      })
    })

    const sortedMenus = Object.entries(menuTotals).sort(([, totalA], [, totalB]) => totalB - totalA)

    setMenus(sortedMenus.map(([name]) => name))
    setSeriesData(sortedMenus.map(([, total]) => total))
  }, [data, selectedYear, selectedMonth])

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
    theme: {
      palette: 'palette1',
    },
    labels: menus, // 메뉴 이름을 라벨로 사용
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}${t('won')}`
        },
      },
    },
  }

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
            {t('menu_sales')}
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

        <Chart options={chartOptions} series={seriesData} type="pie" height={230} />
      </Stack>
    </Card>
  )
}
