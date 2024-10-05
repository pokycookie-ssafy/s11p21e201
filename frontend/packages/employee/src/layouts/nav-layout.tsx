import { Nav } from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header'
import PaymentQR from '@/sections/main/payment-qr'
import { SwipeableEdge } from '@/components/swipeable'

import { Container } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function NavLayout() {
  return (
    <FullContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      <Container
        maxWidth="xs"
        sx={{ textAlign: 'center', flex: 1, flexGrow: 1, overflowY: 'auto' }}
      >
        <Outlet />
      </Container>
      <SwipeableEdge>
        <PaymentQR />
      </SwipeableEdge>
      <Nav />
    </FullContainer>
  )
}
