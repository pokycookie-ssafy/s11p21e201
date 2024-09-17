import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import AppLayout from '@/layouts/app-layout'
import AuthLayout from '@/layouts/auth-layout'
import SignInView from '@/pages/auth/sign-in-view'
import SignUpView from '@/pages/auth/sign-up-view'

const mainRoute: RouteObject[] = [
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: paths.signIn,
        element: <SignInView />,
      },
      {
        path: paths.signUp,
        element: <SignUpView />,
      },
    ],
  },
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: paths.dashboard,
      },
    ],
  },
]

export default mainRoute
