import MainLayout from '@/layouts/main-layout'
import { createBrowserRouter } from 'react-router-dom'

import mainRoute from './main-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: mainRoute,
  },
])

export default router
