import Nav from '@/sections/layout/nav'
import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

import { Box, Stack } from '@mui/material'

export default function AppLayout() {
  return (
    <Stack direction="row">
      <Nav />
      <Stack width={1} height="100vh" sx={{ overflowY: 'auto' }}>
        <Header />
        <Box p={4}>
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  )
}
