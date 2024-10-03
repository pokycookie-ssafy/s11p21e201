import Nav from '@/sections/layout/nav'
import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

import { Box, Stack } from '@mui/material'

import { ScrollContainer } from '@e201/ui'

export default function AppLayout() {
  return (
    <Stack direction="row">
      <Nav />
      <ScrollContainer sx={{ overflow: 'auto', height: '100vh', width: 1 }}>
        <Header />
        <Box p={4} pt={1}>
          <Outlet />
        </Box>
      </ScrollContainer>
    </Stack>
  )
}
