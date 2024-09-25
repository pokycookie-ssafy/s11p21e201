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
    title: 'dashboard.title',
    group: [
      {
        title: 'dashboard.title',
        path: paths.dashboard.total,
        icon: 'teenyicons:donut-chart-solid',
      },
      {
        title: 'dashboard.sales.title',
        path: paths.dashboard.sales.root,
        icon: 'grommet-icons:line-chart',
        group: [
          {
            title: 'dashboard.sales.menu',
            path: paths.dashboard.sales.menu,
          },
          {
            title: 'dashboard.sales.company',
            path: paths.dashboard.sales.company,
          },
          {
            title: 'dashboard.sales.date',
            path: paths.dashboard.sales.time,
          },
        ],
      },
      {
        title: 'dashboard.settlement',
        path: paths.dashboard.settlement,
        icon: 'ph:invoice-duotone',
      },
    ],
  },
  {
    title: 'management.title',
    group: [
      {
        title: 'management.menu',
        path: paths.management.menu,
        icon: 'ic:round-restaurant-menu',
      },
      {
        title: 'management.payment',
        path: paths.management.payment,
        icon: 'icon-park-outline:table',
      },
      {
        title: 'management.contract.title',
        path: paths.management.contract.root,
        icon: 'tabler:contract',
        group: [
          {
            title: 'management.contract.now',
            path: paths.management.contract.now,
          },
          // {
          //   title: 'management.contract.new',
          //   path: paths.management.contract.new,
          // },
          {
            title: 'management.contract.request',
            path: paths.management.contract.request,
          },
          {
            title: 'management.contract.history',
            path: paths.management.contract.history,
          },
        ],
      },
      {
        title: 'management.settlement',
        path: paths.management.settlement,
        icon: 'mingcute:card-pay-line',
      },
    ],
  },
  {
    title: 'payment.title',
    group: [
      {
        title: 'payment.qr',
        path: paths.payment.qr,
        icon: 'uil:qrcode-scan',
      },
    ],
  },
  {
    title: 'setting.title',
    group: [
      {
        title: 'setting.account',
        path: paths.setting.account,
        icon: 'majesticons:user-box-line',
      },
      {
        title: 'setting.app',
        path: paths.setting.app,
        icon: 'solar:settings-linear',
      },
    ],
  },
]

export default nav
