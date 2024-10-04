import QRCode from 'react-qr-code'
import PaymentQR from '@/sections/qr/payment-qr'
import { StoresList } from '@/sections/stores-list'
import { SwipeableEdge } from '@/components/swipeable'
import { MealUsageBar } from '@/sections/meal-usage-bar'

import { Stack } from '@mui/material'

export default function MainView() {
  return (
    <Stack
      maxWidth="xs"
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      sx={(theme) => ({
        width: 1,
        height: 1,
        padding: 2,
        position: 'relative',
        [theme.breakpoints.up('sm')]: { width: '90%', padding: 3 },
        [theme.breakpoints.up('md')]: { width: '80%' },
        [theme.breakpoints.up('lg')]: { width: '70%' },
      })}
    >
      {/* <MealUsageBar /> */}
      {/* <StoresList /> */}
      <SwipeableEdge>
        <PaymentQR />
      </SwipeableEdge>
    </Stack>
  )
}
