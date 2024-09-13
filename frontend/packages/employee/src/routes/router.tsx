import QrPage from '@/pages/qr-view'
import MainPage from '@/pages/main-view'
import LoginPage from '@/pages/login-view'
import MainLayout from '@/layouts/main-layout'
import PaymentsPage from '@/pages/payments-view'
import PwChangePage from '@/pages/pw-change-view'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: '/qr',
        element: <QrPage />,
      },
      {
        path: 'payments',
        element: <PaymentsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'pw-change',
        element: <PwChangePage />,
      },
    ],
  },
])

export default router
