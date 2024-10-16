import { Nav } from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header'
import PaymentQR from '@/sections/main/payment-qr'
import { SwipeableEdge } from '@/components/swipeable'

import { Container } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function NavLayout() {
  return (
    <FullContainer sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="xs" sx={{ overflowY: 'auto', flex: 1, flexShrink: 0 }}>
        <Outlet />
      </Container>
      <SwipeableEdge>
        <PaymentQR />
      </SwipeableEdge>
      <Nav />
    </FullContainer>
  )
}
