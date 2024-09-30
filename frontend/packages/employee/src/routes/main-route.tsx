import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import QrView from '@/pages/qr-view'
import MainView from '@/pages/main-view'
import NavLayout from '@/layouts/nav-layout'
import PaymentsView from '@/pages/payments-view'
import PwChangeView from '@/pages/pw-change-view'

const mainRoute: RouteObject[] = [
  {
    element: <NavLayout />,
    children: [
      {
        path: paths.root,
        element: <MainView />,
      },
      {
        path: paths.qr,
        element: <QrView />,
      },
      {
        path: paths.payments,
        element: <PaymentsView />,
      },
      {
        path: paths.auth.changePw,
        element: <PwChangeView />,
      },
    ],
  },
]

export default mainRoute
