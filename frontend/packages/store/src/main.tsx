import '@/global.css'

import '@/locales/i18n'
import { StrictMode } from 'react'
import initServer from '@/mock-api/server'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import router from './routes/router'

// initServer()
if (import.meta.env.DEV && import.meta.env.VITE_MOCK_API === 'MOCK') {
  initServer()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
