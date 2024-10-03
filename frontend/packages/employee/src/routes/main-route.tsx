import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import QrView from '@/pages/qr-view'
import MainView from '@/pages/main-view'
import NavLayout from '@/layouts/nav-layout'
import SignInView from '@/pages/sign-in-view'
import PaymentsView from '@/pages/payments-view'
import PwChangeView from '@/pages/pw-change-view'
import PrivateLayout from '@/layouts/private-layout'
import OnlyPublicLayout from '@/layouts/only-public-layout'

const mainRoute: RouteObject[] = [
  {
    element: <OnlyPublicLayout />,
    children: [
      {
        path: paths.signIn,
        element: <SignInView />,
      },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        element: <NavLayout />,
        children: [
          {
            path: paths.root,
            element: <MainView />,
          },
          {
            path: paths.payments,
            element: <PaymentsView />,
          },
          {
            path: paths.setting,
            element: <PaymentsView />,
          },
          {
            path: paths.changePw,
            element: <PwChangeView />,
          },
        ],
      },
    ],
  },
]

export default mainRoute
