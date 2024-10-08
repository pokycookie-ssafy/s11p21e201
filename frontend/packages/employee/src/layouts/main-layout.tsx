import type { IAuth } from '@/stores'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { Outlet } from 'react-router-dom'
import { useMemo, useEffect } from 'react'
import { useAuthStore, useThemeStore } from '@/stores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

import { Toaster, darkTheme, lightTheme } from '@e201/ui'

export default function MainLayout() {
  const { mode } = useThemeStore()

  const { login } = useAuthStore()

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme() : darkTheme()), [mode])
  const queryClient = useMemo(() => new QueryClient(), [])

  const checkLogin = async () => {
    try {
      const response = await axios.get<IAuth | null>(api.login)
      if (response.data !== null) {
        login(response.data)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
