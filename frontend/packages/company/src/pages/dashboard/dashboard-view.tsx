import { useAuthStore } from '@/stores'
import { useTranslate } from '@/locales'
import TotalCompany from '@/sections/dashboard/total-company'
import SummaryCompany from '@/sections/dashboard/summary-company'
import EmployeeManager from '@/sections/dashboard/employee-manager'
import DepartmentCompany from '@/sections/dashboard/department-company'
import RestaurantCompany from '@/sections/dashboard/restaurant-company'

import { Box, Stack } from '@mui/material'

import { Typography } from '@e201/ui'

export default function DashboardView() {
  const { t } = useTranslate('dashboard')
  const { isCompany } = useAuthStore()

  return (
    <Stack spacing={2}>
      <Typography variant="h3" fontWeight={800}>
        {t('dashboard')}
      </Typography>
      <SummaryCompany />
      <TotalCompany />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Box sx={{ flex: 1 }}>{isCompany ? <DepartmentCompany /> : <EmployeeManager />}</Box>
        <Box sx={{ flex: 1 }}>
          <RestaurantCompany />
        </Box>
      </Stack>
    </Stack>
  )
}
