import paths from '@/configs/paths'
import mainRoute from '@/routes/main-route'
import SignInView from '@/pages/sign-in-view'
import MainLayout from '@/layouts/main-layout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <MainLayout />,
    children: [
      {
        path: paths.auth.signIn,
        element: <SignInView />,
      },
      ...mainRoute,
    ],
  },
])

export default router
