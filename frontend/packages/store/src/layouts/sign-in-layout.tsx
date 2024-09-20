import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

import { Stack } from '@mui/material'

import { FullContainer } from '@e201/ui'

export default function SignInLayout() {
  return (
    <FullContainer
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header logo />
      <Stack direction="row" justifyContent="center" alignItems="center" flex={1} p={4}>
        <Outlet />
      </Stack>
    </FullContainer>
  )
}
