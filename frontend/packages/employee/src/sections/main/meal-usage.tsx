import type { IUsage } from '@/types/usage'

import api from '@/configs/api'
import axios from '@/configs/axios'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'

import { Box, Stack, useTheme, CircularProgress } from '@mui/material'

export default function MealUsage() {
  const { t } = useTranslate()

  const theme = useTheme()

  const { data } = useQuery({
    queryKey: [api.usage],
    queryFn: async () => {
      const response = await axios.get<IUsage>(api.usage)
      return response.data
    },
  })

  return data ? (
    <Chart
      width="100%"
      type="radialBar"
      series={[(data.usage / data.supportAmount) * 100]}
      options={{
        fill: {
          colors: [theme.palette.primary.main],
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: '70%',
            },
            track: {
              background: [theme.palette.background.paper],
            },
            dataLabels: {
              name: {
                offsetY: -15,
                show: true,
                color: theme.palette.text.secondary,
                fontSize: '13px',
              },
              value: {
                offsetY: 5,
                color: theme.palette.text.primary,
                fontSize: '30px',
                show: true,
              },
            },
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: [t('usage.title')],
      }}
    />
  ) : (
    <Stack width={1} height={200} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  )
}
