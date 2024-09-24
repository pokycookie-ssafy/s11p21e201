import { Outlet } from 'react-router-dom'
import PaymentHeader from '@/sections/layout/payment-header'

import { Stack } from '@mui/material'

export default function PaymentLayout() {
  return (
    <Stack height="100vh">
      <PaymentHeader />
      <Outlet />
    </Stack>
  )
}
