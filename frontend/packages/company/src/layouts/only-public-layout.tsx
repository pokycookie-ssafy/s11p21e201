import paths from '@/configs/paths'
import { useAuthStore } from '@/stores'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyPublicLayout() {
  const { isLogin } = useAuthStore()

  return isLogin ? <Navigate to={paths.main} replace /> : <Outlet />
}
