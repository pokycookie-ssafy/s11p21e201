import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import SignInView from '@/pages/auth/sign-in-view'
import SignUpView from '@/pages/auth/sign-up-view'
import TotalDashbaordView from '@/pages/dashboard/total-dashboard-view'
import SalesMenuDashboardView from '@/pages/dashboard/sales-menu-dashboard-view'
import SalesTimeDashboardView from '@/pages/dashboard/sales-time-dashboard-view'
import SettlementDashboardView from '@/pages/dashboard/settlement-dashbaord-view'
import SalesCompanyDashboardView from '@/pages/dashboard/sales-company-dashboard-view'

const mainRoute: RouteObject[] = [
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: paths.auth.signIn,
        element: <SignInView />,
      },
      {
        path: paths.auth.signUp,
        element: <SignUpView />,
      },
    ],
  },
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: paths.dashboard.total,
        element: <TotalDashbaordView />,
      },
      {
        path: paths.dashboard.sales.menu,
        element: <SalesMenuDashboardView />,
      },
      {
        path: paths.dashboard.sales.company,
        element: <SalesCompanyDashboardView />,
      },
      {
        path: paths.dashboard.sales.time,
        element: <SalesTimeDashboardView />,
      },
      {
        path: paths.dashboard.settlement,
        element: <SettlementDashboardView />,
      },
    ],
  },
]

export default mainRoute
