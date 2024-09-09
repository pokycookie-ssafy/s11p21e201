import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import ToastView from '@/pages/components/toast-view'
import ScrollbarView from '@/pages/components/scrollbar-view'

const componentRoute: RouteObject[] = [
  {
    path: paths.components.toast,
    element: <ToastView />,
  },
  {
    path: paths.components.scrollbar,
    element: <ScrollbarView />,
  },
]

export default componentRoute
