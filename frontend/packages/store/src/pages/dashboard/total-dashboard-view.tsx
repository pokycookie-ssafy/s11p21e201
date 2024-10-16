import type { IDashboardMenu, IDashboardPayment } from '@/types/dashboard'

import React from 'react'
import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import MenuSales from '@/sections/dashboard/menu'
import CompanySales from '@/sections/dashboard/company'
import TotalRestaurant from '@/sections/dashboard/total'
import RestaurantDashboardSummary from '@/sections/dashboard/summary'

import { Box, Stack } from '@mui/material'

import { Typography } from '@e201/ui'

const queryFn = async () => {
  const response = await axios.get<IDashboardPayment[]>('/stores/dashboard/total')
  return response.data
}

export default function TotalDashboardView() {
  const { t } = useTranslate('dashboard')

  const { data = [] } = useQuery<IDashboardPayment[]>({
    queryKey: ['dashboard'],
    queryFn,
  })
  return (
    <Stack spacing={2}>
      <Typography variant="h3" fontWeight={800}>
        {t('dashboard')}
      </Typography>
      <RestaurantDashboardSummary data={data} />
      <TotalRestaurant data={data} />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ flex: 1 }}>
          <MenuSales data={data} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <CompanySales data={data} />
        </Box>
      </Stack>
    </Stack>
  )
}
