import type { IDashboardPayment } from '@/types/dashboard-payment'

import React from 'react'
import axios from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import TotalCompany from '@/sections/dashboard/total-company'
import SummaryCompany from '@/sections/dashboard/summary-company'
import DepartmentCompany from '@/sections/dashboard/department-company'
import RestaurantCompany from '@/sections/dashboard/restaurant-company'

import { Box, Stack } from '@mui/material'

import { Typography } from '@e201/ui'

const queryFn = async (): Promise<IDashboardPayment[]> => {
  const response = await axios.get('/dashboard')
  return response.data
}

export default function DashboardCompanyView() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<IDashboardPayment[]>({
    queryKey: ['dashboard'],
    queryFn,
  })

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>에러 발생: {error.message}</p>

  return (
    <Stack spacing={2}>
      <Typography variant="h3" fontWeight={800}>
        대시보드
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
