import { Outlet } from 'react-router-dom'
import Header from '@/sections/layout/header'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
