import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import PaymentListView from '@/pages/payment-list-view'
import SettlementDateView from '@/pages/settlement-date-view'
import SettlementStoreView from '@/pages/settlement-store-view'
import MemberCreateView from '@/pages/member/member-create-view'
import MemberManagementView from '@/pages/member/member-management-view'
import ContractNewManagementView from '@/pages/contract/contract-new-management-view'
import ContractNowManagementView from '@/pages/contract/contract-now-management-view'
import ContractRequestManagementView from '@/sections/member-management/employee-management'
import ContractHistoryManagementView from '@/pages/contract/contract-history-management-view'

const appRoute: RouteObject[] = [
  {
    path: paths.management.settlement.date,
    element: <SettlementDateView />,
  },
  {
    path: paths.management.settlement.store,
    element: <SettlementStoreView />,
  },
  {
    path: paths.management.payment,
    element: <PaymentListView />,
  },
  {
    path: paths.management.member.root,
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
    path: paths.management.member.create,
    element: <MemberCreateView />,
  },
]

export default appRoute
