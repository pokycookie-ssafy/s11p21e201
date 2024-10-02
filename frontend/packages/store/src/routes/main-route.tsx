import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import AppLayout from '@/layouts/app-layout'
import SignInView from '@/pages/auth/sign-in-view'
import SignUpView from '@/pages/auth/sign-up-view'
import SignInLayout from '@/layouts/sign-in-layout'
import SignUpLayout from '@/layouts/sign-up-layout'
import PaymentLayout from '@/layouts/payment-layout'
import PrivateLayout from '@/layouts/private-layout'
import dashboardRoute from '@/routes/dashboard-route'
import managementRoute from '@/routes/management-route'
import QrPaymentView from '@/pages/payment/qr-payment-view'
import OnlyPublicLayout from '@/layouts/only-public-layout'

const mainRoute: RouteObject[] = [
  // Auth
  {
    element: <OnlyPublicLayout />,
    children: [
      {
        element: <SignInLayout />,
        children: [
          {
            path: paths.auth.signIn,
            element: <SignInView />,
          },
        ],
      },
      {
        element: <SignUpLayout />,
        children: [
          {
            path: paths.auth.signUp,
            element: <SignUpView />,
          },
        ],
      },
    ],
  },

  // App
  {
    // element: <PrivateLayout />,
    children: [
      {
        element: <AppLayout />,
        children: [...dashboardRoute, ...managementRoute],
      },
      {
        element: <PaymentLayout />,
        children: [
          {
            path: paths.payment.qr,
            element: <QrPaymentView />,
          },
        ],
      },
    ],
  },
]

export default mainRoute
