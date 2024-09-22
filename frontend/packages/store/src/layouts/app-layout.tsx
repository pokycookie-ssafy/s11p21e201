import Nav from '@/sections/layout/nav'
import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

import { Stack } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function AppLayout() {
  return (
    <Stack direction="row">
      <Nav />
      <FullContainer>
        <Header />
        <Outlet />
      </FullContainer>
    </Stack>
  )
}
