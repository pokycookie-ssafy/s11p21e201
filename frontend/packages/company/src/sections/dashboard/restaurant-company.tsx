import dayjs from 'dayjs'
import axios from '@/configs/axios'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useState, useEffect } from 'react'
import { SelectDate } from '@/components/select/select-date'

import { Box, Card, Stack, useTheme, Typography } from '@mui/material'

interface StoreData {
  storeId: string
  storeName: string
  amount: number
}

export default function RestaurantCompany() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1)
  const [restaurants, setRestaurants] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { t } = useTranslate('dashboard')
  const theme = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get<StoreData[]>('/companies/dashboards/months/stores', {
          params: {
            startDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
              .startOf('month')
              .format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`)
              .endOf('month')
              .format('YYYY-MM-DDTHH:mm:ss'),
          },
        })

        const sortedRestaurants = response.data.sort((a, b) => b.amount - a.amount)

        setRestaurants(sortedRestaurants.map((item) => item.storeName))
        setSeriesData(sortedRestaurants.map((item) => item.amount))
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
      type: 'pie',
      toolbar: {
        show: false,
      },
    },
    theme: {
      palette: 'palette1',
    },
    labels: restaurants,
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
      y: {
        formatter(value: number) {
          return `${value.toLocaleString()}${t('won')}`
        },
      },
    },
    legend: {
      labels: {
        colors: theme.palette.mode === 'light' ? theme.palette.grey[800] : theme.palette.grey[400],
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
            {t('restaurant_amount')}
          </Typography>
          <SelectDate year={selectedYear} month={selectedMonth} t={t} onChange={handleDateChange} />
        </Box>
        {seriesData.length > 0 ? (
          <Chart options={chartOptions} series={seriesData} type="pie" height={230} />
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', pt: 10, color: theme.palette.grey[500] }}
          >
            {t('no_data')}
          </Typography>
        )}
      </Stack>
    </Card>
  )
}
