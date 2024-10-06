import type { IDashboardMenu, IDashboardPayment } from '@/types/dashboard'

import dayjs from 'dayjs'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, useTheme, Typography } from '@mui/material'

interface MenuSalesProps {
  data: IDashboardPayment[]
}

export default function MenuSales({ data }: MenuSalesProps) {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [menus, setMenus] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])

  const theme = useTheme()
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

  const handleDateChange = (year: number, month: number) => {
    setSelectedYear(year)
    setSelectedMonth(month)
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
    labels: menus,
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
    legend: {
      labels: {
        colors: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400], // Set label colors based on theme mode
      },
    },
  }

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
            {t('menu_sales')}
          </Typography>

          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>

        <Chart options={chartOptions} series={seriesData} type="pie" height={230} />
      </Stack>
    </Card>
  )
}
