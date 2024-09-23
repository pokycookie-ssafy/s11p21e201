import MainLayout from '@/layouts/main-layout'
import SettlementView from '@/pages/settlement-view'
import { createBrowserRouter } from 'react-router-dom'
import PaymentListView from '@/pages/payment-list-view'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'company/settlement',
        element: <SettlementView />,
      },
      {
        path: 'company/payment-list',
        element: <PaymentListView />,
      },
    ],
  },
])

export default router
