import { Nav } from '@/components/nav'
import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header'

import { Box, Container } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function NavLayout() {
  return (
    <FullContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ flexShrink: 0, width: 1 }}>
        <Header />
      </Box>
      <Container
        maxWidth="xs"
        sx={{ textAlign: 'center', flex: 1, flexGrow: 1, overflowY: 'auto' }}
      >
        <Outlet />
      </Container>
      <Box sx={{ flexShrink: 0, width: 1 }}>
        <Nav />
      </Box>
    </FullContainer>
  )
}
