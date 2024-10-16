import Microsite from '@/pages/microsite'
import MainLayout from '@/layouts/main-layout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Microsite />,
      },
    ],
  },
])

export default router
