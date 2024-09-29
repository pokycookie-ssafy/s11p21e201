import paths from '@/configs/paths'
import mainRoute from '@/routes/main-route'
import MainLayout from '@/layouts/main-layout'
import { Navigate, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: mainRoute,
    errorElement: <Navigate to={paths.main} replace />,
  },
])

export default router
