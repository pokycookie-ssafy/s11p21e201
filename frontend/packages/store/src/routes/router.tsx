import paths from '@/configs/paths'
import MainLayout from '@/layouts/main-layout'
import SignInView from '@/pages/auth/sign-in-view'
import SignUpView from '@/pages/auth/sign-up-view'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
])

export default router
