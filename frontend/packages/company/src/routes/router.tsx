import MainLayout from '@/layouts/main-layout'
import SettlementView from '@/pages/settlement'
import PaymentListView from '@/pages/payment-list'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'settlement',
        element: <SettlementView />,
      },
      {
        path: 'payment-list',
        element: <PaymentListView />,
      },
    ],
  },
])

export default router
