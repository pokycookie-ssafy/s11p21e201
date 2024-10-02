import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import PaymentListView from '@/pages/payment/payment-list-view'
import MemberCreateView from '@/pages/member/member-create-view'
import SettlementDateView from '@/pages/settlement/settlement-date-view'
import MemberManagementView from '@/pages/member/member-management-view'
import SettlementStoreView from '@/pages/settlement/settlement-store-view'
import DashboardCompanyView from '@/pages/dashboard/dashboard-company-view'
import ContractNewManagementView from '@/pages/contract/contract-new-management-view'
import ContractNowManagementView from '@/pages/contract/contract-now-management-view'
import ContractHistoryManagementView from '@/pages/contract/contract-history-management-view'
import ContractRequestManagementView from '@/pages/contract/contract-request-management-view'

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
  {
    path: paths.dashboard.total,
    element: <DashboardCompanyView />,
  },
]

export default appRoute
