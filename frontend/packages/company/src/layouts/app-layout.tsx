import Nav from '@/sections/layout/nav'
import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

import { Box, Stack } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function AppLayout() {
  return (
    <Stack direction="row">
      <Nav />
      <Stack width={1} height="100vh" sx={{ overflowY: 'auto' }}>
        <Header />
        <Box sx={{ px: 4, py: 1 }}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  )
}
