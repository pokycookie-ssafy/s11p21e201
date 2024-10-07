import type { IAuth } from '@/stores'

import api from '@/configs/api'
import axios from '@/configs/axios'
import { color } from '@/configs/color'
import { Outlet } from 'react-router-dom'
import { useMemo, useEffect } from 'react'
import { useAuthStore, useThemeStore } from '@/stores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

import { Toaster, darkTheme, lightTheme } from '@e201/ui'

export default function MainLayout() {
  const { mode } = useThemeStore()

  const { login } = useAuthStore()

  const theme = useMemo(
    () => createTheme(mode === 'light' ? lightTheme(color) : darkTheme(color)),
    [mode]
  )
  const queryClient = useMemo(() => new QueryClient(), [])

  const checkLogin = async () => {
    try {
      const company = await axios.get<IAuth | null>(api.auth.check)
      if (company.data !== null) {
        login(company.data)
      }
    } catch (error) {
      console.log(error)
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
