import type { RouteObject } from 'react-router-dom'

import paths from '@/configs/paths'
import MainView from '@/pages/main-view'
import LocalView from '@/pages/locale-view'
import componentRoute from '@/routes/component-route'
import MockApiView from '@/pages/mock-api/mock-api-view'

const mainRoute: RouteObject[] = [
  {
    path: '',
    element: <MainView />,
  },
  {
    path: paths.components.root,
    children: componentRoute,
  },
  {
    path: paths.mirage.root,
    element: <MockApiView />,
  },
  {
    path: paths.locale.root,
    element: <LocalView />,
  },
]

export default mainRoute
