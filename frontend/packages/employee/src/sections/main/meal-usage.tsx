import type { IUsage } from '@/types/usage'

import api from '@/configs/api'
import axios from '@/configs/axios'
import Chart from 'react-apexcharts'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'

import { Box, Card, Stack, useTheme, CircularProgress } from '@mui/material'

import MealChart from './meal-chart'

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
    <Card sx={{ width: 1, p: 2 }}>
      <Box width={100}>
        <MealChart total={data.supportAmount} usage={data.usage} />
      </Box>
    </Card>
  ) : (
    <Stack width={1} height={200} justifyContent="center" alignItems="center">
      <CircularProgress />
    </Stack>
  )
}
