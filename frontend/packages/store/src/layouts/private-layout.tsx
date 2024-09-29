import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateLayout() {
  const { isLogin } = useAuthStore()

  return isLogin ? <Outlet /> : <Navigate to={paths.auth.signIn} replace />
}
