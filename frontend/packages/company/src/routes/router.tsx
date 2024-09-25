import paths from '@/configs/paths'
import mainRoute from '@/routes/main-route'
import MainLayout from '@/layouts/main-layout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: paths.root,
    element: <MainLayout />,
    children: mainRoute,
  },
])

export default router
