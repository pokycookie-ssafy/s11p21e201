import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import AppLayout from '@/layouts/app-layout'
import SettlementView from '@/pages/settlement-view'
import { createBrowserRouter } from 'react-router-dom'
import PaymentListView from '@/pages/payment-list-view'
import MemberManagementView from '@/pages/member-management-view'
import ContractManagementView from '@/pages/contract-management-view'

const mainRoute: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: paths.settlement.root,
        element: <SettlementView />,
      },
      {
        path: paths.payment.root,
        element: <PaymentListView />,
      },
      {
        path: paths.management.member,
        element: <MemberManagementView />,
      },
      {
        path: paths.management.contract,
        element: <ContractManagementView />,
      },
    ],
  },
]

export default mainRoute
