import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import MenuManagementView from '@/pages/management/menu-management-view'
import SettlementDateView from '@/pages/management/settlement-date-view'
import SettlementCompanyView from '@/pages/management/settlement-company-view'
import { PaymentManagementView } from '@/pages/management/payment-management-view'
import ContractNewManagementView from '@/pages/management/contract-new-management-view'
import ContractNowManagementView from '@/pages/management/contract-now-management-view'
import ContractHistoryManagementView from '@/pages/management/contract-history-management-view'
import ContractRequestManagementView from '@/pages/management/contract-request-management-view'

const managementRoute: RouteObject[] = [
  {
    path: paths.management.menu,
    element: <MenuManagementView />,
  },
  {
    path: paths.management.payment,
    element: <PaymentManagementView />,
  },

  // Contract
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

  // Settlement
  {
    path: paths.management.settlement.company,
    element: <SettlementCompanyView />,
  },
  {
    path: paths.management.settlement.date,
    element: <SettlementDateView />,
  },
]

export default managementRoute
