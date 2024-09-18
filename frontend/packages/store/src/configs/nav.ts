import paths from '@/configs/paths'

export interface INav {
  title: string
  group: INavItem[]
}

export interface INavItem {
  title: string
  path: string
  icon?: string
  group?: INavItem[]
}

const nav: INav[] = [
  {
    title: 'overview.title',
    group: [
      {
        title: 'overview.dashboard',
        path: paths.dashboard,
        icon: 'teenyicons:donut-chart-solid',
      },
      {
        title: 'overview.sales.title',
        path: paths.dashboard,
        icon: 'grommet-icons:line-chart',
        group: [
          {
            title: 'overview.sales.menu',
            path: '',
          },
          {
            title: 'overview.sales.company',
            path: '',
          },
          {
            title: 'overview.sales.date',
            path: '',
          },
        ],
      },
      {
        title: 'overview.statement',
        path: paths.dashboard,
        icon: 'ph:invoice-duotone',
      },
    ],
  },
  {
    title: 'management.title',
    group: [
      {
        title: 'management.menu',
        path: paths.dashboard,
        icon: 'ic:round-restaurant-menu',
      },
      {
        title: 'management.payment',
        path: paths.dashboard,
        icon: 'icon-park-outline:table',
      },
      {
        title: 'management.contract',
        path: paths.dashboard,
        icon: 'tabler:contract',
      },
      {
        title: 'management.statement',
        path: paths.dashboard,
        icon: 'mingcute:card-pay-line',
      },
    ],
  },
  {
    title: 'payment.title',
    group: [
      {
        title: 'payment.qr',
        path: '',
        icon: 'uil:qrcode-scan',
      },
    ],
  },
  {
    title: 'setting.title',
    group: [
      {
        title: 'setting.account',
        path: '',
        icon: 'majesticons:user-box-line',
      },
      {
        title: 'setting.app',
        path: '',
        icon: 'solar:settings-linear',
      },
    ],
  },
]

export default nav
