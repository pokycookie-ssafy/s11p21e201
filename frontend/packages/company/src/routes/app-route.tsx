import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import SettlementView from '@/pages/settlement-view'
import PaymentListView from '@/pages/payment-list-view'
import MemberCreateView from '@/pages/member/member-create-view'
import MemberManagementView from '@/pages/member/member-management-view'
import ContractNewManagementView from '@/pages/contract/contract-new-management-view'
import ContractNowManagementView from '@/pages/contract/contract-now-management-view'
import ContractRequestManagementView from '@/sections/member-management/employee-management'
import ContractHistoryManagementView from '@/pages/contract/contract-history-management-view'

const appRoute: RouteObject[] = [
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
    path: paths.management.contract.now,
    element: <ContractNowManagementView />,
  },
  {
    path: paths.management.contract.new,
    element: <ContractNewManagementView />,
  },
  {
    path: paths.management.contract.request,
    element: <ContractRequestManagementView />,
  },
  {
    path: paths.management.contract.history,
    element: <ContractHistoryManagementView />,
  },

  {
    path: paths.management.member_create,
    element: <MemberCreateView />,
  },
]

export default appRoute
