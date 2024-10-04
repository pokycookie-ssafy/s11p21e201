import type { IDashboardPayment } from '@/types/dashboard-payment'

import axios from '@/configs/axios'
import { useTranslate } from '@/locales'
import { useQuery } from '@tanstack/react-query'
import TotalCompany from '@/sections/dashboard/total-company'
import SummaryCompany from '@/sections/dashboard/summary-company'
import DepartmentCompany from '@/sections/dashboard/department-company'
import RestaurantCompany from '@/sections/dashboard/restaurant-company'

import { Box, Stack } from '@mui/material'

import { Typography } from '@e201/ui'

const queryFn = async () => {
  const response = await axios.get<IDashboardPayment[]>('/dashboard')
  return response.data
}

export default function DashboardCompanyView() {
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
      <SummaryCompany data={data} />
      <TotalCompany data={data} />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ flex: 1 }}>
          <DepartmentCompany data={data} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <RestaurantCompany data={data} />
        </Box>
      </Stack>
    </Stack>
  )
}
