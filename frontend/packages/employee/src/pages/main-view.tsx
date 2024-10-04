import MealUsage from '@/sections/main/meal-usage'
import PaymentQR from '@/sections/main/payment-qr'
import { SwipeableEdge } from '@/components/swipeable'

import { Stack } from '@mui/material'

export default function MainView() {
  return (
    <Stack width={1} height={1} py={4} alignItems="center">
      <MealUsage />
      <SwipeableEdge>
        <PaymentQR />
      </SwipeableEdge>
    </Stack>
  )
}
