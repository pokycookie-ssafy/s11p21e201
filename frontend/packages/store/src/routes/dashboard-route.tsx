import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import TotalDashboardView from '@/pages/dashboard/total-dashboard-view'
// import SalesMenuDashboardView from '@/pages/dashboard/sales-menu-dashboard-view'
// import SalesTimeDashboardView from '@/pages/dashboard/sales-time-dashboard-view'
// import SettlementDashboardView from '@/pages/dashboard/settlement-dashboard-view'
// import SalesCompanyDashboardView from '@/pages/dashboard/sales-company-dashboard-view'

const dashboardRoute: RouteObject[] = [
  {
    path: paths.dashboard.total,
    element: <TotalDashboardView />,
  },
  // {
  //   path: paths.dashboard.sales.menu,
  //   element: <SalesMenuDashboardView />,
  // },
  // {
  //   path: paths.dashboard.sales.company,
  //   element: <SalesCompanyDashboardView />,
  // },
  // {
  //   path: paths.dashboard.sales.time,
  //   element: <SalesTimeDashboardView />,
  // },
  // {
  //   path: paths.dashboard.settlement,
  //   element: <SettlementDashboardView />,
  // },
]

export default dashboardRoute
