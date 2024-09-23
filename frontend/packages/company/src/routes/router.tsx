import MainLayout from '@/layouts/main-layout'
import SettlementView from '@/pages/settlement-view'
import { createBrowserRouter } from 'react-router-dom'
import PaymentListView from '@/pages/payment-list-view'
import MemberManagementView from '@/pages/member-management-view'
import ContractManagementView from '@/pages/contract-management-view'

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
      {
        path: 'company/member-management',
        element: <MemberManagementView />,
      },
      {
        path: 'company/contract-management',
        element: <ContractManagementView />,
      },
    ],
  },
])

export default router
