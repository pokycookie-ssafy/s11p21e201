import type { ICompanyResponse, IEmployeeResponse } from '@/stores'

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

  const { loginCompany, loginManager } = useAuthStore()

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme() : darkTheme()), [mode])
  const queryClient = useMemo(() => new QueryClient(), [])

  const checkLogin = async () => {
    try {
      try {
        const company = await axios.get<ICompanyResponse | null>(api.auth.login)
        if (company.data !== null) {
          loginCompany(company.data)
        }
      } catch (error) {
        const manager = await axios.get<IEmployeeResponse | null>(api.manager.login)
        if (manager.data !== null) {
          loginManager(manager.data)
        }
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
